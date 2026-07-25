import axios from "axios";
import {
  showErrorToast,
  showSuccessToast,
} from "../../shared/lib/Toast/toastService";

export const API_BASE_URL =
  process.env.REACT_APP_DASHBOARD_API_URL || "http://localhost/api/v1/dashboard/";
const AUTH_API_BASE_URL = API_BASE_URL.replace(/dashboard\/?$/, "");

const TOKEN_STORAGE_KEYS = ["accessToken", "token", "authToken"];
const TOKEN_EXPIRES_IN_KEY = "tokenExpiresIn";
const TOKEN_EXPIRES_AT_KEY = "tokenExpiresAt";
const REFRESH_BEFORE_EXPIRY_MS = 60 * 1000;
let refreshTimerId = null;
let refreshPromise = null;

function getStoredToken() {
  return TOKEN_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
}

function setStoredToken(token) {
  TOKEN_STORAGE_KEYS.forEach((key) => {
    localStorage.setItem(key, token);
  });
}

function persistTokenSession({ token, expiresIn }) {
  if (token) {
    setStoredToken(token);
  }

  if (expiresIn) {
    const normalizedExpiresIn = Number(expiresIn);
    localStorage.setItem(TOKEN_EXPIRES_IN_KEY, String(normalizedExpiresIn));
    localStorage.setItem(
      TOKEN_EXPIRES_AT_KEY,
      String(Date.now() + normalizedExpiresIn * 1000),
    );
    scheduleTokenRefresh(normalizedExpiresIn);
  }
}

function clearRefreshTimer() {
  if (refreshTimerId) {
    window.clearTimeout(refreshTimerId);
    refreshTimerId = null;
  }
}

function clearStoredTokenSession() {
  clearRefreshTimer();
  [...TOKEN_STORAGE_KEYS, TOKEN_EXPIRES_IN_KEY, TOKEN_EXPIRES_AT_KEY].forEach(
    (key) => localStorage.removeItem(key),
  );
}

function getTokenRefreshDelay(expiresInSeconds) {
  return Math.max(5000, Number(expiresInSeconds) * 1000 - REFRESH_BEFORE_EXPIRY_MS);
}

function scheduleTokenRefresh(expiresInSeconds) {
  if (typeof window === "undefined" || !expiresInSeconds) return;

  clearRefreshTimer();
  refreshTimerId = window.setTimeout(() => {
    refreshAccessToken().catch(() => {
      clearStoredTokenSession();
    });
  }, getTokenRefreshDelay(expiresInSeconds));
}

function scheduleStoredTokenRefresh() {
  if (typeof window === "undefined") return;

  const token = getStoredToken();
  const expiresAt = Number(localStorage.getItem(TOKEN_EXPIRES_AT_KEY));

  if (!token || !Number.isFinite(expiresAt)) return;

  const remainingMs = expiresAt - Date.now();

  if (remainingMs <= 0) {
    refreshAccessToken().catch(() => {
      clearStoredTokenSession();
    });
    return;
  }

  clearRefreshTimer();
  refreshTimerId = window.setTimeout(() => {
    refreshAccessToken().catch(() => {
      clearStoredTokenSession();
    });
  }, Math.max(5000, remainingMs - REFRESH_BEFORE_EXPIRY_MS));
}

function shouldRefreshTokenSoon() {
  const token = getStoredToken();
  const expiresAt = Number(localStorage.getItem(TOKEN_EXPIRES_AT_KEY));

  return (
    Boolean(token) &&
    Number.isFinite(expiresAt) &&
    expiresAt - Date.now() <= REFRESH_BEFORE_EXPIRY_MS
  );
}

function canRefreshRequest(config) {
  return Boolean(config) && !config.skipAuth && !config.skipAuthRefresh;
}

export async function refreshAccessToken() {
  const currentToken = getStoredToken();

  if (!currentToken) {
    return Promise.reject(new Error("Missing access token"));
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${AUTH_API_BASE_URL}refresh`, null, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      })
      .then((response) => {
        const token = response?.data?.data?.newToken;
        const expiresIn = response?.data?.data?.expires_in;

        if (!token) {
          throw new Error("Refresh response does not include a token");
        }

        persistTokenSession({ token, expiresIn });
        window.dispatchEvent(new Event("authTokenUpdated"));

        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export function initializeStoredTokenRefresh() {
  scheduleStoredTokenRefresh();
}

export function saveAuthTokenSession({ token, expiresIn }) {
  persistTokenSession({ token, expiresIn });
}

export function removeAuthTokenSession() {
  clearStoredTokenSession();
}

function buildApiError({ status, data, message, originalError }) {
  return {
    status,
    message:
      data?.message ||
      data?.error ||
      message ||
      "حدث خطأ غير متوقع أثناء الاتصال بالخادم",
    data,
    originalError,
  };
}

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  if (canRefreshRequest(config) && shouldRefreshTokenSoon()) {
    try {
      await refreshAccessToken();
    } catch {
      clearStoredTokenSession();
    }
  }

  const token = config.skipAuth ? null : getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

httpClient.interceptors.response.use(
  async (response) => {
    const data = response.data;
    const businessStatusCode = Number(data?.status_code);
    const isBusinessError =
      data?.success === false ||
      (Number.isFinite(businessStatusCode) && businessStatusCode >= 400);

    if (isBusinessError) {
      if (
        businessStatusCode === 401 &&
        canRefreshRequest(response.config) &&
        !response.config?._retry
      ) {
        try {
          const token = await refreshAccessToken();
          response.config._retry = true;
          response.config.headers.Authorization = `Bearer ${token}`;
          return httpClient(response.config);
        } catch {
          clearStoredTokenSession();
        }
      }

      const apiError = buildApiError({
        status: businessStatusCode || response.status,
        data,
      });

      if (response.config?.showErrorToast !== false) {
        showErrorToast(apiError.message);
      }

      return Promise.reject(apiError);
    }

    if (response.config?.successMessage) {
      showSuccessToast(response.config.successMessage);
    }

    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      canRefreshRequest(originalRequest) &&
      !originalRequest._retry
    ) {
      try {
        const token = await refreshAccessToken();
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return httpClient(originalRequest);
      } catch {
        clearStoredTokenSession();
      }
    }

    const apiError = buildApiError({
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      originalError: error,
    });

    if (error.config?.showErrorToast !== false) {
      showErrorToast(apiError.message);
    }

    return Promise.reject(apiError);
  },
);

initializeStoredTokenRefresh();

export default httpClient;

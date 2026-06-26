import axios from "axios";
import {
  showErrorToast,
  showSuccessToast,
} from "../../shared/lib/Tost/toastService";

export const API_BASE_URL =
  process.env.REACT_APP_DASHBOARD_API_URL || "http://localhost/api/v1/dashboard/";

const TOKEN_STORAGE_KEYS = ["accessToken", "token", "authToken"];

function getStoredToken() {
  return TOKEN_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
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

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    const data = response.data;
    const businessStatusCode = Number(data?.status_code);
    const isBusinessError =
      data?.success === false ||
      (Number.isFinite(businessStatusCode) && businessStatusCode >= 400);

    if (isBusinessError) {
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
  (error) => {
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

export default httpClient;

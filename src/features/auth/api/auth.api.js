import httpClient from "../../../lib/api/httpClient";
import {
  getStoredFirebaseMessagingToken,
  requestFirebaseMessagingToken,
} from "../../notifications/services/firebaseMessagingToken";

const DEVICE_ID_STORAGE_KEY = "dashboardDeviceId";

function createDeviceId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getDeviceId() {
  if (typeof window === "undefined") {
    return createDeviceId();
  }

  const storedDeviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY);

  if (storedDeviceId) {
    return storedDeviceId;
  }

  const deviceId = createDeviceId();
  localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);

  return deviceId;
}

function getBrowserName(userAgent) {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/OPR\//.test(userAgent)) return "Opera";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Safari\//.test(userAgent)) return "Safari";

  return "Browser";
}

function getDeviceName() {
  if (typeof navigator === "undefined") {
    return "Unknown device";
  }

  const userAgentData = navigator.userAgentData;

  if (userAgentData?.platform) {
    const browser = userAgentData.brands?.at(-1)?.brand || "Browser";
    return `${browser} on ${userAgentData.platform}`;
  }

  const platform = navigator.platform || "Unknown OS";
  const browser = getBrowserName(navigator.userAgent || "");

  return `${browser} on ${platform}`;
}

async function getOptionalFcmToken({ allowPermissionPrompt = true } = {}) {
  const storedFcmToken = getStoredFirebaseMessagingToken();

  if (storedFcmToken) {
    return storedFcmToken;
  }

  if (
    !allowPermissionPrompt &&
    (typeof Notification === "undefined" || Notification.permission !== "granted")
  ) {
    return "";
  }

  try {
    return await requestFirebaseMessagingToken();
  } catch (error) {
    console.warn("Request will continue without FCM token:", error);
    return "";
  }
}

export async function loginRequest({ email, password }) {
  const formData = new FormData();
  const fcmToken = await getOptionalFcmToken();
  const deviceId = getDeviceId();
  const deviceName = getDeviceName();

  formData.append("email", email);
  formData.append("password", password);
  formData.append("fcm_token", fcmToken);
  formData.append("device_id", deviceId);
  formData.append("device_name", deviceName);

  console.log("Login device_id:", deviceId);
  console.log("Login device_name:", deviceName);

  return httpClient.post("auth/login", formData, {
    skipAuthRefresh: true,
    showErrorToast: true,
  });
}

export async function logoutRequest() {
  const formData = new FormData();
  const fcmToken = await getOptionalFcmToken({ allowPermissionPrompt: false });
  const deviceId = getDeviceId();

  formData.append("fcm_token", fcmToken);
  formData.append("device_id", deviceId);

  console.log("Logout device_id:", deviceId);

  return httpClient.post("logout", formData, {
    showErrorToast: true,
  });
}

export function requestPasswordResetOtp({ email }) {
  const formData = new FormData();
  formData.append("email", email);

  return httpClient.post("auth/forgot-password/request-otp", formData, {
    showErrorToast: true,
  });
}

export function verifyPasswordResetOtp({ email, otpCode }) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp_code", otpCode);

  return httpClient.post("auth/forgot-password/verify-otp", formData, {
    showErrorToast: true,
  });
}

export function resendPasswordResetOtp({ email }) {
  const formData = new FormData();
  formData.append("email", email);

  return httpClient.post("auth/forgot-password/resend-otp", formData, {
    showErrorToast: true,
  });
}

export function resetPasswordRequest({
  email,
  otpCode,
  password,
  passwordConfirmation,
}) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp_code", otpCode);
  formData.append("password", password);
  formData.append("password_confirmation", passwordConfirmation);

  return httpClient.post("auth/forgot-password/reset", formData, {
    showErrorToast: true,
  });
}

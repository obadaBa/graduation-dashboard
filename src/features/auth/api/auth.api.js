import httpClient from "../../../lib/api/httpClient";

export function loginRequest({ email, password }) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  return httpClient.post("auth/login", formData, {
    showErrorToast: true,
  });
}

export function logoutRequest() {
  return httpClient.get("logout", {
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

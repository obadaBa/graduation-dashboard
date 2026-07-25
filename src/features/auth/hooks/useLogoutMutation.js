import { useMutation } from "@tanstack/react-query";
import { removeAuthTokenSession } from "../../../lib/api/httpClient";
import { showErrorToast, showSuccessToast } from "../../../shared/lib/Toast/toastService";
import { logoutRequest } from "../api/auth.api";

const AUTH_STORAGE_KEYS = ["authUser"];

function clearAuthSession() {
  removeAuthTokenSession();
  AUTH_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function useLogoutMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: (response) => {
      if (response?.success !== true) {
        showErrorToast(response?.message || "تعذر تسجيل الخروج");
        return;
      }

      clearAuthSession();
      showSuccessToast(
        response?.message || "تم تسجيل الخروج بنجاح",
        response?.title || "تمت العملية بنجاح",
      );
      onSuccess?.(response);
    },
  });
}

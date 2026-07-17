import { useMutation } from "@tanstack/react-query";
import { saveAuthTokenSession } from "../../../lib/api/httpClient";
import { showSuccessToast } from "../../../shared/lib/Tost/toastService";
import { loginRequest } from "../api/auth.api";

function persistAuthSession(response) {
  const token = response?.data?.token;
  const expiresIn = response?.data?.expires_in;
  const user = response?.data?.user;

  if (token) {
    saveAuthTokenSession({ token, expiresIn });
  }

  if (user) {
    localStorage.setItem("authUser", JSON.stringify(user));
  }
}

export function useLoginMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      persistAuthSession(response);
      showSuccessToast(response?.title || "تم تسجيل الدخول بنجاح");
      onSuccess?.(response);
    },
  });
}

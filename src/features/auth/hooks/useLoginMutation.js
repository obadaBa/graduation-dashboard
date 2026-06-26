import { useMutation } from "@tanstack/react-query";
import { showSuccessToast } from "../../../shared/lib/Tost/toastService";
import { loginRequest } from "../api/auth.api";

function persistAuthSession(response) {
  const token = response?.data?.token;
  const expiresIn = response?.data?.expires_in;
  const user = response?.data?.user;

  if (token) {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("token", token);
  }

  if (expiresIn) {
    localStorage.setItem("tokenExpiresIn", String(expiresIn));
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

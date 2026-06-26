import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../shared/lib/Tost/toastService";
import { resetPasswordRequest } from "../api/auth.api";

export function useResetPasswordMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: (response, variables) => {
      if (response?.success !== true) {
        showErrorToast(response?.message || "تعذر إعادة تعيين كلمة المرور");
        return;
      }

      showSuccessToast(
        response?.message || "تمت إعادة تعيين كلمة المرور بنجاح",
        response?.title || "تمت العملية بنجاح",
      );
      onSuccess?.(response, variables);
    },
  });
}

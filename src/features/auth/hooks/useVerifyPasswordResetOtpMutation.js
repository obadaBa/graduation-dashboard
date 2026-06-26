import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../shared/lib/Tost/toastService";
import { verifyPasswordResetOtp } from "../api/auth.api";

export function useVerifyPasswordResetOtpMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: verifyPasswordResetOtp,
    onSuccess: (response, variables) => {
      if (response?.success !== true) {
        showErrorToast(response?.message || "رمز التحقق غير صحيح");
        return;
      }

      showSuccessToast(
        response?.message || "تم التحقق من رمز إعادة تعيين كلمة المرور بنجاح",
        response?.title || "تم التحقق بنجاح",
      );
      onSuccess?.(response, variables);
    },
  });
}

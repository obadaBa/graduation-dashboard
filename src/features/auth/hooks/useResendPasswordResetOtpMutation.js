import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../shared/lib/Toast/toastService";
import { resendPasswordResetOtp } from "../api/auth.api";

export function useResendPasswordResetOtpMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: resendPasswordResetOtp,
    onSuccess: (response, variables) => {
      if (response?.success !== true) {
        showErrorToast(response?.message || "تعذر إعادة إرسال رمز التحقق");
        return;
      }

      showSuccessToast(
        response?.message || "تمت إعادة إرسال رمز التحقق بنجاح",
        response?.title || "تمت العملية بنجاح",
      );
      onSuccess?.(response, variables);
    },
  });
}

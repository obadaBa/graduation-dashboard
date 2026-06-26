import { useMutation } from "@tanstack/react-query";
import { showSuccessToast } from "../../../shared/lib/Tost/toastService";
import { requestPasswordResetOtp } from "../api/auth.api";

export function useRequestPasswordResetOtpMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: requestPasswordResetOtp,
    onSuccess: (response, variables) => {
      showSuccessToast(
        response?.message || "تم إرسال رمز التحقق بنجاح",
        response?.title || "تمت العملية بنجاح",
      );
      onSuccess?.(response, variables);
    },
  });
}

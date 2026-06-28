import { useMutation } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { updateSupervisorPassword } from "../api/profile.api";

export function useUpdateSupervisorPasswordMutation({ onSuccess } = {}) {
  return useMutation({
    mutationFn: updateSupervisorPassword,
    onSuccess: (response) => {
      showSuccessToast(
        response?.message || "تم حفظ كلمة المرور الجديدة بنجاح",
        response?.title || "تم تعديل كلمة المرور بنجاح",
      );
      onSuccess?.(response);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { addSupervisor } from "../Api/users.api";

export function useAddSupervisorMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSupervisor,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });
      showSuccessToast(
        response?.message || "تم إنشاء حساب المشرف بنجاح",
        response?.title || "تمت إضافة المشرف بنجاح",
      );
      onSuccess?.(response);
    },
  });
}

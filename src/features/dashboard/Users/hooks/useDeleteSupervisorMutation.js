import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { deleteSupervisor } from "../Api/users.api";

export function useDeleteSupervisorMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupervisor,
    onSuccess: (response, supervisorId) => {
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });
      queryClient.removeQueries({
        queryKey: ["supervisors", "profile", supervisorId],
        exact: true,
      });

      showSuccessToast(
        response?.message || "تم حذف حساب المشرف من النظام",
        response?.title || "تم حذف المشرف بنجاح",
      );

      onSuccess?.(response);
    },
  });
}

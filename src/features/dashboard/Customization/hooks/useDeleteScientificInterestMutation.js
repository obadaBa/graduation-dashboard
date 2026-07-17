import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { deleteScientificInterest } from "../api/customization.api";

export function useDeleteScientificInterestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScientificInterest,
    onSuccess: async (response) => {
      showSuccessToast(
        response?.message || "تم حذف التصنيف العلمي من النظام",
        response?.title || "تم حذف التصنيف العلمي بنجاح",
      );

      await queryClient.invalidateQueries({
        queryKey: ["customization", "scientific-interests"],
      });
    },
  });
}

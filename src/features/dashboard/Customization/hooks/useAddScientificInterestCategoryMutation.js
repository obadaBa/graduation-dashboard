import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { addScientificInterestCategory } from "../api/customization.api";

export function useAddScientificInterestCategoryMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addScientificInterestCategory,
    onSuccess: async (response, variables) => {
      showSuccessToast(
        response?.message || "تم حفظ عنوان التصنيف داخل النظام",
        response?.title || "تم إضافة عنوان التصنيف بنجاح",
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["customization", "scientific-interest-categories"],
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["customization", "scientific-interests"],
          refetchType: "all",
        }),
      ]);

      onSuccess?.(response, variables);
    },
  });
}

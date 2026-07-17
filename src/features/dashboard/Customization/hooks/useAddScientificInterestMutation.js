import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { addScientificInterest } from "../api/customization.api";

export function useAddScientificInterestMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addScientificInterest,
    onSuccess: async (response, variables) => {
      showSuccessToast(
        response?.message || "تم حفظ التصنيف العلمي داخل النظام",
        response?.title || "تم إضافة التصنيف العلمي بنجاح",
      );

      await queryClient.invalidateQueries({
        queryKey: ["customization", "scientific-interests"],
      });

      onSuccess?.(response, variables);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { deleteScientificInterestCategory } from "../api/customization.api";

export function useDeleteScientificInterestCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScientificInterestCategory,
    onSuccess: async (response, categoryId) => {
      queryClient.setQueryData(
        ["customization", "scientific-interest-categories"],
        (cachedResponse) => {
          if (!cachedResponse?.data) return cachedResponse;

          return {
            ...cachedResponse,
            data: cachedResponse.data.filter(
              (item) => String(item.id) !== String(categoryId),
            ),
          };
        },
      );

      showSuccessToast(
        response?.message || "تم حذف عنوان التصنيف العلمي من النظام",
        response?.title || "تم حذف عنوان التصنيف العلمي بنجاح",
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
    },
  });
}

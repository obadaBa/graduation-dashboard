import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { updateScientificInterestCategory } from "../api/customization.api";

function patchCategoryTitleCache(cachedResponse, variables) {
  if (!cachedResponse?.data) return cachedResponse;

  return {
    ...cachedResponse,
    data: cachedResponse.data.map((item) =>
      String(item.id) === String(variables.categoryId)
        ? { ...item, title: variables.title }
        : item,
    ),
  };
}

export function useUpdateScientificInterestCategoryMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateScientificInterestCategory,
    onSuccess: async (response, variables) => {
      queryClient.setQueryData(
        ["customization", "scientific-interest-categories"],
        (cachedResponse) => patchCategoryTitleCache(cachedResponse, variables),
      );

      queryClient.setQueryData(
        ["customization", "scientific-interests"],
        (cachedResponse) => {
          if (!cachedResponse?.data) return cachedResponse;

          return {
            ...cachedResponse,
            data: cachedResponse.data.map((section) =>
              String(section.id) === String(variables.categoryId)
                ? { ...section, title: variables.title }
                : section,
            ),
          };
        },
      );

      showSuccessToast(
        response?.message || "تم حفظ التعديلات بنجاح",
        response?.title || "تم تعديل عنوان التصنيف العلمي بنجاح",
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

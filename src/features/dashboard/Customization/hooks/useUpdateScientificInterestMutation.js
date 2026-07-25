import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { updateScientificInterest } from "../api/customization.api";

function patchScientificInterestCache(cachedResponse, variables) {
  if (!cachedResponse?.data) return cachedResponse;

  const existingInterest = cachedResponse.data
    .flatMap((section) => section.interests || [])
    .find((interest) => String(interest.id) === String(variables.interestId));

  return {
    ...cachedResponse,
    data: cachedResponse.data.map((section) => {
      const isTargetSection =
        String(section.id) === String(variables.interestCategoryId);
      const interestsWithoutUpdatedItem = (section.interests || []).filter(
        (interest) => String(interest.id) !== String(variables.interestId),
      );

      if (!isTargetSection) {
        return {
          ...section,
          interests: interestsWithoutUpdatedItem,
        };
      }

      return {
        ...section,
        interests: [
          ...interestsWithoutUpdatedItem,
          {
            ...(existingInterest || {}),
            id: variables.interestId,
            name: variables.name,
            color: variables.color,
            interest_category_id: variables.interestCategoryId,
          },
        ],
      };
    }),
  };
}

export function useUpdateScientificInterestMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateScientificInterest,
    onSuccess: async (response, variables) => {
      queryClient.setQueryData(
        ["customization", "scientific-interests"],
        (cachedResponse) => patchScientificInterestCache(cachedResponse, variables),
      );

      showSuccessToast(
        response?.message || "تم حفظ التعديلات بنجاح",
        response?.title || "تم تعديل التصنيف العلمي بنجاح",
      );

      await queryClient.invalidateQueries({
        queryKey: ["customization", "scientific-interests"],
        refetchType: "all",
      });

      onSuccess?.(response, variables);
    },
  });
}

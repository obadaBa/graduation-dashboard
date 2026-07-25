import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { deleteTestReview } from "../Api/tests.api";

export function useDeleteTestReviewMutation(testId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestReview,
    onSuccess: async (response) => {
      showSuccessToast(response?.message, response?.title);

      await queryClient.invalidateQueries({
        queryKey: ["tests", "reviews", testId],
      });
    },
  });
}

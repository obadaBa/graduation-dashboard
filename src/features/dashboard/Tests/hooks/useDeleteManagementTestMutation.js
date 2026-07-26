import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { deleteManagementTest } from "../Api/tests.api";
import { updateTestDeletionInBoard } from "../utils/managementBoardCache";

export function useDeleteManagementTestMutation(testId, options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManagementTest,
    retry: false,
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["tests", "management-details", testId],
        }),
        queryClient.cancelQueries({
          queryKey: ["tests", "status-history", testId],
        }),
        queryClient.cancelQueries({
          queryKey: ["tests", "reviews", testId],
        }),
        queryClient.cancelQueries({
          queryKey: ["tests", "reports", testId],
        }),
      ]);
    },
    onSuccess: async (response) => {
      const deletedTestId = response?.data?.id ?? testId;
      const deletionType = response?.data?.deletion_type;

      queryClient.setQueriesData(
        {
          queryKey: ["tests", "management-board"],
        },
        (boardResponse) =>
          updateTestDeletionInBoard(
            boardResponse,
            deletedTestId,
            deletionType === "force_delete" ? "force_delete" : null,
          ),
      );

      options.onDeleted?.(response);

      showSuccessToast(
        "تم تحديث حالة الاختبار وحذفه بنجاح",
        response?.title || "تم حذف الاختبار بنجاح",
      );

      queryClient.removeQueries({
        queryKey: ["tests", "management-details", testId],
      });
      queryClient.removeQueries({
        queryKey: ["tests", "status-history", testId],
      });
      queryClient.removeQueries({
        queryKey: ["tests", "reviews", testId],
      });
      queryClient.removeQueries({
        queryKey: ["tests", "reports", testId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["tests", "management-board"],
        refetchType: "all",
      });
    },
  });
}

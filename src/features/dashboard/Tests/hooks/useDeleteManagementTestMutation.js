import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { deleteManagementTest } from "../Api/tests.api";
import { updateTestDeletionInBoard } from "../utils/managementBoardCache";

export function useDeleteManagementTestMutation(testId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManagementTest,
    retry: false,
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

      showSuccessToast(
        "تم تحديث حالة الاختبار وحذفه بنجاح",
        response?.title || "تم حذف الاختبار بنجاح",
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["tests", "management-details", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "status-history", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "reviews", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "reports", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "management-board"],
          refetchType: "all",
        }),
      ]);
    },
  });
}

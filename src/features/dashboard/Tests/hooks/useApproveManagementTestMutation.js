import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { approveManagementTest } from "../Api/tests.api";
import { moveTestInManagementBoard } from "../utils/managementBoardCache";

export function useApproveManagementTestMutation(testId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveManagementTest,
    retry: false,
    onSuccess: async (response) => {
      const approvedTestId = response?.data?.id ?? testId;

      queryClient.setQueriesData(
        {
          queryKey: ["tests", "management-board"],
        },
        (boardResponse) =>
          moveTestInManagementBoard(
            boardResponse,
            approvedTestId,
            "approved",
          ),
      );

      showSuccessToast(
        "تم تحديث حالة الاختبار ونشره بنجاح",
        response?.title || "تمت الموافقة على نشر الاختبار بنجاح",
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["tests", "management-details", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "status-history", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "management-board"],
          refetchType: "inactive",
        }),
      ]);
    },
  });
}

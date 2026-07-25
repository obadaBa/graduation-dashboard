import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { requestManagementTestRevisions } from "../Api/tests.api";
import { moveTestInManagementBoard } from "../utils/managementBoardCache";

export function useRequestManagementTestRevisionsMutation(testId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestManagementTestRevisions,
    retry: false,
    onSuccess: async (response) => {
      queryClient.setQueriesData(
        { queryKey: ["tests", "management-board"] },
        (boardResponse) =>
          moveTestInManagementBoard(
            boardResponse,
            response?.data?.id ?? testId,
            "needs_revision",
          ),
      );

      showSuccessToast(
        "تم إرسال قائمة التعديلات المطلوبة للاختبار",
        response?.title || "تم إرسال طلب التعديلات بنجاح",
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

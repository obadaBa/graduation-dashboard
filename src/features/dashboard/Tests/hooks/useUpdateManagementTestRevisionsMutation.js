import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { updateManagementTestRevisions } from "../Api/tests.api";

export function useUpdateManagementTestRevisionsMutation(testId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateManagementTestRevisions,
    retry: false,
    onSuccess: async (response) => {
      showSuccessToast(
        response?.message || "تم حفظ قائمة التعديلات المطلوبة من المستخدم بنجاح",
        response?.title || "تم تعديل طلبات التعديل بنجاح",
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["tests", "status-history", testId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tests", "management-details", testId],
        }),
      ]);
    },
  });
}

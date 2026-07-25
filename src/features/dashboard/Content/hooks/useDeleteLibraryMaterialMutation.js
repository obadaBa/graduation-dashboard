import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { deleteLibraryMaterial } from "../Api/content.api";

export function useDeleteLibraryMaterialMutation(contentId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLibraryMaterial,
    retry: false,
    onSuccess: async (response) => {
      showSuccessToast(
        response?.message || "تم حذف المحتوى بنجاح",
        response?.title || "تمت العملية بنجاح !",
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["content", "library-material-details", contentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["content", "status-history", contentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["content", "reports", contentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["content", "library-materials"],
        }),
      ]);
    },
  });
}

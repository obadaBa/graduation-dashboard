import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { approveLibraryMaterial } from "../Api/content.api";

export function useApproveLibraryMaterialMutation(contentId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveLibraryMaterial,
    retry: false,
    onSuccess: async (response) => {
      showSuccessToast(
        response?.message || "تمت الموافقة على نشر المحتوى بنجاح",
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
          queryKey: ["content", "library-materials"],
        }),
      ]);
    },
  });
}

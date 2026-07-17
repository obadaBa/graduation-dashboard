import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { deleteSupervisorPhoto } from "../api/profile.api";

function updateStoredUserPhoto(photo) {
  try {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (!storedUser) return;

    localStorage.setItem(
      "authUser",
      JSON.stringify({
        ...storedUser,
        photo,
      }),
    );
    window.dispatchEvent(new Event("authUserUpdated"));
  } catch {
    // Keep the successful API update even if legacy storage is malformed.
  }
}

export function useDeleteSupervisorPhotoMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupervisorPhoto,
    onSuccess: (response, variables) => {
      const defaultPhoto = response?.data?.default_photo_url || "";

      queryClient.invalidateQueries({
        queryKey: ["supervisors", "profile", variables.supervisorId],
      });
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });

      if (defaultPhoto) {
        updateStoredUserPhoto(defaultPhoto);
      }

      showSuccessToast(
        response?.message || "تم حذف الصورة بنجاح",
        response?.title || "تم حذف الصورة بنجاح",
      );

      onSuccess?.(response, variables);
    },
  });
}

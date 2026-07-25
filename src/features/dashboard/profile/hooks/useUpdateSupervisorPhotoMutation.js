import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { updateSupervisorPhoto } from "../api/profile.api";

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

export function useUpdateSupervisorPhotoMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSupervisorPhoto,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["supervisors", "profile", variables.supervisorId],
      });
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });

      if (variables.previewUrl) {
        updateStoredUserPhoto(variables.previewUrl);
      }

      showSuccessToast(
        response?.message || "تم تحديث الصورة بنجاح",
        response?.title || "تمت العملية بنجاح",
      );

      onSuccess?.(response, variables);
    },
  });
}

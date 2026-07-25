import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Toast/toastService";
import { updateSupervisorProfile } from "../api/profile.api";

function updateStoredUser(name) {
  try {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (!storedUser) return;

    localStorage.setItem(
      "authUser",
      JSON.stringify({
        ...storedUser,
        name,
      }),
    );
    window.dispatchEvent(new Event("authUserUpdated"));
  } catch {
    // Ignore malformed legacy storage and keep the successful API update.
  }
}

export function useUpdateSupervisorProfileMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSupervisorProfile,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["supervisors", "profile", variables.supervisorId],
      });
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });
      updateStoredUser(variables.name);

      showSuccessToast(
        response?.message || "تم حفظ التعديلات بنجاح",
        response?.title || "تم تعديل الملف الشخصي بنجاح",
      );

      onSuccess?.(response);
    },
  });
}

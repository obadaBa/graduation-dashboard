import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService.jsx";
import { liftBanUser } from "../Api/users.api";

export function useLiftBanUserMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: liftBanUser,
    onSuccess: (response, userId) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", "blocked-list"] });
      queryClient.invalidateQueries({ queryKey: ["users", "ban-history", userId] });

      showSuccessToast(
        response?.message || "تم رفع الحظر عن المستخدم بنجاح",
        response?.title || "تمت العملية بنجاح !",
      );

      onSuccess?.(response, userId);
    },
  });
}

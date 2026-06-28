import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../../../shared/lib/Tost/toastService";
import { banUser } from "../Api/users.api";

export function useBanUserMutation({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: banUser,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", "blocked-list"] });

      showSuccessToast(
        response?.message || "تم تطبيق الحظر على حساب المستخدم",
        response?.title || "تم حظر المستخدم بنجاح",
      );

      onSuccess?.(response, variables);
    },
  });
}

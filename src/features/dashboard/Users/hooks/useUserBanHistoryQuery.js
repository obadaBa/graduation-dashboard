import { useQuery } from "@tanstack/react-query";
import { getUserBanHistory } from "../Api/users.api";

export function useUserBanHistoryQuery(userId, enabled = true) {
  return useQuery({
    queryKey: ["users", "ban-history", userId],
    queryFn: () => getUserBanHistory(userId),
    enabled: Boolean(userId) && enabled,
    retry: false,
  });
}

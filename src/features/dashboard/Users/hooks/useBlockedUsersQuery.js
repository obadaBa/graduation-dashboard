import { useQuery } from "@tanstack/react-query";
import { getBlockedUsers } from "../Api/users.api";

export function useBlockedUsersQuery({ tab = "all", enabled = true }) {
  return useQuery({
    queryKey: ["users", "blocked-list", tab],
    queryFn: () => getBlockedUsers(tab),
    enabled,
    retry: false,
  });
}

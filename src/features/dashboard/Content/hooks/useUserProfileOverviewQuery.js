import { useQuery } from "@tanstack/react-query";
import { getUserProfileOverview } from "../Api/content.api";

export function useUserProfileOverviewQuery(userId) {
  return useQuery({
    queryKey: ["users", "profile", userId, "overview"],
    queryFn: () => getUserProfileOverview(userId),
    enabled: Boolean(userId),
    retry: false,
  });
}

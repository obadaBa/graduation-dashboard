import { useQuery } from "@tanstack/react-query";
import { getUserProfileTests } from "../Api/content.api";

export function useUserProfileTestsQuery(userId) {
  return useQuery({
    queryKey: ["users", "profile", userId, "tests"],
    queryFn: () => getUserProfileTests(userId),
    enabled: Boolean(userId),
    retry: false,
  });
}

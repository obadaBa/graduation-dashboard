import { useQuery } from "@tanstack/react-query";
import { getUserProfileFolders } from "../Api/content.api";

export function useUserProfileFoldersQuery(userId) {
  return useQuery({
    queryKey: ["users", "profile", userId, "folders"],
    queryFn: () => getUserProfileFolders(userId),
    enabled: Boolean(userId),
    retry: false,
  });
}

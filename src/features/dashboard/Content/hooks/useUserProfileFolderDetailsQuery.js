import { useQuery } from "@tanstack/react-query";
import { getUserProfileFolderDetails } from "../Api/content.api";

export function useUserProfileFolderDetailsQuery(folderId, enabled = true) {
  return useQuery({
    queryKey: ["users", "profile", "folder", folderId],
    queryFn: () => getUserProfileFolderDetails(folderId),
    enabled: Boolean(folderId) && enabled,
    retry: false,
  });
}

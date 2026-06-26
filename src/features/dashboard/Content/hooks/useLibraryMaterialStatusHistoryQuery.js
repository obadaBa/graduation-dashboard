import { useQuery } from "@tanstack/react-query";
import { getLibraryMaterialStatusHistory } from "../Api/content.api";

export function useLibraryMaterialStatusHistoryQuery(contentId) {
  return useQuery({
    queryKey: ["content", "status-history", contentId],
    queryFn: () => getLibraryMaterialStatusHistory(contentId),
    enabled: Boolean(contentId),
  });
}

import { useQuery } from "@tanstack/react-query";
import { getLibraryMaterialDetails } from "../Api/content.api";

export function useLibraryMaterialDetailsQuery(contentId) {
  return useQuery({
    queryKey: ["content", "library-material-details", contentId],
    queryFn: () => getLibraryMaterialDetails(contentId),
    enabled: Boolean(contentId),
  });
}

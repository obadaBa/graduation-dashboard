import { useQuery } from "@tanstack/react-query";
import { getUserProfileMaterials } from "../Api/content.api";

export function useUserProfileMaterialsQuery(userId) {
  return useQuery({
    queryKey: ["users", "profile", userId, "materials"],
    queryFn: () => getUserProfileMaterials(userId),
    enabled: Boolean(userId),
    retry: false,
  });
}

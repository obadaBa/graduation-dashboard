import { useQuery } from "@tanstack/react-query";
import { getScientificInterests } from "../api/customization.api";

export function useScientificInterestsQuery({ enabled = true } = {}) {
  return useQuery({
    queryKey: ["customization", "scientific-interests"],
    queryFn: getScientificInterests,
    enabled,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

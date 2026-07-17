import { useQuery } from "@tanstack/react-query";
import { getScientificInterestCategories } from "../api/customization.api";

export function useScientificInterestCategoriesQuery({ enabled = true } = {}) {
  return useQuery({
    queryKey: ["customization", "scientific-interest-categories"],
    queryFn: getScientificInterestCategories,
    enabled,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

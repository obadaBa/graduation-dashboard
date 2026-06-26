import { useQuery } from "@tanstack/react-query";
import { getHomeFinancialStats } from "../Api/home.api";

export function useHomeFinancialStatsQuery(year) {
  return useQuery({
    queryKey: ["home", "financial-stats", year],
    queryFn: () => getHomeFinancialStats(year),
    enabled: Boolean(year),
  });
}

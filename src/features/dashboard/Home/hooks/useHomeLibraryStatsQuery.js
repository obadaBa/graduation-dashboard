import { useQuery } from "@tanstack/react-query";
import { getHomeLibraryStats } from "../Api/home.api";

export function useHomeLibraryStatsQuery(year) {
  return useQuery({
    queryKey: ["home", "library-stats", year],
    queryFn: () => getHomeLibraryStats(year),
    enabled: Boolean(year),
  });
}

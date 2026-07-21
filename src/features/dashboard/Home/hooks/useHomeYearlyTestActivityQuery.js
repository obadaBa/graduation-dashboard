import { useQuery } from "@tanstack/react-query";
import { getHomeYearlyTestActivity } from "../Api/home.api";

export function useHomeYearlyTestActivityQuery(year) {
  return useQuery({
    queryKey: ["home", "yearly-test-activity", year],
    queryFn: () => getHomeYearlyTestActivity(year),
  });
}

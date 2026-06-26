import { useQuery } from "@tanstack/react-query";
import { getHomeYearlyTestActivity } from "../Api/home.api";

export function useHomeYearlyTestActivityQuery() {
  return useQuery({
    queryKey: ["home", "yearly-test-activity"],
    queryFn: getHomeYearlyTestActivity,
  });
}

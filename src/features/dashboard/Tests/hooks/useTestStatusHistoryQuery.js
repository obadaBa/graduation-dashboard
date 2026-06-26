import { useQuery } from "@tanstack/react-query";
import { getTestStatusHistory } from "../Api/tests.api";

export function useTestStatusHistoryQuery(testId) {
  return useQuery({
    queryKey: ["tests", "status-history", testId],
    queryFn: () => getTestStatusHistory(testId),
    enabled: Boolean(testId),
  });
}

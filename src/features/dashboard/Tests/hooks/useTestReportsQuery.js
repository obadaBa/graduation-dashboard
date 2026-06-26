import { useInfiniteQuery } from "@tanstack/react-query";
import { getTestReports } from "../Api/tests.api";

export function useTestReportsQuery(testId, params = {}) {
  return useInfiniteQuery({
    queryKey: ["tests", "reports", testId, params],
    queryFn: ({ pageParam }) =>
      getTestReports(testId, {
        ...params,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.reports?.meta?.next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.data?.reports?.meta?.previous_cursor || undefined,
    enabled: Boolean(testId),
  });
}

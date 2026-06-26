import { useInfiniteQuery } from "@tanstack/react-query";
import { getTestReviews } from "../Api/tests.api";

export function useTestReviewsQuery(testId, params = {}) {
  return useInfiniteQuery({
    queryKey: ["tests", "reviews", testId, params],
    queryFn: ({ pageParam }) =>
      getTestReviews(testId, {
        ...params,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.comments?.meta?.next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.data?.comments?.meta?.previous_cursor || undefined,
    enabled: Boolean(testId),
  });
}

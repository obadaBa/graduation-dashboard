import { useInfiniteQuery } from "@tanstack/react-query";
import { getLibraryMaterialReports } from "../Api/content.api";

export function useLibraryMaterialReportsQuery(contentId, params = {}) {
  return useInfiniteQuery({
    queryKey: ["content", "reports", contentId, params],
    queryFn: ({ pageParam }) =>
      getLibraryMaterialReports(contentId, {
        ...params,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.meta?.next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.data?.meta?.previous_cursor || undefined,
    enabled: Boolean(contentId),
  });
}

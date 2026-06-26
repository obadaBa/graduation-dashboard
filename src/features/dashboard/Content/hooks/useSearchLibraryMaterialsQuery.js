import { useInfiniteQuery } from "@tanstack/react-query";
import { searchLibraryMaterials } from "../Api/content.api";

export function useSearchLibraryMaterialsQuery(query) {
  const normalizedQuery = query.trim();

  return useInfiniteQuery({
    queryKey: ["content", "library-search", normalizedQuery],
    queryFn: ({ pageParam }) =>
      searchLibraryMaterials({
        query: normalizedQuery,
        per_page: 20,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.meta?.next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.data?.meta?.previous_cursor || undefined,
    enabled: Boolean(normalizedQuery),
  });
}

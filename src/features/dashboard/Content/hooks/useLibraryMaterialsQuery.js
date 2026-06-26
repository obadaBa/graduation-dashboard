import { useInfiniteQuery } from "@tanstack/react-query";
import { getLibraryMaterials } from "../Api/content.api";

export function useLibraryMaterialsQuery(sortBy = "latest") {
  return useInfiniteQuery({
    queryKey: ["content", "library-materials", sortBy],
    queryFn: ({ pageParam }) =>
      getLibraryMaterials({
        sort_by: sortBy,
        per_page: 20,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.meta?.next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.data?.meta?.previous_cursor || undefined,
  });
}

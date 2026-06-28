import { useInfiniteQuery } from "@tanstack/react-query";
import { followers } from "../Api/content.api";

function getConnectionsMeta(page) {
  return page?.meta || page?.data?.meta || {};
}

export function useFollowersQuery({
  userId,
  search = "",
  enabled = true,
}) {
  return useInfiniteQuery({
    queryKey: ["users", "profile", userId, "followers", search],
    queryFn: ({ pageParam }) =>
      followers({
        userId,
        params: {
          search: search || undefined,
          per_page: 20,
          cursor: pageParam || undefined,
        },
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      getConnectionsMeta(lastPage).next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      getConnectionsMeta(firstPage).prev_cursor ||
      getConnectionsMeta(firstPage).previous_cursor ||
      undefined,
    enabled: Boolean(userId) && enabled,
    retry: false,
  });
}

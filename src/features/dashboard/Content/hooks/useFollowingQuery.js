import { useInfiniteQuery } from "@tanstack/react-query";
import { following } from "../Api/content.api";

function getFollowingMeta(page) {
  return page?.meta || page?.data?.meta || {};
}

export function useFollowingQuery({
  userId,
  search = "",
  enabled = true,
}) {
  return useInfiniteQuery({
    queryKey: ["users", "profile", userId, "following", search],
    queryFn: ({ pageParam }) =>
      following({
        userId,
        params: {
          search: search || undefined,
          per_page: 20,
          cursor: pageParam || undefined,
        },
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      getFollowingMeta(lastPage).next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      getFollowingMeta(firstPage).prev_cursor ||
      getFollowingMeta(firstPage).previous_cursor ||
      undefined,
    enabled: Boolean(userId) && enabled,
    retry: false,
  });
}

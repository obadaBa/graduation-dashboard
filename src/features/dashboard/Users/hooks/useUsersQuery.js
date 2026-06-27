import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "../Api/users.api";

function getUsersMeta(page) {
  return page?.meta || page?.data?.users?.meta || page?.data?.meta || {};
}

export function useUsersQuery({
  type = "mobile_users",
  sortBy = "created_at",
}) {
  return useInfiniteQuery({
    queryKey: ["users", "list", type, sortBy],
    queryFn: ({ pageParam }) =>
      getUsers({
        type,
        sort_by: sortBy,
        per_page: 20,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      getUsersMeta(lastPage).next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      getUsersMeta(firstPage).prev_cursor ||
      getUsersMeta(firstPage).previous_cursor ||
      undefined,
    retry: false,
  });
}

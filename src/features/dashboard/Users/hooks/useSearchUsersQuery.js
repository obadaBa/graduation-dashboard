import { useInfiniteQuery } from "@tanstack/react-query";
import { searchUsers } from "../Api/users.api";

export function useSearchUsersQuery({
  role = "mobile_users",
  search = "",
}) {
  const normalizedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: ["users", "search", role, normalizedSearch],
    queryFn: ({ pageParam }) =>
      searchUsers({
        role,
        search: normalizedSearch,
        per_page: 20,
        cursor: pageParam || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.meta?.next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.meta?.prev_cursor ||
      firstPage?.meta?.previous_cursor ||
      undefined,
    enabled: Boolean(normalizedSearch),
    retry: false,
  });
}

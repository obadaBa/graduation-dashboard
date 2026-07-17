import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notifications.api";

function getNotificationsMeta(page) {
  return page?.meta || page?.data?.notifications?.meta || page?.data?.meta || {};
}

export function useNotificationsQuery({ enabled = true } = {}) {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      getNotifications({
        per_page: 20,
        cursor: pageParam || undefined,
      }),
    enabled,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      getNotificationsMeta(lastPage).next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      getNotificationsMeta(firstPage).prev_cursor ||
      getNotificationsMeta(firstPage).previous_cursor ||
      undefined,
    retry: false,
  });
}

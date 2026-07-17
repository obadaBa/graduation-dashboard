import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsCount } from "../api/notifications.api";

export function useUnreadNotificationsCountQuery() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadNotificationsCount,
    retry: false,
    refetchOnWindowFocus: true,
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationsAsRead } from "../api/notifications.api";

function markPageNotificationsAsRead(page, notificationIdsSet) {
  const notifications = page?.data?.notifications;

  if (!Array.isArray(notifications)) {
    return page;
  }

  return {
    ...page,
    data: {
      ...page.data,
      notifications: notifications.map((notification) =>
        notificationIdsSet.has(notification.id)
          ? { ...notification, is_read: true }
          : notification,
      ),
    },
  };
}

function updateUnreadCountAfterRead(currentData, readCount) {
  if (!currentData?.data) {
    return currentData;
  }

  const currentUnreadCount = Number(currentData.data.unread_count) || 0;
  const nextUnreadCount = Math.max(0, currentUnreadCount - readCount);

  return {
    ...currentData,
    data: {
      ...currentData.data,
      unread_count: nextUnreadCount,
      has_unread: nextUnreadCount > 0,
    },
  };
}

export function useMarkNotificationsAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: (_response, notificationIds) => {
      const notificationIdsSet = new Set(notificationIds);

      queryClient.setQueryData(["notifications"], (currentData) => {
        if (!currentData?.pages) {
          return currentData;
        }

        return {
          ...currentData,
          pages: currentData.pages.map((page) =>
            markPageNotificationsAsRead(page, notificationIdsSet),
          ),
        };
      });
      queryClient.setQueryData(["notifications", "unread-count"], (currentData) =>
        updateUnreadCountAfterRead(currentData, notificationIdsSet.size),
      );
    },
  });
}

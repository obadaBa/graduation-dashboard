import httpClient from "../../../lib/api/httpClient";

export function getNotifications(params = {}) {
  return httpClient.get("notification/show", {
    params,
    showErrorToast: true,
  });
}

export function getUnreadNotificationsCount() {
  return httpClient.get("notification/notifications/unread-count", {
    showErrorToast: false,
  });
}

export function markNotificationsAsRead(notificationIds = []) {
  const formData = new FormData();

  formData.append("mark_all", "0");
  notificationIds.forEach((notificationId, index) => {
    formData.append(`notification_ids[${index}]`, notificationId);
  });

  return httpClient.post("notification/notifications/read", formData, {
    showErrorToast: false,
  });
}

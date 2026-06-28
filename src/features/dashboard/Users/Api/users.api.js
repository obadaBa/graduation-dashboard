import httpClient from "../../../../lib/api/httpClient";

export function getUsers(params = {}) {
  return httpClient.get("user-management/users", {
    params,
    showErrorToast: true,
  });
}

export function searchUsers(params = {}) {
  return httpClient.get("user-management/search", {
    params,
    showErrorToast: true,
  });
}

export function addSupervisor(supervisor) {
  const formData = new FormData();

  Object.entries(supervisor).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return httpClient.post("add/supervisors", formData, {
    showErrorToast: true,
  });
}

export function deleteSupervisor(supervisorId) {
  return httpClient.delete(`delete/supervisor/${supervisorId}`, {
    showErrorToast: true,
  });
}

export function getBlockedUsers(tab = "all") {
  return httpClient.get("user-management/list-bans", {
    params: { tab },
    showErrorToast: true,
  });
}

export function getUserBanHistory(userId) {
  return httpClient.get(`user-management/ban-history/${userId}`, {
    showErrorToast: true,
  });
}

function formatBanDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

export function banUser({
  userId,
  isPermanent,
  startsAt,
  endsAt,
  reason,
}) {
  const formData = new FormData();

  formData.append("is_permanent", isPermanent ? "1" : "0");
  formData.append("reason", reason.trim());

  if (!isPermanent) {
    formData.append("starts_at", formatBanDate(startsAt));
    formData.append("ends_at", formatBanDate(endsAt));
  }

  return httpClient.post(`user-management/ban-user/${userId}`, formData, {
    showErrorToast: true,
  });
}

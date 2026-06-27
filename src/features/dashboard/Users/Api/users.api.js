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

export function getBlockedUsers(tab = "all") {
  return httpClient.get("user-management/list-bans", {
    params: { tab },
    showErrorToast: true,
  });
}

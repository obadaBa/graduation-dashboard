import httpClient from "../../../../lib/api/httpClient";
import { getIdempotencyHeaders } from "../../../../shared/lib/idempotency";

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
  const { idempotencyKey, ...supervisorFields } = supervisor;
  const formData = new FormData();

  Object.entries(supervisorFields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return httpClient.post("add/supervisors", formData, {
    headers: getIdempotencyHeaders(idempotencyKey),
    showErrorToast: true,
  });
}

export function deleteSupervisor(supervisorId) {
  const normalizedSupervisorId =
    typeof supervisorId === "object" ? supervisorId.supervisorId : supervisorId;
  const idempotencyKey =
    typeof supervisorId === "object" ? supervisorId.idempotencyKey : undefined;

  return httpClient.delete(`delete/supervisor/${normalizedSupervisorId}`, {
    headers: getIdempotencyHeaders(idempotencyKey),
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
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("is_permanent", isPermanent ? "1" : "0");
  formData.append("reason", reason.trim());

  if (!isPermanent) {
    formData.append("starts_at", formatBanDate(startsAt));
    formData.append("ends_at", formatBanDate(endsAt));
  }

  return httpClient.post(`user-management/ban-user/${userId}`, formData, {
    headers: getIdempotencyHeaders(idempotencyKey),
    showErrorToast: true,
  });
}

export function liftBanUser(userId) {
  const normalizedUserId =
    typeof userId === "object" ? userId.userId : userId;
  const idempotencyKey =
    typeof userId === "object" ? userId.idempotencyKey : undefined;

  return httpClient.post(
    `user-management/lift-ban/${normalizedUserId}`,
    undefined,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

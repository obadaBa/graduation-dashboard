import httpClient from "../../../../lib/api/httpClient";
import { getIdempotencyHeaders } from "../../../../shared/lib/idempotency";

export function getSupervisorProfile(supervisorId) {
  return httpClient.get(
    `user-management/supervisor-profiles/${supervisorId}`,
    {
      showErrorToast: true,
    },
  );
}

export function updateSupervisorProfile({
  supervisorId,
  name,
  governorate,
  phone,
  gender,
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("name", name.trim());
  formData.append("governorate", governorate);
  formData.append("phone", phone.trim());
  formData.append("gender", gender);

  return httpClient.post(
    `user-management/update/profile-details/${supervisorId}`,
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function updateSupervisorPhoto({
  supervisorId,
  photo,
  type = "avatar",
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("photo", photo);

  return httpClient.post(
    `user-management/update/photo/${supervisorId}`,
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      params: { type },
      showErrorToast: true,
    },
  );
}

export function deleteSupervisorPhoto({
  supervisorId,
  type = "avatar",
  idempotencyKey,
}) {
  return httpClient.delete(
    `user-management/delete/photo/${supervisorId}`,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      params: { type },
      showErrorToast: true,
    },
  );
}

export function updateSupervisorPassword({
  oldPassword,
  newPassword,
  newPasswordConfirmation,
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("old_password", oldPassword);
  formData.append("new_password", newPassword);
  formData.append("new_password_confirmation", newPasswordConfirmation);

  return httpClient.post(
    "user-management/update/password",
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

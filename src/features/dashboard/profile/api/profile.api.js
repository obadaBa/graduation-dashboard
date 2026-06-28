import httpClient from "../../../../lib/api/httpClient";

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
      showErrorToast: true,
    },
  );
}

export function updateSupervisorPassword({
  oldPassword,
  newPassword,
  newPasswordConfirmation,
}) {
  const formData = new FormData();

  formData.append("old_password", oldPassword);
  formData.append("new_password", newPassword);
  formData.append("new_password_confirmation", newPasswordConfirmation);

  return httpClient.post(
    "user-management/update/password",
    formData,
    {
      showErrorToast: true,
    },
  );
}

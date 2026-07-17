import httpClient from "../../../../lib/api/httpClient";
import { getIdempotencyHeaders } from "../../../../shared/lib/idempotency";

export function getLibraryMaterials(params = {}) {
  return httpClient.get("library-management/library-materials", {
    params,
    showErrorToast: true,
  });
}

export function searchLibraryMaterials(params = {}) {
  return httpClient.get("library-management/search", {
    params,
    showErrorToast: true,
  });
}

export function getLibraryMaterialDetails(contentId) {
  return httpClient.get(
    `library-management/library-materials/details/${contentId}`,
    {
      showErrorToast: false,
    },
  );
}

export function getLibraryMaterialReports(contentId, params = {}) {
  return httpClient.get(`library-management/reports/${contentId}`, {
    params,
    showErrorToast: true,
  });
}

export function getLibraryMaterialStatusHistory(contentId) {
  return httpClient.get(`library-management/status-history/${contentId}`, {
    showErrorToast: true,
  });
}

export function approveLibraryMaterial({ contentId, idempotencyKey }) {
  return httpClient.post(
    `library-management/approve/${contentId}`,
    {},
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function deleteLibraryMaterial({ contentId, reason, idempotencyKey }) {
  const formData = new FormData();
  formData.append("delete_reason", reason);

  return httpClient.post(
    `library-management/delete/${contentId}`,
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function getUserProfileOverview(userId) {
  return httpClient.get(`user-management/user-details/overview/${userId}`, {
    showErrorToast: true,
  });
}

export function getUserProfileTests(userId) {
  return httpClient.get(`user-management/user-details/test/${userId}`, {
    showErrorToast: true,
  });
}

export function getUserProfileMaterials(userId) {
  return httpClient.get(`user-management/user-details/material/${userId}`, {
    showErrorToast: true,
  });
}

export function getUserProfileFolders(userId) {
  return httpClient.get(`user-management/user-details/folder/${userId}`, {
    showErrorToast: true,
  });
}

export function getUserProfileFolderDetails(folderId) {
  return httpClient.get(`user-management/folder-details/${folderId}`, {
    showErrorToast: true,
  });
}

export function followers({ userId, params = {} }) {
  return httpClient.get(`user-management/followers/${userId}`, {
    params,
    showErrorToast: true,
  });
}

export function following({ userId, params = {} }) {
  return httpClient.get(`user-management/following/${userId}`, {
    params,
    showErrorToast: true,
  });
}

export async function getUserAcademicCertificate(userId) {
  try {
    return await httpClient.get(
      `user-management/user-details/academic-certificate/${userId}`,
      {
        responseType: "blob",
        showErrorToast: false,
      },
    );
  } catch (error) {
    const errorBlob = error?.originalError?.response?.data;

    if (errorBlob instanceof Blob) {
      try {
        const errorData = JSON.parse(await errorBlob.text());
        const certificateError = new Error(
          errorData?.message || error.message,
        );
        certificateError.title = errorData?.title;
        certificateError.data = errorData;
        throw certificateError;
      } catch (parseError) {
        if (parseError?.data) throw parseError;
      }
    }

    throw error;
  }
}

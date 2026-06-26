import httpClient from "../../../../lib/api/httpClient";

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
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
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
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
      showErrorToast: true,
    },
  );
}

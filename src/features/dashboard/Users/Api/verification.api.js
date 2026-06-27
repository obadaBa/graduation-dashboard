import httpClient from "../../../../lib/api/httpClient";

export function getAcademicVerificationRequests(sortBy = "submitted_at") {
  return httpClient.get("academic-verification-requests/show", {
    params: {
      sort_by: sortBy,
    },
    showErrorToast: true,
  });
}

export async function getAcademicVerificationDocument({
  requestId,
  documentType,
}) {
  try {
    return await httpClient.get(
      `academic-verification-requests/assets/${requestId}`,
      {
        params: {
          document_type: documentType,
        },
        responseType: "blob",
        showErrorToast: false,
      },
    );
  } catch (error) {
    const errorBlob = error?.originalError?.response?.data;

    if (errorBlob instanceof Blob) {
      try {
        const errorData = JSON.parse(await errorBlob.text());
        const documentError = new Error(
          errorData?.message || error.message,
        );
        documentError.title = errorData?.title;
        documentError.data = errorData;
        documentError.status = errorData?.status_code || error?.status;
        throw documentError;
      } catch (parseError) {
        if (parseError?.data) throw parseError;
      }
    }

    throw error;
  }
}

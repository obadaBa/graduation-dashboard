import { useMutation } from "@tanstack/react-query";
import { showErrorToast } from "../../../../shared/lib/Toast/toastService";
import { getAcademicVerificationDocument } from "../Api/verification.api";

export const VERIFICATION_DOCUMENT_TYPES = [
  "شهادة جامعية",
  "هوية شخصية",
];

export function useAcademicVerificationDocumentsMutation() {
  return useMutation({
    mutationFn: async (requestId) => {
      const results = await Promise.allSettled(
        VERIFICATION_DOCUMENT_TYPES.map(async (documentType) => ({
          documentType,
          blob: await getAcademicVerificationDocument({
            requestId,
            documentType,
          }),
        })),
      );

      const documents = [];
      const errors = [];

      results.forEach((result, index) => {
        const documentType = VERIFICATION_DOCUMENT_TYPES[index];

        if (result.status === "fulfilled") {
          documents.push(result.value);
        } else {
          errors.push({
            documentType,
            error: result.reason,
          });
        }
      });

      if (documents.length === 0) {
        throw errors[0]?.error;
      }

      return { documents, errors };
    },
    onError: (error) => {
      showErrorToast(
        error?.message || "تعذر عرض وثائق التوثيق",
        error?.title || error?.data?.title || "تعذر عرض الوثيقة",
      );
    },
  });
}

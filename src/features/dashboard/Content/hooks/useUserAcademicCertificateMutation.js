import { useMutation } from "@tanstack/react-query";
import { showErrorToast } from "../../../../shared/lib/Toast/toastService";
import { getUserAcademicCertificate } from "../Api/content.api";

export function useUserAcademicCertificateMutation() {
  return useMutation({
    mutationFn: getUserAcademicCertificate,
    onError: (error) => {
      showErrorToast(
        error?.message || "تعذر عرض الشهادة الجامعية",
        error?.title || error?.data?.title || "تعذر عرض الشهادة",
      );
    },
  });
}

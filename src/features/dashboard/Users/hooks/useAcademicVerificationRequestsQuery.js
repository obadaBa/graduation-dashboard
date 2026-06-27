import { useQuery } from "@tanstack/react-query";
import { getAcademicVerificationRequests } from "../Api/verification.api";

export function useAcademicVerificationRequestsQuery(
  sortBy = "submitted_at",
) {
  return useQuery({
    queryKey: ["users", "academic-verification-requests", sortBy],
    queryFn: () => getAcademicVerificationRequests(sortBy),
    retry: false,
  });
}

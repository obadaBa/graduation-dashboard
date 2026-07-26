import { useQuery } from "@tanstack/react-query";
import { getTestManagementDetails } from "../Api/tests.api";

export function useTestManagementDetailsQuery(testId) {
  return useQuery({
    queryKey: ["tests", "management-details", testId],
    queryFn: ({ signal }) => getTestManagementDetails(testId, { signal }),
    enabled: Boolean(testId),
  });
}

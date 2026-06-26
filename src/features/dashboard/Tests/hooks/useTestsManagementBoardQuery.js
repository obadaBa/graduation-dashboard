import { useQuery } from "@tanstack/react-query";
import { getTestsManagementBoard } from "../Api/tests.api";

export function useTestsManagementBoardQuery(date) {
  return useQuery({
    queryKey: ["tests", "management-board", date],
    queryFn: () => getTestsManagementBoard(date),
    enabled: Boolean(date),
  });
}

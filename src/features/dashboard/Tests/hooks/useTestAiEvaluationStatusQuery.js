import { useQuery } from "@tanstack/react-query";
import { getTestAiEvaluationStatus } from "../Api/tests.api";

const TERMINAL_STATUSES = new Set(["completed", "failed"]);

export function useTestAiEvaluationStatusQuery(
  evaluationRequestId,
  enabled = true,
) {
  return useQuery({
    queryKey: ["tests", "ai-evaluation", evaluationRequestId],
    queryFn: async () => {
      const response = await getTestAiEvaluationStatus(evaluationRequestId);

      if (process.env.NODE_ENV === "development") {
        console.log("[AI Evaluation Status]", response);
      }

      return response;
    },
    enabled: Boolean(evaluationRequestId) && enabled,
    refetchInterval: (query) => {
      if (query.state.error) {
        return false;
      }

      const status = query.state.data?.data?.status?.toLowerCase();

      return TERMINAL_STATUSES.has(status) ? false : 2000;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}

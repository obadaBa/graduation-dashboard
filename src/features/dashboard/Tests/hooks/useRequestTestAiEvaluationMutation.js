import { useMutation } from "@tanstack/react-query";
import { requestTestAiEvaluation } from "../Api/tests.api";

export function useRequestTestAiEvaluationMutation() {
  return useMutation({
    mutationFn: requestTestAiEvaluation,
    retry: false,
  });
}

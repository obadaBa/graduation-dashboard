import { useQuery } from "@tanstack/react-query";
import { getTestSampleQuestions } from "../Api/tests.api";

export function useTestSampleQuestionsQuery(testId) {
  return useQuery({
    queryKey: ["tests", "sample-questions", testId],
    queryFn: () => getTestSampleQuestions(testId),
    enabled: Boolean(testId),
  });
}

import { useQuery } from "@tanstack/react-query";
import { getTestQuestions } from "../Api/tests.api";

export function useTestQuestionsQuery(testId) {
  return useQuery({
    queryKey: ["tests", "questions", testId],
    queryFn: () => getTestQuestions(testId),
    enabled: Boolean(testId),
  });
}

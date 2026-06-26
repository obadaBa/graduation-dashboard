import { Box, Typography } from "@mui/material";
import { useTestQuestionsQuery } from "../../hooks/useTestQuestionsQuery";
import TestQuestionCard from "./TestQuestionCard";

export default function TestDetailsQuestions({ testId }) {
  const questionsQuery = useTestQuestionsQuery(testId);
  const questions = questionsQuery.data?.data?.questions || [];

  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        px: { xs: 1.4, md: 1.8 },
        py: { xs: 1.4, md: 1.6 },
        textAlign: "right",
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          display: "grid",
          alignItems: "start",
          alignContent: "start",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          gap: 1.6,
        }}
      >
        {questions.map((question) => (
          <TestQuestionCard
            key={question.question_id}
            question={question}
            totalQuestions={questions.length}
          />
        ))}

        {!questionsQuery.isLoading && questions.length === 0 && (
          <Typography
            sx={{
              gridColumn: "1 / -1",
              py: 5,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 16,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            لا توجد أسئلة لعرضها
          </Typography>
        )}
      </Box>
    </Box>
  );
}

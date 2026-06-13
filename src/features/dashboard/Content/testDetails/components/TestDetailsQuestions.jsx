import { Box } from "@mui/material";
import TestQuestionCard from "./TestQuestionCard";

const questions = [
  { id: 1, correctLetter: "B" },
  { id: 2, correctLetter: "C" },
  { id: 3, correctLetter: "B" },
  { id: 4, correctLetter: "B" },
  { id: 5, correctLetter: "C" },
  { id: 6, correctLetter: "B" },
  { id: 7, correctLetter: "A" },
  { id: 8, correctLetter: "D" },
  { id: 9, correctLetter: "B" },
  { id: 10, correctLetter: "C" },
  { id: 11, correctLetter: "A" },
  { id: 12, correctLetter: "D" },
];

export default function TestDetailsQuestions() {
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
            key={question.id}
            questionNumber={question.id}
            correctLetter={question.correctLetter}
          />
        ))}
      </Box>
    </Box>
  );
}

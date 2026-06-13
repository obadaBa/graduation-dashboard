import { Box } from "@mui/material";
import TestQuestionCard from "./TestQuestionCard";

const sampleQuestions = [
  { id: 1, correctLetter: "B" },
  { id: 2, correctLetter: "C" },
];

export default function TestDetailsSampleQuestions() {
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
        {sampleQuestions.map((question) => (
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

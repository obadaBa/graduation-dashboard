import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import { Box, Stack, Typography } from "@mui/material";

const baseOptions = [
  { letter: "A", text: "مصطلحات التحكم بالنفاذ" },
  { letter: "B", text: "قوائم التحكم بالنفاذ" },
  { letter: "C", text: "تذاكر المشفرة" },
  { letter: "D", text: "جدول التفويض الزمني الخاص بالصلاحيات" },
];

function QuestionOption({ letter, text, correct = false }) {
  return (
    <Box
      sx={{
        height: 25,
        borderRadius: "4px",
        border: correct ? "1px solid #33EB4D" : "1px solid #E0E0E0",
        bgcolor: correct ? "#EFFFF0" : "#F8F8F8",
        display: "flex",
        alignItems: "center",
        px: 1,
        color: correct ? "#263238" : "#8B8B8B",
        gap: 1,
        overflow: "hidden",
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>
        {letter}.
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default function TestQuestionCard({
  questionNumber = 1,
  totalQuestions = 30,
  correctLetter = "B",
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        height: "fit-content",
        borderRadius: "12px",
        border: "1px solid #E8E8E8",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.12)",
        px: 1.1,
        pt: 1,
        pb: 1.1,
        direction: "rtl",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ color: "#5C84FF", fontSize: 12, fontWeight: 700 }}>
          السؤال
        </Typography>
        <Box
          sx={{
            minWidth: 38,
            height: 17,
            px: 0.8,
            borderRadius: "999px",
            border: "1px solid #DCDCDC",
            bgcolor: "#F7F7F7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8A8A8A",
            fontSize: 9,
            fontWeight: 700,
            direction: "ltr",
          }}
        >
          {`${questionNumber}/${totalQuestions}`}
        </Box>
      </Stack>

      <Typography
        sx={{
          mt: 0.55,
          color: "#263238",
          fontSize: 12.5,
          fontWeight: 700,
          lineHeight: 1.55,
          textAlign: "right",
        }}
      >
        أي من يلي التحكم بالنفاذ الرتبة تنشئ لكل مستخدم بطاقة توصف موارد الحوسبة
        التي يحق له النفاذ إليها والعمليات التي يستطيع إنجازها؟
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 0.35 }}
      >
        <Typography sx={{ color: "#5C84FF", fontSize: 12, fontWeight: 500 }}>
          الخيارات
        </Typography>
        <TipsAndUpdatesOutlinedIcon sx={{ color: "#5C84FF", fontSize: 18 }} />
      </Stack>

      <Stack spacing={0.8} sx={{ mt: 0.35 }}>
        {baseOptions.map((option) => (
          <QuestionOption
            key={option.letter}
            {...option}
            correct={option.letter === correctLetter}
          />
        ))}
      </Stack>
    </Box>
  );
}

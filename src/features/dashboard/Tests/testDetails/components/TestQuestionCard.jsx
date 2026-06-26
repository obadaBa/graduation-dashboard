import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import { Box, Stack, Tooltip, Typography } from "@mui/material";

const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rtlTextRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
const latinTextRegex = /[A-Za-z]/;

function getTextDirection(text = "") {
  const value = String(text || "").trim();
  const firstStrongChar = value.match(
    /[A-Za-z\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/,
  )?.[0];

  if (latinTextRegex.test(firstStrongChar || "")) {
    return "ltr";
  }

  if (rtlTextRegex.test(firstStrongChar || "")) {
    return "rtl";
  }

  return "rtl";
}

function getTextAlign(direction) {
  return direction === "ltr" ? "left" : "right";
}

function QuestionOption({ letter, text, correct = false }) {
  const textDirection = getTextDirection(text);

  return (
    <Box
      sx={{
        minHeight: 25,
        borderRadius: "4px",
        border: (theme) =>
          correct
            ? "1px solid #33EB4D"
            : `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) =>
          correct
            ? theme.palette.mode === "dark"
              ? "rgba(51, 235, 77, 0.14)"
              : "#EFFFF0"
            : theme.palette.dashboard.chartBackground,
        display: "flex",
        alignItems: "center",
        px: 1,
        py: 0.45,
        color: (theme) =>
          correct
            ? theme.palette.dashboard.textPrimary
            : theme.palette.dashboard.textSecondary,
        gap: 1,
        overflow: "hidden",
        direction: textDirection,
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>
        {letter}.
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.35,
          width: "100%",
          direction: textDirection,
          textAlign: getTextAlign(textDirection),
          unicodeBidi: "plaintext",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default function TestQuestionCard({ question, totalQuestions = 0 }) {
  const options = [...(question?.options || [])].sort(
    (firstOption, secondOption) =>
      Number(firstOption.position || 0) - Number(secondOption.position || 0),
  );
  const questionNumber = question?.position || 1;
  const questionTextDirection = getTextDirection(question?.question_text);
  const hintText = question?.hint_text;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        height: "fit-content",
        borderRadius: "12px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
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
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: (theme) => theme.palette.dashboard.textSecondary,
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
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 12.5,
          fontWeight: 700,
          lineHeight: 1.55,
          direction: questionTextDirection,
          textAlign: getTextAlign(questionTextDirection),
          unicodeBidi: "plaintext",
        }}
      >
        {question?.question_text}
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
        {hintText && (
          <Tooltip
            title={hintText}
            placement="top"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: (theme) => theme.palette.dashboard.textPrimary,
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: 1.6,
                  maxWidth: 280,
                  textAlign: "right",
                  direction: getTextDirection(hintText),
                },
              },
              arrow: {
                sx: {
                  color: (theme) => theme.palette.dashboard.textPrimary,
                },
              },
            }}
          >
            <TipsAndUpdatesOutlinedIcon
              sx={{ color: "#5C84FF", fontSize: 18, cursor: "help" }}
            />
          </Tooltip>
        )}
      </Stack>

      <Stack spacing={0.8} sx={{ mt: 0.35 }}>
        {options.map((option, index) => (
          <QuestionOption
            key={option.option_id}
            letter={optionLetters[index] || option.position}
            text={option.option_text}
            correct={Boolean(option.is_correct)}
          />
        ))}
      </Stack>
    </Box>
  );
}

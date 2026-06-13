import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Stack, Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";

export default function NewStatusDetails() {
  return (
    <StatusDetailsShell>
      <Typography
        sx={{
          mt: 2.1,
          color: "#8F8F8F",
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.75,
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "right",
        }}
      >
        المحتوى ما زال جديدا ولم يتم اتخاذ أي إجراء مناسب له، يجب عليك أيضا المشرف أن تقوم
        بقبول هذا المحتوى او حذفه إن كان يخالف معايير خصوصية التطبيق بشكل مباشر
      </Typography>

      <Stack
        direction="row-reverse"
        spacing={0.9}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mt: 2.35 }}
      >
        <Typography sx={{ color: "#263238", fontSize: 17, fontWeight: 500 }}>
          21\03\2026 - الساعة 14:00
        </Typography>
        <AccessTimeRoundedIcon sx={{ fontSize: 22, color: "#263238" }} />
      </Stack>
    </StatusDetailsShell>
  );
}

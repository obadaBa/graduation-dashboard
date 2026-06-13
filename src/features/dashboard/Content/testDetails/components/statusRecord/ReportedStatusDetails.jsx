import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";

export default function ReportedStatusDetails() {
  return (
    <StatusDetailsShell>
      <Typography
        sx={{
          mt: 2.1,
          color: "#8F8F8F",
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.7,
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "right",
        }}
      >
        هذا الاختبار ينتهك سياسة الخصوصية ويجب اتخاذ إجراء مناسب بحقه ويتم ذلك من خلال تاب
        سجل الإبلاغات والوجود ضمن نفس هذه الصفحة
      </Typography>

      <Box
        sx={{
          mt: 2.15,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          startIcon={<ReplyRoundedIcon sx={{ fontSize: 18 }} />}
          sx={{
            minWidth: 94,
            height: 31,
            px: 1.45,
            borderRadius: "999px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 700,
            boxShadow: "0 6px 14px rgba(92, 132, 255, 0.24)",
            "&:hover": {
              bgcolor: "#5C84FF",
            },
            "& .MuiButton-startIcon": {
              marginInlineStart: 0,
              marginInlineEnd: "4px",
            },
          }}
        >
          التوجه إليها
        </Button>

        <Stack direction="row-reverse" spacing={0.9} alignItems="center">
          <Typography sx={{ color: "#263238", fontSize: 17, fontWeight: 500 }}>
            21\03\2026 - الساعة 14:00
          </Typography>
          <AccessTimeRoundedIcon sx={{ fontSize: 22, color: "#263238" }} />
        </Stack>
      </Box>
    </StatusDetailsShell>
  );
}

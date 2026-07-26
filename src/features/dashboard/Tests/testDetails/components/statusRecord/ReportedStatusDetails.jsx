import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusTimeBlock from "./StatusTimeBlock";

export default function ReportedStatusDetails({ history, onShowReports }) {
  const details = history?.details || {};
  const reportedMessage =
    "هذا الاختبار ينتهك سياسة الخصوصية ويجب اتخاذ إجراء مناسب بحقه ويتم ذلك من خلال تاب سجل الإبلاغات والموجود ضمن نفس هذه الصفحة";

  return (
    <StatusDetailsShell>
      <Typography
        sx={{
          mt: 1.2,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 15,
          fontWeight: 500,
          lineHeight: 1.8,
          textAlign: "start",
        }}
      >
        {reportedMessage}
      </Typography>

      <Box
        sx={{
          mt: 1.4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
        }}
      >
        <Button
          type="button"
          onClick={onShowReports}
          endIcon={<ArrowBackRoundedIcon sx={{ fontSize: 10 }} />}
          sx={{
            minWidth: 78,
            height: 22,

            borderRadius: "999px",
            bgcolor: "#5C84FF",
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            lineHeight: 1,
            boxShadow: "0 4px 10px rgba(92, 132, 255, 0.28)",
            "& .MuiButton-endIcon": {
              ml: 0,
              mr: 0.45,
            },
            "&:hover": {
              bgcolor: "#4F74E8",
              boxShadow: "0 5px 12px rgba(92, 132, 255, 0.34)",
            },
          }}
        >
          التوجه إليها
        </Button>
          <StatusTimeBlock time={details.decision_at || history?.entered_at} />
      </Box>
    </StatusDetailsShell>
  );
}

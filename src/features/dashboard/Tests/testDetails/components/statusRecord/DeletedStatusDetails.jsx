import { Box, Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function DeletedStatusDetails({ history }) {
  const details = history?.details || {};

  return (
    <StatusDetailsShell>
      <Box
        sx={{
          mt: 2.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
        }}
      >
        <StatusOwnerBlock actor={details.actor} />
        <StatusTimeBlock time={details.decision_at || history?.entered_at} />
      </Box>

      <Box sx={{ mt: 4.6, textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 21,
            fontWeight: 900,
          }}
        >
          سبب الحذف
        </Typography>
        <Typography
          sx={{
            mt: 1,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.8,
          }}
        >
          {details.reason || history?.note || "-"}
        </Typography>
      </Box>
    </StatusDetailsShell>
  );
}

import { Box, Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function DefaultStatusDetails({ history }) {
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
        }}
      >
        <StatusOwnerBlock actor={details.actor} />
        <StatusTimeBlock time={details.decision_at || history?.entered_at} />
      </Box>

      <Typography
        sx={{
          mt: 2.2,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.75,
          maxWidth: 560,
          textAlign: "right",
        }}
      >
        {details.reason || history?.note || "-"}
      </Typography>
    </StatusDetailsShell>
  );
}

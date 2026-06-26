import { Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusTimeBlock from "./StatusTimeBlock";

export default function NewStatusDetails({ history }) {
  return (
    <StatusDetailsShell>
      <Typography
        sx={{
          mt: 2.1,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.75,
          whiteSpace: "normal",
          wordBreak: "break-word",
          textAlign: "right",
        }}
      >
        {history?.details?.reason || history?.note || "-"}
      </Typography>

      <StatusTimeBlock time={history?.details?.decision_at || history?.entered_at} sx={{ mt: 2.35 }} />
    </StatusDetailsShell>
  );
}

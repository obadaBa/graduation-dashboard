import { Box } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function ApprovedStatusDetails({ history }) {
  const details = history?.details || {};

  return (
    <StatusDetailsShell>
      <Box
        sx={{
          mt: 2.4,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <StatusOwnerBlock actor={details.actor} />
        <StatusTimeBlock time={details.decision_at || history?.entered_at} />
      </Box>
    </StatusDetailsShell>
  );
}

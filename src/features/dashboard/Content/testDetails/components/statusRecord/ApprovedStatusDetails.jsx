import { Box } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function ApprovedStatusDetails() {
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
        <StatusOwnerBlock />
        <StatusTimeBlock />
      </Box>
    </StatusDetailsShell>
  );
}

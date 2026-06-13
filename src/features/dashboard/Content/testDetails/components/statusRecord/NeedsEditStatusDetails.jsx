import { Box } from "@mui/material";
import RequiredChangesTable from "./RequiredChangesTable";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function NeedsEditStatusDetails() {
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
        <StatusOwnerBlock />
        <StatusTimeBlock />
      </Box>

      <RequiredChangesTable />
    </StatusDetailsShell>
  );
}

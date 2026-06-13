import StatusChangesTable from "./StatusChangesTable";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusTimeBlock from "./StatusTimeBlock";

export default function ReviewingStatusDetails() {
  return (
    <StatusDetailsShell>
      <StatusTimeBlock sx={{ mt: 2.2, justifyContent: "flex-end" }} />
      <StatusChangesTable />
    </StatusDetailsShell>
  );
}

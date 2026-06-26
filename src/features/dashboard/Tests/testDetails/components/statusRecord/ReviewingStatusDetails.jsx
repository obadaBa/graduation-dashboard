import StatusChangesTable from "./StatusChangesTable";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusTimeBlock from "./StatusTimeBlock";

export default function ReviewingStatusDetails({ history }) {
  const details = history?.details || {};

  return (
    <StatusDetailsShell>
      <StatusTimeBlock
        time={details.decision_at || history?.entered_at}
        sx={{ mt: 2.2, justifyContent: "flex-end" }}
      />
      <StatusChangesTable changes={details.changes || []} />
    </StatusDetailsShell>
  );
}

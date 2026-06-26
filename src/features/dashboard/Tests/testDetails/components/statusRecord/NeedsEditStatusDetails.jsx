import { useState } from "react";
import { Box } from "@mui/material";
import { useTestQuestionsQuery } from "../../../hooks/useTestQuestionsQuery";
import { useUpdateManagementTestRevisionsMutation } from "../../../hooks/useUpdateManagementTestRevisionsMutation";
import RequestTestChangesModal from "../RequestTestChangesModal";
import RequiredChangesTable from "./RequiredChangesTable";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function NeedsEditStatusDetails({ history, testId }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const details = history?.details || {};
  const requests = details.revision_requests || [];
  const questionsQuery = useTestQuestionsQuery(testId);
  const questions = questionsQuery.data?.data?.questions || [];
  const updateMutation = useUpdateManagementTestRevisionsMutation(testId);

  return (
    <>
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

        <RequiredChangesTable
          requests={requests}
          onEdit={() => setIsEditModalOpen(true)}
          isEditing={updateMutation.isPending}
        />
      </StatusDetailsShell>

      <RequestTestChangesModal
        open={isEditModalOpen}
        questions={questions}
        initialRevisions={requests}
        isPending={updateMutation.isPending}
        saveLabel="حفظ التعديلات"
        pendingLabel="جاري حفظ التعديلات..."
        onClose={() => {
          if (!updateMutation.isPending) {
            setIsEditModalOpen(false);
          }
        }}
        onSave={(revisions) => {
          updateMutation.mutate(
            { testId, revisions },
            {
              onSuccess: () => setIsEditModalOpen(false),
            },
          );
        }}
      />
    </>
  );
}

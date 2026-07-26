import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import { createIdempotencyKey } from "../../../../../shared/lib/idempotency";
import { useTestAiEvaluation } from "../../context/TestAiEvaluationContext";
import { useApproveManagementTestMutation } from "../../hooks/useApproveManagementTestMutation";
import { useDeleteManagementTestMutation } from "../../hooks/useDeleteManagementTestMutation";
import { useRequestManagementTestRevisionsMutation } from "../../hooks/useRequestManagementTestRevisionsMutation";
import { useTestQuestionsQuery } from "../../hooks/useTestQuestionsQuery";
import ApproveTestConfirmationModal from "./ApproveTestConfirmationModal";
import DeleteTestConfirmationModal from "./DeleteTestConfirmationModal";
import RequestTestChangesModal from "./RequestTestChangesModal";
import TestQuestionsExportButton from "./TestQuestionsExportButton";
import TestAiAssistantModal from "./TestAiAssistantModal";

const buttonStartIconSx = {
  marginInlineStart: 0,
  marginInlineEnd: "6px",
};

const aiButtonGradient = "linear-gradient(90deg, #8ED8FF 0%, #FFE28A 100%)";

const actionBarSx = {
  mt: 2.5,
  width: "100%",
  minHeight: 68,
  borderRadius: "14px",
  bgcolor: "transparent",
  px: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  direction: "rtl",
};

const actionGroupSx = {
  minHeight: 46,
  border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
  overflow: "hidden",
  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
  p: 0.6,
};

const actionCellSx = {
  px: 1.2,
};

const aiButtonSx = {
  minWidth: { xs: 150, sm: 160 },
  maxWidth: { xs: 190, sm: "none" },
  height: 32,
  px: 1.5,
  borderRadius: "8px",
  color: "#FFFFFF",
  background: aiButtonGradient,
  boxShadow: "0 6px 12px rgba(151, 200, 245, 0.22)",
  "&:hover": {
    background: aiButtonGradient,
  },
  "&.Mui-disabled": {
    color: "#FFFFFF",
    background: aiButtonGradient,
    opacity: 0.64,
  },
  "& .MuiButton-startIcon": buttonStartIconSx,
};

const aiButtonTextSx = {
  fontSize: 12,
  fontWeight: 800,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const actionDividerSx = {
  width: "2px",
  height: 48,
  mx: 0.6,
  background:
    "repeating-linear-gradient(to bottom, #D9D9D9 0 6px, transparent 6px 11px)",
};

const deleteActionSx = {
  position: "relative",
  minWidth: 54,
  width: 54,
  height: 54,
  borderRadius: "10px",
  border: "1.5px dashed #FF3B30",
  bgcolor: "rgba(255, 59, 48, 0.1)",
  color: "#FF3B30",
  p: 0,
  "&:hover": {
    bgcolor: "rgba(255, 59, 48, 0.16)",
    borderColor: "#FF3B30",
  },
  "&.Mui-disabled": {
    bgcolor: "rgba(255, 59, 48, 0.08)",
    color: "#FF9A94",
    borderColor: "#FF9A94",
  },
};

const getStatusPillSx = ({ color, bgcolor }) => ({
  minWidth: 106,
  height: 32,
  px: 1.5,
  borderRadius: "999px",
  bgcolor,
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
  boxShadow: `0 0 18px ${color}73, 0 0 8px ${color}4D`,
  "&:hover": {
    bgcolor,
    boxShadow: `0 0 22px ${color}8C, 0 0 11px ${color}66`,
  },
  "&.Mui-disabled": {
    bgcolor,
    color: "#FFFFFF",
    opacity: 0.6,
  },
  "& .MuiButton-startIcon": buttonStartIconSx,
});

function StatusPill({
  label,
  icon,
  color,
  bgcolor,
  onClick,
  disabled = false,
}) {
  return (
    <Button
      type="button"
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
      sx={getStatusPillSx({ color, bgcolor })}
    >
      {label}
    </Button>
  );
}

function DeleteAction({ onClick, disabled = false }) {
  return (
    <Button
      type="button"
      aria-label="حذف الاختبار"
      onClick={onClick}
      disabled={disabled}
      sx={deleteActionSx}
    >
      <DeleteOutlineRoundedIcon sx={{ fontSize: 26 }} />
    </Button>
  );
}

export default function TestDetailsActionButtons({ testId, testTitle }) {
  const navigate = useNavigate();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const approveMutation = useApproveManagementTestMutation(testId);
  const deleteMutation = useDeleteManagementTestMutation(testId, {
    onDeleted: () => {
      setIsDeleteModalOpen(false);
      setDeleteReason("");
      navigate("/dashboard/tests", { replace: true });
    },
  });
  const revisionsMutation = useRequestManagementTestRevisionsMutation(testId);
  const {
    job: aiEvaluationJob,
    evaluation: aiEvaluation,
    status: aiEvaluationStatus,
    isProcessing: isAiProcessing,
    requestingTestId,
    isError: isAiEvaluationError,
    startEvaluation,
  } = useTestAiEvaluation();
  const questionsQuery = useTestQuestionsQuery(testId);
  const questions = questionsQuery.data?.data?.questions || [];
  const isCurrentTestEvaluation =
    String(aiEvaluationJob?.testId) === String(testId);
  const isCurrentTestAiProcessing =
    (isCurrentTestEvaluation && isAiProcessing) ||
    String(requestingTestId) === String(testId);
  const isActionPending =
    approveMutation.isPending ||
    deleteMutation.isPending ||
    revisionsMutation.isPending;
  const aiButtonLabel = isCurrentTestAiProcessing
    ? "جاري المعالجة"
    : isCurrentTestEvaluation && aiEvaluationStatus === "completed"
      ? "عرض نتيجة الذكاء الاصطناعي"
      : "مساعد الذكاء الاصطناعي";

  useEffect(() => {
    if (
      searchParams.get("aiEvaluation") !== "open" ||
      !isCurrentTestEvaluation ||
      aiEvaluationStatus !== "completed"
    ) {
      return;
    }

    setIsAiModalOpen(true);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("aiEvaluation");
    setSearchParams(nextSearchParams, { replace: true });
  }, [
    aiEvaluationStatus,
    isCurrentTestEvaluation,
    searchParams,
    setSearchParams,
  ]);

  const handleApprove = () => {
    if (!testId || isActionPending) {
      return;
    }

    setIsApproveModalOpen(true);
  };

  const handleConfirmApprove = () => {
    if (!testId || isActionPending) {
      return;
    }

    approveMutation.mutate({
      testId,
      idempotencyKey: createIdempotencyKey(),
    }, {
      onSuccess: () => {
        setIsApproveModalOpen(false);
      },
    });
  };

  const handleCloseApproveModal = () => {
    if (!approveMutation.isPending) {
      setIsApproveModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (!testId || isActionPending) {
      return;
    }

    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const reason = deleteReason.trim();

    if (!testId || !reason || isActionPending) {
      return;
    }

    deleteMutation.mutate({
      testId,
      reason,
      idempotencyKey: createIdempotencyKey(),
    });
  };

  const handleCloseDeleteModal = () => {
    if (deleteMutation.isPending) {
      return;
    }

    setIsDeleteModalOpen(false);
    setDeleteReason("");
  };

  const handleOpenAiModal = () => {
    if (!testId || isCurrentTestAiProcessing) {
      return;
    }

    if (
      isCurrentTestEvaluation &&
      aiEvaluationStatus === "completed"
    ) {
      setIsAiModalOpen(true);
      return;
    }

    startEvaluation(testId);
  };

  const handleCloseAiModal = () => {
    setIsAiModalOpen(false);
  };

  return (
    <>
      <Box sx={actionBarSx}>
        <Stack
          direction="row-reverse"
          alignItems="center"
          sx={actionGroupSx}
        >
        <Box sx={actionCellSx}>
          <Button
            type="button"
            startIcon={<AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenAiModal}
            disabled={isCurrentTestAiProcessing}
            aria-label={aiButtonLabel}
            sx={aiButtonSx}
          >
            <Typography
              component="span"
              sx={aiButtonTextSx}
            >
              {aiButtonLabel}
            </Typography>
          </Button>
        </Box>
        <Box sx={actionDividerSx} />
        <Box sx={actionCellSx}>
          <StatusPill
            label="الموافقة عليه"
            color="#32D74B"
            bgcolor="#28E83F"
            icon={<CheckBoxRoundedIcon sx={{ fontSize: 17 }} />}
            onClick={handleApprove}
            disabled={isActionPending}
          />
        </Box>

       

        <Box sx={actionCellSx}>
          <StatusPill
            label="طلب محتويات"
            color="#F4E500"
            bgcolor="#F0EE00"
            icon={<DescriptionOutlinedIcon sx={{ fontSize: 17 }} />}
            onClick={() => setIsChangesModalOpen(true)}
            disabled={isActionPending}
          />
        </Box>
      </Stack>

      <DeleteAction onClick={handleDelete} disabled={isActionPending} />

      <TestQuestionsExportButton
        title={testTitle || `اختبار-${testId}`}
        questions={questions}
        disabled={questionsQuery.isLoading}
      />
      </Box>

      <DeleteTestConfirmationModal
        open={isDeleteModalOpen}
        reason={deleteReason}
        onReasonChange={setDeleteReason}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isPending={deleteMutation.isPending}
      />
      <ApproveTestConfirmationModal
        open={isApproveModalOpen}
        onClose={handleCloseApproveModal}
        onConfirm={handleConfirmApprove}
        isPending={approveMutation.isPending}
      />
      <RequestTestChangesModal
        open={isChangesModalOpen}
        questions={questions}
        isPending={revisionsMutation.isPending}
        onClose={() => {
          if (!revisionsMutation.isPending) {
            setIsChangesModalOpen(false);
          }
        }}
        onSave={(revisions) => {
          revisionsMutation.mutate(
            {
              testId,
              revisions,
              idempotencyKey: createIdempotencyKey(),
            },
            {
              onSuccess: () => {
                setIsChangesModalOpen(false);
              },
            },
          );
        }}
      />
      <TestAiAssistantModal
        open={isAiModalOpen}
        onClose={handleCloseAiModal}
        evaluation={aiEvaluation}
        isLoading={false}
        isError={isAiEvaluationError}
      />
    </>
  );
}

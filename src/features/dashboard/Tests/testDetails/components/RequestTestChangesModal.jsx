import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import RevisionRequestFields, {
  REVISION_TYPES,
} from "./RevisionRequestFields";

const MAX_REVISIONS = 8;

function createRevision() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    revisionType: "",
    questionPosition: "",
    optionPosition: "",
    problemNote: "",
  };
}

function mapInitialRevision(revision, index) {
  return {
    id: `existing-${revision.revision_no || revision.id || index}`,
    revisionType: revision.revision_type || "",
    questionPosition: revision.question_position ?? "",
    optionPosition: revision.option_position ?? "",
    problemNote: revision.problem_note || "",
  };
}

export default function RequestTestChangesModal({
  open,
  onClose,
  onSave,
  questions = [],
  isPending = false,
  initialRevisions = [],
  saveLabel = "حفظ قائمة التعديلات",
  pendingLabel = "جاري إرسال التعديلات...",
}) {
  const [revisions, setRevisions] = useState([createRevision()]);

  useEffect(() => {
    if (open) {
      setRevisions(
        initialRevisions.length > 0
          ? initialRevisions.slice(0, MAX_REVISIONS).map(mapInitialRevision)
          : [createRevision()],
      );
    } else {
      setRevisions([createRevision()]);
    }
  }, [initialRevisions, open]);

  const isValid = useMemo(
    () =>
      revisions.every((revision) => {
        const type = REVISION_TYPES.find(
          (item) => item.value === revision.revisionType,
        );

        return (
          type &&
          revision.problemNote.trim() &&
          (!type.question || Number(revision.questionPosition) > 0) &&
          (!type.option || Number(revision.optionPosition) > 0)
        );
      }),
    [revisions],
  );

  const updateRevision = (id, values) => {
    setRevisions((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...values } : item,
      ),
    );
  };

  const closeModal = () => {
    setRevisions([createRevision()]);
    onClose();
  };

  const saveRevisions = () => {
    if (!isValid) {
      return;
    }

    onSave?.(
      revisions.map((revision) => ({
        revision_type: revision.revisionType,
        question_position: revision.questionPosition
          ? Number(revision.questionPosition)
          : null,
        option_position: revision.optionPosition
          ? Number(revision.optionPosition)
          : null,
        problem_note: revision.problemNote.trim(),
      })),
    );
  };

  return (
    <Modal
      open={open}
      onClose={isPending ? undefined : closeModal}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(8, 10, 14, 0.55)",
            backdropFilter: "blur(5px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "calc(100% - 28px)", md: 708 },
          height: { xs: "calc(100vh - 36px)", md: 470 },
          borderRadius: "14px",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          direction: "rtl",
          outline: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: (theme) =>
              `3px dashed ${theme.palette.dashboard.divider}`,
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            قائمة طلب تعديلات{" "}
            <Box component="span" sx={{ color: "#5583FF" }}>
              للاختبار
            </Box>
          </Typography>
          <IconButton
            onClick={closeModal}
            sx={{
              width: 31,
              height: 31,
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              color: (theme) => theme.palette.dashboard.textPrimary,
              borderRadius: "4px",
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            px: 2.2,
            py: 2.5,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              overflowY: "auto",
              pr: 0.4,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 1.4,
                alignItems: "start",
              }}
            >
              {revisions.map((revision, index) => (
                <RevisionRequestFields
                  key={revision.id}
                  revision={revision}
                  index={index}
                  questions={questions}
                  onChange={(values) => updateRevision(revision.id, values)}
                />
              ))}

              {revisions.length < MAX_REVISIONS && !isPending && (
                <Button
                  onClick={() =>
                    setRevisions((current) => [...current, createRevision()])
                  }
                  aria-label="إضافة تعديل"
                  sx={{
                    minWidth: 28,
                    width: 28,
                    height: 162,
                    justifySelf: "start",
                    border: "1.5px dashed #AFAFAF",
                    borderRadius: "7px",
                    color: "#A0A0A0",
                    p: 0,
                  }}
                >
                  <AddRoundedIcon sx={{ fontSize: 19 }} />
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: 2, pb: 1.5, direction: "ltr" }}>
          <Button
            disabled={!isValid || isPending}
            onClick={saveRevisions}
            sx={{
              minWidth: 158,
              height: 36,
              borderRadius: "7px",
              bgcolor: "#5583FF",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 800,
              "&:hover": { bgcolor: "#5583FF" },
              "&.Mui-disabled": {
                bgcolor: "#A9BFFF",
                color: "#FFFFFF",
              },
            }}
          >
            {isPending ? pendingLabel : saveLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

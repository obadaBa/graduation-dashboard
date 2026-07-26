import { useState } from "react";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useTestStatusHistoryQuery } from "../../hooks/useTestStatusHistoryQuery";
import ApprovedStatusDetails from "./statusRecord/ApprovedStatusDetails";
import DefaultStatusDetails from "./statusRecord/DefaultStatusDetails";
import DeletedStatusDetails from "./statusRecord/DeletedStatusDetails";
import NeedsEditStatusDetails from "./statusRecord/NeedsEditStatusDetails";
import NewStatusDetails from "./statusRecord/NewStatusDetails";
import ReportedStatusDetails from "./statusRecord/ReportedStatusDetails";
import ReviewingStatusDetails from "./statusRecord/ReviewingStatusDetails";
import StatusRecordItem from "./statusRecord/StatusRecordItem";

const STATUS_LABELS = {
  current: "الحالة الحالية",
  previous: "الحالات السابقة",
  empty: "لا يوجد سجل حالات لهذا الاختبار",
};

function getStatusText(historyOrTitle = "") {
  if (typeof historyOrTitle === "string") {
    return historyOrTitle;
  }

  return [
    historyOrTitle?.status,
    historyOrTitle?.status_key,
    historyOrTitle?.type,
    historyOrTitle?.key,
    historyOrTitle?.title,
  ]
    .filter(Boolean)
    .join(" ");
}

function getStatusHistoryItems(response) {
  const data = response?.data;
  const candidates = [
    data?.histories,
    data?.status_history,
    data?.history,
    data?.items,
    data,
  ];
  const historySource = candidates.find(
    (candidate) => Array.isArray(candidate) || Array.isArray(candidate?.items),
  );

  if (Array.isArray(historySource)) {
    return historySource;
  }

  return historySource?.items || [];
}

function normalizeHistory(history, index) {
  const details = history?.details || {};
  const actor = details.actor;

  return {
    ...history,
    id: history?.id ?? history?.status_history_id ?? `${index}`,
    title:
      history?.title ||
      history?.status ||
      history?.status_label ||
      history?.status_name ||
      "-",
    entered_at:
      history?.entered_at ||
      history?.created_at ||
      history?.decision_at ||
      details.decision_at ||
      "-",
    details: {
      ...details,
      actor: actor
        ? {
            ...actor,
            avatar: actor.avatar || actor.avatar_url,
          }
        : actor,
    },
  };
}

function getStatusPresentation(historyOrTitle = "") {
  const statusText = getStatusText(historyOrTitle).toLowerCase();

  if (
    statusText.includes("delete") ||
    statusText.includes("deleted") ||
    statusText.includes("حذف")
  ) {
    return {
      type: "deleted",
      color: "#FF6A64",
      icon: <DeleteRoundedIcon sx={{ fontSize: 18, color: "#FF6A64" }} />,
    };
  }

  if (
    statusText.includes("approve") ||
    statusText.includes("approved") ||
    statusText.includes("الموافقة")
  ) {
    return {
      type: "approved",
      color: "#32D74B",
      icon: <TaskAltRoundedIcon sx={{ fontSize: 18, color: "#32D74B" }} />,
    };
  }

  if (
    statusText.includes("review") ||
    statusText.includes("reviewing") ||
    statusText.includes("قيد المراجعة")
  ) {
    return {
      type: "reviewing",
      color: "#FFD400",
      icon: <ManageSearchRoundedIcon sx={{ fontSize: 18, color: "#FFD400" }} />,
    };
  }

  if (
    statusText.includes("need") ||
    statusText.includes("revision") ||
    statusText.includes("تعديل")
  ) {
    return {
      type: "needs_edit",
      color: "#FFB84D",
      icon: <EditNoteRoundedIcon sx={{ fontSize: 18, color: "#FFB84D" }} />,
    };
  }

  if (
    statusText.includes("draft") ||
    statusText.includes("new") ||
    statusText.includes("مسودة") ||
    statusText.includes("جديد")
  ) {
    return {
      type: "new",
      color: "#5C84FF",
      icon: <ArticleRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />,
    };
  }

  if (
    statusText.includes("report") ||
    statusText.includes("reported") ||
    statusText.includes("مبلغ")
  ) {
    return {
      type: "reported",
      color: "#A66BFF",
      icon: <ReportRoundedIcon sx={{ fontSize: 18, color: "#A66BFF" }} />,
    };
  }

  return {
    type: "default",
    color: "#A66BFF",
    icon: <FlagRoundedIcon sx={{ fontSize: 18, color: "#A66BFF" }} />,
  };
}

function StatusDetails({ history, testId, onShowReports }) {
  const type = getStatusPresentation(history).type;

  if (type === "deleted") {
    return <DeletedStatusDetails history={history} />;
  }

  if (type === "approved") {
    return <ApprovedStatusDetails history={history} />;
  }

  if (type === "reviewing") {
    return <ReviewingStatusDetails history={history} />;
  }

  if (type === "needs_edit") {
    return <NeedsEditStatusDetails history={history} testId={testId} />;
  }

  if (type === "new") {
    return <NewStatusDetails history={history} />;
  }

  if (type === "reported") {
    return (
      <ReportedStatusDetails
        history={history}
        onShowReports={onShowReports}
      />
    );
  }

  return <DefaultStatusDetails history={history} />;
}

export default function TestDetailsStatusRecord({ testId, onShowReports }) {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const statusHistoryQuery = useTestStatusHistoryQuery(testId);
  const histories = getStatusHistoryItems(statusHistoryQuery.data).map(
    normalizeHistory,
  );
  const currentHistory = histories[0];
  const previousHistories = histories.slice(1);
  const selectedHistory =
    histories.find((history) => history.id === selectedHistoryId) ||
    currentHistory;

  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        px: { xs: 2, md: 3 },
        py: { xs: 2.2, md: 2.6 },
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      {statusHistoryQuery.isLoading ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={32} />
        </Box>
      ) : currentHistory ? (
        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              minHeight: 0,
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              pb: 2,
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 24,
                fontWeight: 900,
                textAlign: "right",
                mb: 1.8,
              }}
            >
              {STATUS_LABELS.current}
            </Typography>

            <StatusRecordItem
              label={currentHistory.title}
              time={currentHistory.entered_at}
              color={getStatusPresentation(currentHistory).color}
              active={selectedHistory?.id === currentHistory.id}
              onClick={() => setSelectedHistoryId(currentHistory.id)}
              icon={getStatusPresentation(currentHistory).icon}
            />

            {previousHistories.length > 0 && (
              <>
                <Box
                  sx={{
                    mt: 2.15,
                    mb: 2.15,
                    height: "1px",
                    bgcolor: (theme) => theme.palette.dashboard.divider,
                  }}
                />

                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 24,
                    fontWeight: 900,
                    textAlign: "right",
                    mb: 1.8,
                  }}
                >
                  {STATUS_LABELS.previous}
                </Typography>

                <Stack spacing={1.4}>
                  {previousHistories.map((history) => {
                    const presentation = getStatusPresentation(history);

                    return (
                      <StatusRecordItem
                        key={history.id}
                        label={history.title}
                        time={history.entered_at}
                        color={presentation.color}
                        icon={presentation.icon}
                        active={selectedHistory?.id === history.id}
                        onClick={() => setSelectedHistoryId(history.id)}
                      />
                    );
                  })}
                </Stack>
              </>
            )}
          </Box>

          <Box
            sx={{
              height: "100%",
              minHeight: 0,
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              pb: 2,
            }}
          >
            <StatusDetails
              history={selectedHistory}
              testId={testId}
              onShowReports={onShowReports}
            />
          </Box>
        </Box>
      ) : (
        <Typography
          sx={{
            py: 5,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 16,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {STATUS_LABELS.empty}
        </Typography>
      )}
    </Box>
  );
}

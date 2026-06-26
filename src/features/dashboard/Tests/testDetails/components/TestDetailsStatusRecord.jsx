import { useState } from "react";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import { Box, Stack, Typography } from "@mui/material";
import { useTestStatusHistoryQuery } from "../../hooks/useTestStatusHistoryQuery";
import ApprovedStatusDetails from "./statusRecord/ApprovedStatusDetails";
import DefaultStatusDetails from "./statusRecord/DefaultStatusDetails";
import DeletedStatusDetails from "./statusRecord/DeletedStatusDetails";
import NeedsEditStatusDetails from "./statusRecord/NeedsEditStatusDetails";
import NewStatusDetails from "./statusRecord/NewStatusDetails";
import ReviewingStatusDetails from "./statusRecord/ReviewingStatusDetails";
import StatusRecordItem from "./statusRecord/StatusRecordItem";

function getStatusPresentation(title = "") {
  if (title.includes("حذف")) {
    return {
      type: "deleted",
      color: "#FF6A64",
      icon: <DeleteOutlineRoundedIcon sx={{ fontSize: 18, color: "#FF6A64" }} />,
    };
  }

  if (title.includes("الموافقة")) {
    return {
      type: "approved",
      color: "#32D74B",
      icon: <CheckBoxRoundedIcon sx={{ fontSize: 18, color: "#32D74B" }} />,
    };
  }

  if (title.includes("قيد المراجعة")) {
    return {
      type: "reviewing",
      color: "#FFD400",
      icon: <RateReviewRoundedIcon sx={{ fontSize: 18, color: "#FFD400" }} />,
    };
  }

  if (title.includes("تعديل")) {
    return {
      type: "needs_edit",
      color: "#FFB84D",
      icon: <EditNoteRoundedIcon sx={{ fontSize: 18, color: "#FFB84D" }} />,
    };
  }

  if (title.includes("مسودة") || title.includes("جديد")) {
    return {
      type: "new",
      color: "#5C84FF",
      icon: <OutlinedFlagRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />,
    };
  }

  if (title.includes("مبلغ")) {
    return {
      type: "reported",
      color: "#A66BFF",
      icon: (
        <ReportGmailerrorredRoundedIcon
          sx={{ fontSize: 18, color: "#A66BFF" }}
        />
      ),
    };
  }

  return {
    type: "default",
    color: "#A66BFF",
    icon: <OutlinedFlagRoundedIcon sx={{ fontSize: 18, color: "#A66BFF" }} />,
  };
}

function StatusDetails({ history, testId }) {
  const type = getStatusPresentation(history?.title).type;

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

  return <DefaultStatusDetails history={history} />;
}

export default function TestDetailsStatusRecord({ testId }) {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const statusHistoryQuery = useTestStatusHistoryQuery(testId);
  const histories = statusHistoryQuery.data?.data?.histories || [];
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
      {currentHistory ? (
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
              الحالة الحالية
            </Typography>

            <StatusRecordItem
              label={currentHistory.title}
              time={currentHistory.entered_at}
              color={getStatusPresentation(currentHistory.title).color}
              active={selectedHistory?.id === currentHistory.id}
              onClick={() => setSelectedHistoryId(currentHistory.id)}
              icon={getStatusPresentation(currentHistory.title).icon}
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
                  الحالات السابقة
                </Typography>

                <Stack spacing={1.4}>
                  {previousHistories.map((history) => {
                    const presentation = getStatusPresentation(history.title);

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
            <StatusDetails history={selectedHistory} testId={testId} />
          </Box>
        </Box>
      ) : (
        !statusHistoryQuery.isLoading && (
          <Typography
            sx={{
              py: 5,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 16,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            لا يوجد سجل حالات لهذا الاختبار
          </Typography>
        )
      )}
    </Box>
  );
}

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLibraryMaterialStatusHistoryQuery } from "../../hooks/useLibraryMaterialStatusHistoryQuery";

const defaultAvatar =
  "http://localhost/storage/defaults/default-avatar.svg";

function getStatusPresentation(status = "") {
  if (status.includes("الموافقة")) {
    return {
      color: "#32D74B",
      background: "rgba(50, 215, 75, 0.08)",
      icon: <CheckBoxRoundedIcon sx={{ fontSize: 18, color: "#32D74B" }} />,
    };
  }

  if (status.includes("مبلغ")) {
    return {
      color: "#A66BFF",
      background: "rgba(166, 107, 255, 0.08)",
      icon: (
        <ReportGmailerrorredRoundedIcon
          sx={{ fontSize: 18, color: "#A66BFF" }}
        />
      ),
    };
  }

  return {
    color: "#5C84FF",
    background: "rgba(92, 132, 255, 0.08)",
    icon: <OutlinedFlagRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />,
  };
}

function StatusItem({ history, active, onClick }) {
  const presentation = getStatusPresentation(history.status);

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        width: "100%",
        minHeight: 46,
        borderRadius: "8px",
        border: (theme) =>
          `1px solid ${
            active ? presentation.color : theme.palette.dashboard.chartBorder
          }`,
        bgcolor: active
          ? presentation.background
          : (theme) => theme.palette.dashboard.chartBackground,
        px: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.2,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      <Stack direction="row" gap={0.8} alignItems="center">
        {presentation.icon}
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {history.status}
        </Typography>
      </Stack>

      <Stack direction="row" gap={0.45} alignItems="center">
        <AccessTimeRoundedIcon
          sx={{
            fontSize: 15,
            color: (theme) => theme.palette.dashboard.textSecondary,
          }}
        />
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {history.entered_at}
        </Typography>
      </Stack>
    </Box>
  );
}

function StatusDetails({ history, onNavigateReports }) {
  const details = history?.details || {};
  const actor = details.actor;
  const message = details.reason || details.note;
  const isReported = history?.status?.includes("مبلغ");

  return (
    <Stack spacing={2.2}>
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        تفاصيل الحالة
      </Typography>

      {actor && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              src={actor.avatar_url || defaultAvatar}
              alt={actor.name}
              sx={{ width: 50, height: 50, borderRadius: "9px" }}
            />
            <Box>
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {actor.name}
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {actor.role === "supervisor" ? "مشرف" : actor.role}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" gap={0.7} alignItems="center">
            <AccessTimeRoundedIcon
              sx={{
                fontSize: 20,
                color: (theme) => theme.palette.dashboard.textPrimary,
              }}
            />
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 15,
                fontWeight: 600,
                direction: "ltr",
                whiteSpace: "nowrap",
              }}
            >
              {details.decision_at || history?.entered_at}
            </Typography>
          </Stack>
        </Stack>
      )}

      {message && (
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.8,
          }}
        >
          {message}
        </Typography>
      )}

      {!actor && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
        >
            {isReported && (
            <Button
              onClick={onNavigateReports}
              startIcon={<ArrowBackRoundedIcon sx={{ fontSize: 16 }} />}
              sx={{
                minWidth: 104,
                height: 32,
                px: 1.5,
                borderRadius: "999px",
                bgcolor: "#5C84FF",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 700,
                boxShadow: "0 5px 12px rgba(92, 132, 255, 0.25)",
                "&:hover": { bgcolor: "#4D75EB" },
                "& .MuiButton-startIcon": {
                  marginInlineStart: 0,
                  marginInlineEnd: "4px",
                },
              }}
            >
              التوجه إليها
            </Button>
          )}
          <Stack direction="row" gap={0.7} alignItems="center">
            <AccessTimeRoundedIcon
              sx={{
                fontSize: 20,
                color: (theme) => theme.palette.dashboard.textPrimary,
              }}
            />
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 15,
                fontWeight: 600,
                direction: "ltr",
              }}
            >
              {details.decision_at || history?.entered_at}
            </Typography>
          </Stack>

        
        </Stack>
      )}
    </Stack>
  );
}

export default function ContentStatusRecord({ contentId, onNavigateReports }) {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const statusQuery = useLibraryMaterialStatusHistoryQuery(contentId);
  const statusHistory = statusQuery.data?.data?.status_history;
  const histories = Array.isArray(statusHistory)
    ? statusHistory
    : statusHistory?.items || [];
  const currentHistory = histories[0];
  const previousHistories = histories.slice(1);
  const selectedHistory =
    histories.find((history) => history.id === selectedHistoryId) ||
    currentHistory;

  useEffect(() => {
    if (currentHistory && selectedHistoryId === null) {
      setSelectedHistoryId(currentHistory.id);
    }
  }, [currentHistory, selectedHistoryId]);

  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        minHeight: 430,
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        px: { xs: 2, md: 3 },
        py: { xs: 2.2, md: 2.6 },
        direction: "rtl",
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "thin",
        scrollbarColor: "#D0D5DD transparent",
        "&::-webkit-scrollbar": { width: 5 },
        "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 999,
          bgcolor: "#D0D5DD",
        },
      }}
    >
      {statusQuery.isLoading ? (
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
            minHeight: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              minHeight: 0,
              overflow: "visible",
              bgcolor: "transparent",
            }}
          >
            <Typography
              sx={{
                mb: 1.8,
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              الحالة الحالية
            </Typography>

            <StatusItem
              history={currentHistory}
              active={selectedHistory?.id === currentHistory.id}
              onClick={() => setSelectedHistoryId(currentHistory.id)}
            />

            {previousHistories.length > 0 && (
              <>
                <Box
                  sx={{
                    my: 2.15,
                    height: 0.0005,
                    bgcolor: (theme) => theme.palette.dashboard.divider,
                  }}
                />
                <Typography
                  sx={{
                    mb: 1.8,
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 24,
                    fontWeight: 900,
                  }}
                >
                  الحالات السابقة
                </Typography>
                <Stack spacing={1.2}>
                  {previousHistories.map((history) => (
                    <StatusItem
                      key={history.id}
                      history={history}
                      active={selectedHistory?.id === history.id}
                      onClick={() => setSelectedHistoryId(history.id)}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Box>

          <Box
            sx={{
              minHeight: 0,
              overflow: "visible",
              bgcolor: "transparent",
              pt: { md: 1 },
            }}
          >
            <StatusDetails
              history={selectedHistory}
              onNavigateReports={onNavigateReports}
            />
          </Box>
        </Box>
      ) : (
        <Typography
          sx={{
            py: 6,
            textAlign: "center",
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          لا يوجد سجل حالات لعرضه
        </Typography>
      )}
    </Box>
  );
}

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Avatar, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useLibraryMaterialReportsQuery } from "../../hooks/useLibraryMaterialReportsQuery";
import { useTestReportsQuery } from "../../../Tests/hooks/useTestReportsQuery";

const defaultAvatar =
  "http://localhost/storage/defaults/User_Avatar_Default.svg";

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function ReportCard({ item }) {
  const reporter = item.reporter || {};

  return (
    <Box sx={{ textAlign: "right" }}>
      <Stack direction="row-reverse" spacing={0.6} alignItems="flex-start">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={0.6}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "fit-content", maxWidth: "100%", direction: "rtl" }}
            gap={1}
          >
            <Avatar
              src={reporter.avatar_url || reporter.avatar || defaultAvatar}
              alt={reporter.name}
              sx={{ width: 56, height: 56, borderRadius: "10px", flexShrink: 0 }}
            />
            <Stack spacing={0.45} alignItems="flex-start" sx={{ minWidth: 0 }}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  {reporter.name}
                </Typography>
                {reporter.is_academically_verified && (
                  <VerifiedRoundedIcon
                    sx={{ fontSize: 15, color: "#5C84FF" }}
                  />
                )}
              </Stack>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1.15,
                  minHeight: 22,
                  maxWidth: "100%",
                  borderRadius: "7px",
                  bgcolor: (theme) =>
                    theme.palette.dashboard.activeItem.background,
                  color: "#5C84FF",
                  fontSize: 11,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  textAlign: "right",
                }}
              >
                {item.reason}
              </Box>
            </Stack>
          </Stack>

          {item.description && (
            <Typography
              sx={{
                mt: 1,
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.45,
                maxWidth: 430,
                wordBreak: "break-word",
              }}
            >
              {item.description}
            </Typography>
          )}

          <Stack
            direction="row-reverse"
            spacing={0.7}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ mt: 0.9 }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {item.reported_at}
            </Typography>
            <AccessTimeRoundedIcon
              sx={{
                fontSize: 17,
                color: (theme) => theme.palette.dashboard.textPrimary,
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default function ContentCreationsRecord({ testId, contentId }) {
  const testReportsQuery = useTestReportsQuery(testId, { per_page: 20 });
  const contentReportsQuery = useLibraryMaterialReportsQuery(contentId, {
    per_page: 10,
  });
  const reportsQuery = contentId ? contentReportsQuery : testReportsQuery;
  const reportPages = reportsQuery.data?.pages || [];
  const firstPageData = reportPages[0]?.data || {};
  const statistics = firstPageData.statistics || {};
  const reportReasons =
    statistics.reports_by_reason || statistics.reasons || [];
  const reports = reportPages.flatMap((page) => {
    const pageReports = page?.data?.reports;
    return Array.isArray(pageReports) ? pageReports : pageReports?.items || [];
  });
  const scrollContainerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = reportsQuery;

  useEffect(() => {
    const root = scrollContainerRef.current;
    const target = loadMoreRef.current;

    if (!root || !target || !hasNextPage) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root,
        rootMargin: "0px 0px 180px 0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, reports.length]);

  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        borderRadius: "18px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: "stretch",
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 23,
              fontWeight: 800,
              textAlign: "right",
              mb: 2.4,
            }}
          >
            الإبلاغات
          </Typography>

          <Box
            ref={scrollContainerRef}
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              pr: 0.5,
              pb: 3,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Stack spacing={3.1}>
              {reports.map((report) => (
                <ReportCard key={report.id} item={report} />
              ))}

              {reportsQuery.isFetchingNextPage && (
                <Typography
                  sx={{
                    py: 1.5,
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  جاري تحميل المزيد...
                </Typography>
              )}

              {reportsQuery.isLoading && (
                <Box sx={{ py: 5, display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={28} />
                </Box>
              )}

              {!reportsQuery.isLoading && reports.length === 0 && (
                <Typography
                  sx={{
                    py: 5,
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    fontSize: 15,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  لا توجد إبلاغات لعرضها
                </Typography>
              )}

              <Box ref={loadMoreRef} sx={{ height: 1, flexShrink: 0 }} />
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            minHeight: 0,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pb: 2,
          }}
        >
          <Stack
            direction="row-reverse"
            alignItems="center"
            gap={1}
            sx={{ mb: 2.2 }}
            justifyContent="flex-end"
          >
            <Box
              sx={{
                minWidth: 34,
                height: 24,
                px: 1,
                borderRadius: "8px",
                bgcolor: "#5C84FF",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {formatNumber(statistics.total_reports_count)}
            </Box>
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 23,
                fontWeight: 800,
              }}
            >
              إحصائية الإبلاغات
            </Typography>
          </Stack>

          <Stack spacing={1.8}>
            {reportReasons.map((stat, index) => (
              <Box
                key={`${stat.reason}-${index}`}
                sx={{
                  minHeight: 56,
                  borderRadius: "8px",
                  border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                  px: 2.2,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {stat.reason}
                </Typography>
                <Typography
                  sx={{
                    color: (theme) =>
                      index === 0
                        ? "#FF6A64"
                        : theme.palette.dashboard.textPrimary,
                    fontSize: 20,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {formatNumber(stat.reports_count)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate, useParams } from "react-router";
import ContentStatsPanel from "../../components/ContentStatsPanel";
import TicketCard from "../../../Home/components/TicketCard";
import { useUserProfileTestsQuery } from "../../hooks/useUserProfileTestsQuery";

const EMPTY_TESTS = [];

function getDifficultyColor(difficulty) {
  if (difficulty === "سهل") return "#34C759";
  if (difficulty === "متوسط") return "#FFB54D";
  return "#FF7373";
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

export default function UserProfileTestsPanel() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const testsQuery = useUserProfileTestsQuery(userId);
  const responseData = testsQuery.data?.data || testsQuery.data || {};
  const stats = responseData.stats || {};
  const tests = responseData.tests || EMPTY_TESTS;
  const totalTestsCount = Math.max(
    Number(stats.total_tests_count || 0),
    tests.length,
  );

  const testsSummary = [
    {
      id: "all-tests",
      title: "عدد الاختبارات الكلي",
      value: totalTestsCount,
      unit: "اختبار",
    },
    {
      id: "free-tests",
      title: "عدد الاختبارات المجانية",
      value: stats.free_tests_count ?? 0,
      unit: "اختبار",
    },
    {
      id: "paid-tests",
      title: "عدد الاختبارات المدفوعة",
      value: stats.paid_tests_count ?? 0,
      unit: "اختبار",
    },
  ];

  const displayedTests = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLocaleLowerCase("ar");

    if (!normalizedSearch) return tests;

    return tests.filter((test) =>
      [test.title, test.description, ...(test.interests || [])].some((value) =>
        String(value || "").toLocaleLowerCase("ar").includes(normalizedSearch),
      ),
    );
  }, [searchValue, tests]);

  return (
    <Box
      sx={{
        mt: 0.8,
        borderRadius: "18px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        overflow: "hidden",
        p: { xs: 1.5, md: 2.2 },
        direction: "rtl",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      

        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }}>
          <Button
            endIcon={<KeyboardArrowDownRoundedIcon />}
            sx={{
              minWidth: 110,
              height: 42,
              borderRadius: "999px",
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 15,
              fontWeight: 500,
              "&:hover": {
                bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              },
            }}
          >
            المعرف
          </Button>

          <Box
            sx={{
              width: { xs: "100%", md: 310 },
              height: 46,
              borderRadius: "999px",
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              px: 1.8,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SearchRoundedIcon
              sx={{ color: (theme) => theme.palette.dashboard.textSecondary }}
            />
            <InputBase
              placeholder="البحث عن اختبار"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              sx={{
                flex: 1,
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 15,
                textAlign: "right",
                "& input": {
                  textAlign: "right",
                },
              }}
            />
          </Box>
        </Stack>
          <InfoOutlinedIcon
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 22,
            }}
          />
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2.2,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", lg: "16%" },
            flexShrink: 0,
            position: "relative",
            px: 2.4,
            py: 2.2,
            order: { xs: 2, lg: 2 },
            "&::before": {
              content: '""',
              display: { xs: "none", lg: "block" },
              position: "absolute",
              top: -80,
              bottom: -26,
              right: 0,
              width: "3px",
              background: (theme) =>
                `repeating-linear-gradient(to bottom, ${theme.palette.dashboard.divider} 0 10px, transparent 10px 18px)`,
            },
          }}
        >
          <ContentStatsPanel
            stats={testsSummary}
            showInfoIcon={false}
            borderSide="none"
            sx={{ height: "100%", px: 0, py: 0 }}
          />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            flex: 1,
            width: { xs: "100%", lg: "84%" },
            order: { xs: 1, lg: 1 },
          }}
        >
          {testsQuery.isLoading ? (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ py: 12, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={34} />
              </Box>
            </Grid>
          ) : displayedTests.length ? (
            displayedTests.map((test) => (
            <Grid size={{ xs: 12, sm: 6 }} key={test.id}>
              <TicketCard
                title={test.title}
                description={test.description}
                difficulty={test.difficulty_level}
                difficultyColor={getDifficultyColor(test.difficulty_level)}
                price={formatPrice(test.price)}
                rating={test.average_rating ?? 0}
                questionsCount={test.question_count ?? 0}
                duration={test.published_at || "-"}
                durationLabel=""
                tags={(test.interests || []).map((interest) => `# ${interest}`)}
                onClick={() => navigate(`/test-details/${test.id}`)}
              />
            </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography
                sx={{
                  py: 12,
                  textAlign: "center",
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {searchValue
                  ? "لا توجد اختبارات مطابقة للبحث"
                  : "لا توجد اختبارات لهذا المستخدم"}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

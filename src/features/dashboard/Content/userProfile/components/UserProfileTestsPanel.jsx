import { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate, useParams } from "react-router";
import ContentStatsPanel from "../../components/ContentStatsPanel";
import TicketCard from "../../../Home/components/HomeSection2/TicketCard";
import { useUserProfileTestsQuery } from "../../hooks/useUserProfileTestsQuery";

const EMPTY_TESTS = [];

const SORT_OPTIONS = [
  { value: "latest", label: "الأحدث" },
  { value: "price", label: "السعر" },
  { value: "rating", label: "التقييم" },
  { value: "difficulty", label: "مستوى الصعوبة" },
];

const DIFFICULTY_ORDER = {
  "سهل": 1,
  "متوسط": 2,
  "صعب": 3,
};

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
  const [sortBy, setSortBy] = useState("latest");
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
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
    const filteredTests = normalizedSearch
      ? tests.filter((test) =>
          [test.title, test.description, ...(test.interests || [])].some((value) =>
            String(value || "")
              .toLocaleLowerCase("ar")
              .includes(normalizedSearch),
          ),
        )
      : tests;

    return [...filteredTests].sort((firstTest, secondTest) => {
      if (sortBy === "price") {
        return Number(secondTest.price || 0) - Number(firstTest.price || 0);
      }

      if (sortBy === "rating") {
        return (
          Number(secondTest.average_rating || 0) -
          Number(firstTest.average_rating || 0)
        );
      }

      if (sortBy === "difficulty") {
        return (
          (DIFFICULTY_ORDER[secondTest.difficulty_level] || 0) -
          (DIFFICULTY_ORDER[firstTest.difficulty_level] || 0)
        );
      }

      const firstDate = Date.parse(firstTest.published_at) || 0;
      const secondDate = Date.parse(secondTest.published_at) || 0;

      return secondDate - firstDate;
    });
  }, [searchValue, sortBy, tests]);
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label || "الأحدث";

  return (
    <Box
      sx={{
        mt: 0.8,
        borderRadius: "18px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.dashboard.chartBackground
            : theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        overflow: "hidden",
        p: { xs: 1.5, md: 2.2 },
        direction: "rtl",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      

        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }} gap={1}>
         

          <Box
            sx={{
              width: { xs: "100%", md: 310 },
              height: 46,
              borderRadius: "999px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.dashboard.chartBackground
                  : theme.palette.dashboard.surface,
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              boxShadow: (theme) => theme.palette.dashboard.shadow,
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
                "& input::placeholder": {
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  opacity: 1,
                },
              }}
            />
          </Box>
           <Button
            onClick={(event) => setSortAnchorEl(event.currentTarget)}
            endIcon={<KeyboardArrowDownRoundedIcon />}
            sx={{
              minWidth: 110,
              height: 42,
              borderRadius: "999px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.dashboard.chartBackground
                  : theme.palette.dashboard.surface,
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              boxShadow: (theme) => theme.palette.dashboard.shadow,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 15,
              fontWeight: 500,
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.dashboard.chartBackground
                    : theme.palette.dashboard.surface,
                border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              },
              "& .MuiButton-endIcon": {
                color: (theme) => theme.palette.dashboard.textSecondary,
              },
            }}
          >
            {selectedSortLabel}
          </Button>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={() => setSortAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 0.75,
                  minWidth: 164,
                  borderRadius: "10px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.dashboard.chartBackground
                      : theme.palette.dashboard.surface,
                  border: (theme) =>
                    `1px solid ${theme.palette.dashboard.chartBorder}`,
                  boxShadow: (theme) => theme.palette.dashboard.shadow,
                  direction: "rtl",
                },
              },
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                selected={sortBy === option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setSortAnchorEl(null);
                }}
                sx={{
                  justifyContent: "flex-end",
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
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
            display: { xs: "none", lg: "block" },
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

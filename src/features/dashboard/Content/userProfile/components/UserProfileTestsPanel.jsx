import { Box, Button, Grid, InputBase, Stack } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router";
import ContentStatsPanel from "../../components/ContentStatsPanel";
import TicketCard from "../../../Home/components/TicketCard";

const testsSummary = [
  {
    id: "all-tests",
    title: "عدد الاختبارات الكلي",
    value: "17000",
    unit: "اختبار",
  },
  {
    id: "free-tests",
    title: "عدد الاختبارات المجانية",
    value: "5000",
    unit: "اختبار",
  },
  {
    id: "paid-tests",
    title: "عدد الاختبارات المدفوعة",
    value: "12000",
    unit: "اختبار",
  },
];

const testsData = [
  {
    title: "جلسة امتحانية أولى",
    difficulty: "صعب",
    difficultyColor: "#FF7373",
    price: "180",
    rating: "3.2",
    questionsCount: "89",
    duration: "5",
    durationLabel: "يوم",
    tags: ["# علوم أساسية", "# برمجة", "..."],
  },
  {
    title: "جلسة امتحانية ثانية",
    difficulty: "متوسط",
    difficultyColor: "#FFB54D",
    price: "240",
    rating: "4.5",
    questionsCount: "22",
    duration: "4",
    durationLabel: "أشهر",
    tags: ["# برمجة", "# أرشفة", "..."],
  },
  {
    title: "جلسة امتحانية ثالثة",
    difficulty: "مستمر",
    difficultyColor: "#7ED957",
    price: "1280",
    rating: "4.5",
    questionsCount: "89",
    questionsLabel: "دقيقة",
    duration: "2",
    durationLabel: "شهر",
    tags: ["# علوم أساسية", "# برمجة", "..."],
  },
  {
    title: "جلسة امتحانية رابعة",
    difficulty: "صعب",
    difficultyColor: "#FF7373",
    price: "320",
    rating: "3.8",
    questionsCount: "56",
    duration: "8",
    durationLabel: "أيام",
    tags: ["# خوارزميات", "# ذكاء اصطناعي", "..."],
  },
];

export default function UserProfileTestsPanel() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 0.8,
        borderRadius: "18px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
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
              bgcolor: "#F5F5F5",
              color: "#8A8A8A",
              fontSize: 15,
              fontWeight: 500,
              "&:hover": {
                bgcolor: "#F5F5F5",
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
              bgcolor: "#F5F5F5",
              px: 1.8,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SearchRoundedIcon sx={{ color: "#A0A0A0" }} />
            <InputBase
              placeholder="البحث عن اختبار"
              sx={{
                flex: 1,
                color: "#263238",
                fontSize: 15,
                textAlign: "right",
                "& input": {
                  textAlign: "right",
                },
              }}
            />
          </Box>
        </Stack>
          <InfoOutlinedIcon sx={{ color: "#263238", fontSize: 22 }} />
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
              background:
                "repeating-linear-gradient(to bottom, #D7D7D7 0 10px, transparent 10px 18px)",
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
          {testsData.map((test, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={`${test.title}-${index}`}>
              <TicketCard
                {...test}
                onClick={() => navigate(`/test-details/${index + 1}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

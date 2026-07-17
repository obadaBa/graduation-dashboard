import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HomeStatsChart from "./HomeStatsChart";
import HomeHeader from "./HomeHeader";

export default function HomeSection1({ onScrollNext }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
      }}
    >
      <HomeHeader />

      <Box sx={{ mt: 7 }}>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: { xs: 28, md: 38 },
              fontWeight: 700,
              lineHeight: 1.35,
            }}
          >
            احصائيات لوحة التحكم السنوية
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 28, md: 38 },
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            <Box component="span" sx={{ color: (theme) => theme.palette.dashboard.textPrimary }}>
              تطبيق{" "}
            </Box>
            <Box component="span" sx={{ color: (theme) => theme.palette.dashboard.logoPrimary }}>
              نيرد
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: { xs: 15, md: 18 },
              fontWeight: 500,
              lineHeight: 1.7,
              maxWidth: 430,
            }}
          >
            تتبع وحلل أداء تطبيقك من خلال واجهة الاحصائيات السهلة والمتكاملة
            والتي تقدم احصائيات سنوية
          </Typography>
        </Box>

        <Box sx={{ mt: 1, position: "relative" }}>
          <HomeStatsChart />

          <IconButton
            onClick={onScrollNext}
            sx={{
              position: "absolute",
              left: 49,
              bottom: -17,
              width: 34,
              height: 34,
              borderRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 10px 24px rgba(0, 0, 0, 0.22)"
                  : "0 4px 10px rgba(15, 23, 42, 0.06)",
              color: (theme) => theme.palette.dashboard.chartTextPrimary,
              zIndex: 2,
            }}
          >
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 38 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

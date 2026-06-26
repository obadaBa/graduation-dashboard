import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TestsSection1 from "../../../features/dashboard/Tests/components/TestsSection1";

export default function DashboardTests() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: { xs: "auto", md: "auto", lg: "100vh" },
        overflowY: { xs: "auto", md: "auto", lg: "hidden" },
        overflowX: "visible",
        bgcolor: theme.palette.dashboard.pageBackground,
        color: theme.palette.dashboard.textPrimary,
        scrollBehavior: "smooth",
        pr: { xs: 0, md: 1 },
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <TestsSection1 />
    </Box>
  );
}

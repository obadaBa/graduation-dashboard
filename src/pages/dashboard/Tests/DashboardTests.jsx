import { Box } from "@mui/material";
import TestsSection1 from "../../../features/dashboard/Tests/components/TestsSection1";

export default function DashboardTests() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: { xs: "auto", md: "auto", lg: "100vh" },
        overflowY: { xs: "auto", md: "auto", lg: "hidden" },
        overflowX: "visible",
        scrollBehavior: "smooth",
        pr: { xs: 0, md: 1 },
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <TestsSection1 />
    </Box>
  );
}

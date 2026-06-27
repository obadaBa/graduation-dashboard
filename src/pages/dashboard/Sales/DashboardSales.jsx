import { Box } from "@mui/material";
import SalesSection1 from "../../../features/dashboard/Sales/components/SalesSection1";

export default function DashboardSales() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "hidden",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        pr: { xs: 0, md: 1 },
      }}
    >
      <SalesSection1 />
    </Box>
  );
}

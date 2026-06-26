import { forwardRef, useState } from "react";
import { Box } from "@mui/material";
import HomeSection2Header from "./HomeSection2Header";
import HalfCircleSales from "./HalfCircleSales";
import { useHomeFinancialStatsQuery } from "../hooks/useHomeFinancialStatsQuery";

const HomeSection2 = forwardRef(function HomeSection2(
  { onScrollPrev, onScrollNext },
  ref,
) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const financialStatsQuery = useHomeFinancialStatsQuery(selectedYear);
  const financialStats = financialStatsQuery.data?.data;
  const availableYears = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: "100vh",
        width: "100%",
        flexShrink: 0,
        px: { xs: 1.5, md: 3 },
        pt: 2,
        pb: { xs: 10, md: 7, lg: 2 },
      }}
    >
      <HomeSection2Header
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableYears={availableYears}
        financialStats={financialStats}
        isLoading={financialStatsQuery.isLoading}
      />
      <HalfCircleSales
        onScrollPrev={onScrollPrev}
        onScrollNext={onScrollNext}
        financialStats={financialStats}
        isLoading={financialStatsQuery.isLoading}
      />
    </Box>
  );
});

export default HomeSection2;

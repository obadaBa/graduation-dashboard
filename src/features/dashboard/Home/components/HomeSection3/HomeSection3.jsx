import { useState } from "react";
import { Box } from "@mui/material";
import HomeSection3Header from "./HomeSection3Header";
import HomeSection3AudienceChart from "./HomeSection3AudienceChart";
import HomeSection3SourceChart from "./HomeSection3SourceChart";
import HomeSection3ContentChart from "./HomeSection3ContentChart";
import { useHomeLibraryStatsQuery } from "../../hooks/useHomeLibraryStatsQuery";

function buildAvailableYears() {
  const currentYear = new Date().getFullYear();
  const firstYear = 2025;

  return Array.from(
    { length: Math.max(1, currentYear - firstYear + 1) },
    (_, index) => currentYear - index,
  );
}

export default function HomeSection3() {
  const availableYears = buildAvailableYears();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const libraryStatsQuery = useHomeLibraryStatsQuery(selectedYear);
  const libraryStatsData = libraryStatsQuery.data?.data;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
        borderRadius: "24px",
      }}
    >
      <HomeSection3Header
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableYears={availableYears}
        libraryStats={libraryStatsData}
        isLoading={libraryStatsQuery.isLoading}
      />

      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 2.5,
          alignItems: "stretch",
          justifyItems: { xs: "start", lg: "stretch" },
        }}
      >
        <HomeSection3SourceChart
          discoverySources={libraryStatsData?.discovery_sources}
        />
        <HomeSection3AudienceChart gender={libraryStatsData?.gender} />
      </Box>

      <HomeSection3ContentChart
        libraryMaterialYearlyActivity={
          libraryStatsData?.library_material_yearly_activity
        }
      />
    </Box>
  );
}

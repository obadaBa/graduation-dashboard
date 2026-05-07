import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import TestsHeader from "./TestsHeader";
import TestsDaysScroller, { TODAY_DAY_ID } from "./TestsDaysScroller";
import TestsFilterBar from "./TestsFilterBar";
import TestsBoard from "./TestsBoard";
import TestsListView from "./TestsListView";
import { createEmptyDayData, MOCK_TESTS_BY_DAY } from "../tests.mock";

export default function TestsSection1() {
  const [selectedDayId, setSelectedDayId] = useState(TODAY_DAY_ID);
  const [viewMode, setViewMode] = useState("board");

  const selectedDayData = useMemo(
    () => MOCK_TESTS_BY_DAY[selectedDayId] ?? createEmptyDayData(),
    [selectedDayId],
  );

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "auto", lg: "100%" },
        minHeight: { xs: "100vh", md: "100vh", lg: 0 },
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TestsHeader />
      <TestsDaysScroller
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
      />
      <TestsFilterBar viewMode={viewMode} onViewModeChange={setViewMode} />
      {viewMode === "board" ? (
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 auto", lg: 1 },
            minHeight: { xs: "auto", md: "auto", lg: 0 },
            width: "100%",
            minWidth: 0,
            overflowX: { xs: "auto", md: "auto", lg: "hidden" },
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <TestsBoard dayData={selectedDayData} />
        </Box>
      ) : (
        <TestsListView dayData={selectedDayData} />
      )}
    </Box>
  );
}

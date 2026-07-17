import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSalesQuery } from "../hooks/useSalesQuery";
import SalesActions from "./SalesActions";
import SalesHeader from "./SalesHeader";
import SalesTable from "./SalesTable";

export default function SalesSection1() {
  const queryClient = useQueryClient();
  const [period, setPeriod] = useState("today");
  const [sortBy, setSortBy] = useState("purchased_at");
  const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });

  const salesQuery = useSalesQuery({
    period,
    sortBy,
    startDate: customRange.startDate,
    endDate: customRange.endDate,
  });

  const resetSalesPages = () => {
    queryClient.removeQueries({ queryKey: ["sales", "list"], exact: false });
  };

  const handlePeriodChange = (nextPeriod) => {
    if (nextPeriod === period) return;
    resetSalesPages();
    setPeriod(nextPeriod);

    if (nextPeriod !== "custom") {
      setCustomRange({ startDate: "", endDate: "" });
    }
  };

  const handleSortChange = (nextSortBy) => {
    if (nextSortBy === sortBy) return;
    resetSalesPages();
    setSortBy(nextSortBy);
  };

  const handleCustomRangeChange = (nextRange) => {
    resetSalesPages();
    setCustomRange(nextRange);
    setPeriod("custom");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        px: { xs: 1.5, md: 3 },
        py: 2,
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <SalesHeader
        salesQuery={salesQuery}
        period={period}
        sortBy={sortBy}
        customRange={customRange}
      />
      <SalesActions
        period={period}
        onPeriodChange={handlePeriodChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        customRange={customRange}
        onCustomRangeChange={handleCustomRangeChange}
      />
      <SalesTable salesQuery={salesQuery} />
    </Box>
  );
}

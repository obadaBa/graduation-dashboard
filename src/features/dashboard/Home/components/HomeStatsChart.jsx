import { useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useHomeYearlyTestActivityQuery } from "../hooks/useHomeYearlyTestActivityQuery";
import HomeStatsExportButton from "./HomeStatsExportButton";

const monthLabels = {
  1: "كانون\nالثاني",
  2: "شباط",
  3: "آذار",
  4: "نيسان",
  5: "أيار",
  6: "حزيران",
  7: "تموز",
  8: "آب",
  9: "أيلول",
  10: "تشرين\nالأول",
  11: "تشرين\nالثاني",
  12: "كانون\nالأول",
};

const fallbackMonths = Array.from({ length: 12 }, (_, index) => ({
  month_no: index + 1,
  published_tests_count: 0,
  likes_count: 0,
  reviews_count: 0,
  downloads_count: 0,
}));

function buildChartData(apiData) {
  const year = apiData?.year || new Date().getFullYear();
  const monthsByNumber = new Map(
    (apiData?.months || []).map((month) => [month.month_no, month]),
  );

  const normalizedMonths = fallbackMonths.map((month) => ({
    ...month,
    ...(monthsByNumber.get(month.month_no) || {}),
  }));

  const labels = normalizedMonths.map((month) => monthLabels[month.month_no]);
  const testsSeries = {
    key: "tests",
    label: "عدد الاختبارات",
    color: "#5583FF",
    values: normalizedMonths.map((month) => month.published_tests_count || 0),
  };
  const stackedSeries = [
    {
      key: "downloads",
      label: "عدد التنزيلات",
      color: "#FFD248",
      values: normalizedMonths.map((month) => month.downloads_count || 0),
    },
    {
      key: "reviews",
      label: "عدد التعليقات",
      color: "#12B981",
      values: normalizedMonths.map((month) => month.reviews_count || 0),
    },
    {
      key: "likes",
      label: "عدد الاعجابات",
      color: "#FF2C6D",
      values: normalizedMonths.map((month) => month.likes_count || 0),
    },
  ];

  return {
    year,
    labels,
    testsSeries,
    stackedSeries,
  };
}

function LegendItem({ color, label }) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          bgcolor: color,
        }}
      />
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.chartTextPrimary,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

function StackedTooltip({ values }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: 104,
        px: 1,
        py: 0.85,
        borderRadius: "16px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.dashboard.surface
            : "#F7F1E8",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 12px 28px rgba(0, 0, 0, 0.34)"
            : "0 6px 18px rgba(15, 23, 42, 0.18)",
        zIndex: 3,
        "&::after": {
          content: '""',
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: (theme) =>
            `7px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.dashboard.surface
                : "#F7F1E8"
            }`,
        },
      }}
    >
      <Stack spacing={0.75}>
        {values
          .filter((item) => item.value > 0)
          .reverse()
          .map((item) => (
            <Stack
              key={item.key}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1.25}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.chartTextSecondary,
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {item.label}
              </Typography>

              <Stack direction="row" spacing={0.75} alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: item.color,
                  }}
                />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.chartTextPrimary,
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </Typography>
              </Stack>
            </Stack>
          ))}
      </Stack>
    </Box>
  );
}

export default function HomeStatsChart() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const yearlyActivityQuery = useHomeYearlyTestActivityQuery();
  const chartData = buildChartData(yearlyActivityQuery.data?.data);
  const { year, labels, testsSeries, stackedSeries } = chartData;

  const stackedTotals = labels.map((_, monthIndex) =>
    stackedSeries.reduce((sum, item) => sum + item.values[monthIndex], 0),
  );
  const dataMax = Math.max(1, ...testsSeries.values, ...stackedTotals);
  const tickStep = dataMax <= 100 ? 20 : dataMax <= 500 ? 100 : 200;
  const maxValue = Math.ceil(dataMax / tickStep) * tickStep;
  const yTicks = Array.from(
    { length: Math.floor(maxValue / tickStep) + 1 },
    (_, index) => index * tickStep,
  );

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.25}
        sx={{
          pt: { md: 3 },
          width: "100%",
          justifyContent: { sm: "flex-end" },
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
        }}
        gap={2}
      >
        <HomeStatsExportButton
          year={year}
          testsSeries={testsSeries}
          stackedSeries={stackedSeries}
        />

        <Select
          value={String(year)}
          size="small"
          disabled
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            minWidth: 116,
            height: 42,
            borderRadius: "12px",
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 10px 24px rgba(0, 0, 0, 0.22)"
                : "0 4px 14px rgba(15, 23, 42, 0.06)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.dashboard.chartBorder,
            },
            ".MuiSelect-select": {
              py: 1,
              pr: 1.5,
              pl: 4,
              color: "#5583FF",
              fontSize: 15,
              fontWeight: 600,
            },
            ".MuiSelect-select.Mui-disabled": {
              WebkitTextFillColor: "#5583FF",
            },
            "&.Mui-disabled": {
              opacity: 1,
            },
            ".MuiSvgIcon-root": {
              left: 10,
              right: "auto",
              color: "#5583FF",
            },
          }}
        >
          <MenuItem value={String(year)}>{year}</MenuItem>
        </Select>
      </Stack>

      <Box
        sx={{
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          borderRadius: "16px",
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 16px 36px rgba(0, 0, 0, 0.24)"
              : "0 4px 14px rgba(15, 23, 42, 0.04)",
          px: { xs: 1.5, md: 3 },
          py: { xs: 2, md: 2.5 },
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.chartTextPrimary,
              fontSize: { xs: 22, md: 24 },
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            أداء نشر الاختبارات السنوي
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            gap={2}
            justifyContent="space-between"
          >
            <LegendItem color={testsSeries.color} label="عدد الاختبارات" />
            <LegendItem color="#12B981" label="عدد التعليقات" />
            <LegendItem color="#FFD248" label="عدد التنزيلات" />
            <LegendItem color="#FF2C6D" label="عدد الاعجابات" />
          </Stack>
        </Stack>

        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 44px",
            gap: 1.5,
            minHeight: 300,
            opacity: yearlyActivityQuery.isLoading ? 0.75 : 1,
          }}
        >
          <Box sx={{ position: "relative", height: 300 }}>
            {yTicks.slice(1).map((tick) => (
              <Box
                key={tick}
                sx={{
                  position: "absolute",
                  right: 0,
                  left: 0,
                  bottom: `${(tick / maxValue) * 100}%`,
                  borderTop: (theme) => `1px solid ${theme.palette.dashboard.chartGrid}`,
                }}
              />
            ))}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{
                position: "absolute",
                inset: 0,
                pt: 1,
                pb: 0,
              }}
            >
              {labels.map((label, monthIndex) => {
                const stackedValues = stackedSeries.map((item) => ({
                  key: item.key,
                  label: item.label,
                  color: item.color,
                  value: item.values[monthIndex],
                }));
                const stackedTotal = stackedValues.reduce(
                  (sum, item) => sum + item.value,
                  0,
                );
                const stackedHovered =
                  hoveredBar?.type === "stacked" &&
                  hoveredBar?.monthIndex === monthIndex;
                const testsHovered =
                  hoveredBar?.type === "tests" &&
                  hoveredBar?.monthIndex === monthIndex;

                return (
                  <Stack
                    key={`${label}-${monthIndex}`}
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ flex: 1, minWidth: 0, height: "100%" }}
                  >
                    <Box
                      sx={{
                        height: 240,
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        gap: "7px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: { xs: 8, sm: 10 },
                          height: `${(testsSeries.values[monthIndex] / maxValue) * 100}%`,
                          minHeight: testsSeries.values[monthIndex] > 0 ? 6 : 0,
                          bgcolor: testsSeries.color,
                          borderRadius: "2px 2px 0 0",
                          cursor:
                            testsSeries.values[monthIndex] > 0
                              ? "pointer"
                              : "default",
                          transition: "transform 0.15s ease",
                          transform: testsHovered ? "scaleY(1.02)" : "none",
                        }}
                        onMouseEnter={() => {
                          if (testsSeries.values[monthIndex] > 0) {
                            setHoveredBar({ type: "tests", monthIndex });
                          }
                        }}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {testsHovered && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: "calc(100% + 8px)",
                              left: "50%",
                              transform: "translateX(-50%)",
                              px: 0.75,
                              py: 0.35,
                              borderRadius: "8px",
                              bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? alpha("#0B1220", 0.96)
                                  : "#263238",
                              color: "#FFFFFF",
                              fontSize: 11,
                              fontWeight: 600,
                              lineHeight: 1,
                              whiteSpace: "nowrap",
                              boxShadow: "0 4px 10px rgba(15, 23, 42, 0.15)",
                              zIndex: 2,
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                borderLeft: "5px solid transparent",
                                borderRight: "5px solid transparent",
                                borderTop: (theme) =>
                                  `6px solid ${
                                    theme.palette.mode === "dark"
                                      ? alpha("#0B1220", 0.96)
                                      : "#263238"
                                  }`,
                              },
                            }}
                          >
                            {testsSeries.values[monthIndex]}
                          </Box>
                        )}
                      </Box>

                      <Box
                        sx={{
                          position: "relative",
                          width: { xs: 8, sm: 10 },
                          height: `${(stackedTotal / maxValue) * 100}%`,
                          minHeight: stackedTotal > 0 ? 6 : 0,
                          display: "flex",
                          flexDirection: "column-reverse",
                          cursor: stackedTotal > 0 ? "pointer" : "default",
                          transition: "transform 0.15s ease",
                          transform: stackedHovered ? "scaleY(1.02)" : "none",
                        }}
                        onMouseEnter={() => {
                          if (stackedTotal > 0) {
                            setHoveredBar({ type: "stacked", monthIndex });
                          }
                        }}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {stackedValues.map((item, index) => (
                          <Box
                            key={item.key}
                            sx={{
                              width: "100%",
                              height: `${(item.value / stackedTotal) * 100 || 0}%`,
                              bgcolor: item.color,
                              borderRadius:
                                index === stackedValues.length - 1
                                  ? "2px 2px 0 0"
                                  : "0",
                            }}
                          />
                        ))}

                        {stackedHovered && <StackedTooltip values={stackedValues} />}
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        color: (theme) => theme.palette.dashboard.chartTextSecondary,
                        fontSize: { xs: 11, md: 13 },
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: 1.2,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {label}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          <Stack
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ height: 300, pb: 4 }}
          >
            {[...yTicks].reverse().map((tick) => (
              <Typography
                key={tick}
                sx={{
                  color: (theme) => theme.palette.dashboard.chartTextSecondary,
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {tick}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

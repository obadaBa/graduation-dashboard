import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const labels = [
  "كانون\nالثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين\nالأول",
  "تشرين\nالثاني",
  "كانون\nالأول",
];

const testsSeries = {
  key: "tests",
  label: "عدد الاختبارات",
  color: "#5583FF",
  values: [600, 300, 900, 1100, 600, 300, 250, 1100, 300, 600, 900, 900],
};

const stackedSeries = [
  {
    key: "downloads",
    label: "تنزيلات",
    color: "#FFD248",
    values: [180, 180, 320, 0, 60, 180, 0, 0, 170, 340, 0, 0],
  },
  {
    key: "comments",
    label: "تعليقات",
    color: "#12B981",
    values: [850, 0, 0, 120, 120, 0, 0, 0, 820, 0, 0, 350],
  },
  {
    key: "likes",
    label: "اعجاب",
    color: "#FF2C6D",
    values: [978, 500, 350, 350, 200, 500, 350, 0, 500, 0, 0, 0],
  },
];

const stackedTotals = labels.map((_, monthIndex) =>
  stackedSeries.reduce((sum, item) => sum + item.values[monthIndex], 0),
);
const dataMax = Math.max(
  ...testsSeries.values,
  ...stackedTotals,
);
const maxValue = Math.ceil(dataMax / 200) * 200;
const yTicks = Array.from({ length: maxValue / 200 + 1 }, (_, index) => index * 200);

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
          color: "#3B3B3B",
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
        bgcolor: "#F7F1E8",
        border: "1px solid rgba(38, 50, 56, 0.14)",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.18)",
        zIndex: 3,
        "&::after": {
          content: '""',
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "7px solid #F7F1E8",
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
                  color: "#7A7A7A",
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
                    color: "#263238",
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
        <Button
          variant="contained"
          sx={{
            height: 42,
            px: 3,
            borderRadius: "12px",
            bgcolor: "#5583FF",
            boxShadow: "0 4px 14px rgba(85, 131, 255, 0.28)",
            fontSize: 16,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#5583FF",
            },
          }}
        >
          تصدير المخطط
        </Button>

        <Select
          value="current-year"
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            minWidth: 116,
            height: 42,
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#ECECEC",
            },
            ".MuiSelect-select": {
              py: 1,
              pr: 1.5,
              pl: 4,
              color: "#5583FF",
              fontSize: 15,
              fontWeight: 600,
            },
            ".MuiSvgIcon-root": {
              left: 10,
              right: "auto",
              color: "#5583FF",
            },
          }}
        >
          <MenuItem value="current-year">السنة الحالية</MenuItem>
        </Select>
      </Stack>

      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #ECECEC",
          boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)",
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
              color: "#121212",
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
                  borderTop: "1px solid #ECECEC",
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
                    key={label}
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
                            setHoveredBar({
                              type: "tests",
                              monthIndex,
                              value: testsSeries.values[monthIndex],
                            });
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
                              bgcolor: "#263238",
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
                                borderTop: "6px solid #263238",
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
                            setHoveredBar({
                              type: "stacked",
                              monthIndex,
                            });
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
                                  : index === 0
                                    ? "0"
                                    : "0",
                            }}
                          />
                        ))}

                        {stackedHovered && <StackedTooltip values={stackedValues} />}
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        color: "#4B5563",
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
                  color: "#7A7A7A",
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

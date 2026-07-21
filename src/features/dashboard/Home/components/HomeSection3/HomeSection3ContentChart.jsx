import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const monthLabels = {
  1: "كانون الثاني",
  2: "شباط",
  3: "آذار",
  4: "نيسان",
  5: "أيار",
  6: "حزيران",
  7: "تموز",
  8: "آب",
  9: "أيلول",
  10: "تشرين الأول",
  11: "تشرين الثاني",
  12: "كانون الأول",
};

function buildSmoothPath(points) {
  if (!points.length) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  return path;
}

function mapSeriesToPoints(series, width, height, minValue, maxValue) {
  const safeMax = maxValue === minValue ? maxValue + 1 : maxValue;
  const step = series.length > 1 ? width / (series.length - 1) : width;

  return series.map((value, index) => {
    const normalized = (value - minValue) / (safeMax - minValue);
    return {
      x: index * step,
      y: height - normalized * height,
      value,
    };
  });
}

function normalizeMonths(months) {
  const monthsByNumber = new Map((months || []).map((month) => [month.month_no, month]));

  return Array.from({ length: 12 }, (_, index) => {
    const monthNo = index + 1;
    return {
      month_no: monthNo,
      published_materials_count:
        monthsByNumber.get(monthNo)?.published_materials_count || 0,
      likes_count: monthsByNumber.get(monthNo)?.likes_count || 0,
    };
  });
}

export default function HomeSection3ContentChart({
  libraryMaterialYearlyActivity,
}) {
  const theme = useTheme();
  const textPrimary = theme.palette.dashboard.chartTextPrimary;
  const textSecondary = theme.palette.dashboard.chartTextSecondary;
  const gridColor = theme.palette.dashboard.chartGrid;

  const months = normalizeMonths(libraryMaterialYearlyActivity?.months);
  const monthNames = months.map((month) => monthLabels[month.month_no]);
  const publishedContent = months.map(
    (month) => month.published_materials_count || 0,
  );
  const contentInteractions = months.map((month) => month.likes_count || 0);

  const plotWidth = 880;
  const chartHeight = 120;
  const rightAxisGap = 50;
  const maxSeriesValue = Math.max(1, ...publishedContent, ...contentInteractions);
  const tickStep = maxSeriesValue <= 100 ? 20 : maxSeriesValue <= 500 ? 100 : 200;
  const maxValue = Math.ceil(maxSeriesValue / tickStep) * tickStep;
  const yTicks = Array.from(
    { length: Math.floor(maxValue / tickStep) + 1 },
    (_, index) => index * tickStep,
  );

  const bluePoints = mapSeriesToPoints(
    publishedContent,
    plotWidth,
    chartHeight,
    0,
    maxValue,
  );
  const greenPoints = mapSeriesToPoints(
    contentInteractions,
    plotWidth,
    chartHeight,
    0,
    maxValue,
  );

  return (
    <Box
      sx={{
        mt: 2.5,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        borderRadius: { xs: "14px", lg: "20px" },
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 16px 36px rgba(0, 0, 0, 0.24)"
            : "0 6px 18px rgba(15, 23, 42, 0.06)",
        width: {
          xs: "clamp(280px, 88vw, 420px)",
          sm: "clamp(360px, 72vw, 500px)",
          md: "clamp(420px, 58vw, 620px)",
          lg: "100%",
        },
        px: { xs: 1.1, sm: 1.4, md: 1.8, lg: 3 },
        py: { xs: 1.2, sm: 1.5, md: 1.8, lg: 2.25 },
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={{ xs: 1, lg: 1.5 }}
      >
        <Typography
          sx={{
            color: textPrimary,
            fontSize: { xs: 17, sm: 19, md: 22, lg: 26 },
            fontWeight: 700,
            textAlign: "right",
          }}
        >
          أداء نشر المحتوى السنوي
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 1.2, md: 1.8, lg: 3 }}
          alignItems="center"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FiberManualRecordRoundedIcon sx={{ color: "#10B981", fontSize: { xs: 10, md: 13, lg: 16 } }} />
            <Typography sx={{ color: textPrimary, fontSize: { xs: 11, md: 14, lg: 20 }, fontWeight: 500 }}>
              التفاعلات على المحتوى
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <FiberManualRecordRoundedIcon sx={{ color: "#4D8BFF", fontSize: { xs: 10, md: 13, lg: 16 } }} />
            <Typography sx={{ color: textPrimary, fontSize: { xs: 11, md: 14, lg: 20 }, fontWeight: 500 }}>
              المحتوى المنشور
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ mt: { xs: 1, lg: 1.75 }, overflow: "hidden" }}>
        <Box sx={{ width: "100%", position: "relative" }}>
          <Box
            component="svg"
            viewBox={`0 0 ${plotWidth + rightAxisGap + 40} ${chartHeight + 73}`}
            preserveAspectRatio="none"
            sx={{
              width: "100%",
              height: { xs: 165, sm: 185, md: 205, lg: "auto" },
              display: "block",
            }}
          >
            <g transform="translate(26 10)">
              {yTicks.map((tick) => {
                const y = chartHeight - (tick / maxValue) * chartHeight;
                return (
                  <g key={tick}>
                    <line
                      x1="0"
                      y1={y}
                      x2={plotWidth}
                      y2={y}
                      stroke={gridColor}
                      strokeWidth="1"
                    />
                    <text
                      x={plotWidth + rightAxisGap}
                      y={y + 6}
                      fill={textSecondary}
                      fontSize="15"
                      fontWeight="500"
                      textAnchor="start"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path
                d={buildSmoothPath(bluePoints)}
                fill="none"
                stroke="#4D8BFF"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d={buildSmoothPath(greenPoints)}
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {bluePoints.map((point, index) => (
                <circle key={`blue-${monthNames[index]}`} cx={point.x} cy={point.y} r="5" fill="#4D8BFF" />
              ))}

              {greenPoints.map((point, index) => (
                <circle key={`green-${monthNames[index]}`} cx={point.x} cy={point.y} r="5" fill="#10B981" />
              ))}

              {monthNames.map((month, index) => {
                const x = bluePoints[index].x;
                const [firstLine, secondLine] = month.split(" ");
                return (
                  <g key={month}>
                    <text
                      x={x}
                      y={chartHeight + 28}
                      fill={textSecondary}
                      fontSize="15"
                      fontWeight="500"
                      textAnchor="middle"
                    >
                      {firstLine}
                    </text>
                    {secondLine && (
                      <text
                        x={x}
                        y={chartHeight + 48}
                        fill={textSecondary}
                        fontSize="15"
                        fontWeight="500"
                        textAnchor="middle"
                      >
                        {secondLine}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

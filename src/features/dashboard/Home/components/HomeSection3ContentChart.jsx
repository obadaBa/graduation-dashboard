import { Box, Stack, Typography } from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const months = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
];

const publishedContent = [650, 960, 940, 670, 520, 810, 990];
const contentInteractions = [200, 480, 610, 550, 200, 280, 20];

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
  const step = width / (series.length - 1);
  return series.map((value, index) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return {
      x: index * step,
      y: height - normalized * height,
      value,
    };
  });
}

export default function HomeSection3ContentChart() {
  const plotWidth = 880;
  const chartHeight = 120;
  const rightAxisGap = 50;
  const yTicks = [0, 200, 400, 600, 800, 1000];

  const bluePoints = mapSeriesToPoints(publishedContent, plotWidth, chartHeight, 0, 1000);
  const greenPoints = mapSeriesToPoints(contentInteractions, plotWidth, chartHeight, 0, 1000);

  return (
    <Box
      sx={{
        mt: 2.5,
        bgcolor: "#FFFFFF",
        borderRadius: { xs: "14px", lg: "20px" },
        border: "1px solid #ECECEC",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
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
            color: "#111827",
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
            <Typography sx={{ color: "#263238", fontSize: { xs: 11, md: 14, lg: 20 }, fontWeight: 500 }}>
              التفاعلات على المحتوى
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <FiberManualRecordRoundedIcon sx={{ color: "#4D8BFF", fontSize: { xs: 10, md: 13, lg: 16 } }} />
            <Typography sx={{ color: "#263238", fontSize: { xs: 11, md: 14, lg: 20 }, fontWeight: 500 }}>
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
                const y = chartHeight - (tick / 1000) * chartHeight;
                return (
                  <g key={tick}>
                    <line
                      x1="0"
                      y1={y}
                      x2={plotWidth}
                      y2={y}
                      stroke="#EAEAEA"
                      strokeWidth="1"
                    />
                    <text
                      x={plotWidth + rightAxisGap}
                      y={y + 6}
                      fill="#6F6F6F"
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
                <circle key={`blue-${months[index]}`} cx={point.x} cy={point.y} r="5" fill="#4D8BFF" />
              ))}

              {greenPoints.map((point, index) => (
                <circle key={`green-${months[index]}`} cx={point.x} cy={point.y} r="5" fill="#10B981" />
              ))}

              {months.map((month, index) => {
                const x = bluePoints[index].x;
                const [firstLine, secondLine] = month.split(" ");
                return (
                  <g key={month}>
                    <text
                      x={x}
                      y={chartHeight + 28}
                      fill="#263238"
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
                        fill="#263238"
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

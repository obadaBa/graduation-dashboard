import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const sources = [
  { label: "فيسبوك", color: "#4D8BFF", value: 450 },
  { label: "لينكد ان", color: "#8F80FF", value: 390 },
  { label: "إنستغرام", color: "#8E64D8", value: 420 },
  { label: "أصدقاء", color: "#9B58B5", value: 380 },
  { label: "عائلة", color: "#B04DA8", value: 410 },
  { label: "غير ذلك", color: "#E8E8E8", value: 350 },
];

function polarToCartesian(cx, cy, radius, angle) {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function HomeSection3SourceChart() {
  const [hoveredArc, setHoveredArc] = useState(null);

  const total = useMemo(
    () => sources.reduce((sum, item) => sum + item.value, 0),
    []
  );

  const arcs = useMemo(() => {
    const startAngle = -32;
    const gapAngle = 18;
    const usableSweep = 360 - gapAngle * sources.length;
    let currentAngle = startAngle;

    return sources.map((item) => {
      const segmentAngle = (item.value / total) * usableSweep;
      const arc = {
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + segmentAngle,
        midAngle: currentAngle + segmentAngle / 2,
      };
      currentAngle += segmentAngle + gapAngle;
      return arc;
    });
  }, [total]);

  const tooltipStyle = useMemo(() => {
    if (!hoveredArc) {
      return null;
    }

    const point = polarToCartesian(110, 110, 104, hoveredArc.midAngle);
    const normalizedX = Math.min(Math.max(point.x, 54), 166);
    const normalizedY = Math.min(Math.max(point.y, 42), 178);

    return {
      left: `${(normalizedX / 220) * 100}%`,
      top: `${(normalizedY / 220) * 100}%`,
    };
  }, [hoveredArc]);

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: { xs: "14px", lg: "20px" },
        border: "1px solid #ECECEC",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
        width: {
          xs: "clamp(280px, 88vw, 420px)",
          sm: "clamp(360px, 72vw, 500px)",
          md: "clamp(420px, 58vw, 560px)",
          lg: "100%",
        },
        px: { xs: 1.1, sm: 1.4, md: 1.8, lg: 3 },
        py: { xs: 1.2, sm: 1.5, md: 1.7, lg: 1 },
        minHeight: { xs: "auto", lg: 280 },
        height: { xs: "auto", lg: 280 },
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          color: "#263238",
          fontSize: { xs: 17, sm: 19, md: 22, lg: 32 },
          fontWeight: 700,
          textAlign: "right",
        }}
      >
        كيف سمعت عن التطبيق؟
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 3 }}
        sx={{ mt: { xs: 1, md: 0 }, minWidth: 0 }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: 118, sm: 138, md: 160, lg: 220 },
            height: { xs: 118, sm: 138, md: 160, lg: 220 },
            flexShrink: 0,
          }}
        >
          <Box component="svg" viewBox="0 0 220 220" sx={{ width: "100%", height: "100%" }}>
            {arcs.map((arc) => {
              const isHovered = hoveredArc?.label === arc.label;
              const hoverOffset = isHovered ? 4 : 0;
              const hoverPoint = polarToCartesian(110, 110, hoverOffset, arc.midAngle);
              const translatedX = hoverPoint.x - 110;
              const translatedY = hoverPoint.y - 110;

              return (
                <g
                  key={arc.label}
                  transform={`translate(${translatedX} ${translatedY}) scale(${isHovered ? 1.035 : 1})`}
                  style={{
                    transformOrigin: "110px 110px",
                    transition: "transform 180ms ease",
                    cursor: "pointer",
                  }}
                >
                  <path
                    d={describeArc(110, 110, 78, arc.startAngle, arc.endAngle)}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={isHovered ? 24 : 20}
                    strokeLinecap="round"
                    style={{
                      transition: "stroke-width 180ms ease, filter 180ms ease",
                      filter: isHovered
                        ? "drop-shadow(0 4px 10px rgba(15, 23, 42, 0.18))"
                        : "none",
                    }}
                    onMouseEnter={() => setHoveredArc(arc)}
                    onMouseLeave={() => setHoveredArc(null)}
                  />
                </g>
              );
            })}
          </Box>

          {hoveredArc && tooltipStyle && (
            <Box
              sx={{
                position: "absolute",
                ...tooltipStyle,
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <Stack
                direction="row-reverse"
                alignItems="center"
                spacing={0.8}
                sx={{
                  px: 1,
                  py: 0.75,
                  borderRadius: "16px",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #D5D5D5",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.16)",
                }}
                gap={1}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 20,
                    borderRadius: "999px",
                    bgcolor: hoveredArc.color,
                  }}
                />
                <Typography sx={{ color: "#263238", fontSize: 13, fontWeight: 700 }}>
                  {hoveredArc.value}
                </Typography>
                <Typography sx={{ color: "#7C7C7C", fontSize: 12, fontWeight: 500 }}>
                  مستخدم
                </Typography>
              </Stack>
            </Box>
          )}

          <Stack
            sx={{
              position: "absolute",
              inset: 0,
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Typography sx={{ color: "#263238", fontSize: { xs: 14, sm: 15, md: 17, lg: 22 }, fontWeight: 700 }}>
              {total}
            </Typography>
            <Typography sx={{ color: "#A1A1A1", fontSize: { xs: 10, sm: 11, md: 12, lg: 16 }, fontWeight: 500 }}>
              مستخدم
            </Typography>
          </Stack>
        </Box>

        <Stack
          spacing={{ xs: 0.6, md: 0.9, lg: 1.5 }}
          sx={{
            width: { xs: "100%", sm: "46%" },
            minWidth: 0,
          }}
          gap={{ xs: 0.8, md: 1.5, lg: 3 }}
        >
          {[0, 1, 2].map((row) => (
            <Stack
              key={row}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              {[sources[row * 2 + 1], sources[row * 2]].map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ minWidth: { xs: 70, sm: 78, md: 88, lg: 110 } }}
                >
                  <FiberManualRecordRoundedIcon
                    sx={{ fontSize: { xs: 8, sm: 9, md: 11, lg: 14 }, color: item.color }}
                  />
                  <Typography
                    sx={{ color: "#263238", fontSize: { xs: 10, sm: 11, md: 13, lg: 16 }, fontWeight: 500 }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

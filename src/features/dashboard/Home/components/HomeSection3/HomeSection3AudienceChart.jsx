import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";

function polarToCartesian(cx, cy, radius, angle) {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function arcPath(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function GaugeMeter({ color, value, label, count, icon }) {
  const theme = useTheme();
  const textPrimary = theme.palette.dashboard.chartTextPrimary;
  const textSecondary = theme.palette.dashboard.chartTextSecondary;
  const gridColor = theme.palette.dashboard.chartGrid;

  const angle = -120 + (240 * value) / 100;
  const needle = polarToCartesian(132, 128, 76, angle);

  return (
    <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
      <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="center">
        {icon}
        <Typography sx={{ color: textPrimary, fontSize: { xs: 13, sm: 15, md: 17, lg: 20 }, fontWeight: 700 }}>
          {count}
        </Typography>
      </Stack>

      <Typography
        sx={{
          mt: 0.35,
          color: textSecondary,
          fontSize: { xs: 10, sm: 12, md: 13, lg: 15 },
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>

      <Box sx={{ mt: 0.2, display: "flex", justifyContent: "center" }}>
        <Box
          component="svg"
          viewBox="0 0 264 164"
          sx={{ width: "100%", maxWidth: { xs: 132, sm: 160, md: 195, lg: 276 } }}
        >
          <path
            d={arcPath(132, 128, 102, -120, 120)}
            fill="none"
            stroke={gridColor}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d={arcPath(132, 128, 102, -120, -120 + (240 * value) / 100)}
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d={arcPath(132, 128, 82, -120, 120)}
            fill="none"
            stroke={gridColor}
            strokeWidth="2"
            opacity="0.9"
          />
          <line
            x1="132"
            y1="128"
            x2={needle.x}
            y2={needle.y}
            stroke={textPrimary}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="132" cy="128" r="5" fill={textPrimary} />
        </Box>
      </Box>

      <Typography
        sx={{
          mt: { xs: -1, md: -1.3 },
          color: textPrimary,
          fontSize: { xs: 11, sm: 13, md: 15, lg: 17 },
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {value}%
      </Typography>
    </Box>
  );
}

export default function HomeSection3AudienceChart({ gender }) {
  const femaleCount = gender?.female?.count || 0;
  const femalePercentage = Number(gender?.female?.percentage || 0).toFixed(2);
  const maleCount = gender?.male?.count || 0;
  const malePercentage = Number(gender?.male?.percentage || 0).toFixed(2);

  return (
    <Box
      sx={{
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
          md: "clamp(420px, 58vw, 560px)",
          lg: "100%",
        },
        px: { xs: 1.1, sm: 1.4, md: 1.8, lg: 3 },
        py: { xs: 1.2, sm: 1.5, md: 1.8, lg: 3 },
        minHeight: { xs: "auto", lg: 280 },
        height: { xs: "auto", lg: 280 },
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 0.8, sm: 1.2, md: 1.5, lg: 2 }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ minWidth: 0 }}
      >
        <GaugeMeter
          color="#FF4F9A"
          value={femalePercentage}
          count={femaleCount}
          label="عدد الإناث"
          icon={<Woman2OutlinedIcon sx={{ color: (theme) => theme.palette.dashboard.chartTextPrimary, fontSize: { xs: 15, md: 18, lg: 24 } }} />}
        />
        <GaugeMeter
          color="#5A9CF8"
          value={malePercentage}
          count={maleCount}
          label="عدد الذكور"
          icon={<ManOutlinedIcon sx={{ color: (theme) => theme.palette.dashboard.chartTextPrimary, fontSize: { xs: 15, md: 18, lg: 24 } }} />}
        />
      </Stack>
    </Box>
  );
}

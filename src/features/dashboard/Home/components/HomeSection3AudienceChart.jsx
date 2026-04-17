import { Box, Stack, Typography } from "@mui/material";
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
  const angle = -120 + (240 * value) / 100;
  const needle = polarToCartesian(132, 128, 76, angle);

  return (
    <Box sx={{ flex: 1, minWidth: 230 }}>
      <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="center">
        {icon}
        <Typography sx={{ color: "#263238", fontSize: 20, fontWeight: 700 }}>
          {count}
        </Typography>
      </Stack>

      <Typography
        sx={{
          mt: 0.35,
          color: "#8A8A8A",
          fontSize: 15,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>

      <Box sx={{ mt: 0.2, display: "flex", justifyContent: "center" }}>
        <Box component="svg" viewBox="0 0 264 164" sx={{ width: "100%", maxWidth: 276 }}>
          <path
            d={arcPath(132, 128, 102, -120, 120)}
            fill="none"
            stroke="#ECECEC"
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
            stroke="#DADADA"
            strokeWidth="2"
            opacity="0.9"
          />
          <line
            x1="132"
            y1="128"
            x2={needle.x}
            y2={needle.y}
            stroke="#263238"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="132" cy="128" r="5" fill="#263238" />
        </Box>
      </Box>

      <Typography
        sx={{
          mt: -1.3,
          color: "#263238",
          fontSize: 17,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {value}%
      </Typography>
    </Box>
  );
}

export default function HomeSection3AudienceChart() {
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "20px",
        border: "1px solid #ECECEC",
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
        px: { xs: 2, md: 3 },
        py: { xs: 2.5, md: 3 },
        height:280
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 2 }}
        justifyContent="space-between"
      >
        <GaugeMeter
          color="#FF4F9A"
          value={60}
          count={2400}
          label="عدد الإناث"
          icon={<Woman2OutlinedIcon sx={{ color: "#263238", fontSize: 24 }} />}
        />
        <GaugeMeter
          color="#5A9CF8"
          value={40}
          count={1800}
          label="عدد الذكور"
          icon={<ManOutlinedIcon sx={{ color: "#263238", fontSize: 24 }} />}
        />
      </Stack>
    </Box>
  );
}

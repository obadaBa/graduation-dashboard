import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Box, Stack, Typography } from "@mui/material";

export default function StatusRecordItem({
  label,
  time,
  icon,
  active = false,
  onClick,
  color = "#A66BFF",
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        minHeight: 44,
        borderRadius: "10px",
        border: `1px solid ${active ? color : "#E5E5E5"}`,
        bgcolor: active ? `${color}14` : "#FFFFFF",
        px: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.2,
        cursor: "pointer",
      }}
    >
      <Stack direction="row-reverse" spacing={0.85} alignItems="center">
        {icon}
        <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 700 }}>
          {label}
        </Typography>
      </Stack>

      <Stack direction="row-reverse" spacing={0.45} alignItems="center">
        <Typography sx={{ color: "#8F8F8F", fontSize: 13, fontWeight: 500 }}>
          {time}
        </Typography>
        <AccessTimeRoundedIcon sx={{ fontSize: 15, color: "#4B4B4B" }} />
      </Stack>
    </Box>
  );
}

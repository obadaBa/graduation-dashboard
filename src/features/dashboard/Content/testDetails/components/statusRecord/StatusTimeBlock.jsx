import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Stack, Typography } from "@mui/material";

export default function StatusTimeBlock({ sx }) {
  return (
    <Stack direction="row-reverse" spacing={0.9} alignItems="center" sx={sx}>
      <Typography sx={{ color: "#263238", fontSize: 17, fontWeight: 500 }}>
        21\03\2026 - الساعة 14:00
      </Typography>
      <AccessTimeRoundedIcon sx={{ fontSize: 22, color: "#263238" }} />
    </Stack>
  );
}

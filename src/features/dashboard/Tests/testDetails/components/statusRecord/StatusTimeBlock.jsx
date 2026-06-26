import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { Stack, Typography } from "@mui/material";

export default function StatusTimeBlock({ time, sx }) {
  if (!time) {
    return null;
  }

  return (
    <Stack direction="row-reverse" spacing={0.9} alignItems="center" sx={sx}>
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 17,
          fontWeight: 500,
        }}
      >
        {time}
      </Typography>
      <AccessTimeRoundedIcon
        sx={{
          fontSize: 22,
          color: (theme) => theme.palette.dashboard.textPrimary,
        }}
      />
    </Stack>
  );
}

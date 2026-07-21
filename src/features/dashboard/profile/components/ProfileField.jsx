import { Box, Typography } from "@mui/material";

export default function ProfileField({ label, children }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 15,
          fontWeight: 700,
          textAlign: "right",
          mb: 0.75,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

export default function ProfileField({ label, children }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "#263238",
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

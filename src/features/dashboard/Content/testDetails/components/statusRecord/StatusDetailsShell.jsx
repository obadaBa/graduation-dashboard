import { Box, Typography } from "@mui/material";

export default function StatusDetailsShell({ children }) {
  return (
    <Box sx={{ pt: { xs: 0, md: 1.2 } }}>
      <Typography sx={{ color: "#263238", fontSize: 24, fontWeight: 900 }}>
        تفاصيل الحالة
      </Typography>
      {children}
    </Box>
  );
}

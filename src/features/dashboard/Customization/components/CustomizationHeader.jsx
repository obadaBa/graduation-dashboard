import { Box, Typography } from "@mui/material";

export default function CustomizationHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 126,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        direction: "rtl",
        textAlign: "right",
        bgcolor: (theme) => theme.palette.dashboard.pageBackground,
        pt: 3.1,
        pr: { xs: 2, md: 0.8 },
        pl: { xs: 2, md: 3 },
        transition: (theme) =>
          theme.transitions.create(["background-color", "color"], {
            duration: theme.transitions.duration.shorter,
          }),
      }}
    >
      <Box sx={{ maxWidth: 430 }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: { xs: 22, md: 25 },
            fontWeight: 900,
            lineHeight: 1.35,
            letterSpacing: 0,
            whiteSpace: "nowrap",
          }}
        >
          قائمة تخصيصات تطبيق الموبايل
        </Typography>

        <Typography
          sx={{
            mt: 0.8,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
            lineHeight: 1.55,
            letterSpacing: 0,
          }}
        >
          كل ما يتعلق بالإعدادات والأقسام الخاصة بالتطبيق يمكن
          <br />
          التحكم بها من هنا
        </Typography>
      </Box>
    </Box>
  );
}

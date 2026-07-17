import { Box, Typography } from "@mui/material";

export default function ContentHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "right",
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: { xs: 28, md: 34 },
          fontWeight: 800,
          lineHeight: 1.2,
        }}
      >
        المحتوى المرئي الخاص{" "}
        <Box component="span" sx={{ color: "#5583FF" }}>
          بالمكتبة
        </Box>
      </Typography>

      <Typography
        sx={{
          mt: 0.6,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: { xs: 15, md: 17 },
          fontWeight: 600,
          lineHeight: 1.6,
          maxWidth: 690,
        
        }}
      >
        كل ما يتعلق بالمحتوى العلمي الذي تمت مشاركته من قبل
        <br />
        أصحاب المعلومات داخل التطبيق ستجده هنا
      </Typography>
    </Box>
  );
}

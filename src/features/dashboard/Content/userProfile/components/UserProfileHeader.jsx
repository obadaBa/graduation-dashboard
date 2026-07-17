import { Box, Button, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router";

export default function UserProfileHeader() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        direction: "rtl",
      }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: { xs: 28, md: 38 },
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          صفحة تفاصيل ملف <Box component="span" sx={{ color: "#5C84FF" }}>المستخدم</Box>
        </Typography>
      </Box>

      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackRoundedIcon sx={{ fontSize: 20 }} />}
        sx={{
          minWidth: 98,
          height: 42,
          px: 1.8,
          borderRadius: "6px",
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          bgcolor: (theme) => theme.palette.dashboard.surface,
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 16,
          fontWeight: 600,
          flexShrink: 0,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.surface,
            borderColor: (theme) => theme.palette.dashboard.border,
          },
          "& .MuiButton-startIcon": {
            marginInlineStart: 0,
            marginInlineEnd: "6px",
          },
        }}
      >
        رجوع
      </Button>
    </Box>
  );
}

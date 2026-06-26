import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function TestDetailsHeader() {
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
          صفحة تفاصيل{" "}
          <Box
            component="span"
            sx={{ color: (theme) => theme.palette.dashboard.logoPrimary }}
          >
            اختبار
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 0.8,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: { xs: 18, md: 20 },
            fontWeight: 600,
            lineHeight: 1.55,
            maxWidth: 610,
          }}
        >
          كل ما يتعلق بالتفاصيل الخاصة بالاختبار موجود هنا بشكل
          <br />
          دقيق ويرد إجراء الاستخدام المناسب.
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
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 16,
          fontWeight: 600,
          flexShrink: 0,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
            borderColor: (theme) => theme.palette.dashboard.logoPrimary,
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

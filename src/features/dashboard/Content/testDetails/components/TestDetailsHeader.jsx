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
            color: "#263238",
            fontSize: { xs: 28, md: 38 },
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          صفحة تفاصيل{" "}
          <Box component="span" sx={{ color: "#5C84FF" }}>
            اختبار
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 0.8,
            color: "#A6A6A6",
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
          border: "1px solid #D6D6D6",
          bgcolor: "#FFFFFF",
          color: "#263238",
          fontSize: 16,
          fontWeight: 600,
          flexShrink: 0,
          boxShadow: "0 2px 4px rgba(15, 23, 42, 0.04)",
          "&:hover": {
            bgcolor: "#FFFFFF",
            borderColor: "#C8C8C8",
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

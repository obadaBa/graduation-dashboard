import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function VerificationCenterHeader() {
  const navigate = useNavigate();

  return (
    <Box
      dir="rtl"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 27,
            fontWeight: 900,
            lineHeight: 1.35,
          }}
        >
          مركز توثيق{" "}
          <Box component="span" sx={{ color: "#5C84FF" }}>
            الحسابات
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 1,
            maxWidth: 520,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.65,
          }}
        >
          من هذا المكان يمكنك توثيق ملفات أصحاب المعلومات من
          <br />
          خلال إعطائهم شارة التوثيق
        </Typography>
      </Box>

      <Button
        onClick={() => navigate("/dashboard/users")}
        endIcon={<ArrowBackRoundedIcon sx={{ fontSize: 18 }} />}
        sx={{
          mt: 0.5,
          minWidth: 72,
          height: 34,
          px: 1.4,
          borderRadius: "5px",
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          bgcolor: (theme) => theme.palette.dashboard.surface,
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 13,
          fontWeight: 700,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            borderColor: (theme) => theme.palette.dashboard.chartBorder,
          },
          "& .MuiButton-endIcon": {
            marginInlineStart: "6px",
            marginInlineEnd: 0,
          },
        }}
      >
        رجوع
      </Button>
    </Box>
  );
}

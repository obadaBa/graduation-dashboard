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
            color: "#263238",
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
            color: "#A0A0A0",
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
          border: "1px solid #D5D5D5",
          bgcolor: "#FFFFFF",
          color: "#263238",
          fontSize: 13,
          fontWeight: 700,
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
          "&:hover": {
            bgcolor: "#F8F8F8",
            borderColor: "#D5D5D5",
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

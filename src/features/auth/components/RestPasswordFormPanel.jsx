import { Box, Typography, useTheme } from "@mui/material";
import MailOutline from "@mui/icons-material/MailOutline";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import AuthFormInput from "./AuthFormInput";
import AuthFormHeader from "./AuthFormHeader";
import AuthPanelTitle from "./AuthPanelTitle";
import AuthPrimaryButton from "./AuthPrimaryButton";
import AuthStepIndicator from "./AuthStepIndicator";
import fingerLight from "../Assets/finger.svg";
import fingerDark from "../Assets/fingerdark.svg";

export default function RestPasswordFormPanel() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const fingerIcon = theme.palette.mode === "light" ? fingerLight : fingerDark;
  const indicatorInitialStep = location.state?.fromStep ?? 2;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    navigate("/confarmpassword", {
      state: {
        fromStep: 2,
        fromVisual: "reset",
      },
    });
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "60%", xl: "58%" },
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", lg: "flex-start" },
        minHeight: { xs: "100dvh", lg: "100dvh" },
        px: { xs: 2, sm: 3, md: 4, lg: 0 },
        py: { xs: 2, sm: 3, lg: 0 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          height: { xs: "100%", lg: "92%" },
          width: { xs: "100%", sm: "min(100%, 560px)", lg: "92%", xl: "88%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: { xs: "20px", sm: "24px", lg: "8px" },
          px: { xs: 2.25, sm: 3.5, md: 4.5 },
          py: { xs: 2.5, sm: 3, md: 3.5 },
          justifyContent: "space-between",
        }}
      >
        <AuthFormHeader
          showBackButton
          backLabel="العودة لتسجيل الدخول"
          backTo="/login"
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <AuthPanelTitle
            icon={fingerIcon}
            iconAlt="استعادة كلمة المرور"
            title="استعادة كلمة المرور"
            sx={{ mb: { xs: 5, sm: 6, md: 7 } }}
          />

          <Typography
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.7rem" },
              fontWeight: 700,
              color: theme.palette.auth.fieldLabel,
              textAlign: "right",
              mb: 1.5,
            }}
          >
            البريد الإلكتروني
          </Typography>

          <AuthFormInput
            control={control}
            name="email"
            placeholder="أدخل البريد الإلكتروني..."
            ariaLabel="البريد الإلكتروني"
            endAdornment={<MailOutline sx={{ color: "#B3B3B3", ml: 2 }} />}
          />

          <AuthPrimaryButton
            type="submit"
            sx={{
              mt: { xs: 8, sm: 9 },
              height: { xs: 56, sm: 58, md: 60 },
              fontSize: { xs: "1.2rem", sm: "1.35rem" },
              borderRadius: "12px",
            }}
          >
            إرسال الرابط
          </AuthPrimaryButton>
        </Box>

        <AuthStepIndicator
          activeStep={2}
          initialActiveStep={indicatorInitialStep}
          sx={{
            mt: { xs: 5, sm: 6 },
            mb: { xs: 0.5, sm: 1 },
          }}
        />
      </Box>
    </Box>
  );
}

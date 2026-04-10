import { Box, Button, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import usePersistentCountdown from "../../../shared/hooks/usePersistentCountdown";
import AuthFormHeader from "./AuthFormHeader";
import AuthOtpInputs from "./AuthOtpInputs";
import AuthPanelTitle from "./AuthPanelTitle";
import AuthPrimaryButton from "./AuthPrimaryButton";
import AuthStepIndicator from "./AuthStepIndicator";
import emailLight from "../Assets/email.svg";
import emailDark from "../Assets/emaildark.svg";

export default function ConfirmPasswordFormPanel() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const emailIcon = theme.palette.mode === "light" ? emailLight : emailDark;
  const indicatorInitialStep = location.state?.fromStep ?? 1;
  const { formattedTime } = usePersistentCountdown({
    storageKey: "confirm-password-countdown",
    durationInSeconds: 300,
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
  });

  const onSubmit = (data) => {
    console.log("confirm password form", data);
    navigate("/creatnewpassword", {
      state: {
        fromStep: 1,
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
          backLabel="العودة إلى تسجيل الدخول"
          backTo="/restpassword"
          backState={{ fromStep: 1, fromVisual: "confirm" }}
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
            icon={emailIcon}
            iconAlt="تأكيد البريد المدخل"
            title="تأكيد البريد المدخل"
            sx={{ mb: { xs: 5, sm: 6, md: 7 } }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2.25,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.35rem", sm: "1.7rem" },
                fontWeight: 700,
                color: theme.palette.auth.fieldLabel,
                textAlign: "right",
              }}
            >
              ادخل الرمز
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.35rem" },
                fontWeight: 700,
                color: theme.palette.auth.title,
              }}
            >
              {formattedTime}
            </Typography>
          </Box>

          <AuthOtpInputs control={control} />

          <AuthPrimaryButton
            type="submit"
            sx={{
              mt: { xs: 8, sm: 9 },
              height: { xs: 56, sm: 58, md: 60 },
              fontSize: { xs: "1.2rem", sm: "1.35rem" },
              borderRadius: "12px",
            }}
          >
            تأكيد الإدخال
          </AuthPrimaryButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.75,
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.05rem" },
                color: theme.palette.auth.loginText,
                fontWeight: 600,
              }}
            >
              لم تستلم رمز بعد؟
            </Typography>
            <Button
              type="button"
              variant="text"
              sx={{
                p: 0,
                minWidth: "auto",
                color: theme.palette.auth.title,
                fontSize: { xs: "1rem", sm: "1.05rem" },
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              إعادة إرسال الرمز
            </Button>
          </Box>
        </Box>

        <AuthStepIndicator
          activeStep={1}
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

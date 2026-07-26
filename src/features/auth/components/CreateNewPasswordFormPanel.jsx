import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { showErrorToast } from "../../../shared/lib/Toast/toastService";
import { useResetPasswordMutation } from "../hooks/useResetPasswordMutation";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormInput from "./AuthFormInput";
import AuthPanelTitle from "./AuthPanelTitle";
import AuthPrimaryButton from "./AuthPrimaryButton";
import AuthStepIndicator from "./AuthStepIndicator";
import keyLight from "../Assets/key.svg";
import keyDark from "../Assets/keydark.svg";

export default function CreateNewPasswordFormPanel() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const otpCode = location.state?.otpCode || "";
  const keyIcon = theme.palette.mode === "light" ? keyLight : keyDark;
  const indicatorInitialStep = location.state?.fromStep ?? 0;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });
  const { control, handleSubmit, getValues } = useForm({
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!email || !otpCode) {
      navigate("/resetpassword", { replace: true });
    }
  }, [email, navigate, otpCode]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      showErrorToast("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      return;
    }

    resetPasswordMutation.mutate({
      email,
      otpCode,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
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
          backLabel="العودة إلى تأكيد الرمز"
          backTo="/confirmpassword"
          backState={{ email, fromStep: 1 }}
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
            icon={keyIcon}
            iconAlt="إنشاء كلمة مرور جديدة"
            title="إنشاء كلمة مرور جديدة"
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
            كلمة المرور
          </Typography>

          <AuthFormInput
            control={control}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="أدخل كلمة المرور الخاصة بك..."
            ariaLabel="كلمة المرور"
            rules={{
              required: "كلمة المرور مطلوبة",
              minLength: {
                value: 8,
                message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
              },
              validate: (value) =>
                value.trim() === value || "كلمة المرور لا يجب أن تبدأ أو تنتهي بمسافة",
            }}
            endAdornment={
              <IconButton
                type="button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                sx={{
                  p: 0,
                  ml: 1,
                  color: "#B3B3B3",
                }}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />

          <Typography
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.7rem" },
              fontWeight: 700,
              color: theme.palette.auth.fieldLabel,
              textAlign: "right",
              mt: { xs: 4, sm: 5 },
              mb: 1.5,
            }}
          >
            تأكيد كلمة المرور
          </Typography>

          <AuthFormInput
            control={control}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="أدخل كلمة المرور مرة أخرى..."
            ariaLabel="تأكيد كلمة المرور"
            rules={{
              required: "تأكيد كلمة المرور مطلوب",
              validate: (value) =>
                value === getValues("password") || "كلمة المرور وتأكيدها غير متطابقين",
            }}
            endAdornment={
              <IconButton
                type="button"
                onClick={() =>
                  setShowConfirmPassword((currentValue) => !currentValue)
                }
                aria-label={
                  showConfirmPassword
                    ? "إخفاء تأكيد كلمة المرور"
                    : "إظهار تأكيد كلمة المرور"
                }
                sx={{
                  p: 0,
                  ml: 1,
                  color: "#B3B3B3",
                }}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />

          <AuthPrimaryButton
            type="submit"
            disabled={resetPasswordMutation.isPending}
            sx={{
              mt: { xs: 6, sm: 7 },
              height: { xs: 56, sm: 58, md: 60 },
              fontSize: { xs: "1.2rem", sm: "1.35rem" },
              borderRadius: "12px",
            }}
          >
            {resetPasswordMutation.isPending ? "جاري الحفظ..." : "تأكيد الإدخال"}
          </AuthPrimaryButton>
        </Box>

        <AuthStepIndicator
          activeStep={0}
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

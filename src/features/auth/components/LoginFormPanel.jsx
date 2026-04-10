import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import MailOutline from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormInput from "./AuthFormInput";
import AuthPrimaryButton from "./AuthPrimaryButton";

export default function LoginFormPanel() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("login form", data);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "60%", xl: "58%" },
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", lg: "flex-start" },
        minHeight: { xs: "100dvh", lg: "100dvh" },
        py: { xs: 2, sm: 3, lg: 0 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          height: { xs: "auto", lg: "92%" },
          width: { xs: "100%", sm: "min(100%, 560px)", lg: "82%", xl: "85%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: { xs: "20px", sm: "24px", lg: "8px" },
          px: { xs: 2.25, sm: 3.5, md: 4.5 },
          py: { xs: 2.5, sm: 3, md: 3.5 },
          overflow: "auto",
        }}
      >
        <AuthFormHeader />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            mt: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            sx={{
              color: theme.palette.auth.title,
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2.1rem" },
              fontWeight: 700,
              textAlign: "right",
              lineHeight: 1.2,
              mb: { xs: 0.75, sm: 1 },
            }}
          >
            مرحبا بك مجددًا!
          </Typography>

          <Typography
            sx={{
              color: theme.palette.auth.loginText,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              fontWeight: 600,
              textAlign: "right",
              mb: { xs: 1.75, sm: 2.25 },
            }}
          >
            يرجى تسجيل الدخول لنبدأ سريعًا
          </Typography>

          <Box
            sx={{
              height: "3px",
              width: "100%",
              backgroundImage: `repeating-linear-gradient(to left, ${theme.palette.auth.divider} 0 12px, transparent 12px 24px)`,
              mb: { xs: 2.5, sm: 4 },
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontWeight: 700,
              color: theme.palette.auth.fieldLabel,
              textAlign: "right",
              mb: 1,
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

          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontWeight: 700,
              color: theme.palette.auth.fieldLabel,
              textAlign: "right",
              mt: { xs: 2.25, sm: 3.25 },
              mb: 1,
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
            endAdornment={
              <IconButton
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
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

          <Button
            type="button"
            variant="text"
            onClick={() => navigate("/restpassword")}
            sx={{
              mt: 1.2,
              alignSelf: "flex-start",
              color: "#4275FF",
              fontSize: { xs: "0.9rem", sm: "0.95rem" },
              fontWeight: 600,
              p: 0,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            نسيت كلمة المرور؟
          </Button>

          <AuthPrimaryButton
            type="submit"
            sx={{
              mt: { xs: 3, sm: 4 },
              height: { xs: 50, sm: 52, md: 56 },
              fontSize: { xs: "1rem", sm: "1.05rem" },
            }}
          >
            تأكيد الدخول
          </AuthPrimaryButton>
        </Box>
      </Box>
    </Box>
  );
}

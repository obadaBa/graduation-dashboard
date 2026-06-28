import { useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import AuthFormInput from "../../../auth/components/AuthFormInput";
import { profileInputSx } from "./profileForm.styles";
import { useUpdateSupervisorPasswordMutation } from "../hooks/useUpdateSupervisorPasswordMutation";

const MotionBox = motion(Box);

const passwordInputSx = {
  ...profileInputSx,
  "& .MuiOutlinedInput-root": {
    ...profileInputSx["& .MuiOutlinedInput-root"],
    height: 42,
  },
};

export default function ChangePasswordModal({ open, onClose }) {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const updatePasswordMutation = useUpdateSupervisorPasswordMutation({
    onSuccess: () => {
      reset();
      onClose();
    },
  });
  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const hasLetter = /[A-Za-z\u0600-\u06FF]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const canSubmit =
    Boolean(currentPassword) &&
    newPassword.length >= 8 &&
    hasLetter &&
    hasNumber &&
    newPassword === confirmPassword;

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = (data) => {
    if (!canSubmit || updatePasswordMutation.isPending) return;

    updatePasswordMutation.mutate({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
      newPasswordConfirmation: data.confirmPassword,
    });
  };

  return (
    <Modal
      open={open}
      onClose={updatePasswordMutation.isPending ? undefined : onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(255, 255, 255, 0.34)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <AnimatePresence>
        {open && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "calc(100% - 32px)", sm: 420 },
              outline: "none",
            }}
          >
            <MotionBox
              dir="rtl"
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, scale: 0.08, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.08, y: 28 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                mass: 0.9,
              }}
              sx={{
                width: "100%",
                minHeight: 540,
                bgcolor: "#FFFFFF",
                borderRadius: "14px",
                boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 2.3,
                  py: 2,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "3px",
                    backgroundImage:
                      "repeating-linear-gradient(to left, #CFCFCF 0 18px, transparent 18px 29px)",
                  },
                }}
              >
                <Typography
                  sx={{ color: "#263238", fontSize: 22, fontWeight: 800 }}
                >
                  تغيير كلمة المرور
                </Typography>

                <IconButton
                  type="button"
                  onClick={onClose}
                  disabled={updatePasswordMutation.isPending}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "6px",
                    border: "1px solid #DFDFDF",
                    color: "#263238",
                    bgcolor: "#FFFFFF",
                    "&:hover": { bgcolor: "#F8F8F8" },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </Stack>

              <Box
                sx={{
                  px: 2.6,
                  pt: 2.4,
                  pb: 2,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.2}
                  sx={{ mb: 2.4 }}
                  gap={1}
                >
                  <ReportGmailerrorredRoundedIcon
                    sx={{ color: "#FF5C5C", fontSize: 34 }}
                  />
                  <Typography
                    sx={{
                      color: "#8A8A8A",
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: 1.8,
                      textAlign: "right",
                    }}
                  >
                    يجب أن لا تكون كلمة المرور أقل عن ٨ أحرف وأن تتضمن توليفة من
                    الأرقام والأحرف الجديدة
                  </Typography>
                </Stack>

                <Stack spacing={2.1}>
                  <Box>
                    <Typography
                      sx={{
                        color: "#263238",
                        fontSize: 15,
                        fontWeight: 800,
                        mb: 0.9,
                      }}
                    >
                      كلمة المرور الحالية
                    </Typography>
                    <AuthFormInput
                      control={control}
                      name="currentPassword"
                      type="password"
                      placeholder="ادخل كلمة المرور الحالية الخاصة بك..."
                      ariaLabel="كلمة المرور الحالية"
                      sx={passwordInputSx}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: "#263238",
                        fontSize: 15,
                        fontWeight: 800,
                        mb: 0.9,
                      }}
                    >
                      كلمة المرور الجديدة
                    </Typography>
                    <AuthFormInput
                      control={control}
                      name="newPassword"
                      type="password"
                      placeholder="ادخل كلمة المرور الجديدة..."
                      ariaLabel="كلمة المرور الجديدة"
                      sx={passwordInputSx}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: "#263238",
                        fontSize: 15,
                        fontWeight: 800,
                        mb: 0.9,
                      }}
                    >
                      إعادة كلمة المرور الجديدة
                    </Typography>
                    <AuthFormInput
                      control={control}
                      name="confirmPassword"
                      type="password"
                      placeholder="اعد كتابة كلمة المرور الجديدة..."
                      ariaLabel="إعادة كلمة المرور الجديدة"
                      sx={passwordInputSx}
                    />
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ px: 1.6, pb: 1.3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                  disabled={!canSubmit || updatePasswordMutation.isPending}
                  sx={{
                    height: 42,
                    borderRadius: "6px",
                    bgcolor: "#5583FF",
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#4777F5" },
                    "&.Mui-disabled": {
                      bgcolor: "#AFC3FF",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  {updatePasswordMutation.isPending
                    ? "جاري حفظ كلمة المرور..."
                    : "حفظ كلمة المرور"}
                </Button>
              </Box>
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>
    </Modal>
  );
}

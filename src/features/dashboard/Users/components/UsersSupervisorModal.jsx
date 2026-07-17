import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Box,
  Button,
  Fade,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import AuthFormInput from "../../../auth/components/AuthFormInput";
import { showErrorToast } from "../../../../shared/lib/Tost/toastService";
import SyriaFlagIcon from "../../Assets/flag-for-flag-syria-svgrepo-com.svg";
import ProfileField from "../../profile/components/ProfileField";
import ProfileGenderSelector from "../../profile/components/ProfileGenderSelector";
import { useAddSupervisorMutation } from "../hooks/useAddSupervisorMutation";
import {
  phoneInputSx,
  profileInputSx,
  selectSx,
} from "../../profile/components/profileForm.styles";

export default function UsersSupervisorModal({ open, onClose }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      governorate: "",
      phone: "",
      gender: "",
      password: "",
    },
  });
  const watchedValues = useWatch({ control });
  const isFormComplete = [
    "name",
    "email",
    "governorate",
    "phone",
    "gender",
    "password",
  ].every((field) => String(watchedValues?.[field] || "").trim());

  const handleClose = () => {
    if (addSupervisorMutation.isPending) return;
    reset();
    onClose?.();
  };

  const addSupervisorMutation = useAddSupervisorMutation({
    onSuccess: () => {
      reset();
      onClose?.();
    },
  });

  const onSubmit = (data) => {
    const hasEmptyField = Object.values(data).some(
      (value) => !String(value || "").trim(),
    );

    if (hasEmptyField) {
      showErrorToast("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    addSupervisorMutation.mutate({
      ...data,
      gender: data.gender === "female" ? "أنثى" : "ذكر",
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(20, 24, 29, 0.34)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <Fade in={open} timeout={{ enter: 260, exit: 200 }}>
        <Box
          dir="rtl"
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "calc(100vw - 28px)", sm: 382 },
            maxHeight: "calc(100dvh - 28px)",
            borderRadius: "12px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            outline: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 2,
              pt: 2.1,
              pb: 1.7,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "3px",
                backgroundImage: (theme) =>
                  `repeating-linear-gradient(to left, ${theme.palette.dashboard.divider} 0 18px, transparent 18px 29px)`,
              },
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              إضافة مشرف جديد
            </Typography>
            <IconButton
              onClick={handleClose}
              disabled={addSupervisorMutation.isPending}
              sx={{
                width: 34,
                height: 34,
                borderRadius: "6px",
                border: (theme) =>
                  `1px solid ${theme.palette.dashboard.chartBorder}`,
                bgcolor: (theme) => theme.palette.dashboard.surface,
                color: (theme) => theme.palette.dashboard.textPrimary,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Stack>

          <Box
            id="new-supervisor-form"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 4,
              py: 2.4,
              display: "flex",
              flexDirection: "column",
              gap: 1.85,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <ProfileField label="الاسم">
              <AuthFormInput
                control={control}
                name="name"
                placeholder="ادخل الاسم باللغة التي تريدها..."
                ariaLabel="الاسم"
                endAdornment={<BadgeOutlinedIcon />}
                sx={profileInputSx}
              />
            </ProfileField>

            <ProfileField label="البريد الالكتروني">
              <AuthFormInput
                control={control}
                name="email"
                placeholder="ادخل البريد الالكتروني..."
                ariaLabel="البريد الالكتروني"
                endAdornment={<EmailOutlinedIcon />}
                sx={profileInputSx}
              />
            </ProfileField>

            <ProfileField label="المحافظة">
              <Controller
                name="governorate"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    fullWidth
                    IconComponent={KeyboardArrowDownRoundedIcon}
                    sx={selectSx}
                    renderValue={(selected) =>
                      selected ? (
                        selected
                      ) : (
                        <Typography
                          sx={{
                            color: (theme) => theme.palette.dashboard.textSecondary,
                            fontSize: 14,
                          }}
                        >
                          اختر المحافظة التي يسكن فيها...
                        </Typography>
                      )
                    }
                  >
                    <MenuItem value="دمشق">دمشق</MenuItem>
                    <MenuItem value="حلب">حلب</MenuItem>
                    <MenuItem value="حمص">حمص</MenuItem>
                    <MenuItem value="اللاذقية">اللاذقية</MenuItem>
                  </Select>
                )}
              />
            </ProfileField>

            <ProfileField label="رقم الهاتف">
              <AuthFormInput
                control={control}
                name="phone"
                placeholder="ادخل رقم الهاتف الخاص به ..."
                ariaLabel="رقم الهاتف"
                startAdornment={
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.7}
                    sx={{
                      height: 40,
                      px: 1.15,
                      borderRight: (theme) =>
                        `1px solid ${theme.palette.dashboard.chartBorder}`,
                      color: "#868686",
                      direction: "ltr",
                      bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                    }}
                  >
                    <Typography sx={{ fontSize: 13, color: "#868686" }}>+963</Typography>
                    <Box
                      component="img"
                      src={SyriaFlagIcon}
                      alt="علم سوريا"
                      sx={{ width: 18, height: 18, objectFit: "contain" }}
                    />
                  </Stack>
                }
                endAdornment={<PhoneIphoneOutlinedIcon />}
                sx={phoneInputSx}
              />
            </ProfileField>

            <ProfileField label="الجنس">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <ProfileGenderSelector value={field.value} onChange={field.onChange} />
                )}
              />
            </ProfileField>

            <ProfileField label="كلمة المرور">
              <AuthFormInput
                control={control}
                name="password"
                type="password"
                placeholder="ادخل كلمة المرور الخاصة به..."
                ariaLabel="كلمة المرور"
                endAdornment={<VisibilityOffOutlinedIcon />}
                sx={profileInputSx}
              />
            </ProfileField>
          </Box>

          <Box
            sx={{
              px: 2,
              py: 1.4,
              borderTop: (theme) =>
                `1px solid ${theme.palette.dashboard.chartBorder}`,
              boxShadow: "0 -8px 18px rgba(15, 23, 42, 0.08)",
              bgcolor: (theme) => theme.palette.dashboard.surface,
            }}
          >
            <Button
              type="submit"
              form="new-supervisor-form"
              fullWidth
              variant="contained"
              disableElevation
              disabled={
                !isFormComplete || addSupervisorMutation.isPending
              }
              sx={{
                height: 44,
                borderRadius: "6px",
                bgcolor: "#527DFF",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                "&:hover": { bgcolor: "#527DFF" },
              }}
            >
              {addSupervisorMutation.isPending
                ? "جاري حفظ المستخدم..."
                : "حفظ المستخدم"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

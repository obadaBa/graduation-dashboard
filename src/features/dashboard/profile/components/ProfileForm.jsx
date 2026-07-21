import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AuthFormInput from "../../../auth/components/AuthFormInput";
import SyriaFlagIcon from "../../Assets/flag-for-flag-syria-svgrepo-com.svg";
import ChangePasswordModal from "./ChangePasswordModal";
import ProfileAvatarPicker from "./ProfileAvatarPicker";
import ProfileField from "./ProfileField";
import ProfileGenderSelector from "./ProfileGenderSelector";
import ProfilePasswordAction from "./ProfilePasswordAction";
import { phoneInputSx, profileInputSx, selectSx } from "./profileForm.styles";
import { useDeleteSupervisorPhotoMutation } from "../hooks/useDeleteSupervisorPhotoMutation";
import { useUpdateSupervisorProfileMutation } from "../hooks/useUpdateSupervisorProfileMutation";
import { useUpdateSupervisorPhotoMutation } from "../hooks/useUpdateSupervisorPhotoMutation";

const GOVERNORATES = [
  "دمشق",
  "ريف دمشق",
  "حلب",
  "حمص",
  "حماة",
  "اللاذقية",
  "طرطوس",
  "درعا",
  "السويداء",
  "القنيطرة",
  "إدلب",
  "الرقة",
  "دير الزور",
  "الحسكة",
];

function normalizeGender(gender) {
  if (gender === "ذكر" || gender === "male") return "male";
  if (gender === "أنثى" || gender === "انثى" || gender === "female") return "female";
  return "";
}

function toApiGender(gender) {
  return gender === "female" ? "أنثى" : "ذكر";
}

export default function ProfileForm({
  profile,
  supervisorId,
  fallbackPhoto = "",
  onUpdateSuccess,
}) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      governorate: "",
      phone: "",
      gender: "",
    },
  });
  const updateProfileMutation = useUpdateSupervisorProfileMutation({
    onSuccess: onUpdateSuccess,
  });
  const profilePhoto =
    profile?.photo || profile?.avatar || profile?.avatar_url || fallbackPhoto;
  const updatePhotoMutation = useUpdateSupervisorPhotoMutation({
    onSuccess: (_response, variables) => {
      if (variables.previewUrl) {
        setCurrentPhoto(variables.previewUrl);
      }
    },
  });
  const deletePhotoMutation = useDeleteSupervisorPhotoMutation({
    onSuccess: (response) => {
      setCurrentPhoto(response?.data?.default_photo_url || "");
    },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      name: profile.name || "",
      email: profile.email || "",
      governorate: profile.governorate || "",
      phone: profile.phone || "",
      gender: normalizeGender(profile.gender),
    });
  }, [profile, reset]);

  useEffect(() => {
    setCurrentPhoto(profilePhoto);
  }, [profilePhoto]);

  const onSubmit = (data) => {
    if (!supervisorId || updateProfileMutation.isPending) return;

    updateProfileMutation.mutate({
      supervisorId,
      name: data.name,
      governorate: data.governorate,
      phone: data.phone,
      gender: toApiGender(data.gender),
    });
  };

  const handleAvatarChange = ({ file, previewUrl }) => {
    if (!supervisorId || updatePhotoMutation.isPending) return;

    updatePhotoMutation.mutate({
      supervisorId,
      photo: file,
      type: "avatar",
      previewUrl,
    });
  };

  const handleAvatarDelete = () => {
    if (!supervisorId || deletePhotoMutation.isPending) return;

    deletePhotoMutation.mutate({
      supervisorId,
      type: "avatar",
    });
  };

  return (
    <>
      <Box
        id="profile-form"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2.4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="flex-end" spacing={1.25} gap={1}>
          <ProfileAvatarPicker
            initialAvatar={currentPhoto}
            isDeleting={deletePhotoMutation.isPending}
            isUploading={updatePhotoMutation.isPending}
            onAvatarChange={handleAvatarChange}
            onAvatarDelete={handleAvatarDelete}
          />

          <Box sx={{ flex: 1 }}>
            <ProfileField label="الاسم">
              <AuthFormInput
                control={control}
                name="name"
                ariaLabel="الاسم"
                endAdornment={<BadgeOutlinedIcon />}
                sx={profileInputSx}
              />
            </ProfileField>
          </Box>
        </Stack>

        <ProfileField label="البريد الالكتروني">
          <AuthFormInput
            control={control}
            name="email"
            ariaLabel="البريد الالكتروني"
            readOnly
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
                fullWidth
                IconComponent={KeyboardArrowDownRoundedIcon}
                sx={selectSx}
              >
                {GOVERNORATES.map((governorate) => (
                  <MenuItem key={governorate} value={governorate}>
                    {governorate}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </ProfileField>

        <ProfileField label="رقم الهاتف">
          <AuthFormInput
            control={control}
            name="phone"
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
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  direction: "ltr",
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    color: (theme) => theme.palette.dashboard.textSecondary,
                  }}
                >
                  +963
                </Typography>
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

        <ProfilePasswordAction onClick={() => setIsPasswordModalOpen(true)} />
      </Box>

      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: (theme) => `1px solid ${theme.palette.dashboard.divider}`,
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 -12px 28px rgba(0, 0, 0, 0.26)"
              : "0 -8px 18px rgba(15, 23, 42, 0.08)",
          position: "relative",
          zIndex: 1,
          bgcolor: (theme) => theme.palette.dashboard.surface,
        }}
      >
        <Button
          type="submit"
          form="profile-form"
          fullWidth
          variant="contained"
          disableElevation
          disabled={!isDirty || updateProfileMutation.isPending}
          sx={{
            height: 46,
            borderRadius: "8px",
            bgcolor: (theme) => theme.palette.dashboard.logoPrimary,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 700,
            "&:hover": {
              bgcolor: (theme) => theme.palette.dashboard.logoPrimary,
            },
            "&.Mui-disabled": {
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              color: (theme) => theme.palette.dashboard.textSecondary,
            },
          }}
        >
          {updateProfileMutation.isPending
            ? "جاري حفظ التعديلات..."
            : "حفظ التعديلات"}
        </Button>
      </Box>

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}

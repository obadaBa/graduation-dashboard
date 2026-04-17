import { useState } from "react";
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

export default function ProfileForm() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "عبيدة الرحال",
      email: "test@mail.com",
      governorate: "damascus",
      phone: "0981692323",
      gender: "female",
    },
  });

  const onSubmit = (data) => {
    console.log("profile form", data);
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
          <ProfileAvatarPicker />

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
                <MenuItem value="damascus">دمشق</MenuItem>
                <MenuItem value="aleppo">حلب</MenuItem>
                <MenuItem value="homs">حمص</MenuItem>
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
                  borderRight: "1px solid #DFDFDF",
                  color: "#868686",
                  direction: "ltr",
                  bgcolor: "#FAFAFA",
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

        <ProfilePasswordAction onClick={() => setIsPasswordModalOpen(true)} />
      </Box>

      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: "1px solid #F0F0F0",
          boxShadow: "0 -8px 18px rgba(15, 23, 42, 0.08)",
          position: "relative",
          zIndex: 1,
          bgcolor: "#FFFFFF",
        }}
      >
        <Button
          type="submit"
          form="profile-form"
          fullWidth
          variant="contained"
          disableElevation
          onClick={handleSubmit(onSubmit)}
          sx={{
            height: 46,
            borderRadius: "8px",
            bgcolor: "#F1F1F1",
            color: "#A1A1A1",
            fontSize: 15,
            fontWeight: 700,
            "&:hover": { bgcolor: "#EDEDED" },
          }}
        >
          حفظ التعديلات
        </Button>
      </Box>

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}

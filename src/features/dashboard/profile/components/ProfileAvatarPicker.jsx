import { useRef, useState } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

export default function ProfileAvatarPicker() {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(String(reader.result));
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <Box sx={{ position: "relative", flexShrink: 0 }}>
      <Avatar
        src={avatarPreview || undefined}
        imgProps={{ alt: "صورة الملف الشخصي" }}
        sx={{
          width: 70,
          height: 70,
          borderRadius: "12px",
          bgcolor: "#D9D9D9",
          color: "#263238",
          fontWeight: 700,
          "& img": {
            objectFit: "cover",
          },
        }}
      >
        م
      </Avatar>

      <Box
        component="input"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        sx={{ display: "none" }}
      />

      <IconButton
        type="button"
        onClick={() => fileInputRef.current?.click()}
        sx={{
          position: "absolute",
          left: -4,
          bottom: -4,
          width: 24,
          height: 24,
          bgcolor: "#FFFFFF",
          border: "1px solid #DFDFDF",
          color: "#A1A1A1",
          "&:hover": { bgcolor: "#FFFFFF" },
        }}
      >
        <CameraAltOutlinedIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
}

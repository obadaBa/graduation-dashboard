import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function ProfileAvatarPicker({
  initialAvatar = "",
  isDeleting = false,
  isUploading = false,
  onAvatarChange,
  onAvatarDelete,
}) {
  const fileInputRef = useRef(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatarSrc = avatarPreview || initialAvatar || "";
  const isBusy = isUploading || isDeleting;
  const isMenuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    setAvatarPreview("");
  }, [initialAvatar]);

  const handleMenuOpen = (event) => {
    if (isBusy) return;
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handlePreviewOpen = () => {
    handleMenuClose();
    setIsPreviewOpen(true);
  };

  const handleUploadClick = () => {
    handleMenuClose();
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    onAvatarDelete?.();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const previewUrl = String(reader.result);
      setAvatarPreview(previewUrl);
      onAvatarChange?.({ file, previewUrl });
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <Box sx={{ position: "relative", flexShrink: 0 }}>
      <Box
        component="button"
        type="button"
        onClick={handleMenuOpen}
        disabled={isBusy}
        sx={{
          p: 0,
          border: 0,
          bgcolor: "transparent",
          borderRadius: "12px",
          cursor: isBusy ? "default" : "pointer",
        }}
      >
        <Avatar
          src={avatarSrc || undefined}
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
      </Box>

      <Box
        component="input"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        disabled={isBusy}
        sx={{ display: "none" }}
      />

      <IconButton
        type="button"
        disabled={isBusy}
        onClick={handleMenuOpen}
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
        {isBusy ? (
          <CircularProgress size={14} thickness={5} />
        ) : (
          <CameraAltOutlinedIcon sx={{ fontSize: 14 }} />
        )}
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.8,
              minWidth: 150,
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.14)",
            },
          },
        }}
      >
        <MenuItem onClick={handlePreviewOpen} disabled={!avatarSrc}>
          عرض الصورة
        </MenuItem>
        <MenuItem onClick={handleUploadClick}>تحميل صورة</MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: "#FF5E58" }}>
          حذف الصورة
        </MenuItem>
      </Menu>

      <Dialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
            bgcolor: "#FFFFFF",
          },
        }}
      >
        <IconButton
          onClick={() => setIsPreviewOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 1,
            bgcolor: "#FFFFFF",
            boxShadow: "0 2px 10px rgba(15, 23, 42, 0.12)",
            "&:hover": { bgcolor: "#FFFFFF" },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <DialogContent sx={{ p: 0, bgcolor: "#F7F7F7" }}>
          <Box
            component="img"
            src={avatarSrc}
            alt="صورة الملف الشخصي"
            sx={{
              display: "block",
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

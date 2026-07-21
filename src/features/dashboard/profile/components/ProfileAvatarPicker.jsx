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
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            color: (theme) => theme.palette.dashboard.textPrimary,
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
          bgcolor: (theme) => theme.palette.dashboard.surface,
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          color: (theme) => theme.palette.dashboard.textSecondary,
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
          },
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
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              color: (theme) => theme.palette.dashboard.textPrimary,
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 14px 32px rgba(0, 0, 0, 0.3)"
                  : "0 8px 24px rgba(15, 23, 42, 0.14)",
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
            bgcolor: (theme) => theme.palette.dashboard.surface,
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
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            color: (theme) => theme.palette.dashboard.textPrimary,
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 8px 22px rgba(0, 0, 0, 0.28)"
                : "0 2px 10px rgba(15, 23, 42, 0.12)",
            "&:hover": {
              bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <DialogContent
          sx={{
            p: 0,
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          }}
        >
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

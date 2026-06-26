import { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HomeThemeSwitch from "./HomeThemeSwitch";
import ProfileModal from "../../profile/components/ProfileModal";
import NotificationsSlide from "./NotificationsSlide";

function HeaderAction({ children, sx }) {
  return (
    <Box
      sx={{
        height: 48,
        minWidth: 62,
        px: 1.5,
        borderRadius: "999px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function getStoredAuthUser() {
  try {
    const rawUser = localStorage.getItem("authUser");

    if (!rawUser) {
      return null;
    }

    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

function getRoleLabel(role) {
  if (role === "owner") {
    return "مالك التطبيق";
  }

  if (role === "supervisor") {
    return "مشرف";
  }

  return "مستخدم النظام";
}

function getAvatarLetter(name) {
  if (!name) {
    return "؟";
  }

  return name.trim().charAt(0);
}

export default function HomeHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const authUser = getStoredAuthUser();
  const userName = authUser?.name || "مستخدم النظام";
  const userRoleLabel = getRoleLabel(authUser?.role);
  const avatarLetter = getAvatarLetter(userName);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack
          component="button"
          type="button"
          direction="row"
          spacing={1}
          alignItems="center"
          gap={1}
          onClick={() => setIsProfileOpen(true)}
          sx={{
            border: 0,
            p: 0,
            bgcolor: "transparent",
            cursor: "pointer",
            font: "inherit",
            "&:hover .profile-name": {
              color: "#5583FF",
            },
          }}
        >
          <Avatar
            sx={{
              width: 54,
              height: 54,
              border: (theme) => `2px solid ${theme.palette.dashboard.chartBorder}`,
              boxShadow: "0 4px 10px rgba(15, 23, 42, 0.08)",
              bgcolor: "#D9D9D9",
              color: (theme) => theme.palette.dashboard.chartTextPrimary,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {avatarLetter}
          </Avatar>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              className="profile-name"
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.3,
                transition: "color 160ms ease",
              }}
            >
              {userName}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 13,
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {userRoleLabel}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center" gap={2}>
          <HomeThemeSwitch />
          <HeaderAction sx={{ minWidth: 48, width: 48, px: 0 }}>
            <Badge
              badgeContent=""
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#FF6B6B",
                  width: 8,
                  height: 8,
                  minWidth: 8,
                  borderRadius: "50%",
                  top: 7,
                  right: 7,
                  boxShadow: (theme) => `0 0 0 2px ${theme.palette.dashboard.chartBackground}`,
                },
              }}
            >
              <IconButton
                onClick={() => setIsNotificationsOpen(true)}
                sx={{ color: (theme) => theme.palette.dashboard.chartTextPrimary }}
              >
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Badge>
          </HeaderAction>
        </Stack>
      </Box>
      <ProfileModal open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <NotificationsSlide
        open={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
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
import ProfileModal from "../../../profile/components/ProfileModal";
import NotificationsSlide from "./NotificationsSlide";
import { useFirebaseMessaging } from "../../../../notifications/hooks/useFirebaseMessaging";
import { useUnreadNotificationsCountQuery } from "../../../../notifications/hooks/useUnreadNotificationsCountQuery";
import { showNotificationToast } from "../../../../../shared/lib/Tost/toastService";

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
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 10px 24px rgba(0, 0, 0, 0.22)"
            : "0 4px 14px rgba(15, 23, 42, 0.06)",
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

function showFirebaseNotificationToast(payload) {
  const title =
    payload.notification?.title || payload.data?.title || "إشعار جديد";
  const message = payload.notification?.body || payload.data?.body || title;

  showNotificationToast(message, title);
}

export default function HomeHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [authUser, setAuthUser] = useState(() => getStoredAuthUser());
  const userName = authUser?.name || "مستخدم النظام";
  const userRoleLabel = getRoleLabel(authUser?.role);
  const userPhoto = authUser?.photo || authUser?.avatar || authUser?.avatar_url || "";
  const avatarLetter = getAvatarLetter(userName);
  const unreadNotificationsCountQuery = useUnreadNotificationsCountQuery();
  const unreadNotificationsCount =
    Number(unreadNotificationsCountQuery.data?.data?.unread_count) || 0;
  const hasUnreadNotifications =
    unreadNotificationsCountQuery.data?.data?.has_unread === true ||
    unreadNotificationsCount > 0;
  const handleForegroundMessage = useCallback((payload) => {
    showFirebaseNotificationToast(payload);
  }, []);
  const { fcmToken, permission, requestPermissionAndGetToken } =
    useFirebaseMessaging({
      onForegroundMessage: handleForegroundMessage,
    });

  const handleOpenNotifications = useCallback(() => {
    setIsNotificationsOpen(true);

    if (permission === "default" || (permission === "granted" && !fcmToken)) {
      void requestPermissionAndGetToken();
    }
  }, [fcmToken, permission, requestPermissionAndGetToken]);

  useEffect(() => {
    const refreshStoredUser = () => {
      setAuthUser(getStoredAuthUser());
    };

    window.addEventListener("authUserUpdated", refreshStoredUser);
    window.addEventListener("storage", refreshStoredUser);

    return () => {
      window.removeEventListener("authUserUpdated", refreshStoredUser);
      window.removeEventListener("storage", refreshStoredUser);
    };
  }, []);

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
              color: (theme) => theme.palette.dashboard.logoPrimary,
            },
          }}
        >
          <Avatar
            src={userPhoto || undefined}
            imgProps={{ alt: userName }}
            sx={{
              width: 54,
              height: 54,
              border: (theme) => `2px solid ${theme.palette.dashboard.chartBorder}`,
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 10px 22px rgba(0, 0, 0, 0.24)"
                  : "0 4px 10px rgba(15, 23, 42, 0.08)",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.dashboard.chartBackground
                  : "#D9D9D9",
              color: (theme) => theme.palette.dashboard.chartTextPrimary,
              fontSize: 14,
              fontWeight: 700,
              "& img": {
                objectFit: "cover",
              },
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
              badgeContent={unreadNotificationsCount}
              invisible={!hasUnreadNotifications}
              max={99}
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#FF6B6B",
                  color: "#FFFFFF",
                  minWidth: 18,
                  height: 18,
                  px: 0.5,
                  borderRadius: "999px",
                  top: 5,
                  right: 5,
                  fontSize: 10,
                  fontWeight: 800,
                  boxShadow: (theme) => `0 0 0 2px ${theme.palette.dashboard.chartBackground}`,
                },
              }}
            >
              <IconButton
                onClick={handleOpenNotifications}
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

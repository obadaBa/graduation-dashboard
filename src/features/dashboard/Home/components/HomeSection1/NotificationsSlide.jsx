import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMarkNotificationsAsReadMutation } from "../../../../notifications/hooks/useMarkNotificationsAsReadMutation";
import { useNotificationsQuery } from "../../../../notifications/hooks/useNotificationsQuery";

function cleanText(value, fallback = "") {
  if (value == null) return fallback;

  return String(value).replace(/[\u200e\u200f]/g, "").trim() || fallback;
}

function getAvatarLetter(title) {
  const cleanTitle = cleanText(title, "؟");

  return cleanTitle.charAt(0);
}

function getNotificationTarget(notification) {
  const metadata = notification?.metadata || {};
  const params = metadata.params || {};

  if (params.verification_request_id) {
    return "/account-verification";
  }

  if (params.test_id) {
    return `/test-details/${params.test_id}`;
  }

  if (params.material_id) {
    return `/content/${params.material_id}`;
  }

  if (params.user_id) {
    return `/user-profile/${params.user_id}`;
  }

  const screen = metadata.navigation?.screen;

  if (screen === "dashboard_home") {
    return "/dashboard";
  }

  return null;
}

function NotificationAvatar({ notification }) {
  const isSystem = notification.mode === "system";
  const floorColor =
    notification.floor_color ||
    notification.metadata?.presentation?.floor_color ||
    "#F3F6FF";
  const icon = notification.icon || notification.metadata?.presentation?.icon;

  if (isSystem) {
    return (
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: "50%",
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.dashboard.logoPrimary, 0.16)
                : floorColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon ? (
          <Box
            component="img"
            src={icon}
            alt=""
            sx={{
              width: 24,
              height: 24,
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            !
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Avatar
      src={notification.image || notification.metadata?.actor?.avatar_url || undefined}
      imgProps={{ alt: cleanText(notification.title, "إشعار") }}
      sx={{
        width: 50,
        height: 50,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? alpha(theme.palette.dashboard.logoPrimary, 0.18)
            : "#D9D9D9",
        color: (theme) => theme.palette.dashboard.textPrimary,
        fontSize: 14,
        fontWeight: 700,
        flexShrink: 0,
        "& img": {
          objectFit: "cover",
        },
      }}
    >
      {getAvatarLetter(notification.title)}
    </Avatar>
  );
}

function NotificationItem({ notification, onOpen }) {
  const title = cleanText(notification.title, "إشعار جديد");
  const body = cleanText(notification.body);
  const target = getNotificationTarget(notification);
  const isUnread = notification.is_read === false;

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.2}
      sx={{
        position: "relative",
        mx: -0.8,
        px: 0.8,
        py: 1.15,
        borderRadius: "8px",
        borderBottom: (theme) => `1px solid ${theme.palette.dashboard.divider}`,
        bgcolor: (theme) =>
          isUnread
            ? alpha(theme.palette.dashboard.logoPrimary, theme.palette.mode === "dark" ? 0.14 : 0.09)
            : "transparent",
        boxShadow: isUnread
          ? (theme) =>
              theme.palette.mode === "dark"
                ? "0 1px 0 rgba(255, 255, 255, 0.04)"
                : "0 1px 0 rgba(85, 131, 255, 0.05)"
          : "none",
        transition: "background-color 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          bgcolor: (theme) =>
            isUnread
              ? alpha(theme.palette.dashboard.logoPrimary, theme.palette.mode === "dark" ? 0.2 : 0.13)
              : theme.palette.dashboard.hoverItem.background,
        },
      }}
    >
      <NotificationAvatar notification={notification} />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" alignItems="center" gap={0.7}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 13.5,
              fontWeight: 700,
              lineHeight: 1.25,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          {isUnread && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: (theme) => theme.palette.dashboard.logoPrimary,
                flexShrink: 0,
              }}
            />
          )}
        </Stack>

        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 11.5,
            fontWeight: 500,
            lineHeight: 1.7,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {body}
        </Typography>

        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 10.5,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {cleanText(notification.sent_at)}
        </Typography>
      </Box>

      <Box
        component="button"
        type="button"
        disabled={!target}
        onClick={() => onOpen(notification)}
        sx={{
          border: 0,
          minWidth: 48,
          height: 22,
          px: 1.5,
          borderRadius: "999px",
          bgcolor: (theme) =>
            target
              ? theme.palette.dashboard.chartBackground
              : alpha(theme.palette.dashboard.chartBackground, 0.5),
          color: (theme) =>
            target
              ? theme.palette.dashboard.textSecondary
              : alpha(theme.palette.dashboard.textSecondary, 0.55),
          fontSize: 10.5,
          fontWeight: 600,
          cursor: target ? "pointer" : "not-allowed",
          flexShrink: 0,
          "&:hover": {
            bgcolor: (theme) =>
              target
                ? theme.palette.dashboard.hoverItem.background
                : alpha(theme.palette.dashboard.chartBackground, 0.5),
          },
        }}
      >
        عرض
      </Box>
    </Stack>
  );
}

export default function NotificationsSlide({ open, onClose }) {
  const navigate = useNavigate();
  const displayedNotificationIdsRef = useRef([]);
  const submittedReadNotificationIdsRef = useRef(new Set());
  const { mutate: markNotificationsAsRead } =
    useMarkNotificationsAsReadMutation();
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useNotificationsQuery({ enabled: open });
  const notifications = useMemo(
    () =>
      data?.pages?.flatMap((page) => page?.data?.notifications || []) || [],
    [data],
  );
  const displayedNotificationIds = useMemo(
    () => notifications.map((notification) => notification.id).filter(Boolean),
    [notifications],
  );

  useEffect(() => {
    displayedNotificationIdsRef.current = displayedNotificationIds;
  }, [displayedNotificationIds]);

  const markDisplayedNotificationsAsRead = useCallback(() => {
    const pendingDisplayedNotificationIds = displayedNotificationIdsRef.current.filter(
      (notificationId) =>
        notificationId &&
        !submittedReadNotificationIdsRef.current.has(notificationId),
    );

    if (pendingDisplayedNotificationIds.length === 0) {
      return;
    }

    pendingDisplayedNotificationIds.forEach((notificationId) => {
      submittedReadNotificationIdsRef.current.add(notificationId);
    });
    markNotificationsAsRead(pendingDisplayedNotificationIds, {
      onError: () => {
        pendingDisplayedNotificationIds.forEach((notificationId) => {
          submittedReadNotificationIdsRef.current.delete(notificationId);
        });
      },
    });
  }, [markNotificationsAsRead]);

  const handleClose = useCallback(() => {
    if (!isLoading && !isError) {
      markDisplayedNotificationsAsRead();
    }

    onClose();
  }, [isError, isLoading, markDisplayedNotificationsAsRead, onClose]);

  const handleOpenNotification = (notification) => {
    const target = getNotificationTarget(notification);

    if (!target) return;

    handleClose();
    navigate(target);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(8, 12, 20, 0.56)"
                : "rgba(255, 255, 255, 0.44)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <Slide
        direction="left"
        in={open}
        timeout={{ enter: 320, exit: 260 }}
        mountOnEnter
        unmountOnExit
      >
        <Box
          dir="rtl"
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: { xs: "100%", sm: 390 },
            height: "100dvh",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "-10px 0 34px rgba(0, 0, 0, 0.38)"
                : "-10px 0 30px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            outline: "none",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 2,
              py: 2.2,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "3px",
                backgroundImage:
                  (theme) =>
                    `repeating-linear-gradient(to left, ${theme.palette.dashboard.divider} 0 18px, transparent 18px 29px)`,
              },
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 20,
                fontWeight: 700,
                mt: 2,
              }}
            >
              مركز الاشعارات
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                width: 32,
                height: 32,
                bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 8px 22px rgba(0, 0, 0, 0.26)"
                    : "0 2px 10px rgba(15, 23, 42, 0.08)",
                color: (theme) => theme.palette.dashboard.textPrimary,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
                },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Stack sx={{ flex: 1, overflowY: "auto", px: 2, pt: 2.3 }} gap={1}>
            {isLoading && (
              <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
                <CircularProgress size={26} />
              </Stack>
            )}

            {!isLoading && isError && (
              <Typography
                sx={{
                  color: "#FF5E58",
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                  py: 4,
                }}
              >
                تعذر جلب الإشعارات
              </Typography>
            )}

            {!isLoading && !isError && notifications.length === 0 && (
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                  py: 4,
                }}
              >
                لا توجد إشعارات حالياً
              </Typography>
            )}

            {!isLoading &&
              !isError &&
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onOpen={handleOpenNotification}
                />
              ))}

            {hasNextPage && (
              <Box
                component="button"
                type="button"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                sx={{
                  border: 0,
                  width: "100%",
                  height: 36,
                  borderRadius: "8px",
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: isFetchingNextPage ? "default" : "pointer",
                  mb: 2,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
                  },
                }}
              >
                {isFetchingNextPage ? "جارٍ التحميل..." : "عرض المزيد"}
              </Box>
            )}
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}

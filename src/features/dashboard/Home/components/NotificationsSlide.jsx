import {
  Avatar,
  Box,
  IconButton,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const notifications = [
  {
    id: 1,
    userName: "محمد هشام منصور",
    description: "قام بتسجيل إعجاب بالاختبار الخاص بك",
    time: "10 يوم",
    action: "إزالة",
    unread: false,
  },
  {
    id: 2,
    userName: "عبيدة الرحال",
    description: "أرسل تعليقاً جديداً على اختبارك",
    time: "منذ ساعة",
    action: "عرض",
    unread: true,
  },
  {
    id: 3,
    userName: "محمد منصور",
    description: "قام بشراء اختبار جلسة امتحانية أولى",
    time: "منذ يوم",
    action: "عرض",
    unread: false,
  },
];

function NotificationItem({ notification }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.2}
      sx={{
        position: "relative",
        py: 1.3,
        borderBottom: "1px solid #EFEFEF",
      }}
    >
      <Avatar
        sx={{
          width: 50,
          height: 50,
          bgcolor: "#D9D9D9",
          color: "#263238",
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        م
      </Avatar>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" alignItems="center" gap={0.7}>
          <Typography
            sx={{
              color: "#263238",
              fontSize: 13.5,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {notification.userName}
          </Typography>
          {notification.unread && (
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#FF6B6B",
                flexShrink: 0,
              }}
            />
          )}
        </Stack>

        <Typography
          sx={{
            color: "#9A9A9A",
            fontSize: 11.5,
            fontWeight: 500,
            lineHeight: 1.7,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {notification.description}
        </Typography>

        <Typography
          sx={{
            color: "#263238",
            fontSize: 10.5,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {notification.time}
        </Typography>
      </Box>

      <Box
        component="button"
        type="button"
        sx={{
          border: 0,
          minWidth: 48,
          height: 22,
          px: 1.5,
          borderRadius: "999px",
          bgcolor: "#F1F1F1",
          color: "#A1A1A1",
          fontSize: 10.5,
          fontWeight: 600,
          cursor: "pointer",
          flexShrink: 0,
          "&:hover": {
            bgcolor: "#E9E9E9",
          },
        }}
      >
        {notification.action}
      </Box>
    </Stack>
  );
}

export default function NotificationsSlide({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(255, 255, 255, 0.44)",
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
            bgcolor: "#FFFFFF",
            boxShadow: "-10px 0 30px rgba(15, 23, 42, 0.08)",
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
                  "repeating-linear-gradient(to left, #CFCFCF 0 18px, transparent 18px 29px)",
              },
            }}
          >
            <Typography sx={{ color: "#263238", fontSize: 20, fontWeight: 700, mt: 2 }}>
             مركز الاشعارات
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#FFFFFF",
                boxShadow: "0 2px 10px rgba(15, 23, 42, 0.08)",
                color: "#263238",
                "&:hover": { bgcolor: "#F7F7F7" },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Stack sx={{ flex: 1, overflowY: "auto", px: 2, pt: 2.3  }} gap={1}>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}

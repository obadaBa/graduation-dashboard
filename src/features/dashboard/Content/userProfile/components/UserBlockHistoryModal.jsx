import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useUserBanHistoryQuery } from "../../../Users/hooks/useUserBanHistoryQuery";

const fallbackActorAvatar =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80";

function roleLabel(role) {
  if (role === "owner") return "مالك التطبيق";
  if (role === "supervisor") return "مشرف";
  return "إدارة التطبيق";
}

function HistoryCard({ record }) {
  const imposedBy = record.imposed_by || {};

  return (
    <Stack direction="row" alignItems="flex-start" gap={1.1}>
      <BlockRoundedIcon
        sx={{
          mt: 0.6,
          color: "#FF4F55",
          fontSize: 25,
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          border: "1px solid #DEDEDE",
          borderRadius: "8px",
          bgcolor: "#FFFFFF",
          px: 1.25,
          py: 1.05,
        }}
      >
        <Typography
          sx={{
            color: "#5C84FF",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "right",
          }}
        >
          {record.serial_no}#
        </Typography>

        <Typography
          sx={{
            mt: 0.7,
            color: "#969696",
            fontSize: 11,
            fontWeight: 500,
            lineHeight: 1.6,
            textAlign: "right",
          }}
        >
          {record.reason}
        </Typography>

        <Box sx={{ mt: 0.8, mr: 0, ml: 0, borderTop: "1px solid #D2D2D2" }} />

        <Typography
          sx={{
            mt: 0.8,
            color: "#8F8F8F",
            fontSize: 13,
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          قام بالحظر
        </Typography>

        <Stack direction="row" alignItems="center" gap={0.9} sx={{ mt: 0.4 }}>
          <Avatar
            src={imposedBy.avatar || fallbackActorAvatar}
            alt={imposedBy.name || "منفذ الحظر"}
            sx={{
              width: 43,
              height: 43,
              borderRadius: "4px",
              bgcolor: "#E1E1E1",
            }}
          />
          <Box>
            <Typography
              sx={{ color: "#263238", fontSize: 14, fontWeight: 800, lineHeight: 1.35 }}
            >
              {imposedBy.name || "-"}
            </Typography>
            <Typography
              sx={{ color: "#A0A0A0", fontSize: 10.5, fontWeight: 500, lineHeight: 1.4 }}
            >
              {roleLabel(imposedBy.role)}
            </Typography>
          </Box>
        </Stack>

        <Typography
          sx={{
            mt: 0.65,
            color: "#8F8F8F",
            fontSize: 13,
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          تاريخ الحظر
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={0.8}
          sx={{ mt: 0.25 }}
        >
          <Stack direction="row" alignItems="center" gap={0.7}>
            <Typography sx={{ color: "#A0A0A0", fontSize: 11, fontWeight: 500 }}>
              من
            </Typography>
            <Typography
              dir="auto"
              sx={{
                color: "#263238",
                fontFamily: "serif",
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {record.starts_at || "-"}
            </Typography>
          </Stack>

          <ArrowBackRoundedIcon sx={{ color: "#8F9498", fontSize: 22 }} />

          <Stack direction="row" alignItems="center" gap={0.7}>
            <Typography sx={{ color: "#A0A0A0", fontSize: 11, fontWeight: 500 }}>
              إلى
            </Typography>
            <Typography
              dir="auto"
              sx={{
                color: "#263238",
                fontFamily: "serif",
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {record.ends_at || "حظر دائم"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default function UserBlockHistoryModal({ open, onClose, userId }) {
  const historyQuery = useUserBanHistoryQuery(userId, open);
  const records = Array.isArray(historyQuery.data?.data)
    ? historyQuery.data.data
    : [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(20, 24, 29, 0.3)",
            backdropFilter: "blur(7px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "calc(100% - 24px)", sm: 444 },
          height: "min(650px, calc(100vh - 24px))",
          maxHeight: "calc(100vh - 24px)",
          borderRadius: "14px",
          bgcolor: "#FFFFFF",
          boxShadow: "0 16px 44px rgba(22, 29, 37, 0.24)",
          direction: "rtl",
          outline: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ px: 2.2, pt: 2.2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ color: "#263238", fontSize: 21, fontWeight: 900 }}>
              سجل حظر المستخدم
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="إغلاق سجل الحظر"
              sx={{
                width: 31,
                height: 31,
                borderRadius: "3px",
                border: "1px solid #D3D7DA",
                color: "#263238",
                p: 0,
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Stack>

          <Box
            sx={{
              mt: 1.6,
              height: 3,
              background:
                "repeating-linear-gradient(to left, #CFCFCF 0 14px, transparent 14px 25px)",
            }}
          />
        </Box>

        <Stack
          spacing={1.4}
          sx={{
            px: 2.2,
            pt: 2.2,
            pb: 2,
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {historyQuery.isLoading && (
            <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
              <CircularProgress size={30} />
            </Box>
          )}

          {historyQuery.isError && (
            <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
              <Typography sx={{ color: "#FF5E58", fontSize: 14, fontWeight: 600 }}>
                تعذر تحميل سجل حظر المستخدم
              </Typography>
            </Box>
          )}

          {!historyQuery.isLoading && !historyQuery.isError && records.length === 0 && (
            <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
              <Typography sx={{ color: "#929292", fontSize: 14, fontWeight: 600 }}>
                لا يوجد سجل حظر لهذا المستخدم
              </Typography>
            </Box>
          )}

          {!historyQuery.isLoading &&
            records.map((record, index) => (
              <HistoryCard
                key={`${record.serial_no}-${index}`}
                record={{
                  ...record,
                  serial_no: record.serial_no ?? index + 1,
                }}
              />
            ))}
        </Stack>
      </Box>
    </Modal>
  );
}

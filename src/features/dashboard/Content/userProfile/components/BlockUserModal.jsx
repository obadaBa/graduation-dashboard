import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useUserProfileOverviewQuery } from "../../hooks/useUserProfileOverviewQuery";
import { useBanUserMutation } from "../../../Users/hooks/useBanUserMutation";
import { useLiftBanUserMutation } from "../../../Users/hooks/useLiftBanUserMutation";
import { useUserBanHistoryQuery } from "../../../Users/hooks/useUserBanHistoryQuery";
import UserBlockHistoryModal from "./UserBlockHistoryModal";

const MAX_REASON_LENGTH = 250;
const fallbackAvatar =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80";

function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  if (!value) return "لم يتم التحديد";

  return new Intl.DateTimeFormat("ar-SY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function formatCompactCount(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

function getStartHint(value) {
  if (!value) return "";

  const selectedDate = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const difference = Math.round((selectedDate - today) / 86400000);

  if (difference === 0) return "يبدأ اليوم";
  if (difference === 1) return "يبدأ غداً";
  if (difference > 1) return `يبدأ بعد ${difference} أيام`;
  return "بدأ مسبقاً";
}

function DateValue({ label, value, onChange, disabled = false }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    if (disabled) return;
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.click();
    }
  };

  return (
    <Box
      component="button"
      type="button"
      onClick={openPicker}
      disabled={disabled}
      sx={{
        position: "relative",
        minWidth: 0,
        flex: 1,
        border: 0,
        p: 0,
        bgcolor: "transparent",
        color: "inherit",
        textAlign: "right",
        cursor: disabled ? "default" : "pointer",
        font: "inherit",
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 0.2,
          color: disabled
            ? "#777777"
            : (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 13,
          fontWeight: 700,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {disabled ? "حظر دائم" : formatDate(value)}
      </Typography>
      <Box
        ref={inputRef}
        component="input"
        type="date"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

export default function BlockUserModal({
  open,
  onClose,
  userId,
  initiallyBlocked = false,
  blockedUser,
}) {
  const today = useMemo(() => toInputDate(new Date()), []);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [isPermanent, setIsPermanent] = useState(false);
  const [reason, setReason] = useState("");
  const [isBlocked, setIsBlocked] = useState(initiallyBlocked);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const profileQuery = useUserProfileOverviewQuery(userId);
  const banHistoryQuery = useUserBanHistoryQuery(userId, open);
  const banUserMutation = useBanUserMutation({
    onSuccess: () => {
      setIsBlocked(true);
      banHistoryQuery.refetch?.();
    },
  });
  const liftBanUserMutation = useLiftBanUserMutation({
    onSuccess: () => {
      setIsBlocked(false);
      banHistoryQuery.refetch?.();
    },
  });

  const header = profileQuery.data?.data?.header || {};
  const firstBanRecord = Array.isArray(banHistoryQuery.data?.data)
    ? banHistoryQuery.data.data[0] || null
    : null;
  const shouldShowBlockedState = ["active", "future"].includes(firstBanRecord?.ban_status);
  const blockedIsPermanent =
    shouldShowBlockedState &&
    (!firstBanRecord?.ends_at || blockedUser?.ban_type === "حظر دائم");
  const canSubmit =
    Boolean(userId) &&
    Boolean(reason.trim()) &&
    (isPermanent || (Boolean(startDate) && Boolean(endDate)));

  const handleBlockUser = () => {
    if (!canSubmit || banUserMutation.isPending) return;

    banUserMutation.mutate({
      userId,
      isPermanent,
      startsAt: startDate,
      endsAt: endDate,
      reason,
    });
  };

  const handleLiftBanUser = () => {
    if (!userId || liftBanUserMutation.isPending) return;
    liftBanUserMutation.mutate(userId);
  };

  useEffect(() => {
    setIsBlocked(initiallyBlocked);
  }, [initiallyBlocked, userId]);

  useEffect(() => {
    if (!open || shouldShowBlockedState) return;
    setStartDate(today);
    setEndDate("");
    setIsPermanent(false);
    setReason("");
  }, [open, shouldShowBlockedState, today]);

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
          height: shouldShowBlockedState ? "min(530px, calc(100vh - 24px))" : "auto",
          maxHeight: "calc(100vh - 24px)",
          borderRadius: "14px",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          boxShadow: "0 16px 44px rgba(22, 29, 37, 0.24)",
          direction: "rtl",
          outline: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ px: 2.4, pt: 2.2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 21,
                fontWeight: 900,
              }}
            >
              قائمة حظر المستخدم
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="إغلاق"
              sx={{
                width: 31,
                height: 31,
                borderRadius: "3px",
                border: (theme) =>
                  `1px solid ${theme.palette.dashboard.chartBorder}`,
                color: (theme) => theme.palette.dashboard.textPrimary,
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
              background: (theme) =>
                `repeating-linear-gradient(to left, ${theme.palette.dashboard.divider} 0 14px, transparent 14px 25px)`,
            }}
          />
        </Box>

        <Box
          sx={{
            px: 2.4,
            pt: 1.8,
            pb: 1.2,
            flex: shouldShowBlockedState ? 1 : "initial",
            minHeight: 0,
            maxHeight: "calc(100vh - 130px)",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {profileQuery.isLoading ? (
            <Box sx={{ height: 62, display: "grid", placeItems: "center" }}>
              <CircularProgress size={25} />
            </Box>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" gap={1.8}>
                <Avatar
                  src={header.avatar || fallbackAvatar}
                  alt={header.name || "المستخدم"}
                  sx={{
                    width: 59,
                    height: 59,
                    borderRadius: "8px",
                    bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                  }}
                />
                <Box>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.dashboard.textPrimary,
                        fontSize: 16,
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header.name || "المستخدم"}
                    </Typography>
                    {header.is_academically_verified && (
                      <VerifiedRoundedIcon sx={{ color: "#5C84FF", fontSize: 16 }} />
                    )}
                  </Stack>
                  <Typography
                    sx={{
                      mt: 0.45,
                      color: (theme) => theme.palette.dashboard.textSecondary,
                      fontSize: 12,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {`${formatCompactCount(header.followers_count)} متابع · ${formatCompactCount(header.following_count)} يتابع · ${formatCompactCount(header.published_tests_count)} اختبار`}
                  </Typography>
                </Box>
              </Stack>

              <Button
                type="button"
                onClick={() => setIsHistoryOpen(true)}
                sx={{
                  minWidth: 102,
                  height: 30,
                  borderRadius: "3px",
                  border: "1px solid #C9CDD0",
                  bgcolor: (theme) => theme.palette.dashboard.surface,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 13,
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.dashboard.surface,
                  },
                }}
              >
                سجل الحظر
              </Button>
            </Stack>
          )}

          {shouldShowBlockedState ? (
            <Box sx={{ mt: 2.2 }}>
              <Stack direction="row" alignItems="center" spacing={0.8}>
                <BlockRoundedIcon sx={{ color: "#FF4F55", fontSize: 25 }} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  هذا المستخدم محظور
                </Typography>
              </Stack>

              <Typography
                sx={{
                  mt: 0.55,
                  color: "#919191",
                  fontSize: 11,
                  fontWeight: 500,
                  lineHeight: 1.7,
                }}
              >
                {firstBanRecord?.reason ||
                  "لقد قمنا بحظر المستخدم لأسباب تتعلق بانتهاك الخصوصية"}
              </Typography>

              <Box sx={{ mt: 0.9, borderTop: "1px solid #D3D3D3" }} />

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#8F8F8F",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                تاريخ الحظر
              </Typography>

              <Stack spacing={0.35} sx={{ mt: 0.35 }}>
                <Stack direction="row" alignItems="center" gap={1.2}>
                  <Typography sx={{ width: 22, color: "#A0A0A0", fontSize: 11 }}>
                    من
                  </Typography>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.dashboard.textPrimary,
                      fontFamily: "serif",
                      fontSize: 14,
                      direction: "ltr",
                    }}
                  >
                    {firstBanRecord?.starts_at || "-"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1.2}>
                  <Typography sx={{ width: 22, color: "#A0A0A0", fontSize: 11 }}>
                    إلى
                  </Typography>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.dashboard.textPrimary,
                      fontFamily: "serif",
                      fontSize: 14,
                      direction: "ltr",
                    }}
                  >
                    {blockedIsPermanent ? "حظر دائم" : firstBanRecord?.ends_at || "-"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ) : (
            <>
              <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 2.1 }}>
                <BlockRoundedIcon sx={{ color: "#FF4F55", fontSize: 25 }} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  تاريخ حظر المستخدم
                </Typography>
              </Stack>
              <Typography
                sx={{
                  mt: 0.55,
                  color: "#919191",
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: 1.7,
                }}
              >
                إن أقل مدة هي يوم واحد وأكثر مدة هي 30 يوماً، كما يمكنك حظر
                المستخدم بشكل دائم من خلال اختيار خيار الحظر الدائم
              </Typography>

              {!isPermanent && (
                <Box
                  sx={{
                    mt: 1.3,
                    minHeight: 82,
                    px: 1.5,
                    py: 1.15,
                    border: (theme) =>
                      `1px solid ${theme.palette.dashboard.chartBorder}`,
                    borderRadius: "7px",
                    bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.1}>
                    <DateValue label="من" value={startDate} onChange={setStartDate} />
                    <ArrowBackRoundedIcon sx={{ color: "#8F9498", fontSize: 24 }} />
                    <DateValue label="إلى" value={endDate} onChange={setEndDate} />
                  </Stack>
                  <Typography
                    sx={{
                      mt: 0.4,
                      color: "#5C84FF",
                      fontSize: 12,
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {getStartHint(startDate)}
                  </Typography>
                </Box>
              )}

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mt: 1.15,
                  minHeight: 48,
                  px: 1.2,
                  border: (theme) =>
                    `1px solid ${theme.palette.dashboard.chartBorder}`,
                  borderRadius: "7px",
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                }}
              >
                <Stack direction="row" alignItems="center" gap={1.4}>
                  <GavelRoundedIcon sx={{ color: "#8C9296", fontSize: 19 }} />
                  <Box>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.dashboard.textPrimary,
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      حظر بشكل دائم
                    </Typography>
                    <Typography
                      sx={{ color: "#A0A0A0", fontSize: 9.5, fontWeight: 500 }}
                    >
                      لن يتمكن المستخدم من الوصول إلى الحساب نهائياً
                    </Typography>
                  </Box>
                </Stack>
                <Switch
                  checked={isPermanent}
                  onChange={(event) => setIsPermanent(event.target.checked)}
                  size="small"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#FF4F55" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: "#FF4F55",
                    },
                  }}
                />
              </Stack>

              <Box sx={{ mt: 1.15 }}>
                <Box
                  component="textarea"
                  value={reason}
                  maxLength={MAX_REASON_LENGTH}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="ادخل سبب اختيارك لحظر هذا المستخدم ..."
                  sx={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: 51,
                    resize: "none",
                    border: (theme) =>
                      `1px solid ${theme.palette.dashboard.chartBorder}`,
                    borderRadius: "7px",
                    bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                    px: 1.3,
                    py: 1.5,
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontFamily: "inherit",
                    fontSize: 12,
                    fontWeight: 500,
                    outline: 0,
                    "&::placeholder": { color: "#A3A3A3", opacity: 1 },
                    "&:focus": { borderColor: "#FF7B7F" },
                  }}
                />
                <Typography
                  sx={{
                    mt: 0.15,
                    color: "#A0A0A0",
                    fontSize: 10,
                    direction: "ltr",
                    textAlign: "left",
                  }}
                >
                  {reason.length}\{MAX_REASON_LENGTH}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            px: 1.4,
            py: 1.05,
            borderTop: (theme) =>
              `1px solid ${theme.palette.dashboard.chartBorder}`,
            boxShadow: "0 -5px 12px rgba(28, 38, 49, 0.08)",
            bgcolor: (theme) => theme.palette.dashboard.surface,
          }}
        >
          <Button
            fullWidth
            type="button"
            onClick={shouldShowBlockedState ? handleLiftBanUser : handleBlockUser}
            disabled={
              shouldShowBlockedState
                ? liftBanUserMutation.isPending
                : !canSubmit || banUserMutation.isPending
            }
            sx={{
              height: 39,
              borderRadius: "4px",
              bgcolor: shouldShowBlockedState ? "#F1F1F1" : "#FF4F55",
              color: shouldShowBlockedState ? "#9A9A9A" : "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              boxShadow: shouldShowBlockedState
                ? "none"
                : "0 2px 7px rgba(255, 79, 85, 0.28)",
              "&:hover": { bgcolor: shouldShowBlockedState ? "#F1F1F1" : "#FF4F55" },
              "&.Mui-disabled": {
                bgcolor: "#F1F1F1",
                color: "#9A9A9A",
                boxShadow: "none",
              },
            }}
          >
            {shouldShowBlockedState
              ? liftBanUserMutation.isPending
                ? "جاري رفع الحظر..."
                : "إلغاء الحظر"
              : banUserMutation.isPending
                ? "جاري حفظ عملية الحظر..."
                : "حفظ عملية الحظر"}
          </Button>
        </Box>

        <UserBlockHistoryModal
          open={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          userId={userId}
        />
      </Box>
    </Modal>
  );
}

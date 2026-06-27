import { useMemo, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  IconButton,
  InputBase,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useBlockedUsersQuery } from "../hooks/useBlockedUsersQuery";

const FILTERS = [
  { value: "all", label: "الكل" },
  { value: "permanent", label: "حظر دائم" },
  { value: "temporary", label: "حظر مؤقت" },
];

function FilterChip({ label, active, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        height: 24,
        px: 1.65,
        borderRadius: "999px",
        bgcolor: active ? "#5C84FF" : "#F3F3F3",
        color: active ? "#FFFFFF" : "#A0A0A0",
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active ? "#5C84FF" : "#ECECEC",
        },
      }}
    >
      {label}
    </ButtonBase>
  );
}

function UserTag({ label, variant = "blue" }) {
  return (
    <Box
      sx={{
        minHeight: 22,
        px: 1,
        borderRadius: "4px",
        bgcolor: variant === "red" ? "#FFECEC" : "#EEF2FF",
        color: variant === "red" ? "#FF5E58" : "#5C84FF",
        display: "inline-flex",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {label || "-"}
    </Box>
  );
}

function BlockedUserItem({ user }) {
  const banLabel = user.ban_ends_at || user.ban_type || "-";

  return (
    <Box sx={{ py: 2.2, borderBottom: "2px solid #F0F0F0" }}>
      <Stack direction="row" alignItems="center" spacing={0.8}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 62, height: 62, flexShrink: 0 }}
        />

        <Box
          sx={{
            minWidth: 0,
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.55}>
            <Typography
              sx={{
                color: "#263238",
                fontSize: 18,
                fontWeight: 900,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 190,
              }}
            >
              {user.name}
            </Typography>
            {user.is_academically_verified && (
              <VerifiedRoundedIcon sx={{ fontSize: 21, color: "#5C84FF" }} />
            )}
          </Stack>

          <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mt: 0.8 }}>
            <UserTag label={user.education_level} />
            <UserTag label={banLabel} variant="red" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default function UsersBlockListModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const blockedUsersQuery = useBlockedUsersQuery({
    tab: activeTab,
    enabled: open,
  });
  const displayedUsers = useMemo(() => {
    const blockedUsers = Array.isArray(blockedUsersQuery.data?.data)
      ? blockedUsersQuery.data.data
      : [];
    const normalizedSearch = searchValue.trim().toLocaleLowerCase("ar");

    if (!normalizedSearch) return blockedUsers;

    return blockedUsers.filter((user) =>
      String(user.name || "")
        .toLocaleLowerCase("ar")
        .includes(normalizedSearch),
    );
  }, [blockedUsersQuery.data, searchValue]);

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
            width: { xs: "100%", sm: 330 },
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
            <Typography
              sx={{ color: "#263238", fontSize: 22, fontWeight: 900, mt: 2 }}
            >
              قائمة الحظر
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="إغلاق قائمة الحظر"
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

          <Box sx={{ px: 2, pt: 1.7, pb: 2, overflow: "hidden" }}>
            <Box
              sx={{
                height: 34,
                borderRadius: "999px",
                bgcolor: "#F6F6F6",
                display: "flex",
                alignItems: "center",
                px: 1.1,
                gap: 0.9,
              }}
            >
              <SearchRoundedIcon sx={{ fontSize: 18, color: "#B0B0B0" }} />
              <InputBase
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="البحث عن مستخدمين"
                sx={{
                  flex: 1,
                  color: "#263238",
                  fontSize: 12,
                  fontWeight: 500,
                  textAlign: "right",
                  "& input::placeholder": {
                    color: "#A9A9A9",
                    opacity: 1,
                  },
                }}
              />
              <IconButton
                size="small"
                disabled={!searchValue}
                onClick={() => setSearchValue("")}
                aria-label="مسح البحث"
              >
                <CloseRoundedIcon sx={{ fontSize: 16, color: "#A9A9A9" }} />
              </IconButton>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 1.7, gap: 1.4 }}
            >
              {FILTERS.map((filter) => (
                <FilterChip
                  key={filter.value}
                  label={filter.label}
                  active={activeTab === filter.value}
                  onClick={() => setActiveTab(filter.value)}
                />
              ))}
            </Stack>

            <Box
              sx={{
                mt: 1.15,
                height: "calc(100dvh - 176px)",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {blockedUsersQuery.isLoading && (
                <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={28} />
                </Box>
              )}

              {!blockedUsersQuery.isLoading &&
                displayedUsers.map((user) => (
                  <BlockedUserItem key={user.user_id} user={user} />
                ))}

              {!blockedUsersQuery.isLoading && displayedUsers.length === 0 && (
                <Typography
                  sx={{
                    py: 8,
                    color: "#8A8A8A",
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  لا يوجد مستخدمون محظورون
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}

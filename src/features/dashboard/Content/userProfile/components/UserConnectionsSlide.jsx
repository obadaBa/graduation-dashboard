import { useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useFollowersQuery } from "../../hooks/useFollowersQuery";
import { useFollowingQuery } from "../../hooks/useFollowingQuery";

const appUrl = process.env.REACT_APP_APP_URL || "http://localhost";
const defaultAvatar = `${appUrl}/storage/defaults/default-avatar.svg`;

function ConnectionItem({ user }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.2}
      sx={{
        py: 1.45,
        borderBottom: (theme) =>
          `1px solid ${theme.palette.dashboard.chartBorder}`,
      }}
    >
      <Avatar
        src={user.avatar_url || defaultAvatar}
        alt={user.name}
        sx={{
          width: 52,
          height: 52,
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          flexShrink: 0,
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
        <Stack direction="row" alignItems="center" gap={0.55}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 14,
              fontWeight: 800,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.name}
          </Typography>
          {user.is_academically_verified && (
            <VerifiedRoundedIcon sx={{ color: "#5C84FF", fontSize: 16 }} />
          )}
        </Stack>

        <Box
          sx={{
            mt: 0.6,
            width: "fit-content",
            px: 1,
            py: 0.35,
            borderRadius: "4px",
            bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
            color: (theme) => theme.palette.dashboard.logoPrimary,
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          {user.education_level || "-"}
        </Box>
      </Box>
    </Stack>
  );
}

export default function UserConnectionsSlide({
  open,
  onClose,
  type,
  userId,
}) {
  const [searchValue, setSearchValue] = useState("");
  const title =
    type === "following" ? "قائمة الذين يتابعهم" : "قائمة المتابعين";
  const followersQuery = useFollowersQuery({
    userId,
    search: searchValue.trim(),
    enabled: open && type === "followers",
  });
  const followingQuery = useFollowingQuery({
    userId,
    search: searchValue.trim(),
    enabled: open && type === "following",
  });
  const connectionsQuery =
    type === "following" ? followingQuery : followersQuery;
  const users = (connectionsQuery.data?.pages || []).flatMap((page) =>
    Array.isArray(page?.data) ? page.data : page?.data?.items || [],
  );

  const handleClose = () => {
    setSearchValue("");
    onClose();
  };

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const remaining =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (
      remaining < 140 &&
      connectionsQuery.hasNextPage &&
      !connectionsQuery.isFetchingNextPage
    ) {
      connectionsQuery.fetchNextPage();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(20, 24, 29, 0.34)",
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
            width: { xs: "100%", sm: 370 },
            height: "100dvh",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
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
              py: 2.1,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "3px",
                backgroundImage: (theme) =>
                  `repeating-linear-gradient(to left, ${theme.palette.dashboard.divider} 0 18px, transparent 18px 29px)`,
              },
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label="إغلاق"
              sx={{
                width: 34,
                height: 34,
                bgcolor: (theme) => theme.palette.dashboard.surface,
                boxShadow: (theme) => theme.palette.dashboard.shadow,
                color: (theme) => theme.palette.dashboard.textPrimary,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 21 }} />
            </IconButton>
          </Stack>

          <Box sx={{ px: 2, pt: 1.8 }}>
            <Box
              sx={{
                height: 38,
                px: 1.3,
                borderRadius: "999px",
                bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <SearchRoundedIcon
                sx={{
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 19,
                }}
              />
              <InputBase
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="البحث عن مستخدم"
                sx={{
                  flex: 1,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 12,
                  "& input": { textAlign: "right" },
                }}
              />
              {searchValue && (
                <IconButton
                  onClick={() => setSearchValue("")}
                  aria-label="مسح البحث"
                  sx={{
                    width: 25,
                    height: 25,
                    color: (theme) => theme.palette.dashboard.textSecondary,
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 15 }} />
                </IconButton>
              )}
            </Box>
          </Box>

          <Stack
            onScroll={handleScroll}
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              pt: 1.2,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {connectionsQuery.isLoading ? (
              <Box sx={{ py: 10, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={30} />
              </Box>
            ) : (
              users.map((user) => (
                <ConnectionItem key={user.user_id} user={user} />
              ))
            )}

            {connectionsQuery.isFetchingNextPage && (
              <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} />
              </Box>
            )}

            {!connectionsQuery.isLoading && !users.length && (
              <Typography
                sx={{
                  py: 8,
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                لا توجد نتائج مطابقة
              </Typography>
            )}
          </Stack>
        </Box>
      </Slide>
    </Modal>
  );
}

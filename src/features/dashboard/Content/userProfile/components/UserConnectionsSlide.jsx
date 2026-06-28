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

const defaultAvatar = "http://localhost/storage/defaults/default-avatar.svg";

function ConnectionItem({ user }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.2}
      sx={{
        py: 1.45,
        borderBottom: "1px solid #EEEEEE",
      }}
    >
      <Avatar
        src={user.avatar_url || defaultAvatar}
        alt={user.name}
        sx={{
          width: 52,
          height: 52,
          bgcolor: "#E2E2E2",
          flexShrink: 0,
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
        <Stack direction="row" alignItems="center" gap={0.55}>
          <Typography
            sx={{
              color: "#263238",
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
            bgcolor: "#EEF2FF",
            color: "#5C84FF",
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
            bgcolor: "rgba(255, 255, 255, 0.42)",
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
            bgcolor: "#FFFFFF",
            boxShadow: "-10px 0 30px rgba(15, 23, 42, 0.10)",
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
                backgroundImage:
                  "repeating-linear-gradient(to left, #CFCFCF 0 18px, transparent 18px 29px)",
              },
            }}
          >
            <Typography
              sx={{ color: "#263238", fontSize: 21, fontWeight: 800 }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label="إغلاق"
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#FFFFFF",
                boxShadow: "0 2px 10px rgba(15, 23, 42, 0.10)",
                color: "#263238",
                "&:hover": { bgcolor: "#F7F7F7" },
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
                bgcolor: "#F6F6F6",
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <SearchRoundedIcon sx={{ color: "#A1A1A1", fontSize: 19 }} />
              <InputBase
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="البحث عن مستخدم"
                sx={{
                  flex: 1,
                  color: "#263238",
                  fontSize: 12,
                  "& input": { textAlign: "right" },
                }}
              />
              {searchValue && (
                <IconButton
                  onClick={() => setSearchValue("")}
                  aria-label="مسح البحث"
                  sx={{ width: 25, height: 25, color: "#A1A1A1" }}
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
                  color: "#8A8A8A",
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

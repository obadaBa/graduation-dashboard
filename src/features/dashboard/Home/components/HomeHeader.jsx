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

function HeaderAction({ children, sx }) {
  return (
    <Box
      sx={{
        height: 48,
        minWidth: 62,
        px: 1.5,
        borderRadius: "999px",
        border: "1px solid #ECECEC",
        bgcolor: "#FFFFFF",
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

export default function HomeHeader() {
  const [ setIsProfileOpen] = useState(false);

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
              border: "2px solid #FFFFFF",
              boxShadow: "0 4px 10px rgba(15, 23, 42, 0.08)",
              bgcolor: "#D9D9D9",
              color: "#263238",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            م
          </Avatar>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              className="profile-name"
              sx={{
                color: "#263238",
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.3,
                transition: "color 160ms ease",
              }}
            >
              محمد منصور
            </Typography>
            <Typography
              sx={{
                color: "#A1A1A1",
                fontSize: 13,
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              مالك التطبيق
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
                  boxShadow: "0 0 0 2px #FFFFFF",
                },
              }}
            >
              <IconButton sx={{ color: "#1F2937" }}>
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Badge>
          </HeaderAction>
        </Stack>
      </Box>

    </>
  );
}

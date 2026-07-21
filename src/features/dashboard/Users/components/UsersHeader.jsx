import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import UsersBlockListModal from "./UsersBlockListModal";
import UsersSupervisorModal from "./UsersSupervisorModal";

function getStoredAuthUser() {
  try {
    const rawUser = localStorage.getItem("authUser");

    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

function HeaderAction({ label, variant = "filled", icon, onClick }) {
  const styles = {
    filled: {
      color: "#FFFFFF",
      bgcolor: "#5C84FF",
      border: "1px solid #5C84FF",
      boxShadow: "0 6px 14px rgba(92, 132, 255, 0.25)",
    },
    danger: {
      color: "#FF5E58",
      bgcolor: "rgba(255, 94, 88, 0.10)",
      border: "1px dashed #FF5E58",
      boxShadow: "none",
    },
    success: {
      color: "#1FC75A",
      bgcolor: "transparent",
      border: "1px solid #1FC75A",
      boxShadow: "none",
    },
  };

  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        width: { xs: "100%", sm: "auto" },
        minWidth: { xs: 0, sm: 96 },
        minHeight: 35,
        px: 1.8,
        borderRadius: variant === "filled" ? "18px" : "6px",
        fontSize: 13,
        fontWeight: 800,
        whiteSpace: "nowrap",
        ...styles[variant],
        "&:hover": {
          bgcolor: styles[variant].bgcolor,
          border: styles[variant].border,
          boxShadow: styles[variant].boxShadow,
        },
        "& .MuiButton-startIcon": {
          marginInlineStart: 0,
          marginInlineEnd: "6px",
        },
      }}
    >
      {label}
    </Button>
  );
}

export default function UsersHeader() {
  const navigate = useNavigate();
  const [isBlockListOpen, setIsBlockListOpen] = useState(false);
  const [isSupervisorModalOpen, setIsSupervisorModalOpen] = useState(false);
  const authUser = getStoredAuthUser();
  const isOwner = authUser?.role === "owner";

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 2, lg: 3 },
          direction: "rtl",
        }}
      >
        <Box sx={{ minWidth: 0, textAlign: "right" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: { xs: 23, sm: 26, md: 28 },
              fontWeight: 900,
              lineHeight: 1.35,
            }}
          >
            قائمة مستخدمين{" "}
            <Box component="span" sx={{ color: "#5C84FF" }}>
              النظام
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 1.1,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: { xs: 14, sm: 16, md: 17 },
              fontWeight: 500,
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            كل ما يتعلق بإدارة المستخدمين والعمليات المخصصة لهم
            <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
            موجودة في مكان واحد
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row-reverse" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          sx={{
            width: { xs: "100%", lg: "auto" },
            maxWidth: "100%",
            borderRadius: "6px",
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            bgcolor: (theme) => theme.palette.dashboard.surface,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            overflow: "visible",
          }}
        >
          <Box sx={{ p: 1, display: isOwner ? "block" : "none" }}>
            <HeaderAction
              label="تعيين مشرف"
              variant="filled"
              icon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 18 }} />}
              onClick={() => setIsSupervisorModalOpen(true)}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: isOwner ? "block" : "none" },
              width: "1px",
              alignSelf: "stretch",
              borderLeft: (theme) =>
                `1px dashed ${theme.palette.dashboard.divider}`,
            }}
          />
          <Box sx={{ p: 1, borderRadius: "9px" }}>
            <HeaderAction
              label="قائمة الحظر"
              variant="danger"
              onClick={() => setIsBlockListOpen(true)}
            />
          </Box>

          <Box sx={{ p: 1, display: isOwner ? "block" : "none" }}>
            <HeaderAction
              label="مركز توثيق الحسابات"
              variant="success"
              onClick={() => navigate("/account-verification")}
            />
          </Box>
        </Stack>
      </Box>

      <UsersSupervisorModal
        open={isOwner && isSupervisorModalOpen}
        onClose={() => setIsSupervisorModalOpen(false)}
      />
      <UsersBlockListModal
        open={isBlockListOpen}
        onClose={() => setIsBlockListOpen(false)}
      />
    </>
  );
}

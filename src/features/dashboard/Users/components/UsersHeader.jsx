import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import UsersBlockListModal from "./UsersBlockListModal";
import UsersSupervisorModal from "./UsersSupervisorModal";

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
      bgcolor: "#FFF1F0",
      border: "1px dashed #FF5E58",
      boxShadow: "none",
    },
    success: {
      color: "#1FC75A",
      bgcolor: "#FFFFFF",
      border: "1px solid #1FC75A",
      boxShadow: "none",
    },
  };

  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        minWidth: 96,
        height: 35,
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

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 3,
          direction: "rtl",
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: "#263238",
              fontSize: 28,
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
              color: "#A0A0A0",
              fontSize: 17,
              fontWeight: 500,
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            كل ما يتعلق بإدارة المستخدمين والعمليات المخصصة لهم
            <br />
            موجودة في مكان واحد
          </Typography>
        </Box>

        <Stack
          direction="row-reverse"
          alignItems="center"
          sx={{
            borderRadius: "6px",
            border: "1px solid #EAEAEA",
            bgcolor: "#FFFFFF",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 1 }}>
            <HeaderAction
              label="تعيين مشرف"
              variant="filled"
              icon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 18 }} />}
              onClick={() => setIsSupervisorModalOpen(true)}
            />
          </Box>
          <Box sx={{ width: "1px", alignSelf: "stretch", borderLeft: "1px dashed #D8D8D8" }} />
          <Box sx={{ p: 1, borderRadius: "9px" }}>
            <HeaderAction
              label="قائمة الحظر"
              variant="danger"
              onClick={() => setIsBlockListOpen(true)}
            />
          </Box>

          <Box sx={{ p: 1 }}>
            <HeaderAction
              label="مركز توثيق الحسابات"
              variant="success"
              onClick={() => navigate("/account-verification")}
            />
          </Box>
        </Stack>
      </Box>

      <UsersSupervisorModal
        open={isSupervisorModalOpen}
        onClose={() => setIsSupervisorModalOpen(false)}
      />
      <UsersBlockListModal
        open={isBlockListOpen}
        onClose={() => setIsBlockListOpen(false)}
      />
    </>
  );
}

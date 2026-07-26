import { Box, Button, Stack } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

function TabAction({ label, icon, active = false, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        height: 35,
        px: 2.1,
        borderRadius: active ? "10px" : 0,
        border: active ? "1px solid #5C84FF" : "none",
        bgcolor: active
          ? (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.dashboard.chartBackground
                : theme.palette.dashboard.surface
          : "transparent",
        color: active
          ? "#5C84FF"
          : (theme) => theme.palette.dashboard.textSecondary,
        fontSize: 19,
        fontWeight: active ? 700 : 600,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active
            ? (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.dashboard.chartBackground
                  : theme.palette.dashboard.surface
            : "transparent",
        },
        "& .MuiButton-startIcon": {
          marginInlineStart: 0,
          marginInlineEnd: "8px",
        },
      }}
    >
      {label}
    </Button>
  );
}

export default function UserProfileAppBar({
  activeTab = "overview",
  onTabChange,
  onBlockUser,
  onShowCertificate,
  isUserBlocked = false,
  showCertificateButton = false,
  isCertificateLoading = false,
}) {
  const tabs = [
    {
      id: "overview",
      label: "نظرة عامة",
      icon: <WidgetsOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "tests",
      label: "الاختبارات",
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "content",
      label: "المحتوى",
      icon: <PermIdentityRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "lists",
      label: "القوائم",
      icon: <FolderOutlinedIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Box
      sx={{
        mt: 2.5,
        width: "100%",
        minHeight: 68,
        borderRadius: "14px",
        bgcolor: "transparent",
        px: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        flexWrap: { xs: "wrap", lg: "nowrap" },
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          flexWrap: { xs: "wrap", lg: "nowrap" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            minHeight: 46,
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            borderRadius: "6px",
            overflow: "hidden",
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.dashboard.chartBackground
                : theme.palette.dashboard.surface,
            p: 0.6,
            mr: 2,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
          }}
        >
          {tabs.map((tab) => (
            <TabAction
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.id}
              onClick={() => onTabChange?.(tab.id)}
            />
          ))}
        </Stack>

        <Button
          onClick={onBlockUser}
          sx={{
            minWidth: 114,
            height: 39,
            mr: 1.2,
            borderRadius: "8px",
            border: "1.5px dashed #FF6A64",
            bgcolor: "rgba(255, 106, 100, 0.12)",
            color: "#FF6A64",
            fontSize: 16,
            fontWeight: 700,
            "&:hover": {
              bgcolor: "rgba(255, 106, 100, 0.18)",
              borderColor: "#FF6A64",
            },
            "&.Mui-disabled": {
              bgcolor: "rgba(255, 106, 100, 0.08)",
              color: "#FF9A94",
              borderColor: "#FF9A94",
            },
          }}
        >
          {isUserBlocked ? "فك الحظر" : "حظر المستخدم"}
        </Button>
      </Box>

      {showCertificateButton && (
        <Button
          onClick={onShowCertificate}
          disabled={isCertificateLoading}
          endIcon={<ArrowBackRoundedIcon sx={{ fontSize: 16, mr: 1 }} />}
          sx={{
            minWidth: 150,
            height: 30,
            px: 1.3,
            borderRadius: "999px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#4A72E6",
            },
            "&.Mui-disabled": {
              bgcolor: "#AAB8E8",
              color: "#FFFFFF",
            },
          }}
        >
          عرض الشهادة الجامعية
        </Button>
      )}
    </Box>
  );
}

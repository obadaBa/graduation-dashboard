import { Box, Button, Stack } from "@mui/material";
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
        bgcolor: active ? ((theme) => theme.palette.dashboard.surface) : "transparent",
        color: active
          ? "#5C84FF"
          : ((theme) => theme.palette.dashboard.textSecondary),
        fontSize: 19,
        fontWeight: active ? 700 : 600,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active ? ((theme) => theme.palette.dashboard.surface) : "transparent",
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
  isUserBlocked = false,
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
        bgcolor: (theme) => theme.palette.dashboard.surface,
        px: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        direction: "rtl",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          minHeight: 46,
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          overflow: "hidden",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          p: 0.6,
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
          bgcolor: (theme) => theme.palette.dashboard.surface,
          color: "#FF6A64",
          fontSize: 16,
          fontWeight: 700,
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.surface,
            borderColor: "#FF6A64",
          },
        }}
       
      >
        {isUserBlocked ? "فك الحظر" : "حظر المستخدم"}
      </Button>
    </Box>
  );
}

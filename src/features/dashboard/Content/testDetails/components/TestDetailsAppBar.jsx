import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Box, Button, Stack } from "@mui/material";

function TabAction({ label, icon, active = false, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        flex: 1,
        minWidth: 0,
        height: 35,
        px: { xs: 1, md: 2 },
        borderRadius: active ? "7px" : 0,
        border: active ? "1px solid #5C84FF" : "none",
        bgcolor: active ? "#FFFFFF" : "transparent",
        color: active ? "#5C84FF" : "#9A9A9A",
        fontSize: { xs: 13, md: 18 },
        fontWeight: active ? 800 : 600,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active ? "#FFFFFF" : "transparent",
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

export default function TestDetailsAppBar({
  activeTab = "overview",
  onTabChange,
}) {
  const tabs = [
    {
      id: "overview",
      label: "نظرة عامة",
      icon: <WidgetsOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "questions",
      label: "الأسئلة",
      icon: <EditOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "sample",
      label: "عينة من الاختبار",
      icon: <CategoryOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "reviews",
      label: "المراجعات",
      icon: <StarBorderRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "status",
      label: "سجل الحالة",
      icon: <ViewAgendaOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      id: "creations",
      label: "سجل الإبلاغات",
      icon: <FlagOutlinedIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Box
      sx={{
        mt: 1.4,
        width: "100%",
        minHeight: 58,
        borderRadius: "14px",
        bgcolor: "#FFFFFF",
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
          width: "100%",
          minHeight: 46,
          border: "1px solid #EBEBEB",
          borderRadius: "6px",
          overflowX: "auto",
          overflowY: "hidden",
          bgcolor: "#FFFFFF",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
          p: 0.6,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
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
    </Box>
  );
}

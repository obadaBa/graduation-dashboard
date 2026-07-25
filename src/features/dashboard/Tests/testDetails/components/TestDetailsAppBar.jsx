import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Box, Button, Stack } from "@mui/material";

const tabStartIconSx = {
  marginInlineStart: 0,
  marginInlineEnd: "8px",
};

const appBarSx = {
  mt: 1.4,
  width: "100%",
  minHeight: 58,
  borderRadius: "14px",
  bgcolor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  direction: "rtl",
};

const tabsStackSx = {
  width: "100%",
  minHeight: 46,
  border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
  borderRadius: "6px",
  overflowX: "auto",
  overflowY: "hidden",
  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
  boxShadow: (theme) => theme.palette.dashboard.shadow,
  p: 0.6,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const getTabActionSx = (active) => ({
  flex: 1,
  minWidth: 0,
  height: 35,
  px: { xs: 1, md: 2 },
  borderRadius: active ? "7px" : 0,
  border: (theme) =>
    active ? `1px solid ${theme.palette.dashboard.logoPrimary}` : "none",
  bgcolor: (theme) =>
    active ? theme.palette.dashboard.activeItem.background : "transparent",
  color: (theme) =>
    active
      ? theme.palette.dashboard.logoPrimary
      : theme.palette.dashboard.textSecondary,
  fontSize: { xs: 13, md: 18 },
  fontWeight: active ? 800 : 600,
  whiteSpace: "nowrap",
  "&:hover": {
    bgcolor: (theme) =>
      active ? theme.palette.dashboard.activeItem.background : "transparent",
  },
  "& .MuiButton-startIcon": tabStartIconSx,
});

function TabAction({ label, icon, active = false, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={getTabActionSx(active)}
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
    <Box sx={appBarSx}>
      <Stack
        direction="row"
        alignItems="center"
        sx={tabsStackSx}
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

import { Box, Button, Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";

function GhostIconButton({
  children,
  color,
  borderColor,
  bgcolor = "#FFFFFF",
}) {
  return (
    <Button
      sx={{
        minWidth: 48,
        width: 48,
        height: 42,
        borderRadius: "10px",
        border: `1.5px dashed ${borderColor}`,
        bgcolor,
        color,
        p: 0,
        "&:hover": {
          bgcolor,
          borderColor,
        },
      }}
    >
      {children}
    </Button>
  );
}

function TabAction({ label, icon, active = false, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        height: 46,
        px: 2.1,
        borderRadius: active ? "10px" : 0,
        border: active ? "1px solid #5C84FF" : "none",
        bgcolor: active ? "#FFFFFF" : "transparent",
        color: active ? "#5C84FF" : "#8F8F8F",
        fontSize: 19,
        fontWeight: active ? 700 : 600,
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

export default function ContentDetailsAppBar({ activeTab, onTabChange }) {
  return (
    <Box
      sx={{
        mt: 2.5,
        width: "100%",
        minHeight: 68,
        borderRadius: "14px",
        bgcolor: "#FFFFFF",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        direction: "rtl",
      }}
    >
      <Stack
        direction="row-reverse"
        alignItems="center"
        sx={{
          minHeight: 46,
          border: "1px solid #EBEBEB",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
          p: 0.6,
        }}
      >
        <Box sx={{ px: 1.2 }}>
          <Button
            startIcon={<AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />}
            sx={{
              minWidth: 140,
              height: 32,
              px: 1.5,
              borderRadius: "8px",
              color: "#FFFFFF",
              background: "linear-gradient(90deg, #8ED8FF 0%, #DDEEA2 100%)",
              boxShadow: "0 6px 12px rgba(151, 200, 245, 0.22)",
              "&:hover": {
                background: "linear-gradient(90deg, #8ED8FF 0%, #DDEEA2 100%)",
              },
              "& .MuiButton-startIcon": {
                marginInlineStart: 0,
                marginInlineEnd: "6px",
              },
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
              مساعد الذكاء الاصطناعي
            </Typography>
          </Button>
        </Box>

        <Box
          sx={{
            width: "2px",
            height: 48,
            mx: 0.6,
            background:
              "repeating-linear-gradient(to bottom, #D9D9D9 0 6px, transparent 6px 11px)",
          }}
        />

        <TabAction
          label="سجل الحالة"
          icon={<ViewAgendaOutlinedIcon sx={{ fontSize: 22 }} />}
          active={activeTab === "status"}
          onClick={() => onTabChange("status")}
        />

        <TabAction
          label="سجل الإبداعات"
          icon={<FlagOutlinedIcon sx={{ fontSize: 22 }} />}
          active={activeTab === "creations"}
          onClick={() => onTabChange("creations")}
        />

        <TabAction
          label="نظرة عامة"
          icon={<WidgetsOutlinedIcon sx={{ fontSize: 22 }} />}
          active={activeTab === "overview"}
          onClick={() => onTabChange("overview")}
        />
      </Stack>

      <Stack
        direction="row-reverse"
        alignItems="center"
        spacing={1.2}
        sx={{ px: 1.4 }}
        gap={1}
      >
        <GhostIconButton color="#3FD547" borderColor="#3FD547">
          <CheckBoxRoundedIcon sx={{ fontSize: 26 }} />
        </GhostIconButton>

        <GhostIconButton color="#FF6A64" borderColor="#FF6A64">
          <DeleteOutlineRoundedIcon sx={{ fontSize: 26 }} />
        </GhostIconButton>
      </Stack>

      <Button
        sx={{
          minWidth: 132,
          height: 36,
          px: 2,
          marginInlineStart: "auto",
          borderRadius: "8px",
          bgcolor: "#5C84FF",
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: 700,
          boxShadow: "0 8px 16px rgba(92, 132, 255, 0.28)",
          "&:hover": {
            bgcolor: "#5C84FF",
          },
        }}
      >
        تنزيل المحتوى
      </Button>
    </Box>
  );
}

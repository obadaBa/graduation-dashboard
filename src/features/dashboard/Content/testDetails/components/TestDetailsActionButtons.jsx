import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Box, Button, Stack, Typography } from "@mui/material";

function StatusPill({ label, icon, color, bgcolor }) {
  return (
    <Button
      startIcon={icon}
      sx={{
        minWidth: 106,
        height: 32,
        px: 1.5,
        borderRadius: "999px",
        bgcolor,
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: 800,
        whiteSpace: "nowrap",
        boxShadow: `0 6px 12px ${color}33`,
        "&:hover": {
          bgcolor,
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

function DeleteAction() {
  return (
    <Button
      sx={{
        position: "relative",
        minWidth: 48,
        width: 48,
        height: 54,
        borderRadius: "10px",
        border: "1.5px dashed #FF6A64",
        bgcolor: "#FFFFFF",
        color: "#FF6A64",
        p: 0,
        "&:hover": {
          bgcolor: "#FFFFFF",
          borderColor: "#FF6A64",
        },
      }}
    >
      <DeleteOutlineRoundedIcon sx={{ fontSize: 26 }} />
    </Button>
  );
}

export default function TestDetailsActionButtons() {
  return (
    <Box
      sx={{
        mt: 2.5,
        width: "100%",
        minHeight: 68,
        borderRadius: "14px",
        bgcolor: "#FFFFFF",
        px: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
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
              minWidth: 160,
              height: 32,
              px: 1.5,
              borderRadius: "8px",
              color: "#FFFFFF",
              background: "linear-gradient(90deg, #8ED8FF 0%, #FFE28A 100%)",
              boxShadow: "0 6px 12px rgba(151, 200, 245, 0.22)",
              "&:hover": {
                background: "linear-gradient(90deg, #8ED8FF 0%, #FFE28A 100%)",
              },
              "& .MuiButton-startIcon": {
                marginInlineStart: 0,
                marginInlineEnd: "6px",
              },
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
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
        <Box sx={{ px: 1.2 }}>
          <StatusPill
            label="الموافقة عليه"
            color="#32D74B"
            bgcolor="#28E83F"
            icon={<CheckBoxRoundedIcon sx={{ fontSize: 17 }} />}
          />
        </Box>

       

        <Box sx={{ px: 1.2 }}>
          <StatusPill
            label="طلب محتويات"
            color="#F4E500"
            bgcolor="#F0EE00"
            icon={<DescriptionOutlinedIcon sx={{ fontSize: 17 }} />}
          />
        </Box>
      </Stack>

      <DeleteAction />

      <Button
        startIcon={<DownloadRoundedIcon sx={{ fontSize: 20 }} />}
        sx={{
          minWidth: 138,
          height: 39,
          px: 2,
          marginInlineStart: "auto",
          borderRadius: "8px",
          bgcolor: "#5C84FF",
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: 800,
          boxShadow: "0 8px 16px rgba(92, 132, 255, 0.28)",
          "&:hover": {
            bgcolor: "#5C84FF",
          },
          "& .MuiButton-startIcon": {
            marginInlineStart: 0,
            marginInlineEnd: "6px",
          },
        }}
      >
        تنزيل الاختبار
      </Button>
    </Box>
  );
}

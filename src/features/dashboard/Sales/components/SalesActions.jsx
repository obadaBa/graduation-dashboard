import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, InputBase, Stack } from "@mui/material";

function PeriodTab({ label, icon, active = false }) {
  return (
    <Button
      startIcon={icon}
      sx={{
        height: 34,
        minWidth: 92,
        px: 1.25,
        borderRadius: active ? "5px" : 0,
        border: active ? "1px solid #5C84FF" : "none",
        bgcolor: active ? "#F4F7FF" : "transparent",
        color: active ? "#5C84FF" : "#9A9A9A",
        fontSize: 14,
        fontWeight: active ? 800 : 700,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active ? "#F4F7FF" : "transparent",
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

export default function SalesActions() {
  return (
    <Box
      sx={{
        mt: 3.2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        direction: "rtl",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.4}  gap={1}>
        <Box
          sx={{
            width: 424,
            height: 40,
            borderRadius: "999px",
            bgcolor: "#FFFFFF",
            border: "1px solid #EAEAEA",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.10)",
            display: "flex",
            alignItems: "center",
            px: 1.4,
            gap: 1,
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 22, color: "#8F8F8F" }} />
          <InputBase
            placeholder="البحث عن عملية الشراء"
            sx={{
              flex: 1,
              color: "#263238",
              fontSize: 14,
              fontWeight: 500,
              textAlign: "right",
              "& input::placeholder": {
                color: "#A0A0A0",
                opacity: 1,
              },
            }}
          />
          <CloseRoundedIcon sx={{ fontSize: 18, color: "#8F8F8F" }} />
        </Box>

        <Button
          endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 20 }} />}
          sx={{
            minWidth: 112,
            height: 40,
            px: 1.7,
            borderRadius: "999px",
            bgcolor: "#FFFFFF",
            border: "1px solid #EAEAEA",
            color: "#8F8F8F",
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.10)",
            "&:hover": {
              bgcolor: "#FFFFFF",
              borderColor: "#EAEAEA",
            },
            "& .MuiButton-endIcon": {
              marginInlineStart: "6px",
              marginInlineEnd: 0,
            },
          }}
        >
          المعرف
        </Button>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1.2} gap={1}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            height: 40,
            borderRadius: "6px",
            border: "1px solid #EAEAEA",
            bgcolor: "#FFFFFF",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
            p: 0.45,
          }}
        >
          <PeriodTab
            label="اليوم"
            active
            icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 17 }} />}
          />
          <PeriodTab
            label="منذ اسبوع"
            icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 17 }} />}
          />
          <PeriodTab
            label="منذ شهر"
            icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 17 }} />}
          />
          <PeriodTab
            label="هذه السنة"
            icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 17 }} />}
          />
        </Stack>

        <Button
          sx={{
            width: 40,
            minWidth: 40,
            height: 40,
            borderRadius: "6px",
            bgcolor: "#FFFFFF",
            border: "1px solid #EAEAEA",
            color: "#8F8F8F",
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
            "&:hover": {
              bgcolor: "#FFFFFF",
              borderColor: "#EAEAEA",
            },
          }}
        >
          <CalendarTodayOutlinedIcon sx={{ fontSize: 21 }} />
        </Button>
      </Stack>
    </Box>
  );
}

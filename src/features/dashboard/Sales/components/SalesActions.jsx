import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const periodOptions = [
  { value: "today", label: "اليوم" },
  { value: "week", label: "منذ أسبوع" },
  { value: "month", label: "منذ شهر" },
  { value: "year", label: "هذه السنة" },
];

const sortOptions = [
  { value: "purchased_at", label: "تاريخ الشراء" },
  { value: "sale_id", label: "معرف البيع" },
  { value: "gross_amount", label: "السعر الكلي" },
  { value: "test_id", label: "معرف الاختبار" },
  { value: "test_status", label: "حالة الاختبار" },
];

function PeriodTab({ label, active = false, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 17 }} />}
      sx={{
        height: 34,
        minWidth: 92,
        px: 1.25,
        borderRadius: active ? "5px" : 0,
        border: active ? "1px solid #5C84FF" : "none",
        bgcolor: active
          ? ((theme) => theme.palette.dashboard.activeItem.background)
          : "transparent",
        color: active
          ? "#5C84FF"
          : ((theme) => theme.palette.dashboard.textSecondary),
        fontSize: 14,
        fontWeight: active ? 800 : 700,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active
            ? ((theme) => theme.palette.dashboard.activeItem.background)
            : "transparent",
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

export default function SalesActions({
  period,
  onPeriodChange,
  sortBy,
  onSortChange,
  customRange,
  onCustomRangeChange,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [draftRange, setDraftRange] = useState(customRange);
  const customOpen = Boolean(anchorEl);

  const handleCustomOpen = (event) => {
    setDraftRange(customRange);
    setAnchorEl(event.currentTarget);
  };

  const handleApplyCustomRange = () => {
    onCustomRangeChange(draftRange);
    setAnchorEl(null);
  };

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
        flexWrap: { xs: "wrap", lg: "nowrap" },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.4} gap={1}>
        <Select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            minWidth: 136,
            height: 40,
            borderRadius: "999px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.dashboard.chartBorder,
            },
            ".MuiSelect-select": {
              py: 0.8,
              pr: 2,
              pl: 4,
              textAlign: "right",
            },
            ".MuiSvgIcon-root": {
              left: 11,
              right: "auto",
              color: (theme) => theme.palette.dashboard.textSecondary,
            },
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1.2} gap={1}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            height: 40,
            borderRadius: "6px",
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            bgcolor: (theme) => theme.palette.dashboard.surface,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            p: 0.45,
          }}
        >
          {periodOptions.map((option) => (
            <PeriodTab
              key={option.value}
              label={option.label}
              active={period === option.value}
              onClick={() => onPeriodChange(option.value)}
            />
          ))}
        </Stack>

        <Button
          onClick={handleCustomOpen}
          sx={{
            width: 40,
            minWidth: 40,
            height: 40,
            borderRadius: "6px",
            bgcolor:
              period === "custom"
                ? (theme) => theme.palette.dashboard.activeItem.background
                : (theme) => theme.palette.dashboard.surface,
            border: (theme) =>
              `1px solid ${
                period === "custom"
                  ? "#5C84FF"
                  : theme.palette.dashboard.chartBorder
              }`,
            color:
              period === "custom"
                ? "#5C84FF"
                : (theme) => theme.palette.dashboard.textSecondary,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            "&:hover": {
              bgcolor:
                period === "custom"
                  ? (theme) => theme.palette.dashboard.activeItem.background
                  : (theme) => theme.palette.dashboard.surface,
            },
          }}
        >
          <CalendarTodayOutlinedIcon sx={{ fontSize: 21 }} />
        </Button>
      </Stack>

      <Popover
        open={customOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 2,
            width: 290,
            borderRadius: "12px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            color: (theme) => theme.palette.dashboard.textPrimary,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
          },
        }}
      >
        <Stack spacing={1.4} sx={{ direction: "rtl" }}>
          <TextField
            label="تاريخ البداية"
            type="date"
            size="small"
            value={draftRange.startDate}
            onChange={(event) =>
              setDraftRange((prev) => ({
                ...prev,
                startDate: event.target.value,
              }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="تاريخ النهاية"
            type="date"
            size="small"
            value={draftRange.endDate}
            onChange={(event) =>
              setDraftRange((prev) => ({
                ...prev,
                endDate: event.target.value,
              }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            disabled={!draftRange.startDate || !draftRange.endDate}
            onClick={handleApplyCustomRange}
            sx={{
              height: 38,
              borderRadius: "9px",
              bgcolor: "#5583FF",
              fontWeight: 800,
              "&:hover": { bgcolor: "#4774EF" },
            }}
          >
            تطبيق الفترة
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
}

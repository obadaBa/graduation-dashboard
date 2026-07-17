import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

function FieldShell({ children, icon }) {
  return (
    <Box
      sx={{
        height: 33,
        borderRadius: "6px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: (theme) => theme.palette.dashboard.textSecondary,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      {children}
    </Box>
  );
}

function FieldLabel({ children }) {
  return (
    <Typography
      sx={{
        mb: 1,
        color: (theme) => theme.palette.dashboard.textPrimary,
        fontSize: 14,
        fontWeight: 900,
        lineHeight: 1.2,
      }}
    >
      {children}
    </Typography>
  );
}

function RateBadge({ label, value, active = false }) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        height: 33,
        borderRadius: "4px",
        border: (theme) =>
          `1px solid ${active ? theme.palette.dashboard.logoPrimary : theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) =>
          active
            ? theme.palette.mode === "dark"
              ? "rgba(114, 152, 255, 0.14)"
              : "#F8FAFF"
            : theme.palette.dashboard.chartBackground,
        px: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: active ? "0 0 0 1px rgba(85, 131, 255, 0.14)" : "none",
      }}
    >
      <Typography
        sx={{
          color: (theme) =>
            active
              ? theme.palette.dashboard.textPrimary
              : theme.palette.dashboard.textSecondary,
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={0.45}>
        {active && (
          <KeyboardArrowDownRoundedIcon
            sx={{ fontSize: 18, color: "#5583FF" }}
          />
        )}
        <Typography
          sx={{
            color: active ? "#5583FF" : (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 13,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Box>
  );
}

export default function TaxRateCard() {
  const [rate, setRate] = useState("");

  const helperText = useMemo(() => {
    const numericRate = Number(rate);
    if (!rate.trim()) {
      return "يجب أن تزيد هذه الضريبة المقتطعة عن نسبة الـ 35 بالمئة";
    }

    if (Number.isNaN(numericRate)) {
      return "أدخل قيمة رقمية صحيحة للنسبة الجديدة";
    }

    if (numericRate <= 35) {
      return "يجب أن تزيد هذه الضريبة المقتطعة عن نسبة الـ 35 بالمئة";
    }

    return "النسبة الجديدة صالحة للحفظ";
  }, [rate]);

  const isValidRate =
    rate.trim() !== "" && !Number.isNaN(Number(rate)) && Number(rate) > 35;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: 274,
        borderRadius: "8px",
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        px: { xs: 2, md: 2.4 },
        py: { xs: 2, md: 2.3 },
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 20,
          fontWeight: 900,
          textAlign: "right",
        }}
      >
        نسبة الضريبة
      </Typography>

      <Typography
        sx={{
          mt: 0.55,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.65,
          maxWidth: 326,
          textAlign: "right",
        }}
      >
        تحدد هذه النسبة كمية المال المقتطع من كل عملية بيع والذي سوف يذهب
        إلى أرباح الشركة
      </Typography>

      <Stack direction="row" spacing={1.6} sx={{ mt: 2.2 }}>
        <RateBadge label="النسبة الحالية" value="7%" active />
        <RateBadge label="النسبة السابقة" value="10%" />
      </Stack>

      <Box sx={{ mt: 2.25 }}>
        <FieldLabel>نسبة جديدة</FieldLabel>
        <FieldShell icon={<PercentRoundedIcon sx={{ fontSize: 18 }} />}>
          <InputBase
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            placeholder="ادخل النسبة الجديدة..."
            fullWidth
            sx={{
              height: "100%",
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 12,
              fontWeight: 600,
              "& input": {
                textAlign: "right",
                pl: 0.8,
              },
              "& input::placeholder": {
                color: (theme) => theme.palette.dashboard.textSecondary,
                opacity: 1,
              },
            }}
          />
        </FieldShell>
      </Box>

      <Stack direction="row" alignItems="center" spacing={0.55} sx={{ mt: 1 }}>
        <InfoOutlinedIcon
          sx={{
            fontSize: 15,
            color: isValidRate
              ? "#5583FF"
              : (theme) => theme.palette.dashboard.textPrimary,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 11,
            fontWeight: 500,
            lineHeight: 1.4,
            textAlign: "right",
          }}
        >
          {helperText}
        </Typography>
      </Stack>

      <Button
        sx={{
          mt: 2.4,
          alignSelf: "flex-end",
          minWidth: 144,
          height: 31,
          px: 2.2,
          borderRadius: "6px",
          bgcolor: "#5583FF",
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: 700,
          boxShadow: "0 5px 10px rgba(85, 131, 255, 0.38)",
          "&:hover": {
            bgcolor: "#5583FF",
            boxShadow: "0 5px 10px rgba(85, 131, 255, 0.38)",
          },
        }}
      >
        حفظ النسبة الجديدة
      </Button>
    </Box>
  );
}

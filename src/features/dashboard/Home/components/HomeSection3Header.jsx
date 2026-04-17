import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function HomeSection3Header() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: "#263238",
            fontSize: { xs: 28, md: 38 },
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          احصائيات عامة خاصة بتطبيق
          <Box component="span" sx={{ color: "#5583FF" }}>
            {" "}
            نيرد
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#A1A1A1",
            fontSize: { xs: 15, md: 18 },
            fontWeight: 500,
            lineHeight: 1.7,
            maxWidth: 620,
          }}
        >
          متعلقة بحالات استخدام التطبيق ونسبة التفاعل داخله
          <br />
          بحيث تكون مفيدة في تصور مستقبل تطوير التطبيق
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.25}
        sx={{
          width: { xs: "100%", md: "auto" },
          justifyContent: { sm: "flex-end" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
        gap={2}
      >
        <Button
          variant="contained"
          sx={{
            height: 42,
            px: 3,
            borderRadius: "12px",
            bgcolor: "#5583FF",
            boxShadow: "0 4px 14px rgba(85, 131, 255, 0.28)",
            fontSize: 16,
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#5583FF",
            },
          }}
        >
          تصدير البيانات
        </Button>

        <Select
          value="current-year"
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            minWidth: 132,
            height: 42,
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#ECECEC",
            },
            ".MuiSelect-select": {
              py: 1,
              pr: 1.5,
              pl: 4,
              color: "#5583FF",
              fontSize: 15,
              fontWeight: 600,
            },
            ".MuiSvgIcon-root": {
              left: 10,
              right: "auto",
              color: "#5583FF",
            },
          }}
        >
          <MenuItem value="current-year">السنة الحالية</MenuItem>
        </Select>
      </Stack>
    </Box>
  );
}

import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HomeLibraryStatsExportButton from "./HomeLibraryStatsExportButton";

export default function HomeSection3Header({
  selectedYear,
  onYearChange,
  availableYears,
  libraryStats,
  isLoading,
}) {
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
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: { xs: 28, md: 38 },
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          احصائيات عامة خاصة بتطبيق
          <Box component="span" sx={{ color: (theme) => theme.palette.dashboard.logoPrimary }}>
            {" "}
            نيرد
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: (theme) => theme.palette.dashboard.textSecondary,
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
          alignItems: { xs: "flex-end", sm: "center" },
        }}
        gap={2}
      >
        <HomeLibraryStatsExportButton
          year={selectedYear}
          libraryStats={libraryStats}
          disabled={isLoading}
        />

        <Select
          value={selectedYear}
          onChange={(event) => onYearChange?.(Number(event.target.value))}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            minWidth: 132,
            height: 42,
            borderRadius: "12px",
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 10px 24px rgba(0, 0, 0, 0.22)"
                : "0 4px 14px rgba(15, 23, 42, 0.06)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.dashboard.chartBorder,
            },
            ".MuiSelect-select": {
              py: 1,
              pr: 1.5,
              pl: 4,
              color: (theme) => theme.palette.dashboard.logoPrimary,
              fontSize: 15,
              fontWeight: 600,
            },
            ".MuiSvgIcon-root": {
              left: 10,
              right: "auto",
              color: (theme) => theme.palette.dashboard.logoPrimary,
            },
          }}
        >
          {availableYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}

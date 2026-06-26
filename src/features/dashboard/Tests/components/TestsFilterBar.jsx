import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function TestsFilterBar({
  viewMode,
  onViewModeChange,
  titleSearch,
  onTitleSearchChange,
  sortBy,
  onSortByChange,
}) {
  return (
    <Box
      sx={{
        mt: 3.5,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={1.5}
        gap={1.5}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        <TextField
          size="small"
          value={titleSearch}
          onChange={(event) => onTitleSearchChange?.(event.target.value)}
          placeholder="البحث عن الاختبارات"
          sx={{
            width: { xs: "100%", sm: 360, md: 470 },
            "& .MuiOutlinedInput-root": {
              height: 38,
              borderRadius: "999px",
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              boxShadow: (theme) => theme.palette.dashboard.shadow,
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 13,
              fontWeight: 500,
              pr: 0.6,
              pl: 0.8,
              "& fieldset": {
                borderColor: (theme) => theme.palette.dashboard.chartBorder,
              },
              "&:hover fieldset": {
                borderColor: (theme) => theme.palette.dashboard.chartBorder,
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5583FF",
              },
            },
            "& input": {
              textAlign: "right",
              "&::placeholder": {
                color: (theme) => theme.palette.dashboard.textSecondary,
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon
                  sx={{
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    fontSize: 20,
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => onTitleSearchChange?.("")}
                  disabled={!titleSearch}
                  sx={{
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    width: 24,
                    height: 24,
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={sortBy}
          onChange={(event) => onSortByChange?.(event.target.value)}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            width: { xs: "100%", sm: 130 },
            height: 38,
            borderRadius: "999px",
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.dashboard.chartBorder,
            },
            ".MuiSelect-select": {
              py: 0.8,
              pr: 2,
              pl: 4,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 13,
              fontWeight: 600,
              textAlign: "right",
            },
            ".MuiSvgIcon-root": {
              left: 11,
              right: "auto",
              color: (theme) => theme.palette.dashboard.textSecondary,
            },
          }}
        >
          <MenuItem value="default">الترتيب حسب</MenuItem>
          <MenuItem value="price">السعر</MenuItem>
          <MenuItem value="created_at">تاريخ الإنشاء</MenuItem>
          <MenuItem value="difficulty_level">الصعوبة</MenuItem>
          <MenuItem value="question_count">عدد الأسئلة</MenuItem>
        </Select>
      </Stack>

      <ToggleButtonGroup
        exclusive
        value={viewMode}
        onChange={(_, value) => value && onViewModeChange(value)}
        sx={{
          height: 38,
          p: 1,
          alignItems: "center",
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          borderRadius: "8px",
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          "& .MuiToggleButtonGroup-grouped": {
            minWidth: 58,
            borderRadius: "6px !important",
            border: "1px solid transparent !important",
            fontSize: 13,
            fontWeight: 600,
            color: (theme) => theme.palette.dashboard.textSecondary,
            gap: 0.5,
            px: 1,
            "&.Mui-selected": {
              border: (theme) =>
                `1px solid ${theme.palette.dashboard.logoPrimary} !important`,
              color: (theme) => theme.palette.dashboard.logoPrimary,
              bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
              "&:hover": {
                bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
              },
            },
          },
        }}
      >
        <ToggleButton value="list" sx={{ height: 29 }}>
          <ListRoundedIcon sx={{ fontSize: 18 }} />
          قائمة
        </ToggleButton>
        <ToggleButton value="board" sx={{ height: 29 }}>
          <AppsRoundedIcon sx={{ fontSize: 18 }} />
          لوحة
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

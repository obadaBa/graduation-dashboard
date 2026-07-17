import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SORT_OPTIONS = [
  { value: "latest", label: "الأحدث" },
  { value: "id", label: "حسب الرقم" },
  { value: "type", label: "حسب النوع" },
  { value: "most_liked", label: "الأكثر إعجاباً" },
  { value: "new", label: "الجديد" },
  { value: "approved", label: "الموافق عليه" },
  { value: "reported", label: "المبلغ عنه" },
];

export default function ContentFilterBar({
  sortBy,
  onSortChange,
  searchValue,
  onSearchChange,
  onClearSearch,
}) {
  return (
    <Box
      sx={{
        mt: 3.5,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={1.5}
        gap={1.5}
        sx={{ width: "100%" }}
      >
        <TextField
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          size="small"
          placeholder="البحث عن محتوى"
          sx={{
            width: { xs: "100%", sm: 360, md: 380 },
            "& .MuiOutlinedInput-root": {
              height: 38,
              borderRadius: "999px",
              bgcolor: (theme) => theme.palette.dashboard.surface,
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
                  onClick={onClearSearch}
                  disabled={!searchValue}
                  aria-label="مسح البحث"
                  size="small"
                  sx={{
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    width: 24,
                    height: 24,
                    visibility: searchValue ? "visible" : "hidden",
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
          onChange={(event) => onSortChange?.(event.target.value)}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            width: { xs: "100%", sm: 150 },
            height: 38,
            borderRadius: "999px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
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
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}

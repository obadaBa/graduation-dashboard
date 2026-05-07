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

export default function TestsFilterBar({ viewMode, onViewModeChange }) {
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
          placeholder="البحث عن الاختبارات"
          sx={{
            width: { xs: "100%", sm: 360, md: 470 },
            "& .MuiOutlinedInput-root": {
              height: 38,
              borderRadius: "999px",
              bgcolor: "#FFFFFF",
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
              color: "#263238",
              fontSize: 13,
              fontWeight: 500,
              pr: 0.6,
              pl: 0.8,
              "& fieldset": {
                borderColor: "#ECECEC",
              },
              "&:hover fieldset": {
                borderColor: "#ECECEC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5583FF",
              },
            },
            "& input": {
              textAlign: "right",
              "&::placeholder": {
                color: "#A1A1A1",
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#8A8A8A", fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  sx={{ color: "#8A8A8A", width: 24, height: 24 }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Select
          value="default"
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            width: { xs: "100%", sm: 130 },
            height: 38,
            borderRadius: "999px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#ECECEC",
            },
            ".MuiSelect-select": {
              py: 0.8,
              pr: 2,
              pl: 4,
              color: "#8A8A8A",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "right",
            },
            ".MuiSvgIcon-root": {
              left: 11,
              right: "auto",
              color: "#8A8A8A",
            },
          }}
        >
          <MenuItem value="default">الترتيب حسب</MenuItem>
          <MenuItem value="newest">الأحدث</MenuItem>
          <MenuItem value="oldest">الأقدم</MenuItem>
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
          bgcolor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
          "& .MuiToggleButtonGroup-grouped": {
            minWidth: 58,
            borderRadius: "6px !important",
            border: "1px solid transparent !important",
            fontSize: 13,
            fontWeight: 600,
            gap: 0.5,
            px: 1,
            "&.Mui-selected": {
              border: "1px solid #5583FF !important",
              color: "#5583FF",
              bgcolor: "#FFFFFF",
              "&:hover": {
                bgcolor: "#FFFFFF",
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

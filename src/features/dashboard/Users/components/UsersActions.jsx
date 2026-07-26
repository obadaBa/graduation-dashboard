import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

const USER_TYPES = [
  {
    value: "mobile_users",
    label: "مستخدمين",
    icon: <ManageAccountsOutlinedIcon sx={{ fontSize: 19 }} />,
  },
  {
    value: "supervisors",
    label: "مشرفين",
    icon: <WorkOutlineRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    value: "owners",
    label: "مالك التطبيق",
    icon: <KeyRoundedIcon sx={{ fontSize: 18 }} />,
  },
];

const SORT_OPTIONS = [
  { value: "created_at", label: "تاريخ الإنشاء" },
  { value: "name", label: "الاسم" },
  { value: "governorate", label: "المحافظة" },
  { value: "gender", label: "الجنس" },
  { value: "account_status", label: "حالة الحساب" },
];

function UserTypeTab({ label, icon, active, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        height: 34,
        minWidth: 98,
        px: 1.4,
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
            : ((theme) => theme.palette.dashboard.chartBackground),
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

export default function UsersActions({
  userType,
  onUserTypeChange,
  sortBy,
  onSortChange,
  searchValue,
  onSearchChange,
  onClearSearch,
}) {
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
      <Stack direction="row" alignItems="center" spacing={1.4}>
        <Box
          sx={{
            width: 424,
            height: 40,
            borderRadius: "999px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            display: "flex",
            alignItems: "center",
            px: 1.4,
            gap: 1,
          }}
        >
          <SearchRoundedIcon
            sx={{
              fontSize: 22,
              color: (theme) => theme.palette.dashboard.textSecondary,
            }}
          />
          <InputBase
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="البحث عن مستخدم"
            sx={{
              flex: 1,
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 14,
              fontWeight: 500,
              textAlign: "right",
              "& input::placeholder": {
                color: (theme) => theme.palette.dashboard.textSecondary,
                opacity: 1,
              },
            }}
          />
          <IconButton
            size="small"
            disabled={!searchValue}
            onClick={onClearSearch}
            aria-label="مسح البحث"
          >
            <CloseRoundedIcon
              sx={{
                fontSize: 18,
                color: (theme) => theme.palette.dashboard.textSecondary,
              }}
            />
          </IconButton>
        </Box>

        <Select
          value={sortBy}
          onChange={(event) => onSortChange?.(event.target.value)}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                direction: "rtl",
                "& .MuiMenuItem-root": {
                  justifyContent: "flex-start",
                  textAlign: "right",
                  direction: "rtl",
                },
              },
            },
          }}
          sx={{
            minWidth: 150,
            height: 40,
            borderRadius: "999px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
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
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                justifyContent: "flex-start",
                textAlign: "right",
                direction: "rtl",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>

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
          ml: 0,
        }}
      >
        {USER_TYPES.map((type) => (
          <UserTypeTab
            key={type.value}
            label={type.label}
            icon={type.icon}
            active={userType === type.value}
            onClick={() => onUserTypeChange?.(type.value)}
          />
        ))}
      </Stack>
    </Box>
  );
}

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
        bgcolor: active ? "#F4F7FF" : "transparent",
        color: active ? "#5C84FF" : "#9A9A9A",
        fontSize: 14,
        fontWeight: active ? 800 : 700,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active ? "#F4F7FF" : "#FAFAFA",
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
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="البحث عن مستخدم"
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
          <IconButton
            size="small"
            disabled={!searchValue}
            onClick={onClearSearch}
            aria-label="مسح البحث"
          >
            <CloseRoundedIcon sx={{ fontSize: 18, color: "#8F8F8F" }} />
          </IconButton>
        </Box>

        <Select
          value={sortBy}
          onChange={(event) => onSortChange?.(event.target.value)}
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            minWidth: 150,
            height: 40,
            borderRadius: "999px",
            bgcolor: "#FFFFFF",
            border: "1px solid #EAEAEA",
            color: "#8F8F8F",
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.10)",
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
              color: "#8A8A8A",
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
          ml: 3,
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

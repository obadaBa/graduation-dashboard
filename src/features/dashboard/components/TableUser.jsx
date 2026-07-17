import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const columns = [
  { key: "id", label: "المعرف" },
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "phone", label: "رقم الهاتف" },
  { key: "province", label: "المحافظة" },
  { key: "gender", label: "الجنس" },
  { key: "status", label: "حالة الحساب" },
  { key: "lastLogin", label: "آخر تسجيل دخول" },
  { key: "action", label: "" },
];

const gridTemplateColumns =
  "0.58fr 1.45fr 2.25fr 1.05fr 1fr 0.85fr 1.25fr 1.25fr 0.35fr";

function getPageItems(page) {
  const users = page?.data?.users;

  if (Array.isArray(page?.data)) return page.data;
  if (Array.isArray(users)) return users;
  if (Array.isArray(users?.items)) return users.items;
  if (Array.isArray(page?.data?.items)) return page.data.items;
  return [];
}

function normalizeUser(user) {
  const accountStatus =
    user.account_status || user.status || user.accountStatus || "-";
  const normalizedStatus = String(accountStatus).toLowerCase();
  const blocked =
    Boolean(user.is_blocked ?? user.blocked) ||
    normalizedStatus.includes("محظور") ||
    normalizedStatus.includes("blocked") ||
    normalizedStatus.includes("suspended");

  return {
    id: user.id,
    name: user.name || user.full_name || "-",
    email: user.email || "-",
    phone: user.phone || user.phone_number || user.mobile || "-",
    province: user.governorate || user.province || "-",
    gender: user.gender || "-",
    status: accountStatus,
    blocked,
    lastLogin:
      user.last_login ||
      user.last_login_at ||
      user.lastLogin ||
      user.created_at ||
      "-",
    avatar: user.avatar || user.avatar_url || user.profile_photo_url || "",
  };
}

function StatusPill({ blocked, status }) {
  const color = blocked ? "#FF5E58" : "#25D84E";
  const label =
    status && status !== "-"
      ? status
      : blocked
        ? "حساب محظور"
        : "حساب فعال";

  return (
    <Box
      sx={{
        minWidth: 104,
        height: 24,
        px: 1.2,
        borderRadius: "999px",
        bgcolor: blocked
          ? "rgba(255, 94, 88, 0.12)"
          : "rgba(37, 216, 78, 0.12)",
        color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.7,
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          bgcolor: color,
        }}
      />
      {label}
    </Box>
  );
}

export function GenderCell({ gender }) {
  const normalizedGender = String(gender).toLowerCase();
  const isFemale =
    normalizedGender === "أنثى" ||
    normalizedGender === "انثى" ||
    normalizedGender === "female";
  const color = isFemale ? "#FF4DB3" : "#19A7FF";
  const Icon = isFemale ? FemaleRoundedIcon : MaleRoundedIcon;

  return (
    <Stack
      direction="row-reverse"
      spacing={0.35}
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {gender}
      </Typography>
      <Icon sx={{ fontSize: 18, color }} />
    </Stack>
  );
}

export function NameCell({ user }) {
  return (
    <Stack
      direction="row"
      spacing={0.8}
      alignItems="center"
      justifyContent="center"
      gap={1}
    >
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{
          width: 25,
          height: 25,
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 12,
        }}
      />
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {user.name}
      </Typography>
    </Stack>
  );
}

export function TableCell({ children }) {
  return (
    <Box
      sx={{
        minHeight: 41,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 0,
      }}
    >
      {typeof children === "string" ? (
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </Box>
  );
}

export default function TableUser({
  usersQuery,
  isSearching = false,
  onRowClick,
}) {
  const navigate = useNavigate();
  const pages = usersQuery?.data?.pages || [];
  const rows = pages.flatMap(getPageItems).map(normalizeUser);

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const remaining =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (
      remaining < 160 &&
      usersQuery?.hasNextPage &&
      !usersQuery?.isFetchingNextPage &&
      !usersQuery?.isFetchNextPageError
    ) {
      usersQuery.fetchNextPage();
    }
  };

  return (
    <Box
      sx={{
        mt: 2.2,
        width: "100%",
        flex: 1,
        minHeight: 0,
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        overflow: "hidden",
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns,
          alignItems: "center",
          minHeight: 48,
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          px: 1.4,
          flexShrink: 0,
        }}
      >
        {columns.map((column) => (
          <Typography
            key={column.key}
            sx={{
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 16,
              fontWeight: 800,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {column.label}
          </Typography>
        ))}
      </Box>

      <Box
        onScroll={handleScroll}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {rows.map((user) => (
          <Box
            key={user.id}
            onClick={() => onRowClick?.(user)}
            sx={{
              display: "grid",
              gridTemplateColumns,
              alignItems: "center",
              minHeight: 41,
              px: 1.4,
              borderTop: (theme) =>
                `1px solid ${theme.palette.dashboard.chartBorder}`,
              cursor: onRowClick ? "pointer" : "default",
              "&:hover": onRowClick
                ? {
                    bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
                  }
                : undefined,
            }}
          >
            <TableCell>
              <Typography
                sx={{ color: "#4F7DFF", fontSize: 14, fontWeight: 800 }}
              >
                #{user.id}
              </Typography>
            </TableCell>
            <TableCell>
              <NameCell user={user} />
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.province}</TableCell>
            <TableCell>
              <GenderCell gender={user.gender} />
            </TableCell>
            <TableCell>
              <StatusPill blocked={user.blocked} status={user.status} />
            </TableCell>
            <TableCell>{user.lastLogin}</TableCell>
            <TableCell>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/user-profile/${user.id}`);
                }}
                aria-label={`عرض ملف ${user.name}`}
                size="small"
                sx={{ color: (theme) => theme.palette.dashboard.textSecondary }}
              >
                <ArrowBackRoundedIcon sx={{ fontSize: 22 }} />
              </IconButton>
            </TableCell>
          </Box>
        ))}

        {(usersQuery?.isLoading || usersQuery?.isFetchingNextPage) && (
          <Box sx={{ py: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={26} />
          </Box>
        )}

        {!usersQuery?.isLoading && rows.length === 0 && (
          <Typography
            sx={{
              py: 8,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 15,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {isSearching
              ? "لا توجد نتائج مطابقة للبحث"
              : "لا يوجد مستخدمون لعرضهم"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const defaultUsers = [
  {
    id: "1#",
    name: "محمد منصور",
    email: "360mohamad360@gmail.com",
    phone: "0981692323",
    province: "دمشق",
    gender: "ذكر",
    status: "حساب فعال",
    blocked: false,
    lastLogin: "2026\\03\\11",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "2#",
    name: "كارمن الشوفي",
    email: "carmen.alshof18@gmail.com",
    phone: "0981692323",
    province: "السويداء",
    gender: "أنثى",
    status: "حساب محظور",
    blocked: true,
    lastLogin: "2026\\03\\11",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "3#",
    name: "عبيدة الرحال",
    email: "obeda.al.rahal@gmail.com",
    phone: "-",
    province: "القنيطرة",
    gender: "ذكر",
    status: "حساب فعال",
    blocked: false,
    lastLogin: "منذ 5 دقائق",
    avatar: "",
  },
  {
    id: "4#",
    name: "عبادة بغدادي",
    email: "Obada.work.98@gmail.com",
    phone: "0981692323",
    province: "دمشق",
    gender: "ذكر",
    status: "حساب محظور",
    blocked: true,
    lastLogin: "2026\\03\\11",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "5#",
    name: "سارة الطايع",
    email: "sara_al_tayaa2002@gmail.com",
    phone: "0981692323",
    province: "-",
    gender: "أنثى",
    status: "حساب فعال",
    blocked: false,
    lastLogin: "منذ ساعة",
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "6#",
    name: "عبيد الرفاعي",
    email: "Obaid.222.rifa@gmail.com",
    phone: "-",
    province: "دمشق",
    gender: "ذكر",
    status: "حساب فعال",
    blocked: false,
    lastLogin: "2026\\03\\11",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
];

const columns = [
  { key: "id", label: "المعرف" },
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الالكتروني" },
  { key: "phone", label: "رقم الهاتف" },
  { key: "province", label: "المحافظة" },
  { key: "gender", label: "الجنس" },
  { key: "status", label: "حالة الحساب" },
  { key: "lastLogin", label: "اخر تسجيل دخول" },
  { key: "action", label: "" },
];

const gridTemplateColumns = "0.58fr 1.45fr 2.25fr 1.05fr 1fr 0.85fr 1.25fr 1.25fr 0.35fr";

function StatusPill({ blocked }) {
  const color = blocked ? "#FF5E58" : "#25D84E";

  return (
    <Box
      sx={{
        minWidth: 104,
        height: 24,
        px: 1.2,
        borderRadius: "999px",
        bgcolor: blocked ? "#FFF0F0" : "#EFFFF1",
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
      {blocked ? "حساب محظور" : "حساب فعال"}
    </Box>
  );
}

function GenderCell({ gender }) {
  const isFemale = gender === "أنثى";
  const color = isFemale ? "#FF4DB3" : "#19A7FF";
  const Icon = isFemale ? FemaleRoundedIcon : MaleRoundedIcon;

  return (
    <Stack direction="row-reverse" spacing={0.35} alignItems="center" justifyContent="center">
      <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 600 }}>
        {gender}
      </Typography>
      <Icon sx={{ fontSize: 18, color }} />
    </Stack>
  );
}

function NameCell({ user }) {
  return (
    <Stack direction="row" spacing={0.8} alignItems="center" justifyContent="center" gap={1}>
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{
          width: 25,
          height: 25,
          bgcolor: "#ECECEC",
          color: "#A0A0A0",
          fontSize: 12,
        }}
      />
      <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 700 }}>
        {user.name}
      </Typography>
    </Stack>
  );
}

function TableCell({ children, align = "center" }) {
  return (
    <Box
      sx={{
        minHeight: 41,
        display: "flex",
        alignItems: "center",
        justifyContent: align === "right" ? "flex-start" : "center",
        minWidth: 0,
      }}
    >
      {typeof children === "string" ? (
        <Typography
          sx={{
            color: "#263238",
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

export default function TableUser({ rows = defaultUsers }) {
  return (
    <Box
      sx={{
        mt: 2.2,
        width: "100%",
        minHeight: 356,
        borderRadius: "10px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.10)",
        overflow: "hidden",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns,
          alignItems: "center",
          minHeight: 48,
          bgcolor: "#F6F6F6",
          px: 1.4,
        }}
      >
        {columns.map((column) => (
          <Typography
            key={column.key}
            sx={{
              color: "#8F8F8F",
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

      {rows.map((user) => (
        <Box
          key={user.id}
          sx={{
            display: "grid",
            gridTemplateColumns,
            alignItems: "center",
            minHeight: 41,
            px: 1.4,
            borderTop: "1px solid #EFEFEF",
          }}
        >
          <TableCell>
            <Typography sx={{ color: "#4F7DFF", fontSize: 14, fontWeight: 800 }}>
              {user.id}
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
            <StatusPill blocked={user.blocked} />
          </TableCell>
          <TableCell>{user.lastLogin}</TableCell>
          <TableCell>
            <ArrowBackRoundedIcon sx={{ color: "#8A8A8A", fontSize: 22 }} />
          </TableCell>
        </Box>
      ))}
    </Box>
  );
}

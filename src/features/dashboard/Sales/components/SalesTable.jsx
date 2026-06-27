import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const salesRows = [
  {
    id: "1#",
    buyer: "محمد منصور",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    totalPrice: 180,
    profit: 15,
    profitPercent: "7%",
    date: "2026\\03\\11",
    time: "08:20 م",
    testId: "123009",
    status: "موافق عليه",
    statusType: "approved",
  },
  {
    id: "2#",
    buyer: "كارمن الشوفي",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    totalPrice: 70,
    profit: 4,
    date: "2026\\03\\11",
    time: "11:00 ص",
    testId: "203",
    status: "تم حذفه",
    statusType: "deleted",
  },
  {
    id: "3#",
    buyer: "عبيدة الرحال",
    avatar: "",
    totalPrice: 1200,
    profit: 180,
    date: "منذ 5 دقائق",
    time: "09:15 ص",
    testId: "1440",
    status: "مبلغ عنه",
    statusType: "reported",
  },
  {
    id: "4#",
    buyer: "عبادة بغدادي",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
    totalPrice: 240,
    profit: 70,
    date: "2026\\03\\11",
    time: "10:00 م",
    testId: "12",
    status: "يحتاج تعديل",
    statusType: "needs_edit",
  },
  {
    id: "5#",
    buyer: "سارة الطايع",
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=80&q=80",
    totalPrice: 15,
    profit: 1,
    date: "منذ ساعة",
    time: "08:00 م",
    testId: "128",
    status: "موافق عليه",
    statusType: "approved",
  },
  {
    id: "6#",
    buyer: "عبيد الرفاعي",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    totalPrice: 2030,
    profit: 240,
    date: "2026\\03\\11",
    time: "11:00 ص",
    testId: "1",
    status: "قيد المراجعة",
    statusType: "reviewing",
  },
];

const columns = [
  { key: "id", label: "المعرف" },
  { key: "buyer", label: "المشتري" },
  { key: "totalPrice", label: "السعر الكلي" },
  { key: "profit", label: "الربح" },
  { key: "date", label: "تاريخ الشراء" },
  { key: "time", label: "وقت الشراء" },
  { key: "testId", label: "معرف الاختبار" },
  { key: "action", label: "" },
  { key: "status", label: "حالة الاختبار" },
];

const gridTemplateColumns = "0.58fr 1.5fr 1.2fr 1.05fr 1.35fr 1.05fr 1.1fr 0.45fr 1.35fr";

const statusStyles = {
  approved: { color: "#20C84F", bgcolor: "#EAFFED" },
  deleted: { color: "#FF5E58", bgcolor: "#FFF0F0" },
  reported: { color: "#A66BFF", bgcolor: "#F5EEFF" },
  needs_edit: { color: "#FFB84D", bgcolor: "#FFF4E5" },
  reviewing: { color: "#E2D000", bgcolor: "#FFFCE4" },
};

const summaryItems = [
  {
    label: "عدد الاختبارات المباعة",
    value: "132",
    suffix: "اختبار",
    color: "#5C84FF",
  },
  {
    label: "المبيعات الكلية ضمن الفترة",
    value: "270000",
    suffix: "ليرة سورية",
    color: "#263238",
  },
  {
    label: "أرباح المستخدمين ضمن الفترة",
    value: "190000",
    suffix: "ليرة سورية",
    color: "#263238",
  },
  {
    label: "صافي الأرباح ضمن الفترة",
    value: "80000",
    suffix: "ليرة سورية",
    color: "#20E03A",
  },
];

function MoneyCell({ value }) {
  return (
    <Stack direction="row" alignItems="baseline" spacing={1} justifyContent="center" gap={1}>
      <Typography sx={{ color: "#263238", fontSize: 18, fontWeight: 900 }}>
        {value}
      </Typography>
      <Typography sx={{ color: "#8F8F8F", fontSize: 10, fontWeight: 500 }}>
        ليرة سورية
      </Typography>
    </Stack>
  );
}

function BuyerCell({ row }) {
  return (
    <Stack direction="row" spacing={0.8} alignItems="center" justifyContent="center">
      <Avatar
        src={row.avatar}
        alt={row.buyer}
        sx={{
          width: 25,
          height: 25,
          bgcolor: "#ECECEC",
          color: "#A0A0A0",
          fontSize: 12,
        }}
      />
      <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 700 }}>
        {row.buyer}
      </Typography>
    </Stack>
  );
}

function StatusPill({ row }) {
  const style = statusStyles[row.statusType] || statusStyles.approved;

  return (
    <Box
      sx={{
        minWidth: 106,
        height: 24,
        px: 1.2,
        borderRadius: "999px",
        bgcolor: style.bgcolor,
        color: style.color,
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
          bgcolor: style.color,
        }}
      />
      {row.status}
    </Box>
  );
}

function TableCell({ children }) {
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
      {typeof children === "string" || typeof children === "number" ? (
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

export default function SalesTable({ rows = salesRows }) {
  return (
    <Box
      sx={{
        mt: 2.2,
        width: "100%",
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

      {rows.map((row) => (
        <Box
          key={row.id}
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
              {row.id}
            </Typography>
          </TableCell>
          <TableCell>
            <BuyerCell row={row} />
          </TableCell>
          <TableCell>
            <MoneyCell value={row.totalPrice} />
          </TableCell>
          <TableCell>
            <Stack direction="row" alignItems="baseline" spacing={1} justifyContent="center" gap={1}>
              <Typography sx={{ color: "#263238", fontSize: 18, fontWeight: 900 }}>
                {row.profit}
              </Typography>
              <Typography sx={{ color: "#8F8F8F", fontSize: 10, fontWeight: 500 }}>
                ليرة سورية
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.time}</TableCell>
          <TableCell>
            <Typography sx={{ color: "#4F7DFF", fontSize: 14, fontWeight: 700 }}>
              {row.testId}
            </Typography>
          </TableCell>
          <TableCell>
            <ArrowBackRoundedIcon sx={{ color: "#8A8A8A", fontSize: 22 }} />
          </TableCell>
          <TableCell>
            <StatusPill row={row} />
          </TableCell>
        </Box>
      ))}

      <Box
        sx={{
          minHeight: 170,
          borderTop: "1px solid #EFEFEF",
          bgcolor: "#FFFFFF",
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid #EFEFEF",
          minHeight: 88,
          bgcolor: "#FFFFFF",
        }}
      >
        {summaryItems.map((item, index) => (
          <Box
            key={item.label}
            sx={{
              px: 2.5,
              py: 1.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              borderLeft: index === summaryItems.length - 1 ? "none" : "1px solid #E2E2E2",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 700 }}>
                {item.label}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: item.color, fontSize: 24, fontWeight: 900 }}>
                {item.value}
              </Typography>
              <Typography sx={{ mt: 0.55, color: "#8F8F8F", fontSize: 11, fontWeight: 500 }}>
                {item.suffix}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

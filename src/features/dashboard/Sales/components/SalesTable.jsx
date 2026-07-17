import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Avatar, Box, CircularProgress, Stack, Typography } from "@mui/material";

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

const gridTemplateColumns =
  "0.58fr 1.5fr 1.2fr 1.05fr 1.35fr 1.05fr 1.1fr 0.45fr 1.35fr";

const statusStyles = {
  approved: { color: "#20C84F", bgcolor: "rgba(32, 200, 79, 0.12)" },
  deleted: { color: "#FF5E58", bgcolor: "rgba(255, 94, 88, 0.12)" },
  reported: { color: "#A66BFF", bgcolor: "rgba(166, 107, 255, 0.12)" },
  needs_edit: { color: "#FFB84D", bgcolor: "rgba(255, 184, 77, 0.14)" },
  reviewing: { color: "#E2D000", bgcolor: "rgba(226, 208, 0, 0.14)" },
  default: { color: "#8A8A8A", bgcolor: "rgba(138, 138, 138, 0.12)" },
};

function formatNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number)
    ? number.toLocaleString("en-US")
    : value || "0";
}

function getStatusType(status = "") {
  if (status.includes("موافقة") || status.includes("الموافقة")) {
    return "approved";
  }
  if (status.includes("حذف")) return "deleted";
  if (status.includes("مبلغ")) return "reported";
  if (status.includes("تعديل")) return "needs_edit";
  if (status.includes("مراجعة")) return "reviewing";
  return "default";
}

function normalizeSale(sale) {
  return {
    id: sale.sale_id,
    buyer: sale.buyer?.name || "-",
    avatar: sale.buyer?.avatar || "",
    totalPrice: sale.gross_amount ?? 0,
    profit: sale.platform_fee_amount ?? 0,
    profitPercent: sale.platform_fee_percentage,
    date: sale.purchase_date || "-",
    time: sale.purchase_time || "-",
    testId: sale.test_id || "-",
    status: sale.test_status || "-",
    statusType: getStatusType(sale.test_status),
  };
}

function MoneyCell({ value }) {
  return (
    <Stack
      direction="row"
      alignItems="baseline"
      justifyContent="center"
      gap={1}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        {formatNumber(value)}
      </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 10,
          fontWeight: 500,
        }}
      >
        ليرة سورية
      </Typography>
    </Stack>
  );
}

function BuyerCell({ row }) {
  return (
    <Stack
      direction="row"
      spacing={0.8}
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        src={row.avatar}
        alt={row.buyer}
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
        {row.buyer}
      </Typography>
    </Stack>
  );
}

function StatusPill({ row }) {
  const style = statusStyles[row.statusType] || statusStyles.default;

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

function SummaryItem({ item, isLast }) {
  return (
    <Box
      sx={{
        px: 2.5,
        py: 1.4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        borderLeft: isLast
          ? "none"
          : ((theme) => `1px solid ${theme.palette.dashboard.chartBorder}`),
      }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {item.label}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ color: item.color, fontSize: 24, fontWeight: 900 }}>
          {formatNumber(item.value)}
        </Typography>
        <Typography
          sx={{
            mt: 0.55,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {item.suffix}
        </Typography>
      </Box>
    </Box>
  );
}

export default function SalesTable({ salesQuery }) {
  const pages = salesQuery?.data?.pages || [];
  const rows = pages
    .flatMap((page) => page?.data?.sales || page?.sales || [])
    .map(normalizeSale);
  const stats = pages[0]?.data?.stats || pages[0]?.stats || {};
  const isInitialLoading = salesQuery?.isLoading && rows.length === 0;

  const summaryItems = [
    {
      label: "عدد الاختبارات المباعة",
      value: stats.distinct_sold_tests_count,
      suffix: "اختبار",
      color: "#5C84FF",
    },
    {
      label: "المبيعات الكلية ضمن الفترة",
      value: stats.gross_sales_amount,
      suffix: "ليرة سورية",
      color: "#7298FF",
    },
    {
      label: "أرباح المستخدمين ضمن الفترة",
      value: stats.users_profit_amount,
      suffix: "ليرة سورية",
      color: "#7A5AF8",
    },
    {
      label: "صافي الأرباح ضمن الفترة",
      value: stats.platform_net_profit_amount,
      suffix: "ليرة سورية",
      color: "#20E03A",
    },
  ];

  const handleScroll = (event) => {
    const target = event.currentTarget;
    const distanceFromBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight;

    if (
      distanceFromBottom < 180 &&
      salesQuery?.hasNextPage &&
      !salesQuery?.isFetchingNextPage
    ) {
      salesQuery.fetchNextPage();
    }
  };

  return (
    <Box
      sx={{
        mt: 2.2,
        width: "100%",
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        overflow: "hidden",
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        flex: "1 1 0",
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
          minHeight: 0,
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {isInitialLoading ? (
          <Stack
            sx={{ minHeight: 220 }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={28} />
          </Stack>
        ) : rows.length === 0 ? (
          <Stack
            sx={{ minHeight: 220 }}
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              لا يوجد سجلات مبيعات
            </Typography>
          </Stack>
        ) : (
          rows.map((row) => (
            <Box
              key={row.id}
              sx={{
                display: "grid",
                gridTemplateColumns,
                alignItems: "center",
                minHeight: 41,
                px: 1.4,
                borderTop: (theme) =>
                  `1px solid ${theme.palette.dashboard.chartBorder}`,
              }}
            >
              <TableCell>
                <Typography
                  sx={{ color: "#4F7DFF", fontSize: 14, fontWeight: 800 }}
                >
                  {`#${row.id}`}
                </Typography>
              </TableCell>
              <TableCell>
                <BuyerCell row={row} />
              </TableCell>
              <TableCell>
                <MoneyCell value={row.totalPrice} />
              </TableCell>
              <TableCell>
                <MoneyCell value={row.profit} />
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>
                <Typography
                  sx={{ color: "#4F7DFF", fontSize: 14, fontWeight: 700 }}
                >
                  {row.testId}
                </Typography>
              </TableCell>
              <TableCell>
                <ArrowBackRoundedIcon
                  sx={{
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    fontSize: 22,
                  }}
                />
              </TableCell>
              <TableCell>
                <StatusPill row={row} />
              </TableCell>
            </Box>
          ))
        )}

        {salesQuery?.isFetchingNextPage && (
          <Stack sx={{ py: 1.5 }} alignItems="center">
            <CircularProgress size={22} />
          </Stack>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: (theme) =>
            `1px solid ${theme.palette.dashboard.chartBorder}`,
          minHeight: 88,
          bgcolor: (theme) => theme.palette.dashboard.surface,
          flexShrink: 0,
        }}
      >
        {summaryItems.map((item, index) => (
          <SummaryItem
            key={item.label}
            item={item}
            isLast={index === summaryItems.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
}

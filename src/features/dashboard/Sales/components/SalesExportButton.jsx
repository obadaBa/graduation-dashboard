import { useMemo, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Button, Menu, MenuItem } from "@mui/material";

function formatNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number)
    ? number.toLocaleString("en-US")
    : value || "0";
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadBlob({ content, fileName, type }) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function normalizeSale(sale) {
  return {
    id: sale.sale_id || "-",
    buyer: sale.buyer?.name || "-",
    totalPrice: Number(sale.gross_amount ?? 0),
    profit: Number(sale.platform_fee_amount ?? 0),
    userProfit: Number(sale.user_profit_amount ?? 0),
    profitPercent: sale.platform_fee_percentage ?? "-",
    date: sale.purchase_date || "-",
    time: sale.purchase_time || "-",
    testId: sale.test_id || "-",
    status: sale.test_status || "-",
  };
}

function periodLabel(period, customRange) {
  if (period === "today") return "اليوم";
  if (period === "week") return "آخر أسبوع";
  if (period === "month") return "آخر شهر";
  if (period === "year") return "آخر سنة";
  if (period === "custom") {
    if (customRange?.startDate && customRange?.endDate) {
      return `${customRange.startDate} → ${customRange.endDate}`;
    }
    return "فترة مخصصة";
  }
  return "كل الفترات";
}

function sortLabel(sortBy) {
  if (sortBy === "purchased_at") return "الأحدث شراءً";
  if (sortBy === "gross_amount") return "الأعلى سعرًا";
  if (sortBy === "platform_fee_amount") return "الأعلى ربحًا";
  return "افتراضي";
}

function exportSalesCsv({ rows, stats, meta }) {
  const summaryRows = [
    ["نوع التقرير", "تقرير المبيعات"],
    ["الفترة", meta.period],
    ["الترتيب", meta.sort],
    ["عدد الاختبارات المباعة", stats.distinct_sold_tests_count ?? 0],
    ["المبيعات الكلية", stats.gross_sales_amount ?? 0],
    ["أرباح المستخدمين", stats.users_profit_amount ?? 0],
    ["صافي أرباح المنصة", stats.platform_net_profit_amount ?? 0],
    [],
  ];

  const headers = [
    "معرف البيع",
    "المشتري",
    "السعر الكلي",
    "ربح المنصة",
    "ربح المستخدم",
    "نسبة المنصة",
    "تاريخ الشراء",
    "وقت الشراء",
    "معرف الاختبار",
    "حالة الاختبار",
  ];

  const detailRows = rows.map((row) => [
    row.id,
    row.buyer,
    row.totalPrice,
    row.profit,
    row.userProfit,
    row.profitPercent,
    row.date,
    row.time,
    row.testId,
    row.status,
  ]);

  const csvContent = [...summaryRows, headers, ...detailRows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");

  downloadBlob({
    content: `\uFEFF${csvContent}`,
    fileName: `sales-report-${Date.now()}.csv`,
    type: "text/csv;charset=utf-8;",
  });
}

function exportSalesPdf({ rows, stats, meta }) {
  const gross = Number(stats.gross_sales_amount ?? 0);
  const platformProfit = Number(stats.platform_net_profit_amount ?? 0);
  const usersProfit = Number(stats.users_profit_amount ?? 0);
  const soldTests = Number(stats.distinct_sold_tests_count ?? rows.length);
  const invoiceRows = rows
    .map(
      (row, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${row.id}</td>
          <td>${row.buyer}</td>
          <td>${row.testId}</td>
          <td>${row.date}</td>
          <td>${row.time}</td>
          <td>${formatNumber(row.totalPrice)}</td>
          <td>${formatNumber(row.profit)}</td>
          <td>${formatNumber(row.userProfit)}</td>
          <td>${row.status}</td>
        </tr>
      `,
    )
    .join("");

  const printWindow = window.open("", "_blank", "width=1400,height=900");

  if (!printWindow) return;

  printWindow.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>تقرير المبيعات</title>
        <style>
          @page { size: A4 landscape; margin: 12mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: Tahoma, Arial, sans-serif;
            color: #1f2937;
            background: #eef3fb;
          }
          .report {
            min-height: 100vh;
            padding: 28px;
            background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 18px;
            padding-bottom: 18px;
            border-bottom: 2px solid #e7edf8;
          }
          .brand {
            color: #4f7dff;
            font-size: 18px;
            font-weight: 800;
          }
          h1 {
            margin: 10px 0 6px;
            font-size: 30px;
            line-height: 1.4;
            color: #152238;
          }
          .meta {
            color: #6b7280;
            font-size: 13px;
            line-height: 1.8;
          }
          .badge {
            min-width: 180px;
            padding: 14px 18px;
            border-radius: 16px;
            background: #edf4ff;
            border: 1px solid #d6e4ff;
            color: #315edb;
            text-align: center;
          }
          .badge strong {
            display: block;
            font-size: 24px;
            margin-top: 4px;
          }
          .cards {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
            margin: 22px 0 18px;
          }
          .card {
            background: #fff;
            border: 1px solid #e6ebf5;
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 10px 24px rgba(25, 35, 52, 0.08);
          }
          .card span {
            display: block;
            color: #7a8597;
            font-size: 13px;
            margin-bottom: 10px;
          }
          .card strong {
            font-size: 24px;
            color: #152238;
          }
          .section-title {
            margin: 18px 0 12px;
            font-size: 18px;
            font-weight: 800;
            color: #1d2c45;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            border: 1px solid #e6ebf5;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(25, 35, 52, 0.08);
          }
          thead th {
            background: #4f7dff;
            color: #ffffff;
            font-size: 13px;
            font-weight: 800;
            padding: 12px 10px;
            text-align: center;
          }
          tbody td {
            padding: 11px 10px;
            font-size: 12px;
            border-bottom: 1px solid #edf1f7;
            text-align: center;
          }
          tbody tr:nth-child(even) td { background: #f8faff; }
          .invoice {
            margin-top: 18px;
            border: 1px solid #d7e3fb;
            border-radius: 18px;
            background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
            padding: 18px;
          }
          .invoice-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 18px;
          }
          .invoice-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 12px;
            border-radius: 12px;
            background: #f5f8ff;
            border: 1px solid #e0e8fa;
            font-size: 14px;
          }
          .invoice-total {
            margin-top: 14px;
            padding: 14px 16px;
            border-radius: 14px;
            background: #152238;
            color: #fff;
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 800;
          }
          .footer {
            margin-top: 14px;
            color: #7a8597;
            font-size: 12px;
            text-align: left;
            direction: ltr;
          }
        </style>
      </head>
      <body>
        <main class="report">
          <section class="header">
            <div>
              <div class="brand">Nerd Dashboard</div>
              <h1>تقرير المبيعات التفصيلي</h1>
              <div class="meta">
                الفترة: ${meta.period}<br />
                الترتيب: ${meta.sort}<br />
                تاريخ الإنشاء: ${new Date().toLocaleString("en-GB")}
              </div>
            </div>
            <div class="badge">
              عدد السجلات
              <strong>${rows.length}</strong>
            </div>
          </section>

          <section class="cards">
            <div class="card"><span>عدد الاختبارات المباعة</span><strong>${formatNumber(soldTests)}</strong></div>
            <div class="card"><span>المبيعات الكلية</span><strong>${formatNumber(gross)}</strong></div>
            <div class="card"><span>أرباح المستخدمين</span><strong>${formatNumber(usersProfit)}</strong></div>
            <div class="card"><span>صافي أرباح المنصة</span><strong>${formatNumber(platformProfit)}</strong></div>
          </section>

          <div class="section-title">تفاصيل المبيعات</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>معرف البيع</th>
                <th>المشتري</th>
                <th>معرف الاختبار</th>
                <th>تاريخ الشراء</th>
                <th>وقت الشراء</th>
                <th>السعر الكلي</th>
                <th>ربح المنصة</th>
                <th>ربح المستخدم</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>${invoiceRows}</tbody>
          </table>

          <section class="invoice">
            <div class="section-title" style="margin-top:0;">فاتورة تفصيلية</div>
            <div class="invoice-grid">
              <div class="invoice-item"><span>إجمالي العمليات</span><strong>${rows.length}</strong></div>
              <div class="invoice-item"><span>عدد الاختبارات المباعة</span><strong>${formatNumber(soldTests)}</strong></div>
              <div class="invoice-item"><span>إجمالي المبيعات</span><strong>${formatNumber(gross)} ل.س</strong></div>
              <div class="invoice-item"><span>إجمالي أرباح المستخدمين</span><strong>${formatNumber(usersProfit)} ل.س</strong></div>
              <div class="invoice-item"><span>صافي أرباح المنصة</span><strong>${formatNumber(platformProfit)} ل.س</strong></div>
              <div class="invoice-item"><span>صافي العمولة المتحقق</span><strong>${formatNumber(platformProfit)} ل.س</strong></div>
            </div>
            <div class="invoice-total">
              <span>الإجمالي النهائي</span>
              <span>${formatNumber(gross)} ل.س</span>
            </div>
          </section>

          <div class="footer">Generated from live dashboard sales data</div>
        </main>
        <script>
          window.addEventListener("load", () => window.print());
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}

export default function SalesExportButton({
  salesQuery,
  period,
  sortBy,
  customRange,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const rows = useMemo(
    () =>
      (salesQuery?.data?.pages || [])
        .flatMap((page) => page?.data?.sales || page?.sales || [])
        .map(normalizeSale),
    [salesQuery?.data?.pages],
  );
  const stats =
    salesQuery?.data?.pages?.[0]?.data?.stats ||
    salesQuery?.data?.pages?.[0]?.stats ||
    {};
  const isDisabled = salesQuery?.isLoading || rows.length === 0;
  const meta = {
    period: periodLabel(period, customRange),
    sort: sortLabel(sortBy),
  };
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleCsvExport = () => {
    exportSalesCsv({ rows, stats, meta });
    handleClose();
  };

  const handlePdfExport = () => {
    exportSalesPdf({ rows, stats, meta });
    handleClose();
  };

  return (
    <>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        disabled={isDisabled}
        startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 20 }} />}
        endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 22 }} />}
        sx={{
          mt: 1.3,
          ml: 3,
          minWidth: 198,
          height: 42,
          px: 2.2,
          borderRadius: "6px",
          bgcolor: "#5C84FF",
          color: "#FFFFFF",
          fontSize: 15,
          fontWeight: 800,
          boxShadow: "0 6px 14px rgba(92, 132, 255, 0.28)",
          whiteSpace: "nowrap",
          "&:hover": {
            bgcolor: "#5C84FF",
            boxShadow: "0 6px 14px rgba(92, 132, 255, 0.28)",
          },
          "&.Mui-disabled": {
            bgcolor: "#A9B9E8",
            color: "#F8FAFF",
          },
          "& .MuiButton-startIcon": {
            marginInlineStart: 0,
            marginInlineEnd: "7px",
          },
          "& .MuiButton-endIcon": {
            marginInlineStart: "7px",
            marginInlineEnd: 0,
          },
        }}
      >
        تحميل تقرير المبيعات
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: "12px",
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            bgcolor: (theme) => theme.palette.dashboard.surface,
            direction: "rtl",
          },
        }}
      >
        <MenuItem
          onClick={handlePdfExport}
          sx={{
            fontSize: 14,
            fontWeight: 700,
            justifyContent: "flex-start",
            color: (theme) => theme.palette.dashboard.textPrimary,
          }}
        >
          PDF
        </MenuItem>
        <MenuItem
          onClick={handleCsvExport}
          sx={{
            fontSize: 14,
            fontWeight: 700,
            justifyContent: "flex-start",
            color: (theme) => theme.palette.dashboard.textPrimary,
          }}
        >
          CSV
        </MenuItem>
      </Menu>
    </>
  );
}

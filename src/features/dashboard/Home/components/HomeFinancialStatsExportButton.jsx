import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const monthLabels = {
  1: "كانون الثاني",
  2: "شباط",
  3: "آذار",
  4: "نيسان",
  5: "أيار",
  6: "حزيران",
  7: "تموز",
  8: "آب",
  9: "أيلول",
  10: "تشرين الأول",
  11: "تشرين الثاني",
  12: "كانون الأول",
};

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function formatCurrency(value) {
  return `${formatNumber(value)} ليرة سورية`;
}

function formatPercent(value) {
  const numericValue = Number(value || 0);
  const sign = numericValue > 0 ? "+" : "";
  return `${sign}${numericValue}%`;
}

function getMonthName(monthNo) {
  return monthLabels[monthNo] || "-";
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

function buildSummaryRows(summary) {
  return [
    {
      label: "المبيعات الكلية",
      value: formatCurrency(summary?.gross_sales_amount?.value),
      change: "-",
    },
    {
      label: "عدد عمليات الشراء",
      value: formatNumber(summary?.sold_purchase_count?.value),
      change: formatPercent(
        summary?.sold_purchase_count?.change_percentage_from_previous_year,
      ),
    },
    {
      label: "صافي ربح التطبيق",
      value: formatCurrency(summary?.platform_net_profit_amount?.value),
      change: formatPercent(
        summary?.platform_net_profit_amount?.change_percentage_from_previous_year,
      ),
    },
    {
      label: "أرباح المستخدمين",
      value: formatCurrency(summary?.users_profit_amount?.value),
      change: formatPercent(
        summary?.users_profit_amount?.change_percentage_from_previous_year,
      ),
    },
    {
      label: "متوسط ربح التطبيق الشهري",
      value: formatCurrency(summary?.average_monthly_platform_profit_amount?.value),
      change: "-",
    },
    {
      label: "متوسط المبيعات الشهري",
      value: formatCurrency(summary?.average_monthly_sales_amount?.value),
      change: "-",
    },
  ];
}

function buildMonthRows(items = []) {
  return items.map((item, index) => ({
    rank: index + 1,
    month: getMonthName(item.month_no),
    soldPurchaseCount: formatNumber(item.sold_purchase_count),
    grossSalesAmount: formatCurrency(item.gross_sales_amount),
    platformNetProfitAmount: formatCurrency(item.platform_net_profit_amount),
    usersProfitAmount: formatCurrency(item.users_profit_amount),
  }));
}

function buildMostPurchasedRows(mostPurchasedTest) {
  const test = mostPurchasedTest?.test || {};

  return [
    ["عنوان الاختبار", test.title || "-"],
    ["عدد مرات الشراء", formatNumber(mostPurchasedTest?.purchase_count)],
    ["إجمالي المبيعات", formatCurrency(mostPurchasedTest?.gross_sales_amount)],
    ["صافي ربح التطبيق", formatCurrency(mostPurchasedTest?.platform_net_profit_amount)],
    ["أرباح المستخدمين", formatCurrency(mostPurchasedTest?.users_profit_amount)],
    ["السعر", formatCurrency(test.price)],
    ["عدد الأسئلة", formatNumber(test.question_count)],
    ["الصعوبة", test.difficulty_level || "-"],
    ["التقييم", test.average_rating ?? "-"],
    ["تاريخ النشر", test.published_at || "-"],
    ["الاهتمامات العلمية", (test.scientific_interests || []).join("، ") || "-"],
    ["الوصف", test.description || "-"],
  ];
}

function exportFinancialCsv({ year, financialStats }) {
  const summaryRows = buildSummaryRows(financialStats?.summary);
  const soldMonthRows = buildMonthRows(financialStats?.top_months_by_sold_purchases);
  const profitMonthRows = buildMonthRows(financialStats?.top_months_by_platform_profit);
  const mostPurchasedRows = buildMostPurchasedRows(financialStats?.most_purchased_test);

  const rows = [
    ["تقرير الإحصائيات المالية", year],
    [],
    ["ملخص الفترة"],
    ["البند", "القيمة", "نسبة التغير عن السنة السابقة"],
    ...summaryRows.map((row) => [row.label, row.value, row.change]),
    [],
    ["الأشهر الأكثر مبيعاً للاختبارات"],
    ["الترتيب", "الشهر", "عدد الشراء", "المبيعات الكلية", "صافي ربح التطبيق", "أرباح المستخدمين"],
    ...soldMonthRows.map((row) => [
      row.rank,
      row.month,
      row.soldPurchaseCount,
      row.grossSalesAmount,
      row.platformNetProfitAmount,
      row.usersProfitAmount,
    ]),
    [],
    ["الأشهر الأكثر تحقيقاً للربح"],
    ["الترتيب", "الشهر", "عدد الشراء", "المبيعات الكلية", "صافي ربح التطبيق", "أرباح المستخدمين"],
    ...profitMonthRows.map((row) => [
      row.rank,
      row.month,
      row.soldPurchaseCount,
      row.grossSalesAmount,
      row.platformNetProfitAmount,
      row.usersProfitAmount,
    ]),
    [],
    ["الاختبار الأكثر شراءً"],
    ["البند", "القيمة"],
    ...mostPurchasedRows,
  ];

  const csvContent = rows
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");

  downloadBlob({
    content: `\uFEFF${csvContent}`,
    fileName: `financial-stats-${year}.csv`,
    type: "text/csv;charset=utf-8;",
  });
}

function renderSummaryCards(summaryRows) {
  return summaryRows
    .map(
      (row) => `
        <article class="card">
          <span>${row.label}</span>
          <strong>${row.value}</strong>
          <em>${row.change}</em>
        </article>
      `,
    )
    .join("");
}

function renderMonthRows(rows) {
  return rows
    .map(
      (row) => `
        <tr>
          <td>#${row.rank}</td>
          <td>${row.month}</td>
          <td>${row.soldPurchaseCount}</td>
          <td>${row.grossSalesAmount}</td>
          <td>${row.platformNetProfitAmount}</td>
          <td>${row.usersProfitAmount}</td>
        </tr>
      `,
    )
    .join("");
}

function renderDetailsRows(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <th>${label}</th>
          <td>${value}</td>
        </tr>
      `,
    )
    .join("");
}

function exportFinancialPdf({ year, financialStats }) {
  const summaryRows = buildSummaryRows(financialStats?.summary);
  const soldMonthRows = buildMonthRows(financialStats?.top_months_by_sold_purchases);
  const profitMonthRows = buildMonthRows(financialStats?.top_months_by_platform_profit);
  const mostPurchasedRows = buildMostPurchasedRows(financialStats?.most_purchased_test);
  const printWindow = window.open("", "_blank", "width=1200,height=850");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>تقرير الإحصائيات المالية ${year}</title>
        <style>
          @page { size: A4 landscape; margin: 12mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Tahoma", "Arial", sans-serif;
            color: #263238;
            background: #eef3ff;
          }
          .report {
            min-height: 100vh;
            padding: 28px;
            background: linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 24px;
            padding-bottom: 18px;
            border-bottom: 2px solid #e5ebf7;
          }
          .brand {
            color: #5583ff;
            font-size: 18px;
            font-weight: 800;
          }
          h1 {
            margin: 8px 0 0;
            font-size: 30px;
            line-height: 1.35;
          }
          .year {
            min-width: 126px;
            border-radius: 16px;
            background: #eef4ff;
            color: #315edb;
            padding: 12px 18px;
            text-align: center;
            font-size: 24px;
            font-weight: 800;
          }
          .cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin: 22px 0;
          }
          .card {
            min-height: 92px;
            border: 1px solid #e5eaf4;
            border-radius: 16px;
            background: #ffffff;
            padding: 14px;
            box-shadow: 0 8px 20px rgba(31, 42, 55, 0.06);
          }
          .card span {
            display: block;
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 8px;
          }
          .card strong {
            display: block;
            color: #263238;
            font-size: 22px;
            line-height: 1.25;
          }
          .card em {
            display: inline-block;
            margin-top: 8px;
            color: #5583ff;
            font-style: normal;
            font-size: 12px;
            font-weight: 700;
          }
          .section {
            margin-top: 22px;
          }
          h2 {
            margin: 0 0 10px;
            color: #263238;
            font-size: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 10px 24px rgba(31, 42, 55, 0.08);
          }
          thead th {
            background: #5583ff;
            color: #ffffff;
            font-size: 13px;
            padding: 12px 10px;
            text-align: center;
          }
          tbody td,
          tbody th {
            padding: 11px 10px;
            border-bottom: 1px solid #edf1f7;
            font-size: 13px;
            text-align: center;
          }
          tbody th {
            width: 210px;
            color: #315edb;
            background: #f4f7ff;
          }
          tr:nth-child(even) td { background: #f8faff; }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .footer {
            margin-top: 18px;
            color: #7a8798;
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
              <h1>تقرير الإحصائيات المالية الخاصة بالاختبارات</h1>
            </div>
            <div class="year">${year}</div>
          </section>

          <section class="cards">${renderSummaryCards(summaryRows)}</section>

          <section class="grid">
            <div class="section">
              <h2>الأشهر الأكثر مبيعاً للاختبارات</h2>
              <table>
                <thead>
                  <tr>
                    <th>الترتيب</th>
                    <th>الشهر</th>
                    <th>عدد الشراء</th>
                    <th>المبيعات الكلية</th>
                    <th>صافي ربح التطبيق</th>
                    <th>أرباح المستخدمين</th>
                  </tr>
                </thead>
                <tbody>${renderMonthRows(soldMonthRows)}</tbody>
              </table>
            </div>
            <div class="section">
              <h2>الأشهر الأكثر تحقيقاً للربح</h2>
              <table>
                <thead>
                  <tr>
                    <th>الترتيب</th>
                    <th>الشهر</th>
                    <th>عدد الشراء</th>
                    <th>المبيعات الكلية</th>
                    <th>صافي ربح التطبيق</th>
                    <th>أرباح المستخدمين</th>
                  </tr>
                </thead>
                <tbody>${renderMonthRows(profitMonthRows)}</tbody>
              </table>
            </div>
          </section>

          <section class="section">
            <h2>الاختبار الأكثر شراءً</h2>
            <table>
              <tbody>${renderDetailsRows(mostPurchasedRows)}</tbody>
            </table>
          </section>

          <div class="footer">Generated from dashboard financial data</div>
        </main>
        <script>
          window.addEventListener("load", () => {
            window.print();
          });
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

export default function HomeFinancialStatsExportButton({
  year,
  financialStats,
  disabled = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isDisabled = disabled || !financialStats;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCsvExport = () => {
    exportFinancialCsv({ year, financialStats });
    handleClose();
  };

  const handlePdfExport = () => {
    exportFinancialPdf({ year, financialStats });
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownRoundedIcon sx={{ mr: 1 }} />}
        sx={{
          height: 42,
          px: 3,
          borderRadius: "12px",
          bgcolor: "#5583FF",
          boxShadow: "0 4px 14px rgba(85, 131, 255, 0.28)",
          fontSize: 16,
          fontWeight: 600,
          "&:hover": {
            bgcolor: "#5583FF",
          },
          "&.Mui-disabled": {
            bgcolor: "rgba(85, 131, 255, 0.46)",
            color: "#FFFFFF",
          },
        }}
      >
        تصدير البيانات
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
            minWidth: 150,
            borderRadius: "12px",
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            color: (theme) => theme.palette.dashboard.chartTextPrimary,
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            direction: "rtl",
          },
        }}
      >
        <MenuItem
          onClick={handlePdfExport}
          sx={{ fontSize: 14, fontWeight: 600, justifyContent: "flex-start" }}
        >
          PDF
        </MenuItem>
        <MenuItem
          onClick={handleCsvExport}
          sx={{ fontSize: 14, fontWeight: 600, justifyContent: "flex-start" }}
        >
          CSV
        </MenuItem>
      </Menu>
    </>
  );
}

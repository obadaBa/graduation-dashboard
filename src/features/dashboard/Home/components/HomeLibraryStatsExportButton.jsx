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

function formatPercent(value) {
  const numericValue = Number(value || 0);
  return `${numericValue.toFixed(2)}%`;
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

function normalizeContentMonths(months = []) {
  const monthsByNumber = new Map(months.map((month) => [month.month_no, month]));

  return Array.from({ length: 12 }, (_, index) => {
    const monthNo = index + 1;
    const month = monthsByNumber.get(monthNo) || {};

    return {
      month: getMonthName(monthNo),
      publishedMaterialsCount: month.published_materials_count || 0,
      likesCount: month.likes_count || 0,
    };
  });
}

function buildSourceRows(discoverySources) {
  return (discoverySources?.sources || []).map((source) => ({
    label: source.label || source.key || "-",
    key: source.key || "-",
    usersCount: source.users_count || 0,
    percentage:
      discoverySources?.total_users_count > 0
        ? (Number(source.users_count || 0) / discoverySources.total_users_count) * 100
        : 0,
  }));
}

function buildGenderRows(gender) {
  return [
    {
      label: "الذكور",
      count: gender?.male?.count || 0,
      percentage: gender?.male?.percentage || 0,
    },
    {
      label: "الإناث",
      count: gender?.female?.count || 0,
      percentage: gender?.female?.percentage || 0,
    },
  ];
}

function exportLibraryCsv({ year, libraryStats }) {
  const discoverySources = libraryStats?.discovery_sources;
  const gender = libraryStats?.gender;
  const activity = libraryStats?.library_material_yearly_activity;
  const sourceRows = buildSourceRows(discoverySources);
  const genderRows = buildGenderRows(gender);
  const contentRows = normalizeContentMonths(activity?.months);

  const rows = [
    ["تقرير الإحصائيات العامة", year],
    [],
    ["مصادر معرفة المستخدمين بالتطبيق"],
    ["المصدر", "المفتاح", "عدد المستخدمين", "النسبة"],
    ...sourceRows.map((row) => [
      row.label,
      row.key,
      row.usersCount,
      formatPercent(row.percentage),
    ]),
    ["الإجمالي", "-", discoverySources?.total_users_count || 0, "100%"],
    [],
    ["توزيع الجمهور حسب الجنس"],
    ["الفئة", "عدد المستخدمين", "النسبة"],
    ...genderRows.map((row) => [row.label, row.count, formatPercent(row.percentage)]),
    ["الإجمالي", gender?.total_users_count || 0, "100%"],
    [],
    ["أداء نشر المحتوى السنوي"],
    ["الشهر", "عدد المواد المنشورة", "عدد الإعجابات"],
    ...contentRows.map((row) => [
      row.month,
      row.publishedMaterialsCount,
      row.likesCount,
    ]),
    [],
    ["إجماليات المحتوى"],
    ["المواد المنشورة", activity?.totals?.published_materials_count || 0],
    ["الإعجابات", activity?.totals?.likes_count || 0],
  ];

  const csvContent = rows
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");

  downloadBlob({
    content: `\uFEFF${csvContent}`,
    fileName: `library-stats-${year}.csv`,
    type: "text/csv;charset=utf-8;",
  });
}

function renderSourceRows(rows) {
  return rows
    .map(
      (row) => `
        <tr>
          <td>${row.label}</td>
          <td>${row.key}</td>
          <td>${formatNumber(row.usersCount)}</td>
          <td>${formatPercent(row.percentage)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderGenderRows(rows) {
  return rows
    .map(
      (row) => `
        <tr>
          <td>${row.label}</td>
          <td>${formatNumber(row.count)}</td>
          <td>${formatPercent(row.percentage)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderContentRows(rows) {
  return rows
    .map(
      (row) => `
        <tr>
          <td>${row.month}</td>
          <td>${formatNumber(row.publishedMaterialsCount)}</td>
          <td>${formatNumber(row.likesCount)}</td>
        </tr>
      `,
    )
    .join("");
}

function exportLibraryPdf({ year, libraryStats }) {
  const discoverySources = libraryStats?.discovery_sources;
  const gender = libraryStats?.gender;
  const activity = libraryStats?.library_material_yearly_activity;
  const sourceRows = buildSourceRows(discoverySources);
  const genderRows = buildGenderRows(gender);
  const contentRows = normalizeContentMonths(activity?.months);
  const printWindow = window.open("", "_blank", "width=1200,height=850");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>تقرير الإحصائيات العامة ${year}</title>
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
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin: 22px 0;
          }
          .card {
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
            color: #263238;
            font-size: 22px;
            line-height: 1.25;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
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
          th {
            background: #5583ff;
            color: #ffffff;
            font-size: 13px;
            padding: 12px 10px;
            text-align: center;
          }
          td {
            padding: 11px 10px;
            border-bottom: 1px solid #edf1f7;
            font-size: 13px;
            text-align: center;
          }
          tr:nth-child(even) td { background: #f8faff; }
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
              <h1>تقرير الإحصائيات العامة الخاصة بالتطبيق</h1>
            </div>
            <div class="year">${year}</div>
          </section>

          <section class="cards">
            <article class="card"><span>إجمالي المستخدمين</span><strong>${formatNumber(discoverySources?.total_users_count)}</strong></article>
            <article class="card"><span>عدد الذكور</span><strong>${formatNumber(gender?.male?.count)}</strong></article>
            <article class="card"><span>عدد الإناث</span><strong>${formatNumber(gender?.female?.count)}</strong></article>
            <article class="card"><span>المحتوى المنشور</span><strong>${formatNumber(activity?.totals?.published_materials_count)}</strong></article>
          </section>

          <section class="grid">
            <div class="section">
              <h2>كيف سمع المستخدمون عن التطبيق؟</h2>
              <table>
                <thead>
                  <tr>
                    <th>المصدر</th>
                    <th>المفتاح</th>
                    <th>عدد المستخدمين</th>
                    <th>النسبة</th>
                  </tr>
                </thead>
                <tbody>${renderSourceRows(sourceRows)}</tbody>
              </table>
            </div>

            <div class="section">
              <h2>توزيع الجمهور حسب الجنس</h2>
              <table>
                <thead>
                  <tr>
                    <th>الفئة</th>
                    <th>عدد المستخدمين</th>
                    <th>النسبة</th>
                  </tr>
                </thead>
                <tbody>${renderGenderRows(genderRows)}</tbody>
              </table>
            </div>
          </section>

          <section class="section">
            <h2>أداء نشر المحتوى السنوي</h2>
            <table>
              <thead>
                <tr>
                  <th>الشهر</th>
                  <th>عدد المواد المنشورة</th>
                  <th>عدد الإعجابات</th>
                </tr>
              </thead>
              <tbody>${renderContentRows(contentRows)}</tbody>
            </table>
          </section>

          <div class="footer">Generated from dashboard library stats</div>
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

export default function HomeLibraryStatsExportButton({
  year,
  libraryStats,
  disabled = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isDisabled = disabled || !libraryStats;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCsvExport = () => {
    exportLibraryCsv({ year, libraryStats });
    handleClose();
  };

  const handlePdfExport = () => {
    exportLibraryPdf({ year, libraryStats });
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

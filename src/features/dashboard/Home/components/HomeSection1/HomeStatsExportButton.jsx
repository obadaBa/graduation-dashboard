import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const exportMonthLabels = {
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

function buildExportRows({ testsSeries, stackedSeries }) {
  const downloadsSeries = stackedSeries.find((item) => item.key === "downloads");
  const reviewsSeries = stackedSeries.find((item) => item.key === "reviews");
  const likesSeries = stackedSeries.find((item) => item.key === "likes");

  return Array.from({ length: 12 }, (_, index) => ({
    month: exportMonthLabels[index + 1],
    publishedTests: testsSeries.values[index] || 0,
    downloads: downloadsSeries?.values[index] || 0,
    reviews: reviewsSeries?.values[index] || 0,
    likes: likesSeries?.values[index] || 0,
  }));
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

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function exportChartCsv({ year, rows }) {
  const headers = [
    "الشهر",
    "عدد الاختبارات المنشورة",
    "عدد التنزيلات",
    "عدد التعليقات",
    "عدد الاعجابات",
  ];
  const csvRows = [
    headers,
    ...rows.map((row) => [
      row.month,
      row.publishedTests,
      row.downloads,
      row.reviews,
      row.likes,
    ]),
  ];
  const csvContent = csvRows
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");

  downloadBlob({
    content: `\uFEFF${csvContent}`,
    fileName: `yearly-test-activity-${year}.csv`,
    type: "text/csv;charset=utf-8;",
  });
}

function exportChartPdf({ year, rows }) {
  const totals = rows.reduce(
    (acc, row) => ({
      publishedTests: acc.publishedTests + row.publishedTests,
      downloads: acc.downloads + row.downloads,
      reviews: acc.reviews + row.reviews,
      likes: acc.likes + row.likes,
    }),
    { publishedTests: 0, downloads: 0, reviews: 0, likes: 0 },
  );
  const tableRows = rows
    .map(
      (row) => `
        <tr>
          <td>${row.month}</td>
          <td>${row.publishedTests}</td>
          <td>${row.downloads}</td>
          <td>${row.reviews}</td>
          <td>${row.likes}</td>
        </tr>
      `,
    )
    .join("");
  const printWindow = window.open("", "_blank", "width=1100,height=800");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>أداء نشر الاختبارات السنوي ${year}</title>
        <style>
          @page { size: A4 landscape; margin: 14mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Tahoma", "Arial", sans-serif;
            color: #263238;
            background: #f5f7fb;
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
            padding-bottom: 20px;
            border-bottom: 2px solid #e7ecf7;
          }
          .brand {
            color: #5583ff;
            font-weight: 800;
            font-size: 18px;
          }
          h1 {
            margin: 8px 0 0;
            font-size: 28px;
            line-height: 1.4;
          }
          .year {
            min-width: 120px;
            border-radius: 14px;
            background: #eef4ff;
            color: #315edb;
            padding: 12px 18px;
            text-align: center;
            font-size: 22px;
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
            border-radius: 14px;
            background: #ffffff;
            padding: 14px;
            box-shadow: 0 8px 20px rgba(31, 42, 55, 0.06);
          }
          .card span {
            display: block;
            color: #7a8798;
            font-size: 13px;
            margin-bottom: 8px;
          }
          .card strong {
            font-size: 22px;
            color: #263238;
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
            font-size: 14px;
            padding: 13px 12px;
            text-align: center;
          }
          td {
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #edf1f7;
            font-size: 14px;
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
              <h1>تقرير أداء نشر الاختبارات السنوي</h1>
            </div>
            <div class="year">${year}</div>
          </section>
          <section class="cards">
            <div class="card"><span>إجمالي الاختبارات</span><strong>${totals.publishedTests}</strong></div>
            <div class="card"><span>إجمالي التنزيلات</span><strong>${totals.downloads}</strong></div>
            <div class="card"><span>إجمالي التعليقات</span><strong>${totals.reviews}</strong></div>
            <div class="card"><span>إجمالي الاعجابات</span><strong>${totals.likes}</strong></div>
          </section>
          <table>
            <thead>
              <tr>
                <th>الشهر</th>
                <th>عدد الاختبارات المنشورة</th>
                <th>عدد التنزيلات</th>
                <th>عدد التعليقات</th>
                <th>عدد الاعجابات</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="footer">Generated from dashboard data</div>
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

export default function HomeStatsExportButton({ year, testsSeries, stackedSeries }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const exportRows = buildExportRows({ testsSeries, stackedSeries });
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCsvExport = () => {
    exportChartCsv({ year, rows: exportRows });
    handleClose();
  };

  const handlePdfExport = () => {
    exportChartPdf({ year, rows: exportRows });
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        sx={{
          height: 42,
          minWidth: 164,
          borderRadius: "12px",
          bgcolor: (theme) => theme.palette.dashboard.logoPrimary,
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 12px 26px rgba(64, 112, 255, 0.24)"
              : "0 4px 14px rgba(85, 131, 255, 0.28)",
          fontSize: 16,
          fontWeight: 600,
          justifyContent: "center",
          gap: 0.75,
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.logoPrimary,
          },
          "& .MuiButton-endIcon": {
            m: 0,
          },
        }}
      >
        تصدير المخطط
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
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 14px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 24px rgba(15, 23, 42, 0.12)",
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

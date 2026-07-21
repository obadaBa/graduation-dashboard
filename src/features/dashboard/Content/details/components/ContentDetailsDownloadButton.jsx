import { Button } from "@mui/material";

function formatReportNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatReportDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isImageAsset(asset, contentType) {
  return (
    contentType === "صورة" ||
    asset?.mime_type?.startsWith?.("image/") ||
    /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(asset?.url || "")
  );
}

function getAssetName(asset, index) {
  return asset?.original_name || asset?.name || `وسيط ${index + 1}`;
}

function buildContentPdfHtml(contentDetails) {
  const publisher = contentDetails?.publisher || {};
  const content = contentDetails?.content || {};
  const statistics = contentDetails?.statistics || {};
  const assets = Array.isArray(content.assets) ? content.assets : [];
  const title = content.title || "محتوى منشور";
  const assetCards = assets.length
    ? assets
        .map((asset, index) => {
          const assetName = escapeHtml(getAssetName(asset, index));
          const assetUrl = asset?.url || "";

          if (isImageAsset(asset, content.type) && assetUrl) {
            return `
              <article class="asset asset-image">
                <div class="asset-head">
                  <span>${assetName}</span>
                  <strong>صورة</strong>
                </div>
                <img src="${escapeHtml(assetUrl)}" alt="${assetName}" />
              </article>
            `;
          }

          return `
            <article class="asset asset-file">
              <div class="file-icon">PDF</div>
              <div>
                <h3>${assetName}</h3>
                <p>ملف مرفق ضمن الوسائط المنشورة من المستخدم.</p>
                ${
                  assetUrl
                    ? `<a href="${escapeHtml(assetUrl)}" target="_blank" rel="noreferrer">فتح الملف الأصلي</a>`
                    : ""
                }
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty">لا توجد وسائط مرفقة ضمن هذا المحتوى.</div>`;
  const interests = (content.interests || [])
    .map((interest) => `<span class="tag"># ${escapeHtml(interest)}</span>`)
    .join("");

  return `
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)} - PDF</title>
        <style>
          @page { size: A4; margin: 14mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Tahoma", "Arial", sans-serif;
            color: #1f2937;
            background: #f4f7fb;
          }
          .report {
            min-height: 100vh;
            padding: 26px;
            background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 20px;
            padding-bottom: 18px;
            border-bottom: 2px solid #e5ebf6;
          }
          .brand {
            color: #5c84ff;
            font-size: 15px;
            font-weight: 800;
            margin-bottom: 8px;
          }
          h1 {
            margin: 0;
            font-size: 26px;
            line-height: 1.45;
          }
          .meta {
            min-width: 190px;
            border-radius: 14px;
            background: #eef4ff;
            color: #315edb;
            padding: 12px 16px;
            font-size: 13px;
            font-weight: 700;
            line-height: 1.9;
          }
          .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 20px 0;
          }
          .stat {
            border: 1px solid #e5ebf6;
            border-radius: 12px;
            background: #ffffff;
            padding: 12px;
          }
          .stat span {
            display: block;
            color: #7a8798;
            font-size: 12px;
            margin-bottom: 6px;
          }
          .stat strong {
            color: #1f2937;
            font-size: 20px;
          }
          .section {
            border: 1px solid #e5ebf6;
            border-radius: 14px;
            background: #ffffff;
            padding: 16px;
            margin-top: 14px;
            break-inside: avoid;
          }
          h2 {
            margin: 0 0 10px;
            font-size: 19px;
          }
          p {
            margin: 0;
            color: #566273;
            font-size: 14px;
            line-height: 1.8;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
          }
          .tag {
            border-radius: 8px;
            background: #eef4ff;
            color: #4f78ef;
            padding: 6px 10px;
            font-size: 12px;
            font-weight: 800;
          }
          .assets {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .asset {
            border: 1px solid #e6ebf3;
            border-radius: 12px;
            background: #fbfcff;
            overflow: hidden;
            break-inside: avoid;
          }
          .asset-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-bottom: 1px solid #e6ebf3;
            color: #566273;
            font-size: 12px;
            font-weight: 700;
          }
          .asset-head span {
            min-width: 0;
            overflow-wrap: anywhere;
          }
          .asset-head strong {
            color: #5c84ff;
            white-space: nowrap;
          }
          .asset img {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            display: block;
            background: #f2f5fb;
          }
          .asset-file {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px;
          }
          .file-icon {
            width: 58px;
            height: 58px;
            border-radius: 12px;
            background: #5c84ff;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 900;
            flex-shrink: 0;
          }
          h3 {
            margin: 0 0 6px;
            font-size: 15px;
            overflow-wrap: anywhere;
          }
          a {
            display: inline-block;
            margin-top: 8px;
            color: #315edb;
            font-weight: 800;
            text-decoration: none;
          }
          .empty {
            border: 1px dashed #cbd5e1;
            border-radius: 12px;
            color: #7a8798;
            padding: 18px;
            text-align: center;
            font-weight: 700;
          }
          .footer {
            margin-top: 18px;
            color: #8b96a8;
            font-size: 11px;
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
              <h1>${escapeHtml(title)}</h1>
            </div>
            <div class="meta">
              <div>الناشر: ${escapeHtml(publisher.name || "-")}</div>
              <div>النوع: ${escapeHtml(content.type || "-")}</div>
              <div>تاريخ النشر: ${escapeHtml(formatReportDate(content.created_at || content.published_at))}</div>
            </div>
          </section>

          <section class="summary">
            <div class="stat"><span>عدد الوسائط</span><strong>${formatReportNumber(content.asset_count ?? assets.length)}</strong></div>
            <div class="stat"><span>الإعجابات</span><strong>${formatReportNumber(statistics.like_count)}</strong></div>
            <div class="stat"><span>الحفظ</span><strong>${formatReportNumber(statistics.bookmarks_count)}</strong></div>
            <div class="stat"><span>التنزيلات</span><strong>${formatReportNumber(statistics.download_count)}</strong></div>
          </section>

          <section class="section">
            <h2>تفاصيل المحتوى</h2>
            <p>${escapeHtml(content.description || "-")}</p>
            <div class="tags">
              <span class="tag">${escapeHtml(content.target_level || "-")}</span>
              ${interests}
            </div>
          </section>

          <section class="section">
            <h2>الوسائط المنشورة</h2>
            <div class="assets">${assetCards}</div>
          </section>

          <div class="footer">Generated from dashboard content details</div>
        </main>
        <script>
          window.addEventListener("load", () => {
            setTimeout(() => window.print(), 500);
          });
        </script>
      </body>
    </html>
  `;
}

function exportContentPdf(contentDetails) {
  const printWindow = window.open("", "_blank", "width=1100,height=800");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(buildContentPdfHtml(contentDetails));
  printWindow.document.close();
}

export default function ContentDetailsDownloadButton({ contentDetails }) {
  const handleDownloadContent = () => {
    if (!contentDetails) {
      return;
    }

    exportContentPdf(contentDetails);
  };

  return (
    <Button
      type="button"
      onClick={handleDownloadContent}
      disabled={!contentDetails}
      sx={{
        minWidth: 132,
        height: 36,
        px: 2,
        marginInlineStart: { xs: 0, lg: "auto" },
        borderRadius: "8px",
        bgcolor: "#5C84FF",
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: 700,
        boxShadow: "0 8px 16px rgba(92, 132, 255, 0.28)",
        "&:hover": {
          bgcolor: "#5C84FF",
        },
        "&.Mui-disabled": {
          bgcolor: "#5C84FF",
          color: "#FFFFFF",
          opacity: 0.55,
        },
      }}
    >
      تنزيل المحتوى
    </Button>
  );
}

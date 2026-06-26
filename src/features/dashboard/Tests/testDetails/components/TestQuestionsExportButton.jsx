import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fileName(value) {
  return String(value || "اختبار")
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function questionsHtml(questions) {
  return questions
    .map((question, index) => {
      const options = (question.options || [])
        .map(
          (option) => `
            <li class="${option.is_correct ? "correct" : ""}">
              <b>${escapeHtml(option.position)}.</b>
              <span>${escapeHtml(option.option_text)}</span>
              ${option.is_correct ? "<em>الإجابة الصحيحة</em>" : ""}
            </li>`,
        )
        .join("");

      return `
        <section class="question">
          <div class="number">السؤال ${escapeHtml(question.position || index + 1)}</div>
          <h2>${escapeHtml(question.question_text)}</h2>
          ${
            question.hint_text
              ? `<div class="hint"><b>التلميح:</b> ${escapeHtml(question.hint_text)}</div>`
              : ""
          }
          <ul>${options}</ul>
        </section>`;
    })
    .join("");
}

function documentHtml(title, questions) {
  return `<!doctype html>
  <html lang="ar" dir="rtl">
    <head>
      <meta charset="utf-8">
      <title>${escapeHtml(title)}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        * { box-sizing: border-box; }
        body { margin:0; font-family:Tahoma,Arial,sans-serif; color:#263238; background:#eef3ff; direction:rtl; }
        main { max-width:900px; margin:auto; padding:28px; background:#fff; }
        header { margin-bottom:22px; padding:20px 24px; border-right:6px solid #5583ff; background:#f3f6ff; }
        .brand,.number { color:#5583ff; font-weight:700; }
        h1 { margin:8px 0; font-size:25px; }
        .summary { color:#6b7280; font-size:13px; }
        .question { margin-bottom:18px; padding:18px; border:1px solid #dfe5f0; border-radius:10px; page-break-inside:avoid; }
        h2 { margin:10px 0; font-size:17px; line-height:1.8; }
        .hint { margin:10px 0; padding:10px 12px; border-radius:7px; color:#725d00; background:#fff9dc; font-size:13px; }
        ul { margin:12px 0 0; padding:0; list-style:none; }
        li { display:flex; gap:9px; margin-top:8px; padding:10px 12px; border:1px solid #e3e6eb; border-radius:7px; color:#4b5563; background:#f8fafc; font-size:13px; line-height:1.7; }
        li.correct { border-color:#36c957; color:#176b2b; background:#ecfff0; }
        li em { margin-right:auto; color:#159333; font-size:11px; font-style:normal; white-space:nowrap; }
        footer { margin-top:20px; padding-top:12px; border-top:1px solid #e5e7eb; color:#8a94a3; font-size:11px; text-align:center; }
        @media print { body { background:#fff; } main { max-width:none; padding:0; } }
      </style>
    </head>
    <body>
      <main>
        <header>
          <div class="brand">Nerd Dashboard</div>
          <h1>${escapeHtml(title)}</h1>
          <div class="summary">عدد الأسئلة: ${questions.length}</div>
        </header>
        ${questionsHtml(questions)}
        <footer>تم إنشاء الملف من لوحة إدارة الاختبارات</footer>
      </main>
    </body>
  </html>`;
}

function exportWord(title, questions) {
  const blob = new Blob(["\uFEFF", documentHtml(title, questions)], {
    type: "application/msword;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName(title)}.doc`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportPdf(title, questions) {
  const printWindow = window.open("", "_blank", "width=1000,height=850");
  if (!printWindow) return;

  printWindow.document.write(
    `${documentHtml(title, questions)}<script>window.addEventListener("load",()=>window.print());</script>`,
  );
  printWindow.document.close();
}

export default function TestQuestionsExportButton({
  title,
  questions = [],
  disabled = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isDisabled = disabled || questions.length === 0;

  const handleExport = (type) => {
    if (type === "pdf") exportPdf(title, questions);
    else exportWord(title, questions);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<DownloadRoundedIcon />}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        sx={{
          minWidth: 138,
          height: 39,
          px: 2,
          marginInlineStart: "auto",
          borderRadius: "8px",
          bgcolor: (theme) => theme.palette.dashboard.logoPrimary,
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: 800,
          boxShadow: "0 8px 16px rgba(92, 132, 255, 0.28)",
          "&:hover": { bgcolor: (theme) => theme.palette.dashboard.logoPrimary },
          "&.Mui-disabled": {
            bgcolor: "rgba(92, 132, 255, 0.45)",
            color: "#FFFFFF",
          },
          "& .MuiButton-startIcon": {
            marginInlineStart: 0,
            marginInlineEnd: "8px",
          },
          "& .MuiButton-endIcon": {
            marginInlineStart: "6px",
            marginInlineEnd: 0,
          },
        }}
      >
        تنزيل الاختبار
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 145,
            borderRadius: "10px",
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            color: (theme) => theme.palette.dashboard.textPrimary,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            direction: "rtl",
          },
        }}
      >
        <MenuItem onClick={() => handleExport("pdf")}>PDF</MenuItem>
        <MenuItem onClick={() => handleExport("word")}>Word</MenuItem>
      </Menu>
    </>
  );
}

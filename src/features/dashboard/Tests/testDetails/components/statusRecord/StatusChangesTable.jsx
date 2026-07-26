import { Box, Stack, Typography } from "@mui/material";

const columns = [
  { key: "id", label: "رقم التعديل", width: "12%" },
  { key: "type", label: "نوع التعديل", width: "16%" },
  { key: "question", label: "رقم السؤال", width: "12%" },
  { key: "answer", label: "رقم الإجابة", width: "12%" },
  { key: "oldValue", label: "النسخة القديمة", width: "24%" },
  { key: "newValue", label: "النسخة الجديدة", width: "24%" },
];

export default function StatusChangesTable({ changes = [] }) {
  const rows = changes.map((change, index) => ({
    id: change.change_no || index + 1,
    type: change.revision_type || "-",
    question: change.question_position ?? "-",
    answer: change.option_position ?? "-",
    oldValue: change.before_value || "-",
    newValue: change.after_value || "-",
  }));
  const gridTemplateColumns = columns.map((column) => column.width).join(" ");

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        borderRadius: "8px",
        overflow: "auto",
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
      }}
    >
      <Stack
        direction="row"
        spacing={0.6}
        alignItems="center"
        justifyContent="flex-start"
        sx={{ px: 1.5, py: 1.25, direction: "rtl" }}
        gap={1}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          جدول التعديلات التي قام بها المستخدم
        </Typography>
        <Box
          sx={{
            minWidth: 24,
            height: 16,
            px: 0.8,
            borderRadius: "999px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          {rows.length}
        </Box>
      </Stack>

      <Box sx={{ minWidth: 720 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns,
            bgcolor: (theme) => theme.palette.dashboard.surface,
            borderTop: (theme) => `1px solid ${theme.palette.dashboard.divider}`,
          }}
        >
          {columns.map((column) => (
            <Typography
              key={column.key}
              sx={{
                py: 1.15,
                px: 1,
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {column.label}
            </Typography>
          ))}
        </Box>

        {rows.map((change) => (
          <Box
            key={change.id}
            sx={{
              display: "grid",
              gridTemplateColumns,
              borderTop: (theme) => `1px solid ${theme.palette.dashboard.divider}`,
            }}
          >
            {columns.map((column) => (
              <Typography
                key={column.key}
                sx={{
                  py: 1.5,
                  px: 1,
                  color: (theme) =>
                    column.key === "id"
                      ? theme.palette.dashboard.textPrimary
                      : theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: column.key === "id" ? 800 : 600,
                  textAlign: "center",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {change[column.key]}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

import { Box, Button, Stack, Typography } from "@mui/material";

const columns = [
  { key: "id", label: "رقم التعديل", width: "14%" },
  { key: "type", label: "نوع التعديل", width: "19%" },
  { key: "question", label: "رقم السؤال", width: "15%" },
  { key: "answer", label: "رقم الإجابة", width: "15%" },
  { key: "reason", label: "السبب", width: "37%" },
];

export default function RequiredChangesTable({
  requests = [],
  onEdit,
  isEditing = false,
}) {
  const rows = requests.map((request, index) => ({
    id: request.revision_no || index + 1,
    type: request.revision_type || "-",
    question: request.question_position ?? "-",
    answer: request.option_position ?? "-",
    reason: request.problem_note || "-",
  }));
  const gridTemplateColumns = columns.map((column) => column.width).join(" ");

  return (
    <Box
      sx={{
        mt: 2.4,
        width: "100%",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        borderRadius: "8px",
        overflow: "auto",
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 1.2, direction: "rtl" }}
      >
        <Stack direction="row" spacing={0.65} alignItems="center">
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            جدول التعديلات المطلوبة
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

        <Button
          onClick={onEdit}
          disabled={isEditing}
          sx={{
            minWidth: 72,
            height: 24,
            px: 1.6,
            borderRadius: "999px",
            border: "1px solid #FFC107",
            color: "#F2A900",
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            fontSize: 12,
            fontWeight: 800,
            "&.Mui-disabled": {
              color: "#F2A900",
              opacity: 0.55,
            },
          }}
        >
          {isEditing ? "جاري الحفظ..." : "تعديل"}
        </Button>
      </Stack>

      <Box sx={{ minWidth: 660 }}>
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
                  py: 1.45,
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

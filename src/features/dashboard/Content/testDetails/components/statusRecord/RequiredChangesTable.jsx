import { Box, Button, Stack, Typography } from "@mui/material";

const requiredChanges = [
  {
    id: 1,
    type: "نص السؤال",
    question: "12",
    reason: "السؤال الخامس يحتوي على خطأ كذا",
  },
  {
    id: 2,
    type: "نص الإجابة",
    question: "8",
    reason: "نص الإجابة خاطئة",
  },
  {
    id: 3,
    type: "التلميح",
    question: "15",
    reason: "تلميح خاطئ",
  },
  {
    id: 4,
    type: "الوصف",
    question: "-",
    reason: "سيء زمنيا للطائفة المنصورية",
  },
  {
    id: 5,
    type: "مرفق السؤال",
    question: "27",
    reason: "الصورة غير واضحة",
  },
];

const columns = [
  { key: "id", label: "رقم التعديل", width: "16%" },
  { key: "type", label: "نوع التعديل", width: "22%" },
  { key: "question", label: "رقم السؤال", width: "18%" },
  { key: "reason", label: "السبب", width: "44%" },
];

export default function RequiredChangesTable() {
  const gridTemplateColumns = columns.map((column) => column.width).join(" ");

  return (
    <Box
      sx={{
        mt: 2.4,
        width: "100%",
        border: "1px solid #E4E4E4",
        borderRadius: "8px",
        overflow: "hidden",
        bgcolor: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 1.2, direction: "rtl" }}
      >
        <Stack direction="row" spacing={0.65} alignItems="center">
          <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 900 }}>
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
            12
          </Box>
        </Stack>

        <Button
          sx={{
            minWidth: 72,
            height: 24,
            px: 1.6,
            borderRadius: "999px",
            border: "1px solid #FFC107",
            color: "#F2A900",
            bgcolor: "#FFFFFF",
            fontSize: 12,
            fontWeight: 800,
            "&:hover": {
              bgcolor: "#FFF8E1",
              borderColor: "#FFC107",
            },
          }}
        >
          تعديل
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns,
          bgcolor: "#F8F8F8",
          borderTop: "1px solid #F1F1F1",
        }}
      >
        {columns.map((column) => (
          <Typography
            key={column.key}
            sx={{
              py: 1.15,
              px: 1,
              color: "#9A9A9A",
              fontSize: 13,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {column.label}
          </Typography>
        ))}
      </Box>

      {requiredChanges.map((change) => (
        <Box
          key={change.id}
          sx={{
            display: "grid",
            gridTemplateColumns,
            borderTop: "1px solid #F1F1F1",
          }}
        >
          {columns.map((column) => (
            <Typography
              key={column.key}
              sx={{
                py: 1.45,
                px: 1,
                color: column.key === "id" ? "#263238" : "#4B4B4B",
                fontSize: 13,
                fontWeight: column.key === "id" ? 800 : 600,
                textAlign: "center",
                whiteSpace: "normal",
              }}
            >
              {change[column.key]}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}

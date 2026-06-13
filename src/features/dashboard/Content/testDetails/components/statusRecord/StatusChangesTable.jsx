import { Box, Stack, Typography } from "@mui/material";

const changes = [
  {
    id: 1,
    type: "سؤال",
    question: "12",
    oldValue: "تيست",
    newValue: "تيست واحد",
  },
  {
    id: 2,
    type: "إجابة",
    question: "13",
    oldValue: "عنصر المصفوفة",
    newValue: "عناصر الودجت",
  },
  {
    id: 3,
    type: "التلميح",
    question: "27",
    oldValue: "بسبب هادي",
    newValue: "بسبب عبيدة",
  },
  {
    id: 4,
    type: "الوصف",
    question: "-",
    oldValue: "المصريين مو حلوين",
    newValue: "المصريين حلوين",
  },
];

const columns = [
  { key: "id", label: "رقم التعديل", width: "16%" },
  { key: "type", label: "نوع التعديل", width: "18%" },
  { key: "question", label: "رقم السؤال", width: "16%" },
  { key: "oldValue", label: "النسخة القديمة", width: "25%" },
  { key: "newValue", label: "النسخة الجديدة", width: "25%" },
];

export default function StatusChangesTable() {
  const gridTemplateColumns = columns.map((column) => column.width).join(" ");

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        border: "1px solid #E4E4E4",
        borderRadius: "8px",
        overflow: "hidden",
        bgcolor: "#FFFFFF",
      }}
    >
      <Stack
        direction="row"
        spacing={0.6}
        alignItems="center"
        justifyContent="flex-start"
        sx={{ px: 1.5, py: 1.25, direction: "rtl" }}
      >
        <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 900 }}>
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
          12
        </Box>
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

      {changes.map((change) => (
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
                py: 1.5,
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

import { Box, Typography } from "@mui/material";
import StatusDetailsShell from "./StatusDetailsShell";
import StatusOwnerBlock from "./StatusOwnerBlock";
import StatusTimeBlock from "./StatusTimeBlock";

export default function DeletedStatusDetails() {
  return (
    <StatusDetailsShell>
      <Box
        sx={{
          mt: 2.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
        }}
      >
        <StatusOwnerBlock />
        <StatusTimeBlock />
      </Box>

      <Box sx={{ mt: 4.6, textAlign: "right" }}>
        <Typography sx={{ color: "#263238", fontSize: 21, fontWeight: 900 }}>
          سبب الحذف
        </Typography>
        <Typography
          sx={{
            mt: 1,
            color: "#8F8F8F",
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.8,
          }}
        >
          الاختبار ينتهك سياسة خصوصية التطبيق ولا يراعي شروط الاداب العامة حيث يحتوي على تحريض طائفي
        </Typography>
      </Box>
    </StatusDetailsShell>
  );
}

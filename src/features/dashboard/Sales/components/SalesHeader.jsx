import { Box, Typography } from "@mui/material";
import SalesExportButton from "./SalesExportButton";

export default function SalesHeader({
  salesQuery,
  period,
  sortBy,
  customRange,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 3,
        direction: "rtl",
      }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 28,
            fontWeight: 900,
            lineHeight: 1.35,
          }}
        >
          قائمة سجل{" "}
          <Box component="span" sx={{ color: "#5C84FF" }}>
            المبيعات
          </Box>
        </Typography>
        <Typography
          sx={{
            mt: 1.1,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 1.75,
            maxWidth: 560,
          }}
        >
          كل ما يتعلق بعمليات الشراء التي حدثت داخل التطبيق
          <br />
          موجودة هنا ويمكن إدارتها بسهولة
        </Typography>
      </Box>

      <SalesExportButton
        salesQuery={salesQuery}
        period={period}
        sortBy={sortBy}
        customRange={customRange}
      />
    </Box>
  );
}

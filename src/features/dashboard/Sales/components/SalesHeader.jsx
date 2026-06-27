import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Box, Button, Typography } from "@mui/material";

export default function SalesHeader() {
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
            color: "#263238",
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
            color: "#A0A0A0",
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 1.75,
            maxWidth: 560,
          }}
        >
          كل مايتعلق بعمليات الشراء التي حدثت داخل التطبيق
          <br />
          موجودة هنا ويمكن ادارتها بسهولة
        </Typography>
      </Box>

      <Button
        startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 20 }} />}
        sx={{
          mt: 1.3,
          ml:3,
          minWidth: 198,
          height: 42,
          px: 2.2,
          borderRadius: "6px",
          bgcolor: "#5C84FF",
          color: "#FFFFFF",
          fontSize: 15,
          fontWeight: 800,
          boxShadow: "0 6px 14px rgba(92, 132, 255, 0.28)",
          whiteSpace: "nowrap",
          "&:hover": {
            bgcolor: "#5C84FF",
            boxShadow: "0 6px 14px rgba(92, 132, 255, 0.28)",
          },
          "& .MuiButton-startIcon": {
            marginInlineStart: 0,
            marginInlineEnd: "7px",
          },
        }}
      >
        تحميل تقرير المبيعات
      </Button>
    </Box>
  );
}

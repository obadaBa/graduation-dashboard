import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TestsSubmissionsModal from "./TestsSubmissionsModal";

export default function TestsHeader() {
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: { xs: "flex-start", md: "flex-start" },
          justifyContent: "flex-end",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}
      >
        {/* <Stack
          component="button"
          type="button"
          onClick={() => setIsSubmissionsOpen(true)}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: "relative",
            mt: { xs: 0, md: 0.8 },
            minWidth: 150,
            height: 42,
            px: 2.4,
            border: "1px solid #ECECEC",
            borderRadius: "9px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
            color: "#263238",
            font: "inherit",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -8,
              left: -7,
              width: 18,
              height: 18,
              borderRadius: "50%",
              bgcolor: "#FF6B6B",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              boxShadow: "0 0 0 2px #FFFFFF",
            }}
          >
            12
          </Box>

          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            قائمة المشاركات
          </Typography>
        </Stack> */}

        <Box sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: { xs: 28, md: 34 },
              fontWeight: 800,
              lineHeight: 1.25,
            }}
          >
            طلبات مراجعة
            <Box
              component="span"
              sx={{ color: (theme) => theme.palette.dashboard.logoPrimary }}
            >
              {" "}الاختبارات
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1.4,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: { xs: 14, md: 17 },
              fontWeight: 500,
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            كل ما يتعلق بعملية نشر الاختبارات من تطبيق الموبايل
            <br />
            ستجده هنا لتقوم بالمراجعة المناسبة حسب الحالة
          </Typography>
        </Box>
      </Box>

      <TestsSubmissionsModal
        open={isSubmissionsOpen}
        onClose={() => setIsSubmissionsOpen(false)}
      />
    </>
  );
}

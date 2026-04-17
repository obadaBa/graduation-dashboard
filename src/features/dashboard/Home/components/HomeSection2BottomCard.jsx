import { Box, Stack, Typography } from "@mui/material";

function RankingItem({ rank, month, value, unit }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ py: 0.8 }}
    >
      <Typography
        sx={{
          color: "#4D8BFF",
          fontSize: 18,
          fontWeight: 700,
          px: 0.55,
          py: 0.15,
          lineHeight: 1.35,
        }}
      >
        #{rank}
      </Typography>

      <Typography sx={{ color: "#263238", fontSize: 18, fontWeight: 600 }}>
        {month}
      </Typography>

      <Stack direction="row" spacing={0.75} alignItems="baseline">
        <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography sx={{ color: "#8A8A8A", fontSize: 14, fontWeight: 500 }}>
          {unit}
        </Typography>
      </Stack>
    </Stack>
  );
}

function RankingList({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 4,
          bottom: 4,
          right: -4,
          width: 32,
          borderRadius: "8px",
          bgcolor: "#EEF2FF",
          zIndex: 0,
        },
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default function HomeSection2BottomCard({ ticketCard }) {
  return (
    <Box
      sx={{
        mt: 0,
        transform: { xs: "translateY(-24px)", lg: "translateY(-28px)" },
        borderRadius: "18px",
        border: "1px solid #ECECEC",
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
        px: { xs: 1.5, md: 2.5 },
        py: 2.3,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.72fr 0.72fr 1.95fr" },
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            borderLeft: { lg: "1px solid #DFDFDF" },
            pl: { lg: 2 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#263238",
              fontSize: 18,
              fontWeight: 700,
              textAlign: "right",
            }}
          >
            الأشهر الأكثر مبيعًا
          </Typography>
          <Typography
            sx={{
              color: "#4D8BFF",
              fontSize: 18,
              fontWeight: 700,
              textAlign: "right",
              mb: 1,
            }}
          >
            للاختبارات
          </Typography>

          <RankingList>
            <RankingItem rank={1} month="نيسان" value="134" unit="اختبارًا" />
            <RankingItem rank={2} month="أيار" value="78" unit="اختبارًا" />
            <RankingItem rank={3} month="كانون الثاني" value="24" unit="اختبارًا" />
          </RankingList>
        </Box>

        <Box
          sx={{
            borderLeft: { lg: "1px solid #DFDFDF" },
            pl: { lg: 2 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#263238",
              fontSize: 18,
              fontWeight: 700,
              textAlign: "right",
            }}
          >
            الأشهر الأكثر تحقيقًا للربح
          </Typography>
          <Typography
            sx={{
              color: "#4D8BFF",
              fontSize: 18,
              fontWeight: 700,
              textAlign: "right",
              mb: 1,
            }}
          >
            من الاختبارات
          </Typography>

          <RankingList>
            <RankingItem rank={1} month="نيسان" value="2400" unit="ل.س" />
            <RankingItem rank={2} month="أيار" value="1500" unit="ل.س" />
            <RankingItem rank={3} month="كانون الثاني" value="800" unit="ل.س" />
          </RankingList>
        </Box>

        <Box sx={{ pr: { lg: 0 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 1.5 }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#4D8BFF", fontSize: 18, fontWeight: 700 }}>
                الاختبار الأكثر شراءًا من المستخدمين
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.75} alignItems="baseline">
              <Typography sx={{ color: "#263238", fontSize: 18, fontWeight: 700 }}>
                230
              </Typography>
              <Typography sx={{ color: "#6B7280", fontSize: 16, fontWeight: 500 }}>
                مرة
              </Typography>
            </Stack>
          </Stack>
          {ticketCard}
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Stack, Typography } from "@mui/material";

function RankingItem({ rank, month, value, unit }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ py: { xs: 0.35, sm: 0.7, lg: 0.8 }, gap: { xs: 0.45, sm: 1 } }}
    >
      <Typography
        sx={{
          color: "#4D8BFF",
          fontSize: { xs: 12, sm: 16, lg: 18 },
          fontWeight: 700,
          px: 0.55,
          py: 0.15,
          lineHeight: 1.35,
        }}
      >
        #{rank}
      </Typography>

      <Typography
        sx={{
          color: "#263238",
          fontSize: { xs: 11.5, sm: 16, lg: 18 },
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {month}
      </Typography>

      <Stack direction="row" spacing={0.6} alignItems="baseline">
        <Typography sx={{ color: "#263238", fontSize: { xs: 11.5, sm: 15, lg: 16 }, fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography sx={{ color: "#8A8A8A", fontSize: { xs: 9.5, sm: 13, lg: 14 }, fontWeight: 500 }}>
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
          width: { xs: 21, sm: 25, lg: 32 },
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

function ResponsiveCard({ children, isScrollableItem = false, sx }) {
  return (
    <Box
      sx={{
        width: isScrollableItem
          ? { xs: 188, sm: 250, md: 280, lg: "100%" }
          : { xs: "92%", sm: "94%", md: "96%", lg: "100%" },
        minWidth: isScrollableItem ? { xs: 188, sm: 250, md: 280, lg: 0 } : 0,
        flexShrink: isScrollableItem ? 0 : 1,
        justifySelf: "center",
        borderRadius: { xs: "14px", sm: "16px", lg: 0 },
        border: { xs: "1px solid #ECECEC", lg: 0 },
        bgcolor: "#FFFFFF",
        boxShadow: { xs: "0 4px 14px rgba(15, 23, 42, 0.05)", lg: "none" },
        p: { xs: 1, sm: 2, lg: 0 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function RankingCard({ title, subtitle, children, sx }) {
  return (
    <ResponsiveCard
      isScrollableItem
      sx={{
        borderLeft: { lg: "1px solid #DFDFDF" },
        pl: { lg: 2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: "#263238",
          fontSize: { xs: 11.5, sm: 16, lg: 18 },
          fontWeight: 700,
          textAlign: "right",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "#4D8BFF",
          fontSize: { xs: 11.5, sm: 16, lg: 18 },
          fontWeight: 700,
          textAlign: "right",
          mb: 1,
        }}
      >
        {subtitle}
      </Typography>

      <RankingList>{children}</RankingList>
    </ResponsiveCard>
  );
}

export default function HomeSection2BottomCard({ ticketCard }) {
  return (
    <Box
      sx={{
        mt: { xs: 2, lg: 0 },
        transform: { xs: "none", lg: "translateY(-28px)" },
        borderRadius: { xs: 0, lg: "18px" },
        border: { xs: 0, lg: "1px solid #ECECEC" },
        bgcolor: { xs: "transparent", lg: "#FFFFFF" },
        boxShadow: { xs: "none", lg: "0 4px 14px rgba(15, 23, 42, 0.05)" },
        px: { xs: 0, lg: 2.5 },
        py: { xs: 0, lg: 2.3 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.72fr 0.72fr 1.95fr" },
          gap: { xs: 0.8, sm: 1.5 },
          alignItems: "stretch",
        }}
      >
        <Box
          dir="rtl"
          sx={{
            gridColumn: { xs: "1 / -1", lg: "auto / span 2" },
            display: { xs: "flex", lg: "contents" },
            gap: { xs: 0.8, sm: 1.5 },
            overflowX: { xs: "auto", lg: "visible" },
            overflowY: "hidden",
            px: { xs: 0.5, lg: 0 },
            pb: { xs: 0.8, lg: 0 },
            scrollSnapType: { xs: "x mandatory", lg: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <RankingCard title="الأشهر الأكثر مبيعاً" subtitle="للاختبارات" sx={{ scrollSnapAlign: "start" }}>
            <RankingItem rank={1} month="نيسان" value="134" unit="اختباراً" />
            <RankingItem rank={2} month="أيار" value="78" unit="اختباراً" />
            <RankingItem rank={3} month="كانون الثاني" value="24" unit="اختباراً" />
          </RankingCard>

          <RankingCard title="الأشهر الأكثر تحقيقاً للربح" subtitle="من الاختبارات" sx={{ scrollSnapAlign: "start" }}>
            <RankingItem rank={1} month="نيسان" value="2400" unit="ل.س" />
            <RankingItem rank={2} month="أيار" value="1500" unit="ل.س" />
            <RankingItem rank={3} month="كانون الثاني" value="800" unit="ل.س" />
          </RankingCard>
        </Box>

        <ResponsiveCard
          sx={{
            gridColumn: { xs: "1 / -1", lg: "auto" },
            justifySelf: { xs: "start", lg: "stretch" },
            pr: { lg: 0 },
            width: {
              xs: "clamp(280px, 88vw, 520px)",
              sm: "clamp(420px, 84vw, 610px)",
              md: "clamp(520px, 78vw, 680px)",
              lg: "100%",
            },
            px: { xs: 1, sm: 2, lg: 0 },
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
            sx={{ mb: 1.5 }}
            gap={1}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#4D8BFF", fontSize: { xs: 13, sm: 17, lg: 18 }, fontWeight: 700 }}>
                الاختبار الأكثر شراءاً من المستخدمين
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.75} alignItems="baseline">
              <Typography sx={{ color: "#263238", fontSize: { xs: 13, lg: 18 }, fontWeight: 700 }}>
                230
              </Typography>
              <Typography sx={{ color: "#6B7280", fontSize: { xs: 11, lg: 16 }, fontWeight: 500 }}>
                مرة
              </Typography>
            </Stack>
          </Stack>
          {ticketCard}
        </ResponsiveCard>
      </Box>
    </Box>
  );
}

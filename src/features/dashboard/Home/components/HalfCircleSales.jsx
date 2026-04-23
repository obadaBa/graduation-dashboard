import { Box, IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import HomeSection2BottomCard from "./HomeSection2BottomCard";
import TicketCard from "./TicketCard";
import HalfCircleHero from "./HalfCircleHero";

function SideMetric({ title, value }) {
  return (
    <Box sx={{ textAlign: "right", width: "100%" }}>
      <Typography
        sx={{
          color: "#263238",
          fontSize: { xs: 18, md: 20 },
          fontWeight: 600,
          lineHeight: 1.5,
          whiteSpace: "pre-line",
          width: "100%",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mt: 2.5,
          color: "#263238",
          fontSize: { xs: 24, md: 28 },
          fontWeight: 700,
          lineHeight: 1,
          textAlign: { xs: "right", lg: "left" },
          width: "100%",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          mt: 0.75,
          color: "#A1A1A1",
          fontSize: { xs: 13, md: 14 },
          fontWeight: 500,
          lineHeight: 1,
          textAlign: { xs: "right", lg: "left" },
          width: "100%",
        }}
      >
        ليرة سورية
      </Typography>
    </Box>
  );
}

export default function HalfCircleSales({ onScrollPrev, onScrollNext }) {
  return (
    <Box sx={{ mt: 4, mb: { xs: 4, md: 3, lg: 0 } }}>
      <Box
        sx={{
          width: "100%",
          minHeight: 372,
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "170px 1fr 170px" },
          gap: { xs: 4, lg: 1.5 },
          alignItems: "start",
        }}
      >
        <Stack
          spacing={4}
          sx={{
            pt: { lg: 2 },
            order: { xs: 2, lg: 3 },
            width: { xs: "100%", lg: "auto" },
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ order: { xs: 3, lg: 1 }, width: "100%" }}>
            <SideMetric title={"متوسط الربح\nبالشهر"} value="170" />
          </Box>
          <Box
            sx={{
              width: 95,
              borderTop: "1px solid #DFDFDF",
              order: 2,
              alignSelf: { xs: "flex-start", lg: "flex-end" },
            }}
          />
          <Box sx={{ order: { xs: 1, lg: 3 }, width: "100%" }}>
            <SideMetric title={"متوسط المبيعات\nبالشهر"} value="2700" />
          </Box>
        </Stack>

        <HalfCircleHero />

        <Box sx={{ order: { xs: 3, lg: 1 } }} />
      </Box>

      <Box sx={{ position: "relative" }}>
        <HomeSection2BottomCard ticketCard={<TicketCard />} />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            left: { xs: 12, md: 50 },
            bottom: { xs: -22, md: 10 },
            zIndex: 4,
          }}
          gap={1}
        >
          <IconButton
            onClick={onScrollNext}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              border: "1px solid #DFDFDF",
              bgcolor: "#FFFFFF",
              boxShadow: "0 4px 10px rgba(15, 23, 42, 0.06)",
              color: "#263238",
            }}
          >
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <IconButton
            onClick={onScrollPrev}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              border: "1px solid #DFDFDF",
              bgcolor: "#FFFFFF",
              boxShadow: "0 4px 10px rgba(15, 23, 42, 0.06)",
              color: "#263238",
            }}
          >
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

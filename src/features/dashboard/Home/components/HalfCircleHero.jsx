import { Box, Stack, Typography } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

function FloatingStatCard({ title, value, unit, change, positive = true, sx }) {
  return (
    <Box
      sx={{
        position: "absolute",
        minWidth: { xs: 138, md: 162 },
        px: 2,
        py: 1.5,
        borderRadius: "14px",
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.12)",
        border: "1px solid #ECECEC",
        zIndex: 2,
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: "#263238",
          fontSize: { xs: 16, md: 18 },
          fontWeight: 600,
          lineHeight: 1.2,
          textAlign: "right",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "#263238",
          fontSize: { xs: 22, md: 24 },
          fontWeight: 700,
          lineHeight: 1,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1.1 }}
      >
        <Typography
          sx={{
            color: "#A1A1A1",
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {unit}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.4}
          sx={{
            px: 0.8,
            py: 0.35,
            borderRadius: "999px",
            bgcolor: positive ? "#E9FFF1" : "#FFF0F0",
          }}
        >
          {positive ? (
            <TrendingUpRoundedIcon sx={{ fontSize: 14, color: "#22C55E" }} />
          ) : (
            <TrendingDownRoundedIcon sx={{ fontSize: 14, color: "#FF5C5C" }} />
          )}
          <Typography
            sx={{
              color: positive ? "#22C55E" : "#FF5C5C",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {change}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function HalfCircleHero() {
  return (
    <Box
      sx={{
        order: { xs: 1, lg: 2 },
        position: "relative",
        height: { xs: 350, md: 382, lg: 392 },
        overflow: "visible",
        transform: {
          xs: "translateX(18px)",
          md: "translateX(28px)",
          lg: "translateX(120px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 112,
          transform: "translateX(-50%)",
          width: { xs: 530, md: 690, lg: 820 },
          height: { xs: 175, md: 220, lg: 248 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: { xs: 530, md: 690, lg: 820 },
            height: { xs: 530, md: 690, lg: 820 },
            borderRadius: "50%",
            border: "3px solid #4D8BFF",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: 38,
            transform: "translateX(-50%)",
            width: { xs: 416, md: 540, lg: 742 },
            height: { xs: 416, md: 540, lg: 692 },
            borderRadius: "50%",
            background:
              "linear-gradient(260deg, #4791FF 0%, #6DA8FF 10%, #FFFFFF 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pb: { xs: 40, md: 72, lg: 54 },
          }}
        >
          <Typography
            sx={{
              color: "#1F2A37",
              fontSize: { xs: 22, md: 35 },
              fontFamily: '"El Messiri", sans-serif',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            المبيعات الكلية
          </Typography>
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="baseline"
            sx={{ mt: 1 }}
            gap={1}
          >
            <Typography
              sx={{
                color: "#1F2A37",
                fontSize: { xs: 54, md: 50 },
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              245,000
            </Typography>
            <Typography
              sx={{
                color: "#8B7A61",
                fontSize: { xs: 20, md: 28 },
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              ليرة سورية
            </Typography>
          </Stack>
        </Box>
      </Box>

      <FloatingStatCard
        title="الاختبارات المباعة"
        value="134"
        unit="اختبارًا"
        change="-24%"
        positive={false}
        sx={{
          top: -8,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <FloatingStatCard
        title="صافي الأرباح"
        value="67000"
        unit="اختبارًا"
        change="+20%"
        sx={{
          top: 152,
          left: { xs: 12, md: 22, lg: 78 },
        }}
      />

      <FloatingStatCard
        title="أرباح المستخدمين"
        value="178000"
        unit="اختبارًا"
        change="+10%"
        sx={{
          top: 152,
          right: { xs: 12, md: 22, lg: 78 },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 104,
          left: "50%",
          transform: "translateX(-50%)",
          width: 18,
          height: 18,
          borderRadius: "50%",
          bgcolor: "#4D8BFF",
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 248,
          left: { xs: 62, md: 76, lg: 166 },
          width: 18,
          height: 18,
          borderRadius: "50%",
          bgcolor: "#4D8BFF",
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 248,
          right: { xs: 62, md: 76, lg: 164 },
          width: 18,
          height: 18,
          borderRadius: "50%",
          bgcolor: "#4D8BFF",
          zIndex: 3,
        }}
      />
    </Box>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

function formatCurrency(value) {
  const numericValue = Number(value || 0);
  return numericValue.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function formatChange(change) {
  const numericValue = Number(change || 0);
  const sign = numericValue > 0 ? "+" : "";
  return `${sign}${numericValue}%`;
}

function FloatingStatCard({ title, value, unit, change, positive = true, sx }) {
  return (
    <Box
      sx={{
        position: "absolute",
        minWidth: { xs: 138, md: 162 },
        px: 2,
        py: 1.5,
        borderRadius: "14px",
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 14px 34px rgba(0, 0, 0, 0.28)"
            : "0 4px 16px rgba(15, 23, 42, 0.12)",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        zIndex: 2,
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.chartTextPrimary,
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
          color: (theme) => theme.palette.dashboard.chartTextPrimary,
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
            color: (theme) => theme.palette.dashboard.chartTextSecondary,
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
            bgcolor: (theme) =>
              positive
                ? alpha("#22C55E", theme.palette.mode === "dark" ? 0.16 : 0.12)
                : alpha("#FF5C5C", theme.palette.mode === "dark" ? 0.16 : 0.12),
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

export default function HalfCircleHero({ summary }) {
  const grossSalesAmount = formatCurrency(summary?.gross_sales_amount?.value);
  const soldPurchaseCount = summary?.sold_purchase_count?.value || 0;
  const soldPurchaseChange =
    summary?.sold_purchase_count?.change_percentage_from_previous_year || 0;
  const platformNetProfit = formatCurrency(
    summary?.platform_net_profit_amount?.value,
  );
  const platformProfitChange =
    summary?.platform_net_profit_amount?.change_percentage_from_previous_year || 0;
  const usersProfitAmount = formatCurrency(summary?.users_profit_amount?.value);
  const usersProfitChange =
    summary?.users_profit_amount?.change_percentage_from_previous_year || 0;

  return (
    <>
      <Box
        dir="ltr"
        onWheel={(event) => {
          if (event.currentTarget.scrollWidth <= event.currentTarget.clientWidth) {
            return;
          }

          event.currentTarget.scrollLeft += event.deltaY;
        }}
        sx={{
          display: { xs: "flex", lg: "none" },
          order: 1,
          gap: 1.5,
          width: "100%",
          minWidth: 0,
          maxWidth: { xs: "calc(100vw - 24px)", sm: "calc(100vw - 24px)" },
          justifySelf: "stretch",
          overflowX: "auto",
          overflowY: "hidden",
          px: 1.5,
          mx: { xs: -1.5, lg: 0 },
          pb: 1.2,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <FloatingStatCard
          title="المبيعات الكلية"
          value={grossSalesAmount}
          unit="ليرة سورية"
          change={formatChange(0)}
          sx={{
            direction: "rtl",
            position: "static",
            minWidth: { xs: 205, sm: 220 },
            width: { xs: 205, sm: 220 },
            flexShrink: 0,
            scrollSnapAlign: "start",
          }}
        />
        <FloatingStatCard
          title="الاختبارات المباعة"
          value={soldPurchaseCount}
          unit="اختباراً"
          change={formatChange(soldPurchaseChange)}
          positive={soldPurchaseChange >= 0}
          sx={{
            direction: "rtl",
            position: "static",
            minWidth: { xs: 205, sm: 220 },
            width: { xs: 205, sm: 220 },
            flexShrink: 0,
            scrollSnapAlign: "start",
          }}
        />
        <FloatingStatCard
          title="صافي الأرباح"
          value={platformNetProfit}
          unit="ليرة سورية"
          change={formatChange(platformProfitChange)}
          positive={platformProfitChange >= 0}
          sx={{
            direction: "rtl",
            position: "static",
            minWidth: { xs: 205, sm: 220 },
            width: { xs: 205, sm: 220 },
            flexShrink: 0,
            scrollSnapAlign: "start",
          }}
        />
      </Box>

      <Box
        sx={{
          display: { xs: "none", lg: "block" },
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
            component="svg"
            viewBox="0 -9 820 257"
            preserveAspectRatio="none"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              color: (theme) => theme.palette.dashboard.logoPrimary,
              zIndex: 3,
            }}
          >
            <circle
              cx="410"
              cy="410"
              r="410"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="410" cy="0" r="9" fill="currentColor" />
            <circle cx="96.8" cy="145" r="9" fill="currentColor" />
            <circle cx="723.2" cy="145" r="9" fill="currentColor" />
          </Box>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
            }}
          >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 38,
              transform: "translateX(-50%)",
              width: { xs: 416, md: 540, lg: 742 },
              height: { xs: 416, md: 540, lg: 692 },
              borderRadius: "50%",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(260deg, #3E7CF2 0%, #2B5FBF 28%, #1E2633 100%)"
                  : "linear-gradient(260deg, #4791FF 0%, #6DA8FF 10%, #FFFFFF 100%)",
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
                color: (theme) => theme.palette.dashboard.chartTextPrimary,
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
                  color: (theme) => theme.palette.dashboard.chartTextPrimary,
                  fontSize: { xs: 54, md: 50 },
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {grossSalesAmount}
              </Typography>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.dashboard.chartTextSecondary
                      : "#8B7A61",
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
        </Box>

        <FloatingStatCard
          title="الاختبارات المباعة"
          value={soldPurchaseCount}
          unit="اختباراً"
          change={formatChange(soldPurchaseChange)}
          positive={soldPurchaseChange >= 0}
          sx={{
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <FloatingStatCard
          title="صافي الأرباح"
          value={platformNetProfit}
          unit="ليرة سورية"
          change={formatChange(platformProfitChange)}
          positive={platformProfitChange >= 0}
          sx={{
            top: 137,
            left: { xs: 12, md: 22, lg: 78 },
          }}
        />

        <FloatingStatCard
          title="أرباح المستخدمين"
          value={usersProfitAmount}
          unit="ليرة سورية"
          change={formatChange(usersProfitChange)}
          positive={usersProfitChange >= 0}
          sx={{
            top: 137,
            right: { xs: 12, md: 22, lg: 78 },
          }}
        />

      </Box>
    </>
  );
}

import { Box, Button, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const sizeStyles = {
  default: {
    width: 440,
    radius: "18px",
    border: "3px solid #D7D7D7",
    headerHeight: 76,
    px: 2.6,
    title: 34,
    desc: 18,
    tagHeight: 36,
    tagFont: 16,
    label: 20,
    value: 18,
    footerHeight: 90,
    buttonHeight: 48,
    buttonWidth: 132,
    buttonFont: 22,
    price: 32,
  },
  compact: {
    width: 178,
    radius: "8px",
    border: "1px solid #D7D7D7",
    headerHeight: 34,
    px: 1,
    title: 16,
    desc: 9.5,
    tagHeight: 18,
    tagFont: 8,
    label: 9.5,
    value: 9,
    footerHeight: 42,
    buttonHeight: 22,
    buttonWidth: 54,
    buttonFont: 10,
    price: 15,
  },
};

export default function TestCard({ compact = false, number = 180, test, fluid = false }) {
  const size = compact ? sizeStyles.compact : sizeStyles.default;
  const card = {
    number,
    title: "جلسة امتحانية",
    timeLabel: "منذ اربع دقائق",
    description: "هذه الأسئلة تساعد على التقدم للامتحان بثقة وذلك في مادة البحث",
    tags: ["# علوم اساسية", "# برمجة", "..."],
    levelLabel: "المستوى",
    levelValue: "صعب",
    questionsLabel: "الأسئلة",
    questionsValue: "135",
    ratingLabel: "التقييم",
    ratingValue: "0.0",
    priceValue: "180",
    priceLabel: "ليرة سورية",
    previewLabel: "معاينة",
    ...test,
  };

  return (
    <Box
      sx={{
        width: compact && fluid ? "100%" : size.width,
        maxWidth: "100%",
        borderRadius: size.radius,
        border: size.border,
        bgcolor: "#FFFFFF",
        overflow: "hidden",
        direction: "rtl",
        flexShrink: 0,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: size.headerHeight,
          px: size.px,
          borderBottom: "1px solid #E2E2E2",
        }}
      >
        <Typography
          sx={{
            color: "#5583FF",
            fontSize: compact ? 16 : 36,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          #{card.number}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} gap={0.5}>
          <CalendarMonthOutlinedIcon
            sx={{ color: "#8A8A8A", fontSize: compact ? 12 : 28 }}
          />
          <Typography
            sx={{
              color: "#8A8A8A",
              fontSize: compact ? 7.5 : 20,
              fontWeight: 600,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {card.timeLabel}
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          px: size.px,
          pt: compact ? 1.2 : 3,
          pb: compact ? 1 : 2.6,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#263238",
            fontSize: size.title,
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </Typography>

        <Typography
          sx={{
            mt: compact ? 0.7 : 1.6,
            mx: "auto",
            maxWidth: compact ? 135 : 340,
            color: "#8A8A8A",
            fontSize: size.desc,
            fontWeight: 500,
            lineHeight: 1.45,
          }}
        >
          {card.description}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={compact ? 0.35 : 1.3}
          gap={compact ? 0.35 : 1.3}
          sx={{ mt: compact ? 1.1 : 3 }}
        >
          {card.tags.map((tag) => (
            <Box
              key={tag}
              sx={{
                height: size.tagHeight,
                minWidth:
                  tag === "..." ? (compact ? 22 : 46) : compact ? 47 : 104,
                px: compact ? 0.35 : 1.4,
                borderRadius: compact ? "3px" : "6px",
                bgcolor: "#EEF2FF",
                color: "#5583FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: size.tagFont,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: compact ? 1.5 : 3.6 }}
        >
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              sx={{ color: "#263238", fontSize: size.label, fontWeight: 800 }}
            >
              {card.levelLabel}
            </Typography>
            <Typography
              sx={{
                mt: 0.4,
                color: "#FF6B6B",
                fontSize: size.value,
                fontWeight: 800,
              }}
            >
              {card.levelValue}
            </Typography>
          </Box>

          <Box
            sx={{ width: "1px", height: compact ? 28 : 46, bgcolor: "#DFDFDF" }}
          />

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              sx={{ color: "#263238", fontSize: size.label, fontWeight: 800 }}
            >
              {card.questionsLabel}
            </Typography>
            <Typography
              sx={{
                mt: 0.4,
                color: "#8A8A8A",
                fontSize: size.value,
                fontWeight: 700,
              }}
            >
              {card.questionsValue}
            </Typography>
          </Box>

          <Box
            sx={{ width: "1px", height: compact ? 28 : 46, bgcolor: "#DFDFDF" }}
          />

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              sx={{ color: "#263238", fontSize: size.label, fontWeight: 800 }}
            >
              {card.ratingLabel}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.2}
              gap={0.2}
              sx={{ mt: 0.3 }}
            >
              <StarRoundedIcon
                sx={{ color: "#FFD22E", fontSize: compact ? 12 : 24 }}
              />
              <Typography
                sx={{
                  color: "#8A8A8A",
                  fontSize: size.value,
                  fontWeight: 700,
                }}
              >
                {card.ratingValue}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          minHeight: size.footerHeight,
          px: size.px,
          borderTop: "1px solid #E2E2E2",
        }}
      >
        <Button
          variant="contained"
          sx={{
            minWidth: size.buttonWidth,
            height: size.buttonHeight,
            borderRadius: compact ? "4px" : "7px",
            bgcolor: "#5583FF",
            boxShadow: "none",
            color: "#FFFFFF",
            fontSize: size.buttonFont,
            fontWeight: 800,
            "&:hover": {
              bgcolor: "#5583FF",
              boxShadow: "none",
            },
          }}
        >
          {card.previewLabel}
        </Button>

        <Box sx={{ textAlign: "left", direction: "rtl" }}>
          <Typography
            sx={{
              color: "#263238",
              fontSize: size.price,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {card.priceValue}
          </Typography>
          <Typography
            sx={{
              mt: 0.4,
              color: "#8A8A8A",
              fontSize: compact ? 8 : 17,
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            {card.priceLabel}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

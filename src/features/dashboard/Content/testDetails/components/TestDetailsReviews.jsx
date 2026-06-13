import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Box, Button, Stack, Typography } from "@mui/material";

const reviewLevels = [
  { label: "نجوم 5", value: 0.9 },
  { label: "نجوم 4", value: 0.9 },
  { label: "نجوم 3", value: 0.52 },
  { label: "نجوم 2", value: 0.88 },
  { label: "نجوم 1", value: 0.08 },
];

const ratingStats = [
  {
    value: "463",
    label: "تعليقا للاختبار",
    icon: <ChatRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    value: "28k",
    label: "وجهه مفيدا",
    icon: <ThumbUpRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    value: "28k",
    label: "وجهه غير مفيد",
    icon: <ThumbDownRoundedIcon sx={{ fontSize: 22 }} />,
  },
];

const reviews = [
  {
    id: 1,
    name: "أمل سمير عرفة",
    date: "2025\\01\\22",
    helpful: "2300 وجهه مفيدا",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    name: "قمر هشام خلف",
    date: "2025\\01\\22",
    helpful: "800 وجهه مفيدا",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    name: "رنا أحمد عمار",
    date: "2025\\01\\22",
    helpful: "1200 وجهه مفيدا",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
  },
];

const reviewsList = [
  ...reviews,
  ...reviews.map((review) => ({ ...review, id: review.id + 3 })),
  ...reviews.map((review) => ({ ...review, id: review.id + 6 })),
];

function RatingBars() {
  return (
    <Stack spacing={1.1} sx={{ width: "100%", maxWidth: 300 }}>
      {reviewLevels.map((item) => (
        <Stack key={item.label} direction="row-reverse" alignItems="center" spacing={1} gap={1}>
          <Typography sx={{ minWidth: 48, color: "#8F8F8F", fontSize: 12, fontWeight: 500 }}>
            {item.label}
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 5,
              borderRadius: "999px",
              bgcolor: "#EEF2FF",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${item.value * 100}%`,
                height: "100%",
                borderRadius: "999px",
                bgcolor: "#5C84FF",
              }}
            />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

function RatingStatCard({ value, label, icon }) {
  return (
    <Box
      sx={{
        minWidth: 118,
        height: 76,
        borderRadius: "12px",
        bgcolor: "#F6F6F6",
        px: 1.5,
        py: 1.2,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "8px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ color: "#263238", fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
          {value}
        </Typography>
      </Stack>
      <Typography sx={{ mt: 0.8, color: "#263238", fontSize: 13, fontWeight: 500, textAlign: "right" }}>
        {label}
      </Typography>
    </Box>
  );
}

function ReviewStars() {
  return (
    <Stack direction="row-reverse" spacing={0.15} gap={0.15}>
      <StarRoundedIcon sx={{ fontSize: 22, color: "#E6E6E6" }} />
      {[0, 1, 2, 3].map((item) => (
        <StarRoundedIcon key={item} sx={{ fontSize: 22, color: "#FFC933" }} />
      ))}
    </Stack>
  );
}

function ReviewItem({ review }) {
  return (
    <Stack direction="row-reverse" alignItems="stretch" spacing={1.3} gap={1.3}>
      <Button
        sx={{
          minWidth: 28,
          width: 28,
          height: 108,
          borderRadius: "8px",
          border: "1.5px dashed #FF6A64",
          bgcolor: "#FFFFFF",
          color: "#FF6A64",
          p: 0,
          alignSelf: "center",
          "&:hover": {
            bgcolor: "#FFFFFF",
            borderColor: "#FF6A64",
          },
        }}
      >
        <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
      </Button>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row-reverse"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1}
        >
         

          <Box
            sx={{
              height: 22,
              px: 1,
              borderRadius: "4px",
              bgcolor: "#EEF4FF",
              color: "#5C84FF",
              display: "inline-flex",
              alignItems: "center",
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
              mt:1
            }}
          >
            {review.helpful}
          </Box>
           <Stack direction="row" alignItems="center" spacing={0.8} gap={0.8}>
            <Box
              component="img"
              src={review.avatar}
              alt={review.name}
              sx={{
                width: 48,
                height: 58,
                borderRadius: "9px",
                objectFit: "cover",
              }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Stack direction="row" alignItems="center" spacing={0.5} gap={0.5}>
                <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 800 }}>
                  {review.name}
                </Typography>
                <VerifiedRoundedIcon sx={{ color: "#5C84FF", fontSize: 15 }} />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.2} gap={1.2} sx={{ mt: 0.35 }}>
                <ReviewStars />
                <Typography sx={{ color: "#8A8A8A", fontSize: 12, fontWeight: 500 }}>
                  {review.date}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Typography
          sx={{
            mt: 1,
            color: "#8A8A8A",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.55,
            textAlign: "right",
          }}
        >
          اختبار رائع جدا مليء بالمعرفة والأشياء الشيقة والرائعة التي تعطي تجربة
          حقيقية ورائعة للمستخدم وتجعله يذكر بطريقة فعالة
        </Typography>
      </Box>
    </Stack>
  );
}

export default function TestDetailsReviews() {
  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        borderRadius: "10px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
        px: { xs: 2, md: 3 },
        py: { xs: 2.2, md: 2.6 },
        textAlign: "right",
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.35fr" },
          gap: { xs: 3, lg: 5 },
          alignItems: "start",
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ color: "#263238", fontSize: 24, fontWeight: 800  , mr:1}}>
            التقييم
          </Typography>

          <Box
            sx={{
              mt: 1.3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "150px minmax(220px, 1fr)" },
              gap: 3,
              alignItems: "start",
              mr:1
            }}
          >
            <Box sx={{ minWidth: 150, gridColumn: { md: 1 } }}>
              <Typography sx={{ color: "#263238", fontSize: 25, fontWeight: 800 }}>
                5 / <Box component="span" sx={{ color: "#5C84FF" }}>4.3</Box>
              </Typography>
              <Typography sx={{ mt: 0.8, color: "#8F8F8F", fontSize: 13, fontWeight: 500 }}>
                2K تقييم . 18 تعليق
              </Typography>

              <Stack direction="row-reverse" justifyContent="flex-start" spacing={0.2} gap={0.2} sx={{ mt: 2.1  , mr:20}}>
                <StarRoundedIcon sx={{ fontSize: 32, color: "#E7E7E7" }} />
                {[0, 1, 2, 3].map((item) => (
                  <StarRoundedIcon key={item} sx={{ fontSize: 32, color: "#FFC933" }} />
                ))}
              </Stack>

              <Stack
                direction="row"
                flexWrap="nowrap"
                useFlexGap
                gap={2.4}
                sx={{ mt: 9.2, justifyContent: "flex-start" }}
              >
                {ratingStats.map((item) => (
                  <RatingStatCard key={item.label} {...item} />
                ))}
              </Stack>
            </Box>

            <Box sx={{ gridColumn: { md: 2 }, pt: 0.3 }}>
              <RatingBars />
            </Box>
          </Box>
        </Box>

        <Box sx={{ minWidth: 0, height: "100%", overflow: "hidden" }}>
          <Stack alignItems="flex-start" spacing={1.4} gap={1.4}>
            <Typography sx={{ color: "#263238", fontSize: 24, fontWeight: 800 }}>
              المراجعات
            </Typography>

            <Stack direction="row" spacing={1} gap={1}>
              {["الكل", "5", "4", "3", "2", "1"].map((item, index) => (
                <Button
                  key={item}
                  startIcon={index === 0 ? null : <StarBorderRoundedIcon sx={{ fontSize: 15 }} />}
                  sx={{
                    minWidth: index === 0 ? 52 : 38,
                    height: 28,
                    borderRadius: "999px",
                    bgcolor: index === 0 ? "#5C84FF" : "#F4F4F4",
                    color: index === 0 ? "#FFFFFF" : "#8A8A8A",
                    fontSize: 12,
                    fontWeight: 700,
                    px: 1,
                    "&:hover": {
                      bgcolor: index === 0 ? "#5C84FF" : "#F4F4F4",
                    },
                    "& .MuiButton-startIcon": {
                      marginInlineStart: 0,
                      marginInlineEnd: "4px",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Stack
            spacing={2.4}
            sx={{
              mt: 2.3,
              height: "calc(100% - 86px)",
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              pr: 0.2,
            }}
          >
            {reviewsList.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

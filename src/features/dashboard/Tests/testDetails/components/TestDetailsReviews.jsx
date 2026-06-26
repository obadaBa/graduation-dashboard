import { useMemo, useState } from "react";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDeleteTestReviewMutation } from "../../hooks/useDeleteTestReviewMutation";
import { useTestReviewsQuery } from "../../hooks/useTestReviewsQuery";

const defaultAvatar = "http://localhost/storage/defaults/default-avatar.svg";
const ratingFilters = ["الكل", "5", "4", "3", "2", "1"];

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatCompactNumber(value) {
  const number = Number(value || 0);

  if (number >= 1000) {
    return `${Number((number / 1000).toFixed(1)).toLocaleString("en-US")}k`;
  }

  return number.toLocaleString("en-US");
}

function RatingBars({ distribution }) {
  const levels = [5, 4, 3, 2, 1].map((rating) => ({
    label: `${rating} نجوم`,
    value: Number(distribution?.[rating]?.percentage || 0),
  }));

  return (
    <Stack spacing={1.1} sx={{ width: "100%", maxWidth: 300 }}>
      {levels.map((item) => (
        <Stack
          key={item.label}
          direction="row-reverse"
          alignItems="center"
          spacing={1}
          gap={1}
        >
          <Typography
            sx={{
              minWidth: 48,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {item.label}
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 5,
              borderRadius: "999px",
              bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${Math.min(item.value, 100)}%`,
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
        minWidth: 142,
        width: 142,
        height: 76,
        borderRadius: "12px",
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
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
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Stack>
      <Typography
        sx={{
          mt: 0.8,
          color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: 13,
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function ReviewStars({ rating = 0, size = 22 }) {
  return (
    <Stack direction="row-reverse" spacing={0.15} gap={0.15}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarRoundedIcon
          key={star}
          sx={{
            fontSize: size,
            color: star <= Number(rating || 0) ? "#FFC933" : "#E6E6E6",
          }}
        />
      ))}
    </Stack>
  );
}

function ReviewItem({ review, onDelete, isDeleting }) {
  return (
    <Stack direction="row-reverse" alignItems="stretch" spacing={1.3} gap={1.3}>
      <Button
        type="button"
        aria-label={`حذف مراجعة ${review.name}`}
        disabled={isDeleting}
        onClick={() => onDelete(review.id)}
        sx={{
          minWidth: 28,
          width: 28,
          height: 108,
          borderRadius: "8px",
          border: "1.5px dashed #FF6A64",
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          color: "#FF6A64",
          p: 0,
          alignSelf: "center",
          "&:hover": {
            bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
            borderColor: "#FF6A64",
          },
          "&.Mui-disabled": {
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            color: "#FFAAA6",
            borderColor: "#FFAAA6",
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
              mt: 1,
              borderRadius: "4px",
              bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
              color: "#5C84FF",
              display: "inline-flex",
              alignItems: "center",
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {`${formatNumber(review.helpful_yes_count)} وجده مفيدا`}
          </Box>

          <Stack direction="row" alignItems="center" spacing={0.8} gap={0.8}>
            <Box
              component="img"
              src={review.avatar || defaultAvatar}
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
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                >
                  {review.name}
                </Typography>
                {review.is_academically_verified && (
                  <VerifiedRoundedIcon sx={{ color: "#5C84FF", fontSize: 15 }} />
                )}
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.2}
                gap={1.2}
                sx={{ mt: 0.35 }}
              >
                <ReviewStars rating={review.rating} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.dashboard.textSecondary,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {review.created_at}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Typography
          sx={{
            mt: 1,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.55,
            textAlign: "right",
          }}
        >
          {review.review_text}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function TestDetailsReviews({ testId }) {
  const [selectedRating, setSelectedRating] = useState("الكل");
  const reviewsQueryParams = useMemo(
    () => ({
      per_page: 20,
      rating: selectedRating === "الكل" ? undefined : selectedRating,
    }),
    [selectedRating],
  );
  const reviewsQuery = useTestReviewsQuery(testId, reviewsQueryParams);
  const deleteReviewMutation = useDeleteTestReviewMutation(testId);
  const reviewPages = reviewsQuery.data?.pages || [];
  const reviewsData = reviewPages[0]?.data || {};
  const ratingInformation = reviewsData.rating_information || {};
  const statistics = reviewsData.statistics || {};
  const reviews = reviewPages.flatMap(
    (page) => page?.data?.comments?.items || [],
  );
  const averageRating = Number(ratingInformation.average_rating || 0);

  const handleReviewsScroll = (event) => {
    const scrollContainer = event.currentTarget;
    const remainingScroll =
      scrollContainer.scrollHeight -
      scrollContainer.scrollTop -
      scrollContainer.clientHeight;

    if (
      remainingScroll < 180 &&
      reviewsQuery.hasNextPage &&
      !reviewsQuery.isFetchingNextPage
    ) {
      reviewsQuery.fetchNextPage();
    }
  };

  const ratingStats = [
    {
      value: formatCompactNumber(statistics.comments_count),
      label: "تعليقا للاختبار",
      icon: <ChatRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      value: formatCompactNumber(statistics.helpful_yes_count),
      label: "وجده مفيدا",
      icon: <ThumbUpRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      value: formatCompactNumber(statistics.helpful_no_count),
      label: "وجده غير مفيد",
      icon: <ThumbDownRoundedIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Box
      onScroll={handleReviewsScroll}
      sx={{
        mt: 1.2,
        width: "100%",
        height: "calc(100vh - 315px)",
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        px: { xs: 2, md: 3 },
        py: { xs: 2.2, md: 2.6 },
        textAlign: "right",
        direction: "rtl",
        overflowX: "hidden",
        overflowY: { xs: "auto", lg: "hidden" },
        scrollbarWidth: { xs: "thin", lg: "none" },
        scrollbarColor: "#C8C8C8 transparent",
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "#C8C8C8",
          borderRadius: "999px",
        },
        "&::-webkit-scrollbar-track": {
          bgcolor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          height: { xs: "auto", lg: "100%" },
          minHeight: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.35fr" },
          gap: { xs: 3, lg: 5 },
          alignItems: "start",
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 24,
              fontWeight: 800,
              mr: 1,
            }}
          >
            التقييم
          </Typography>

          <Box
            sx={{
              mt: 1.3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "150px minmax(220px, 1fr)" },
              gap: 3,
              alignItems: "start",
              mr: 1,
            }}
          >
            <Box sx={{ minWidth: 150, gridColumn: { md: 1 } }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 25,
                  fontWeight: 800,
                }}
              >
                5 /{" "}
                <Box component="span" sx={{ color: "#5C84FF" }}>
                  {averageRating.toFixed(1).replace(".0", "")}
                </Box>
              </Typography>
              <Typography
                sx={{
                  mt: 0.8,
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {`${formatNumber(ratingInformation.ratings_count)} تقييم . ${formatNumber(
                  ratingInformation.comments_count,
                )} تعليق`}
              </Typography>

              <Stack
                direction="row-reverse"
                justifyContent="flex-start"
                spacing={0.2}
                gap={0.2}
                sx={{ mt: 2.1, mr: 20 }}
              >
                <ReviewStars rating={Math.round(averageRating)} size={32} />
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
              <RatingBars distribution={ratingInformation.rating_distribution} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            minWidth: 0,
            minHeight: 0,
            height: { xs: "auto", lg: "100%" },
            overflow: { xs: "visible", lg: "hidden" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack alignItems="flex-start" spacing={1.4} gap={1.4}>
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              المراجعات
            </Typography>

            <Stack direction="row" spacing={1} gap={1}>
              {ratingFilters.map((item, index) => {
                const isSelected = selectedRating === item;

                return (
                  <Button
                    key={item}
                    onClick={() => setSelectedRating(item)}
                    startIcon={
                      index === 0 ? null : <StarBorderRoundedIcon sx={{ fontSize: 15 }} />
                    }
                    sx={{
                      minWidth: index === 0 ? 52 : 38,
                      height: 28,
                      borderRadius: "999px",
                      bgcolor: (theme) =>
                        isSelected
                          ? theme.palette.dashboard.logoPrimary
                          : theme.palette.dashboard.chartBackground,
                      color: (theme) =>
                        isSelected
                          ? "#FFFFFF"
                          : theme.palette.dashboard.textSecondary,
                      fontSize: 12,
                      fontWeight: 700,
                      px: 1,
                      "&:hover": {
                        bgcolor: (theme) =>
                          isSelected
                            ? theme.palette.dashboard.logoPrimary
                            : theme.palette.dashboard.hoverItem.background,
                      },
                      "& .MuiButton-startIcon": {
                        marginInlineStart: 0,
                        marginInlineEnd: "4px",
                      },
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
            </Stack>
          </Stack>

          <Stack
            spacing={2.4}
            onScroll={handleReviewsScroll}
            sx={{
              mt: 2.3,
              flex: { xs: "0 0 auto", lg: 1 },
              minHeight: 0,
              overflowY: { xs: "visible", lg: "auto" },
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              pr: 0.2,
              pb: 3,
              scrollPaddingBottom: 24,
              boxSizing: "border-box",
            }}
          >
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                onDelete={deleteReviewMutation.mutate}
                isDeleting={
                  deleteReviewMutation.isPending &&
                  deleteReviewMutation.variables === review.id
                }
              />
            ))}

            {reviewsQuery.isFetchingNextPage && (
              <Typography
                sx={{
                  py: 1.5,
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                جاري تحميل المزيد...
              </Typography>
            )}

            {!reviewsQuery.isLoading && reviews.length === 0 && (
              <Typography
                sx={{
                  py: 5,
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 15,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                لا توجد مراجعات لعرضها
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

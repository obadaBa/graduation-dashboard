import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import GTranslateRoundedIcon from "@mui/icons-material/GTranslateRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';import { Box, Stack, Typography } from "@mui/material";

const authorImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=180&q=80";

function EngagementBox({ icon, value }) {
  return (
    <Box
      sx={{
        width: 46,
        height: 60,
        borderRadius: "4px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: (theme) => theme.palette.dashboard.textPrimary,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
      }}
    >
      {icon}
      <Typography
        sx={{
          mt: 0.3,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function TestFactItem({ icon, label, value, color, showDivider = true }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ flex: "1", minWidth: 150 }}
    >
      <Stack alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ color, height: 38, display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
        <Typography
          sx={{
            mt: 0.4,
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 17,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            mt: 0.35,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>
      </Stack>

      {showDivider && (
        <Box
          sx={{
            width: "2px",
            height: 58,
            bgcolor: (theme) => theme.palette.dashboard.divider,
            mx: 1.3,
          }}
        />
      )}
    </Stack>
  );
}

function TagChip({ label }) {
  return (
    <Box
      sx={{
        height: 30,
        px: 1.6,
        mt: 2,
        borderRadius: "5px",
        border: (theme) => `1px solid ${theme.palette.dashboard.mutedChip.border}`,
        bgcolor: (theme) => theme.palette.dashboard.mutedChip.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: (theme) => theme.palette.dashboard.mutedChip.color,
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

function BottomMetaItem({ icon, label, value, color }) {
  return (
    <Stack
      direction="row-reverse"
      alignItems="center"
      spacing={0.9}
      gap={0.9}
      sx={{ mt: 2 }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            mt: 0.2,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
    </Stack>
  );
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatCurrency(value) {
  return `${formatNumber(value)} ليرة سورية`;
}

function formatDuration(seconds) {
  const totalSeconds = Number(seconds || 0);

  if (totalSeconds < 60) {
    return `${totalSeconds} ث`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return remainingSeconds ? `${minutes} د ${remainingSeconds} ث` : `${minutes} د`;
}

export default function TestDetailsOverview({ testDetails, isLoading = false }) {
  const owner = testDetails?.owner || {};
  const basicInformation = testDetails?.basic_information || {};
  const secondaryInformation = testDetails?.secondary_information || {};
  const statistics = testDetails?.statistics || {};
  const ownerAvatar = owner.avatar || authorImage;
  const ownerName = owner.name || "جيني تحسين أسير";
  const ownerFollowers = formatNumber(owner.followers_count || 2000);
  const ownerFollowing = formatNumber(owner.following_count || 500);
  const ownerTestsCount = formatNumber(owner.tests_count || 14);
  const testTitle = basicInformation.title || "جلسة امتحانية أولى";
  const testDescription =
    basicInformation.description ||
    "هذه الأسئلة تساعدك على الخوض في مادة خوارزميات البحث الذكية وبكل ثقة والتقدم للامتحان ونيل أعلى الدرجات بسهولة مطلقة وبدون عناء أو جهد يذكر أبدا عزيزي الطالب";

  const engagementStats = [
    {
      value: formatNumber(statistics.likes_count || 125),
      icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 24 }} />,
    },
    {
      value: formatNumber(statistics.reviews_count || 12),
      icon: <ModeCommentOutlinedIcon sx={{ fontSize: 24 }} />,
    },
    {
      value: formatNumber(statistics.bookmarks_count || 65),
      icon: <BookmarkBorderRoundedIcon sx={{ fontSize: 24 }} />,
    },
    {
      value: formatNumber(statistics.downloads_count || 8),
      icon: <DownloadOutlinedIcon sx={{ fontSize: 24 }} />,
    },
  ];

  const testFacts = [
    {
      label: "عدد الأسئلة",
      value: formatNumber(basicInformation.question_count || 45),
      color: "#5C84FF",
      icon: <BookmarkBorderRoundedIcon sx={{ fontSize: 34 }} />,
    },
    {
      label: "المدة",
      value: formatDuration(basicInformation.duration_seconds || 60),
      color: "#FF4F4A",
      icon: <TimerOutlinedIcon sx={{ fontSize: 34 }} />,
    },
    {
      label: "المستوى",
      value: basicInformation.difficulty_level || "صعب",
      color: "#FFBB1B",
      icon: <Inventory2OutlinedIcon sx={{ fontSize: 34 }} />,
    },
    {
      label: "حد النجاح",
      value: `${formatNumber(basicInformation.pass_mark_percentage || 12)} بالمية`,
      color: "#FFD400",
      icon: <CheckRoundedIcon sx={{ fontSize: 38 }} />,
    },
    {
      label: "نشر في",
      value: basicInformation.published_at || "2025\\01\\22",
      color: "#75D947",
      icon: <HourglassEmptyRoundedIcon sx={{ fontSize: 34 }} />,
    },
    {
      label: "السعر",
      value: formatCurrency(basicInformation.price || 120),
      color: "#27A7FF",
      icon: <WalletOutlinedIcon sx={{ fontSize: 34 }} />,
    },
    {
      label: "صافي الربح",
      value: formatCurrency(basicInformation.platform_net_profit_amount || 10),
      color: "#A837FF",
      icon: <LocalOfferOutlinedIcon sx={{ fontSize: 34 }} />,
    },
    {
      label: "حالة الاختبار",
      value: basicInformation.review_status || "جديد",
      color: "#F13E91",
      icon: <AppsRoundedIcon sx={{ fontSize: 34 }} />,
    },
  ];

  const tags =
    secondaryInformation.interests?.length > 0
      ? secondaryInformation.interests
      : [
          "الهندسة الكهربائية",
          "الهندسة الميكانيكية",
          "العمارة",
          "الهندسة الطبية",
          "الهندسة المدنية",
        ];

  const bottomMeta = [
    {
      label: "آخر تعديل",
      value: secondaryInformation.last_content_updated_at || "23\\02\\2025",
      color: "#5C84FF",
      icon: <EditOutlinedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "تخصص دراسي",
      value: secondaryInformation.target_level || "سنة أولى جامعة",
      color: "#6F8CFF",
      icon: <AppsRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "اللغة",
      value: secondaryInformation.language || "العربية",
      color: "#5C84FF",
      icon: <GTranslateRoundedIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "المتقدمين",
      value: formatNumber(secondaryInformation.participants_count || 24000),
      color: "#6F8CFF",
      icon: <GroupsRoundedIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        minHeight: 465,
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        px: { xs: 1.6, md: 2.2 },
        py: { xs: 2.2, md: 2.6 },
        direction: "rtl",
        overflow: "hidden",
        opacity: isLoading ? 0.72 : 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={2}
      >
        <Stack
          direction="row-reverse"
          alignItems="center"
          spacing={1.2}
          gap={1.2}
        >
          <Box sx={{ textAlign: "right" }}>
            <Stack
              direction="row-reverse"
              alignItems="center"
              spacing={0.7}
              gap={0.7}
            >
              <VerifiedRoundedIcon sx={{ color: "#5C84FF", fontSize: 19 }} />
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                {ownerName}
              </Typography>
            </Stack>
            <Typography
              sx={{
                mt: 0.9,
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <Box component="span" sx={{ color: "inherit", fontWeight: 800 }}>
                {ownerFollowers}
              </Box>{" "}
              متابع .{" "}
              <Box component="span" sx={{ color: "inherit", fontWeight: 800 }}>
                {ownerFollowing}
              </Box>{" "}
              يتابع .{" "}
              <Box component="span" sx={{ color: "inherit", fontWeight: 800 }}>
                {ownerTestsCount}
              </Box>{" "}
              اختبار
            </Typography>
          </Box>
          <Box
            component="img"
            src={ownerAvatar}
            alt="صاحب الاختبار"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        </Stack>

        <Stack direction="row-reverse" spacing={1.4} gap={1.4}>
          {engagementStats.map((item) => (
            <EngagementBox
              key={item.value}
              icon={item.icon}
              value={item.value}
            />
          ))}
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 1.7,
          textAlign: "right",
          pr: 2,
        }}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 23,
            fontWeight: 800,
          }}
        >
          {testTitle}
        </Typography>
        <Typography
          sx={{
            mt: 0.9,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.55,
            maxWidth: 880,
            marginInlineStart: 0,
            marginInlineEnd: 0,
            direction: "rtl",
            textAlign: "right",
          }}
        >
          {testDescription}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2.2,
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          pb: 0.8,
          scrollbarWidth: "thin",
          scrollbarColor: "#C8C8C8 transparent",
          "&::-webkit-scrollbar": {
            height: 6,
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
        <Stack
          direction="row"
          alignItems="flex-start"
          sx={{
            width: "max-content",
            minWidth: "100%",
          }}
        >
          {testFacts.map((item, index) => (
            <TestFactItem
              key={item.label}
              {...item}
              showDivider={index !== testFacts.length - 1}
            />
          ))}
        </Stack>
      </Box>

      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        gap={1}
        sx={{ mt: 2.1, justifyContent: "flex-start", mr: 1 }}
      >
        {tags.map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        gap={4.8}
        sx={{ mt: 1.5, justifyContent: "flex-start", mr: 0 }}
      >
        {bottomMeta.map((item) => (
          <BottomMetaItem key={item.label} {...item} />
        ))}
      </Stack>
    </Box>
  );
}

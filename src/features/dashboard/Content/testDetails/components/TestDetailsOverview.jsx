import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import GTranslateRoundedIcon from "@mui/icons-material/GTranslateRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Stack, Typography } from "@mui/material";

const authorImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=180&q=80";

const engagementStats = [
  { value: "125", icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 24 }} /> },
  { value: "12", icon: <WhatsAppIcon sx={{ fontSize: 24 }} /> },
  { value: "65", icon: <BookmarkBorderRoundedIcon sx={{ fontSize: 24 }} /> },
  { value: "8", icon: <DownloadRoundedIcon sx={{ fontSize: 24 }} /> },
];

const testFacts = [
  {
    label: "عدد الأسئلة",
    value: "45",
    color: "#5C84FF",
    icon: <BookmarkBorderRoundedIcon sx={{ fontSize: 34 }} />,
  },
  {
    label: "المدة",
    value: "60 ث",
    color: "#FF4F4A",
    icon: <TimerOutlinedIcon sx={{ fontSize: 34 }} />,
  },
  {
    label: "المستوى",
    value: "صعب",
    color: "#FFBB1B",
    icon: <Inventory2OutlinedIcon sx={{ fontSize: 34 }} />,
  },
  {
    label: "حد النجاح",
    value: "12 بالمية",
    color: "#FFD400",
    icon: <CheckRoundedIcon sx={{ fontSize: 38 }} />,
  },
  {
    label: "نشر في",
    value: "2025\\01\\22",
    color: "#75D947",
    icon: <HourglassEmptyRoundedIcon sx={{ fontSize: 34 }} />,
  },
  {
    label: "السعر",
    value: "120 ليرة سورية",
    color: "#27A7FF",
    icon: <WalletOutlinedIcon sx={{ fontSize: 34 }} />,
  },
  {
    label: "صافي الربح",
    value: "10 ليرة سورية",
    color: "#A837FF",
    icon: <LocalOfferOutlinedIcon sx={{ fontSize: 34 }} />,
  },
  {
    label: "حالة الاختبار",
    value: "جديد",
    color: "#F13E91",
    icon: <AppsRoundedIcon sx={{ fontSize: 34 }} />,
  },
];

const tags = [
  "الهندسة الكهربائية",
  "الهندسة الميكانيكية",
  "العمارة",
  "الهندسة الطبية",
  "الهندسة المدنية",
];

const bottomMeta = [
  {
    label: "آخر تعديل",
    value: "23\\02\\2025",
    color: "#5C84FF",
    icon: <EditOutlinedIcon sx={{ fontSize: 22 }} />,
  },
  {
    label: "تخصص دراسي",
    value: "سنة أولى جامعة",
    color: "#6F8CFF",
    icon: <AppsRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    label: "اللغة",
    value: "العربية",
    color: "#5C84FF",
    icon: <GTranslateRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    label: "المتقدمين",
    value: "24,000",
    color: "#6F8CFF",
    icon: <GroupsRoundedIcon sx={{ fontSize: 22 }} />,
  },
];

function EngagementBox({ icon, value }) {
  return (
    <Box
      sx={{
        width: 46,
        height: 60,
        borderRadius: "4px",
        border: "1px solid #D8D8D8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#263238",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
      }}
    >
      {icon}
      <Typography
        sx={{ mt: 0.3, color: "#8A8A8A", fontSize: 16, fontWeight: 600 }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function TestFactItem({ icon, label, value, color, showDivider = true }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ flex: 1, minWidth: 96 }}>
      <Stack alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ color, height: 38, display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
        <Typography
          sx={{
            mt: 0.4,
            color: "#263238",
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
            color: "#8D8D8D",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>
      </Stack>

      {showDivider && (
        <Box sx={{ width: "2px", height: 58, bgcolor: "#E3E3E3", mx: 1.3 }} />
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
        borderRadius: "5px",
        border: "1px solid #DDDDDD",
        bgcolor: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9A9A9A",
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: "nowrap",
        mt:2
      }}
    >
      {label}
    </Box>
  );
}

function BottomMetaItem({ icon, label, value, color }) {
  return (
    <Stack direction="row-reverse" alignItems="center" spacing={0.9} gap={0.9} sx={{mt:2}}>
     
      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ color: "#263238", fontSize: 14, fontWeight: 800 }}>
          {label}
        </Typography>
        <Typography
          sx={{ mt: 0.2, color: "#8A8A8A", fontSize: 13, fontWeight: 500 }}
        >
          {value}
        </Typography>
      </Box>
       <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          bgcolor: "#EEF4FF",
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

export default function TestDetailsOverview() {
  return (
    <Box
      sx={{
        mt: 1.2,
        width: "100%",
        minHeight: 465,
        borderRadius: "10px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
        px: { xs: 1.6, md: 2.2 },
        py: { xs: 2.2, md: 2.6 },
        direction: "rtl",
        overflow: "hidden",
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
                sx={{ color: "#263238", fontSize: 20, fontWeight: 800 }}
              >
                جيني تحسين أسير
              </Typography>
            </Stack>
            <Typography
              sx={{ mt: 0.9, color: "#6B6B6B", fontSize: 14, fontWeight: 500 }}
            >
              <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                2K
              </Box>{" "}
              متابع .{" "}
              <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                500
              </Box>{" "}
              تقييم .{" "}
              <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                14
              </Box>{" "}
              اختبار
            </Typography>
          </Box>
          <Box
            component="img"
            src={authorImage}
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

      <Box sx={{ mt: 1.7, textAlign: "right" }}>
        <Typography sx={{ color: "#263238", fontSize: 23, fontWeight: 800 }}>
          جلسة امتحانية أولى
        </Typography>
        <Typography
          sx={{
            mt: 0.9,
            color: "#8A8A8A",
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
          هذه الأسئلة تساعدك على الخوض في مادة خوارزميات البحث الذكية وبكل ثقة
          والتقدم للامتحان ونيل أعلى الدرجات بسهولة مطلقة وبدون عناء أو جهد يذكر
          أبدا عزيزي الطالب
        </Typography>
      </Box>

      <Stack
        direction="row"
        alignItems="flex-start"
        sx={{ mt: 2.2, width: "100%" }}
      >
        {testFacts.map((item, index) => (
          <TestFactItem
            key={item.label}
            {...item}
            showDivider={index !== testFacts.length - 1}
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        gap={1}
        sx={{ mt: 2.1, justifyContent: "flex-start"  , mr:4}}
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
        sx={{ mt: 1.5, justifyContent: "flex-start" , mr:3 }}
      >
        {bottomMeta.map((item) => (
          <BottomMetaItem key={item.label} {...item} />
        ))}
      </Stack>
    </Box>
  );
}

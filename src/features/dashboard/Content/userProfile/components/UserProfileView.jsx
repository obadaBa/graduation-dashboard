import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ContentLibraryBoard from "../../components/ContentLibraryBoard";
import UserProfileAppBar from "./UserProfileAppBar";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileListsPanel from "./UserProfileListsPanel";
import UserProfileTestsPanel from "./UserProfileTestsPanel";

const coverImage =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80";
const avatarImage =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80";

const reviewLevels = [
  { label: "نجوم 5", value: 0.9 },
  { label: "نجوم 4", value: 0.78 },
  { label: "نجوم 3", value: 0.67 },
  { label: "نجوم 2", value: 0.58 },
  { label: "نجوم 1", value: 0.52 },
];

const profileTags = [
  "# علوم أساسية",
  "# برمجة",
  "# الذكاء الاصطناعي",
  "# علوم الحاسوب",
  "# هندسة الآلات والتحكم",
];

const profileStats = [
  {
    value: "28k",
    label: "لايكات المحتوى",
    icon: <ThumbUpRoundedIcon sx={{ fontSize: 21 }} />,
  },
  {
    value: "463",
    label: "تعليقات الاختبارات",
    icon: <ChatRoundedIcon sx={{ fontSize: 21 }} />,
  },
  {
    value: "19",
    label: "اختبار محفوظ",
    icon: <BookmarkRoundedIcon sx={{ fontSize: 21 }} />,
  },
];

function BasicInfoItem({ icon, label, value, color }) {
  return (
    <Stack
      spacing={0.7}
      alignItems="center"
      sx={{
        minWidth: 108,
        px: 2,
      }}
    >
      <Box sx={{ color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </Box>
      <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography sx={{ color: "#8F8F8F", fontSize: 15, fontWeight: 500 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function TagChip({ label }) {
  return (
    <Box
      sx={{
        px: 1.3,
        py: 0.85,
        borderRadius: "6px",
        bgcolor: "#F4F7FF",
        color: "#5C84FF",
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

function ProfileStatCard({ value, label, icon }) {
  return (
    <Box
      sx={{
        minWidth: { xs: "100%", sm: 118 },
        maxWidth: { xs: "100%", sm: 126 },
        flex: { xs: 1, sm: "0 0 auto" },
        px: 1.6,
        py: 1.6,
        borderRadius: "16px",
        bgcolor: "#F7F7F7",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography sx={{ color: "#263238", fontSize: 24, fontWeight: 800 }}>
          {value}
        </Typography>
      </Stack>

      <Typography
        sx={{
          mt: 1.1,
          color: "#5F6368",
          fontSize: 15,
          fontWeight: 500,
          textAlign: "right",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function UserProfileView() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFFFFF",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        overflow: "hidden",
      }}
    >
      <UserProfileHeader />
      <UserProfileAppBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "tests" ? (
        <UserProfileTestsPanel />
      ) : activeTab === "content" ? (
        <ContentLibraryBoard />
      ) : activeTab === "lists" ? (
        <UserProfileListsPanel />
      ) : (
        <Box
          sx={{
            mt: 0.8,
            width: "100%",
            minHeight: 420,
            borderRadius: "18px",
            border: "1px solid #EAEAEA",
            bgcolor: "#FFFFFF",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={coverImage}
              alt="cover"
              sx={{
                width: "100%",
                height: { xs: 170, md: 210 },
                objectFit: "cover",
                display: "block",
              }}
            />

            <Box
              component="img"
              src={avatarImage}
              alt="user"
              sx={{
                position: "absolute",
                right: { xs: 18, md: 42 },
                bottom: { xs: -46, md: -56 },
                width: { xs: 92, md: 118 },
                height: { xs: 92, md: 118 },
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #FFFFFF",
                boxShadow: "0 10px 22px rgba(15, 23, 42, 0.10)",
                bgcolor: "#FFFFFF",
              }}
            />
          </Box>

          <Box
            sx={{
              px: { xs: 2, md: 4 },
              pt: { xs: 4.1, md: 4.4 },
              pb: 2.2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                direction: "rtl",
              }}
            >
              <Box sx={{ textAlign: "right", pr: { xs: 0, md: 14 }, mt: { xs: -0.4, md: -1.7 } }}>
                <Stack
                  direction="row-reverse"
                  spacing={0.7}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Typography sx={{ color: "#263238", fontSize: { xs: 24, md: 26 }, fontWeight: 800 }}>
                    جيني تحسين أسير
                  </Typography>
                  <VerifiedRoundedIcon sx={{ fontSize: 22, color: "#5C84FF" }} />
                </Stack>

                <Typography sx={{ mt: 0.6, color: "#6B6B6B", fontSize: { xs: 16, md: 17 }, fontWeight: 500 }}>
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

              <Stack
                direction="row-reverse"
                spacing={2.4}
                alignItems="center"
                sx={{ flexShrink: 0, mt: { xs: -0.4, md: -1.5 }, ml: 10 }}
                gap={45}
              >
                <Button
                  endIcon={<ArrowBackRoundedIcon sx={{ fontSize: 16, mr: 1 }} />}
                  sx={{
                    minWidth: 128,
                    height: 30,
                    px: 1,
                    mr: { xs: 0, md: 2.5 },
                    borderRadius: "999px",
                    bgcolor: "#F4F4F4",
                    color: "#9E9E9E",
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0,
                    "&:hover": {
                      bgcolor: "#F4F4F4",
                    },
                  }}
                >
                  عرض الشهادة الجامعية
                </Button>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#6E6E6E", fontSize: 16, fontWeight: 600 }}>
                    تم توثيقه بتاريخ
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#A0A0A0", fontSize: 16, fontWeight: 500 }}>
                    12\02\2026
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ mt: 2, pt: 2 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "0.82fr 1.18fr" },
                  gap: { xs: 3, md: 59 },
                  alignItems: "start",
                  direction: "rtl",
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ color: "#263238", fontSize: 22, fontWeight: 800, mr: 3 }}>
                    معلومات أساسية
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{ mt: 2.4 }}
                  >
                    <BasicInfoItem
                      icon={<SchoolOutlinedIcon sx={{ fontSize: 34 }} />}
                      label="المستوى"
                      value="جامعة"
                      color="#2AA8FF"
                    />

                    <BasicInfoItem
                      icon={<HourglassEmptyRoundedIcon sx={{ fontSize: 34 }} />}
                      label="انضم في"
                      value="2025\\01\\22"
                      color="#FF5C4D"
                    />

                    <Box sx={{ width: "1px", height: 92, bgcolor: "#ECECEC" }} />

                    <BasicInfoItem
                      icon={<WcRoundedIcon sx={{ fontSize: 34 }} />}
                      label="الجنس"
                      value="أنثى"
                      color="#FFB300"
                    />

                    <Box sx={{ width: "1px", height: 92, bgcolor: "#ECECEC" }} />

                    <BasicInfoItem
                      icon={<LocationOnOutlinedIcon sx={{ fontSize: 34 }} />}
                      label="المحافظة"
                      value="دمشق"
                      color="#66D14A"
                    />

                    <Box sx={{ width: "1px", height: 92, bgcolor: "#ECECEC" }} />
                  </Stack>
                </Box>

                <Stack
                  direction="row-reverse"
                  alignItems="flex-start"
                  spacing={2.2}
                  sx={{ maxWidth: 530, justifySelf: "center", width: "100%" }}
                  gap={20}
                >
                  <Stack spacing={1} sx={{ mt: 0.3, minWidth: 310, flex: 1 }}>
                    {reviewLevels.map((item) => (
                      <Stack
                        key={item.label}
                        direction="row-reverse"
                        alignItems="center"
                        spacing={0.9}
                      >
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
                        <Typography
                          sx={{ minWidth: 46, color: "#8F8F8F", fontSize: 13, fontWeight: 500 }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack spacing={0.7} sx={{ minWidth: 150 }}>
                    <Typography sx={{ color: "#263238", fontSize: 22, fontWeight: 800, textAlign: "right" }}>
                      المراجعات
                    </Typography>

                    <Typography sx={{ color: "#263238", fontSize: 21, fontWeight: 800, textAlign: "right" }}>
                      5 / <Box component="span" sx={{ color: "#5C84FF" }}>4.3</Box>
                    </Typography>

                    <Typography sx={{ color: "#8F8F8F", fontSize: 14, fontWeight: 500, textAlign: "right" }}>
                      2K تقييم . 18 اختبار
                    </Typography>

                    <Stack
                      direction="row-reverse"
                      justifyContent="flex-start"
                      spacing={0.05}
                      sx={{ pt: 0.3 }}
                    >
                      <StarRoundedIcon sx={{ fontSize: 31, color: "#E7E7E7" }} />
                      {[0, 1, 2, 3].map((item) => (
                        <StarRoundedIcon key={item} sx={{ fontSize: 31, color: "#FFC933" }} />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Box>

              <Box
                sx={{
                  mt: 2.1,
                  pt: 0.4,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
                  gap: { xs: 3, lg: 4 },
                  alignItems: "start",
                  direction: "rtl",
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ color: "#263238", fontSize: 22, fontWeight: 800 }}>
                    إحصائيات عامة
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    useFlexGap
                    gap={2.2}
                    sx={{ mt: 0.5, width: "100%", justifyContent: "flex-start" }}
                  >
                    {profileStats.map((item) => (
                      <ProfileStatCard
                        key={item.label}
                        value={item.value}
                        label={item.label}
                        icon={item.icon}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Stack direction="row-reverse" useFlexGap flexWrap="wrap" gap={1.2}>
                    {profileTags.map((tag) => (
                      <TagChip key={tag} label={tag} />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

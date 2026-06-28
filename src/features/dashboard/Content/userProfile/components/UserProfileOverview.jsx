import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
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
import { useUserProfileOverviewQuery } from "../../hooks/useUserProfileOverviewQuery";
import { useUserAcademicCertificateMutation } from "../../hooks/useUserAcademicCertificateMutation";
import AcademicCertificateModal from "./AcademicCertificateModal";
import UserConnectionsSlide from "./UserConnectionsSlide";

const fallbackCoverImage =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80";
const fallbackAvatarImage =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80";

function formatCount(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function BasicInfoItem({ icon, label, value, color }) {
  return (
    <Stack
      spacing={0.7}
      alignItems="center"
      sx={{
        minWidth: 125,
        px: 1.5,
      }}
    >
      <Box sx={{ color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </Box>
      <Typography sx={{ color: "#263238", fontSize: 16, fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          color: "#8F8F8F",
          fontSize: 15,
          fontWeight: 500,
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
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
        minWidth: { xs: "100%", sm: 148 },
        maxWidth: { xs: "100%", sm: 165 },
        flex: { xs: 1, sm: "0 0 auto" },
        px: 2,
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

function VerificationInfo({ header, onShowCertificate }) {
  const verifierRole =
    header.verified_by?.role === "owner"
      ? "مالك التطبيق"
      : header.verified_by?.role === "supervisor"
        ? "مشرف"
        : header.verified_by?.role || "";

  return (
    <Box sx={{ width: "100%", textAlign: "right", direction: "rtl" }}>
      <Stack direction="row" alignItems="center" spacing={0.8}>
        <Typography
          sx={{
            color: "#6E6E6E",
            fontSize: 16,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {header.verified_by ? "تم توثيقه بواسطة" : "تم توثيقه بتاريخ"}
        </Typography>

        {header.verified_by && (
          <>
            <Avatar
              src={header.verified_by.avatar}
              alt={header.verified_by.name}
              sx={{ width: 32, height: 32, bgcolor: "#E5E5E5" }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: "#263238",
                  fontSize: 13,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {header.verified_by.name}
              </Typography>
              <Typography
                sx={{
                  color: "#A0A0A0",
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {verifierRole}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
      <Typography
        sx={{
          mt: 0.4,
          color: "#A0A0A0",
          fontSize: 16,
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {header.academically_verified_at || "-"}
      </Typography>
      {header.is_academically_verified && (
        <Button
          onClick={onShowCertificate}
          endIcon={
            <ArrowBackRoundedIcon sx={{ fontSize: 16, mr: 1 }} />
          }
          sx={{
            mt: 1.1,
            minWidth: 150,
            height: 30,
            px: 1.3,
            borderRadius: "999px",
            bgcolor: "#F4F4F4",
            color: "#9E9E9E",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#F4F4F4",
            },
          }}
        >
          عرض الشهادة الجامعية
        </Button>
      )}
    </Box>
  );
}

export default function UserProfileOverview() {
  const { userId } = useParams();
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");
  const [connectionsType, setConnectionsType] = useState(null);
  const profileQuery = useUserProfileOverviewQuery(userId);
  const certificateMutation = useUserAcademicCertificateMutation();
  const profile = profileQuery.data?.data || {};
  const header = profile.header || {};
  const basicInfo = profile.basic_info || {};
  const generalStats = profile.general_stats || {};
  const reviews = profile.reviews || {};
  const ratingDistribution = reviews.rating_distribution || {};
  const hasCustomCover =
    Boolean(header.cover) &&
    !String(header.cover).includes("/defaults/default-cover.svg");
  const coverImage = hasCustomCover ? header.cover : fallbackCoverImage;
  const avatarImage = header.avatar || fallbackAvatarImage;
  const reviewLevels = [5, 4, 3, 2, 1].map((rating) => ({
    label: `نجوم ${rating}`,
    value: Number(ratingDistribution[rating]?.percentage || 0) / 100,
  }));
  const profileTags = (basicInfo.interests || []).map(
    (interest) => `# ${interest}`,
  );
  const profileStats = [
    {
      value: formatCount(generalStats.test_likes_count),
      label: "إعجابات الاختبارات",
      icon: <ThumbUpRoundedIcon sx={{ fontSize: 21 }} />,
    },
    {
      value: formatCount(generalStats.test_reviews_count),
      label: "تعليقات الاختبارات",
      icon: <ChatRoundedIcon sx={{ fontSize: 21 }} />,
    },
    {
      value: formatCount(generalStats.test_bookmark_count),
      label: "اختبار محفوظ",
      icon: <BookmarkRoundedIcon sx={{ fontSize: 21 }} />,
    },
  ];
  const roundedRating = Math.round(Number(reviews.average_rating || 0));

  useEffect(() => {
    return () => {
      if (certificateUrl) URL.revokeObjectURL(certificateUrl);
    };
  }, [certificateUrl]);

  const handleShowCertificate = async () => {
    setCertificateUrl("");
    setIsCertificateOpen(true);

    try {
      const certificateBlob = await certificateMutation.mutateAsync(userId);
      setCertificateUrl(URL.createObjectURL(certificateBlob));
    } catch {
      setCertificateUrl("");
    }
  };

  const handleCloseCertificate = () => {
    setIsCertificateOpen(false);
    setCertificateUrl("");
    certificateMutation.reset();
  };

  if (profileQuery.isLoading) {
    return (
      <Box sx={{ py: 12, display: "flex", justifyContent: "center" }}>
        <CircularProgress size={34} />
      </Box>
    );
  }

  if (!profileQuery.data?.data) {
    return (
      <Typography
        sx={{
          py: 12,
          color: "#8A8A8A",
          fontSize: 16,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        تعذر عرض معلومات المستخدم
      </Typography>
    );
  }

  return (
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
              onError={(event) => {
                event.currentTarget.src = fallbackCoverImage;
              }}
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
                    {header.name || "-"}
                  </Typography>
                  {header.is_academically_verified && (
                    <VerifiedRoundedIcon
                      sx={{ fontSize: 22, color: "#5C84FF" }}
                    />
                  )}
                </Stack>

                <Typography
                  component="div"
                  sx={{ mt: 0.6, color: "#6B6B6B", fontSize: { xs: 16, md: 17 }, fontWeight: 500 }}
                >
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setConnectionsType("followers")}
                    sx={{
                      border: 0,
                      p: 0,
                      bgcolor: "transparent",
                      color: "inherit",
                      font: "inherit",
                      cursor: "pointer",
                      "&:hover": { color: "#5583FF" },
                    }}
                  >
                    <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                      {formatCount(header.followers_count)}
                    </Box>{" "}
                    متابع
                  </Box>{" "}
                  .{" "}
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setConnectionsType("following")}
                    sx={{
                      border: 0,
                      p: 0,
                      bgcolor: "transparent",
                      color: "inherit",
                      font: "inherit",
                      cursor: "pointer",
                      "&:hover": { color: "#5583FF" },
                    }}
                  >
                    <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                      {formatCount(header.following_count)}
                    </Box>{" "}
                    يتابع
                  </Box>{" "}
                  .{" "}
                  <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                    {formatCount(header.published_tests_count)}
                  </Box>{" "}
                  اختبار
                </Typography>
              </Box>

              <Box
                sx={{
                  maxWidth: 560,
                  width: "100%",
                  flexShrink: 1,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "minmax(240px, 280px) minmax(210px, 240px)",
                    },
                    columnGap: 3,
                    direction: "ltr",
                  }}
                >
                  <Box sx={{ display: { xs: "none", md: "block" } }} />
                  <VerificationInfo
                    header={header}
                    onShowCertificate={handleShowCertificate}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 0.7, pt: 0.5 }}>
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
                      value={basicInfo.education_level || "-"}
                      color="#2AA8FF"
                    />
  <Box sx={{ width: "1px", height: 92, bgcolor: "#ECECEC" }} />
                    <BasicInfoItem
                      icon={<HourglassEmptyRoundedIcon sx={{ fontSize: 34 }} />}
                      label="انضم في"
                      value={basicInfo.joined_at || "-"}
                      color="#FF5C4D"
                    />

                    <Box sx={{ width: "1px", height: 92, bgcolor: "#ECECEC" }} />

                    <BasicInfoItem
                      icon={<WcRoundedIcon sx={{ fontSize: 34 }} />}
                      label="الجنس"
                      value={basicInfo.gender || "-"}
                      color="#FFB300"
                    />

                    <Box sx={{ width: "1px", height: 92, bgcolor: "#ECECEC" }} />

                    <BasicInfoItem
                      icon={<LocationOnOutlinedIcon sx={{ fontSize: 34 }} />}
                      label="المحافظة"
                      value={basicInfo.governorate || "-"}
                      color="#66D14A"
                    />

                  
                  </Stack>
                </Box>

                <Box
                  sx={{
                    maxWidth: 560,
                    justifySelf: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(240px, 280px) minmax(210px, 240px)",
                      },
                      columnGap: 3,
                      rowGap: 2,
                      alignItems: "start",
                      direction: "ltr",
                      transform: "translateY(12px)",
                    }}
                  >
                    <Stack spacing={1} sx={{ minWidth: 0 }}>
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
                            sx={{
                              minWidth: 46,
                              color: "#8F8F8F",
                              fontSize: 13,
                              fontWeight: 500,
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Stack
                      spacing={0.7}
                      alignItems="flex-start"
                      sx={{ minWidth: 0, width: "100%", direction: "rtl" , ml:8}}
                    >
                      <Typography
                        sx={{
                          color: "#263238",
                          fontSize: 22,
                          fontWeight: 800,
                          textAlign: "right",
                        }}
                      >
                        المراجعات
                      </Typography>

                      <Typography
                        sx={{
                          color: "#263238",
                          fontSize: 21,
                          fontWeight: 800,
                          textAlign: "right",
                        }}
                      >
                        5 /{" "}
                        <Box component="span" sx={{ color: "#5C84FF" }}>
                          {Number(reviews.average_rating || 0).toFixed(1)}
                        </Box>
                      </Typography>

                      <Typography
                        sx={{
                          color: "#8F8F8F",
                          fontSize: 14,
                          fontWeight: 500,
                          textAlign: "right",
                        }}
                      >
                        {formatCount(reviews.total_ratings)} تقييم
                      </Typography>

                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={0.05}
                        sx={{ pt: 0.3, width: "100%", direction: "ltr" }}
                      >
                        {[0, 1, 2, 3, 4].map((item) => (
                          <StarRoundedIcon
                            key={item}
                            sx={{
                              fontSize: 31,
                              color:
                                item < roundedRating ? "#FFC933" : "#E7E7E7",
                            }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 0.7,
                  pt: 0,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
                  gap: { xs: 3, lg: 4 },
                  alignItems: "start",
                  direction: "rtl",
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      color: "#263238",
                      fontSize: 22,
                      fontWeight: 800,
                      textAlign: "right",
                      mr: 3,
                    }}
                  >
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
      <AcademicCertificateModal
        open={isCertificateOpen}
        onClose={handleCloseCertificate}
        imageUrl={certificateUrl}
        isLoading={certificateMutation.isPending}
      />
      <UserConnectionsSlide
        open={Boolean(connectionsType)}
        type={connectionsType}
        userId={userId}
        onClose={() => setConnectionsType(null)}
      />
    </Box>
  );
}

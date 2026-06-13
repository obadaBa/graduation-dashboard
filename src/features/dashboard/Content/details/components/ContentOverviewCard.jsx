import { Box, Stack, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useNavigate } from "react-router";
import { CONTENT_ITEMS } from "../../content.mock";

function StatBox({ icon, value }) {
  return (
    <Box
      sx={{
        width: 52,
        height: 62,
        borderRadius: "6px",
        border: "1px solid #D8D8D8",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.2,
        color: "#263238",
        flexShrink: 0,
      }}
    >
      {icon}
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#5B5B5B", lineHeight: 1 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function ContentOverviewCard() {
  const navigate = useNavigate();
  const mediaItems = CONTENT_ITEMS.slice(0, 3);

  return (
    <Box
      sx={{
        mt: 2.8,
        width: "100%",
        borderRadius: "18px",
        border: "1px solid #EAEAEA",
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 2.2 },
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack direction="row-reverse" spacing={0} alignItems="center" gap={2}>
          <Box sx={{ textAlign: "right" }}>
            <Stack
              direction="row-reverse"
              spacing={0}
              alignItems="center"
              justifyContent="flex-start"
              sx={{ ml: 5 }}
            >
              <VerifiedRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />
              <Typography
                onClick={() => navigate("/user-profile/1")}
                sx={{
                  color: "#263238",
                  fontSize: 20,
                  fontWeight: 800,
                  textAlign: "right",
                  cursor: "pointer",
                }}
              >
                جيني تحسين أسير
              </Typography>
            </Stack>

            <Typography sx={{ mt: 0.6, color: "#7A7A7A", fontSize: 17, fontWeight: 500 }}>
              <Box component="span" sx={{ color: "#263238", fontSize: 17, fontWeight: 800 }}>
                2K
              </Box>{" "}
              متابع .{" "}
              <Box component="span" sx={{ color: "#263238", fontSize: 17, fontWeight: 800 }}>
                500
              </Box>{" "}
              تقييم .{" "}
              <Box component="span" sx={{ color: "#263238", fontSize: 17, fontWeight: 800 }}>
                14
              </Box>{" "}
              اختبار
            </Typography>
          </Box>

          <Box
            component="img"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=140&q=80"
            alt="author"
            onClick={() => navigate("/user-profile/1")}
            sx={{
              width: 72,
              height: 72,
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
              cursor: "pointer",
            }}
          />
        </Stack>

        <Stack direction="row-reverse" spacing={1}>
          <StatBox icon={<FavoriteBorderRoundedIcon sx={{ fontSize: 26 }} />} value="125" />
          <StatBox icon={<BookmarkBorderRoundedIcon sx={{ fontSize: 24 }} />} value="65" />
          <StatBox icon={<DownloadRoundedIcon sx={{ fontSize: 26 }} />} value="8" />
        </Stack>
      </Box>

      <Box
        sx={{
          mt: 2.3,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            minWidth: 70,
            height: 32,
            px: 1.6,
            borderRadius: "6px",
            border: "1px solid #E3E3E3",
            bgcolor: "#F7F7F7",
            color: "#8C8C8C",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          اعدادي
        </Box>

        <Box sx={{ textAlign: "right", flex: 1 }}>
          <Typography sx={{ color: "#263238", fontSize: 23, fontWeight: 800, lineHeight: 1.2 }}>
            جلسة امتحانية أولى
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              color: "#9A9A9A",
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            هذه الأسئلة تساعدك على الخوض في مادة خوارزميات البحث الذكية وبكل ثقة للتقدم
            للامتحان ونيل أعلى الدرجات
            <br />
            بسهولة مطلقة وبدون عناء او جهد يذكر ابداً عزيزي الطالب
          </Typography>

          <Stack
            direction="row-reverse"
            spacing={1.2}
            gap={1}
            flexWrap="wrap"
            sx={{ mt: 1, justifyContent: "flex-end" }}
          >
            <Box
              sx={{
                minWidth: 74,
                height: 32,
                px: 1.6,
                borderRadius: "8px",
                bgcolor: "#EFCFFF",
                color: "#8D5AE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              صورة
            </Box>

            <Box
              sx={{
                minWidth: 88,
                height: 32,
                px: 1.5,
                borderRadius: "8px",
                bgcolor: "#EEF2FF",
                color: "#5C84FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              # برمجة
            </Box>

            <Box
              sx={{
                minWidth: 126,
                height: 32,
                px: 1.5,
                borderRadius: "8px",
                bgcolor: "#EEF2FF",
                color: "#5C84FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              # علوم اساسية
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2.8,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "56px 1fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <Stack
          direction="row-reverse"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ pt: 0.1 }}
        >
          <Box
            sx={{
              width: "2px",
              height: 250,
              mx: 1,
              bgcolor: "#D6D6D6",
              flexShrink: 0,
            }}
          />
          <CategoryOutlinedIcon sx={{ fontSize: 30, color: "#263238" }} />
        </Stack>

        <Box sx={{ textAlign: "right", mr: 1.5 }}>
          <Stack direction="row" alignItems="center" spacing={0.8} gap={0.8} justifyContent="flex-start">
            <Typography sx={{ color: "#263238", fontSize: 22, fontWeight: 800 }}>
              الوسائط
            </Typography>
            <Box
              sx={{
                minWidth: 22,
                height: 18,
                px: 0.6,
                borderRadius: "999px",
                bgcolor: "#5C84FF",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              3
            </Box>
          </Stack>

          <Typography
            sx={{
              mt: 0.8,
              color: "#8F8F8F",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            قسم الوسائط الذي قام المستخدم بمشاركته للعامة ليقوم المستخدمين
            <br />
            بالاستفادة منه والاطلاع عليه بشكل واضح وسهل
          </Typography>

          <Stack direction="row-reverse" spacing={1.2} sx={{ mt: 1.6, justifyContent: "flex-end" }}>
            {mediaItems.map((media) => (
              <Box
                key={media.id}
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: "10px",
                  border: "1px solid #D6D6D6",
                  overflow: "hidden",
                  bgcolor: "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={media.imageSrc}
                  alt={media.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

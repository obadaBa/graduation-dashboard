import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

function createImagePlaceholder() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
      <rect width="220" height="220" rx="22" fill="#EEF3FF"/>
      <rect x="24" y="24" width="172" height="172" rx="18" fill="#FFFFFF" stroke="#BFCBDE" stroke-width="3"/>
      <circle cx="76" cy="78" r="19" fill="#FFD86B"/>
      <path d="M42 166l45-48 31 31 22-22 38 39H42z" fill="#78A3FF"/>
      <path d="M42 166l45-48 18 18-28 30H42z" fill="#5AD1A3"/>
      <text x="110" y="48" text-anchor="middle" font-family="Arial" font-size="13" font-weight="700" fill="#52637D">IMAGE PREVIEW</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

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
      <Typography
        sx={{ fontSize: 12, fontWeight: 500, color: "#5B5B5B", lineHeight: 1 }}
      >
        {formatNumber(value)}
      </Typography>
    </Box>
  );
}

function AssetPreview({ asset, contentType }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isImage =
    contentType === "صورة" ||
    /\.(png|jpe?g|gif|webp|svg)$/i.test(asset?.url || "");
  const placeholder = useMemo(createImagePlaceholder, []);
  const [imageSource, setImageSource] = useState(asset?.url || placeholder);

  return (
    <>
      {isImage ? (
      <Box
        component="img"
        src={imageSource}
        alt={asset?.original_name}
        onError={() => setImageSource(placeholder)}
        onClick={() => setIsPreviewOpen(true)}
        sx={{
          width: 92,
          height: 92,
          borderRadius: "10px",
          border: "1px solid #D6D6D6",
          bgcolor: "#F7F9FF",
          flexShrink: 0,
          objectFit: "cover",
          display: "block",
          cursor: "pointer",
        }}
      />
      ) : (
        <Box
          component="button"
          type="button"
          onClick={() => asset?.url && setIsPreviewOpen(true)}
          sx={{
            width: 92,
            height: 92,
            borderRadius: "10px",
            border: "1px solid #D6D6D6",
            bgcolor: "#F7F9FF",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.6,
            color: "#5583FF",
            p: 1,
            cursor: asset?.url ? "pointer" : "default",
            font: "inherit",
          }}
        >
          <DescriptionOutlinedIcon sx={{ fontSize: 30 }} />
          <Typography
            sx={{
              width: "100%",
              color: "#6E7781",
              fontSize: 9,
              fontWeight: 700,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {asset?.original_name || "ملف"}
          </Typography>
        </Box>
      )}

      <Modal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        slotProps={{
          backdrop: {
            sx: {
              bgcolor: "rgba(10, 12, 16, 0.72)",
              backdropFilter: "blur(5px)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "calc(100% - 24px)", md: "min(960px, 88vw)" },
            height: { xs: "calc(100vh - 32px)", md: "86vh" },
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
            overflow: "hidden",
            outline: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1.5, py: 1, borderBottom: "1px solid #E4E4E4" }}
          >
            <Typography
              sx={{
                minWidth: 0,
                color: "#263238",
                fontSize: 15,
                fontWeight: 800,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {asset?.original_name || (isImage ? "معاينة الصورة" : "معاينة الملف")}
            </Typography>
            <IconButton
              onClick={() => setIsPreviewOpen(false)}
              aria-label="إغلاق المعاينة"
              sx={{ color: "#263238" }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              bgcolor: isImage ? "#17191E" : "#F2F3F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isImage ? (
              <Box
                component="img"
                src={imageSource}
                alt={asset?.original_name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            ) : (
              <Box
                component="iframe"
                src={asset?.url}
                title={asset?.original_name || "معاينة الملف"}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  bgcolor: "#FFFFFF",
                }}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default function ContentOverviewCard({
  contentDetails,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const publisher = contentDetails?.publisher || {};
  const content = contentDetails?.content || {};
  const statistics = contentDetails?.statistics || {};
  const assets = content.assets || [];

  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 2.8,
          width: "100%",
          borderRadius: "18px",
          border: "1px solid #EAEAEA",
          bgcolor: "#FFFFFF",
          p: 3,
        }}
      >
        <Skeleton height={80} />
        <Skeleton height={130} />
        <Skeleton height={150} />
      </Box>
    );
  }

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
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Box
            component="img"
            src={publisher.avatar_url}
            alt={publisher.name}
            onClick={() => navigate(`/user-profile/${publisher.id}`)}
            sx={{
              width: 72,
              height: 72,
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
              cursor: "pointer",
              bgcolor: "#F1F1F1",
            }}
          />

          <Box sx={{ textAlign: "right" }}>
            <Stack direction="row" alignItems="center" gap={0.6}>
              <Typography
                onClick={() => navigate(`/user-profile/${publisher.id}`)}
                sx={{
                  color: "#263238",
                  fontSize: 20,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {publisher.name || "-"}
              </Typography>
              {publisher.is_academically_verified && (
                <VerifiedRoundedIcon sx={{ fontSize: 18, color: "#5C84FF" }} />
              )}
            </Stack>

            <Typography
              sx={{ mt: 0.6, color: "#7A7A7A", fontSize: 15, fontWeight: 500 }}
            >
              <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                {formatNumber(publisher.followers_count)}
              </Box>{" "}
              متابع .{" "}
              <Box component="span" sx={{ color: "#263238", fontWeight: 800 }}>
                {formatNumber(publisher.following_count)}
              </Box>{" "}
              يتابع
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} gap={1}>
          <StatBox
            icon={<FavoriteBorderRoundedIcon sx={{ fontSize: 26 }} />}
            value={statistics.like_count}
          />
          <StatBox
            icon={<BookmarkBorderRoundedIcon sx={{ fontSize: 24 }} />}
            value={statistics.bookmarks_count}
          />
          <StatBox
            icon={<DownloadRoundedIcon sx={{ fontSize: 26 }} />}
            value={statistics.download_count}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          mt: 2.3,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "right", flex: 1, minWidth: 0 }}>
          <Typography
            sx={{ color: "#263238", fontSize: 23, fontWeight: 800, lineHeight: 1.35 }}
          >
            {content.title || "-"}
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              color: "#8E8E8E",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            {content.description || "-"}
          </Typography>

          <Stack
            direction="row"
            gap={1}
            flexWrap="wrap"
            sx={{ mt: 1.4 }}
          >
            <Box
              sx={{
                minWidth: 74,
                height: 30,
                px: 1.5,
                borderRadius: "7px",
                bgcolor: "#EFCFFF",
                color: "#8D5AE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {content.type || "-"}
            </Box>

            {(content.interests || []).map((interest) => (
              <Box
                key={interest}
                sx={{
                  height: 30,
                  px: 1.5,
                  borderRadius: "7px",
                  bgcolor: "#EEF2FF",
                  color: "#5C84FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                # {interest}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            minWidth: 90,
            px: 1.5,
            py: 0.8,
            borderRadius: "6px",
            border: "1px solid #E3E3E3",
            bgcolor: "#F7F7F7",
            color: "#8C8C8C",
            fontSize: 13,
            fontWeight: 700,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {content.target_level || "-"}
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
        <Stack direction="row" alignItems="flex-start">
          <CategoryOutlinedIcon sx={{ fontSize: 30, color: "#263238" }} />
          <Box sx={{ width: "2px", minHeight: 130, mx: 1, bgcolor: "#D6D6D6" }} />
        </Stack>

        <Box sx={{ textAlign: "right" }}>
          <Stack direction="row" alignItems="center" gap={0.8}>
            <Typography sx={{ color: "#263238", fontSize: 22, fontWeight: 800 }}>
              الوسائط
            </Typography>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "999px",
                bgcolor: "#5C84FF",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              {content.asset_count ?? assets.length}
            </Box>
          </Stack>

          <Typography
            sx={{
              mt: 0.8,
              color: "#8F8F8F",
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.7,
            }}
          >
            الوسائط التي شاركها المستخدم ضمن هذا المحتوى.
          </Typography>

          <Stack direction="row" gap={1.2} flexWrap="wrap" sx={{ mt: 1.6 }}>
            {assets.map((asset) => (
              <AssetPreview
                key={asset.id}
                asset={asset}
                contentType={content.type}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

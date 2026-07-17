import { useEffect, useMemo, useState } from "react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Box, Stack, Typography } from "@mui/material";

function createFallbackPreview(type) {
  const isImage = type === "صورة";
  const label = isImage ? "IMAGE" : "DOCUMENT";
  const accent = isImage ? "#E8F1FF" : "#F1EAFF";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="200" viewBox="0 0 240 200">
      <rect width="240" height="200" rx="18" fill="#fff"/>
      <rect x="16" y="14" width="208" height="172" rx="14" fill="${accent}" stroke="#B9C5D8" stroke-width="2"/>
      <rect x="38" y="36" width="164" height="18" rx="7" fill="#fff" opacity=".9"/>
      <rect x="38" y="68" width="118" height="10" rx="5" fill="#AFC0D8"/>
      <rect x="38" y="88" width="164" height="10" rx="5" fill="#C7D3E4"/>
      <rect x="38" y="108" width="142" height="10" rx="5" fill="#C7D3E4"/>
      <rect x="38" y="136" width="70" height="28" rx="8" fill="#5583FF"/>
      <text x="120" y="49" text-anchor="middle" font-size="11" font-family="Arial" font-weight="700" fill="#40516B">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function PreviewSheet({ imageSrc, title, type }) {
  const fallbackSrc = useMemo(() => createFallbackPreview(type), [type]);
  const [source, setSource] = useState(imageSrc || fallbackSrc);

  useEffect(() => {
    setSource(imageSrc || fallbackSrc);
  }, [fallbackSrc, imageSrc]);

  return (
    <Box
      component="img"
      src={source}
      alt={title}
      onError={() => setSource(fallbackSrc)}
      sx={{
        width: { xs: 104, md: 112 },
        height: { xs: 94, md: 108 },
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.surface,
        objectFit: "cover",
        display: "block",
        boxShadow: (theme) => theme.palette.dashboard.shadow,
      }}
    />
  );
}

export default function ContentItemCard({ item, onClick }) {
  const tags = item?.tags || [];

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        minHeight: 148,
        borderBottom: (theme) =>
          `1px solid ${theme.palette.dashboard.chartBorder}`,
        py: 1.5,
        cursor: onClick ? "pointer" : "default",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "104px minmax(0, 1fr)",
            md: "112px minmax(0, 1fr) 72px",
          },
          alignItems: "center",
          columnGap: { xs: 1.5, md: 2 },
        }}
      >
        <PreviewSheet
          imageSrc={item?.imageSrc}
          title={item?.title}
          type={item?.type}
        />

        <Box sx={{ minWidth: 0, textAlign: "right" }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: { xs: 15, md: 17 },
              fontWeight: 800,
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {item?.title}
          </Typography>

          <Typography
            sx={{
              mt: 0.6,
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: { xs: 11, md: 12 },
              fontWeight: 500,
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {item?.description}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            sx={{ mt: 1.15, minWidth: 0 }}
          >
            <Stack
              direction="row"
              gap={0.65}
              sx={{ minWidth: 0, overflow: "hidden" }}
            >
              {tags.slice(0, 2).map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    maxWidth: 120,
                    height: 22,
                    px: 0.9,
                    borderRadius: "5px",
                    bgcolor: (theme) =>
                      theme.palette.dashboard.activeItem.background,
                    color: (theme) => theme.palette.dashboard.logoPrimary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap={0.45}
              sx={{ flexShrink: 0 }}
            >
              <AccessTimeRoundedIcon
                sx={{
                  color: (theme) => theme.palette.dashboard.chartTextSecondary,
                  fontSize: 16,
                }}
              />
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {item?.duration}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignSelf: "start",
            justifyContent: "center",
            pt: 0.7,
          }}
        >
          <Box
            sx={{
              minWidth: 54,
              height: 22,
              px: 0.9,
              borderRadius: "5px",
              bgcolor: item?.type === "صورة" ? "#8D5AE7" : "#5583FF",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.4,
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            {item?.type === "صورة" ? (
              <ImageOutlinedIcon sx={{ fontSize: 13 }} />
            ) : (
              <DescriptionOutlinedIcon sx={{ fontSize: 13 }} />
            )}
            {item?.type || "محتوى"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

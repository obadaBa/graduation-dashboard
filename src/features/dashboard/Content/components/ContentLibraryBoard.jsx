import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import ContentItemCard from "./ContentItemCard";
import ContentStatsPanel from "./ContentStatsPanel";

function mapMaterialToCard(material) {
  return {
    id: material.id,
    type: material.type || material.library_material_kind || "-",
    title: material.title || "-",
    description: material.description || "-",
    tags: (material.interests || []).map((interest) => `# ${interest}`),
    duration: material.published_at || "-",
    imageSrc: material.url_content || "",
  };
}

function mapStatistics(statistics = {}) {
  const filesCount =
    statistics.files_count ?? statistics.total_files_count ?? 0;
  const imagesCount =
    statistics.image_groups_count ?? statistics.total_images_count ?? 0;
  const usesImageGroups = statistics.image_groups_count != null;

  return [
    {
      id: "posts",
      title: "عدد المنشورات الكلي",
      value: Number(statistics.total_materials_count || 0).toLocaleString("en-US"),
      unit: "منشور",
    },
    {
      id: "files",
      title: "عدد الملفات الكلي",
      value: Number(filesCount).toLocaleString("en-US"),
      unit: "ملف",
    },
    {
      id: "images",
      title: usesImageGroups ? "عدد مجموعات الصور" : "عدد الصور الكلي",
      value: Number(imagesCount).toLocaleString("en-US"),
      unit: usesImageGroups ? "مجموعة" : "صورة",
    },
  ];
}

export default function ContentLibraryBoard({
  materialsQuery = {},
  statistics = {},
  isSearching = false,
}) {
  const navigate = useNavigate();
  const pages = materialsQuery.data?.pages || [];
  const directData = materialsQuery.data?.data || materialsQuery.data || {};
  const stats = mapStatistics(statistics);
  const materials = pages.length
    ? pages.flatMap((page) => page?.data?.materials || [])
    : directData.materials || [];
  const items = materials.map(mapMaterialToCard);

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const remainingScroll =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (
      remainingScroll < 180 &&
      materialsQuery.hasNextPage &&
      !materialsQuery.isFetchingNextPage &&
      materialsQuery.fetchNextPage
    ) {
      materialsQuery.fetchNextPage();
    }
  };

  return (
    <Box
      sx={{
        mt: 2.5,
        width: "100%",
        borderRadius: "18px",
        bgcolor: (theme) => theme.palette.dashboard.surface,
        boxShadow: (theme) => theme.palette.dashboard.shadow,
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        overflow: "hidden",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "180px 1fr 1fr",
          height: { xs: "auto", lg: "100%" },
          direction: "ltr",
        }}
      >
        <Box sx={{ display: { xs: "none", lg: "block" }, order: 1, height: "100%" }}>
          <ContentStatsPanel stats={stats} />
        </Box>

        <Box
          sx={{
            position: "relative",
            order: 2,
            gridColumn: { xs: "1 / -1", lg: "2 / 4" },
            height: { xs: "auto", lg: "100%" },
            minHeight: 0,
            "&::before": {
              content: '""',
              display: { xs: "none", lg: "block" },
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "3px",
              background: (theme) =>
                `repeating-linear-gradient(to bottom, ${theme.palette.dashboard.divider} 0 18px, transparent 18px 34px)`,
              pointerEvents: "none",
              zIndex: 2,
            },
          }}
        >
          <Box
            onScroll={handleScroll}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              columnGap: { lg: 2.8 },
              rowGap: 0,
              height: { xs: "auto", lg: "100%" },
              maxHeight: { xs: "none", lg: "calc(100vh - 230px)" },
              overflowY: { xs: "visible", lg: "auto" },
              overflowX: "hidden",
              minHeight: 0,
              pr: { lg: 0.75 },
              pl: { lg: 0.6 },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {materialsQuery.isLoading && (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  py: 8,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            )}

            {!materialsQuery.isLoading && items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  px: { xs: 1.5, md: 2 },
                  py: 0.4,
                }}
              >
                <ContentItemCard
                  item={item}
                  onClick={() => navigate(`/content/${item.id}`)}
                />
              </Box>
            ))}

            {materialsQuery.isFetchingNextPage && (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  py: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={25} />
              </Box>
            )}

            {!materialsQuery.isLoading && items.length === 0 && (
              <Typography
                sx={{
                  gridColumn: "1 / -1",
                  py: 8,
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 15,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {isSearching
                  ? "لا توجد نتائج مطابقة للبحث"
                  : "لا يوجد محتوى لعرضه"}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

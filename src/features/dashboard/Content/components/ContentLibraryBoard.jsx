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
      value: Number(statistics.total_files_count || 0).toLocaleString("en-US"),
      unit: "ملف",
    },
    {
      id: "images",
      title: "عدد الصور الكلي",
      value: Number(statistics.total_images_count || 0).toLocaleString("en-US"),
      unit: "صورة",
    },
  ];
}

export default function ContentLibraryBoard({
  materialsQuery,
  statistics = {},
  isSearching = false,
}) {
  const navigate = useNavigate();
  const pages = materialsQuery.data?.pages || [];
  const stats = mapStatistics(statistics);
  const materials = pages.flatMap((page) => page?.data?.materials || []);
  const items = materials.map(mapMaterialToCard);

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const remainingScroll =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (
      remainingScroll < 180 &&
      materialsQuery.hasNextPage &&
      !materialsQuery.isFetchingNextPage
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
        bgcolor: "#FFFFFF",
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.06)",
        border: "1px solid #ECECEC",
        overflow: "hidden",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          display: { xs: "block", lg: "grid" },
          gridTemplateColumns: "180px 1fr 1fr",
          height: "100%",
          direction: "ltr",
        }}
      >
        <Box sx={{ order: 1, height: "100%" }}>
          <ContentStatsPanel stats={stats} />
        </Box>

        <Box
          sx={{
            position: "relative",
            order: 2,
            gridColumn: { lg: "2 / 4" },
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
              background:
                "repeating-linear-gradient(to bottom, #D8D8D8 0 18px, transparent 18px 34px)",
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
              height: "100%",
              maxHeight: "calc(100vh - 230px)",
              overflowY: "auto",
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
            {items.map((item) => (
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
                  color: "#8A8A8A",
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

import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { CONTENT_ITEMS, CONTENT_STATS } from "../content.mock";
import ContentItemCard from "./ContentItemCard";
import ContentStatsPanel from "./ContentStatsPanel";

export default function ContentLibraryBoard() {
  const navigate = useNavigate();

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
        minHeight: { xs: 0, lg: 69 },
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
          <ContentStatsPanel stats={CONTENT_STATS} />
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
            {CONTENT_ITEMS.map((item) => (
              <Box
                key={item.id}
                sx={{
                  px: 2.5,
                  py: 1.8,
                }}
              >
                <ContentItemCard
                  item={item}
                  onClick={() => navigate(`/content/${item.id}`)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

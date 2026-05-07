import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import TestCard from "./TestCard";
import TestsCategoryButton from "./TestsCategoryButton";
import TestsEmptyState from "./TestsEmptyState";
import { TEST_STATUSES } from "../tests.constants";

export default function TestsListView({ dayData }) {
  const [activeCategory, setActiveCategory] = useState("new");

  const categoryCounts = useMemo(
    () =>
      TEST_STATUSES.map((category) => ({
        ...category,
        count: (dayData?.[category.id] ?? []).length,
      })),
    [dayData],
  );

  useEffect(() => {
    if (categoryCounts.some((category) => category.id === activeCategory)) return;
    setActiveCategory("new");
  }, [activeCategory, categoryCounts]);

  const activeCards = dayData?.[activeCategory] ?? [];

  return (
    <Box
      sx={{
        mt: 2,
        flex: 1,
        minHeight: 0,
        width: "100%",
        border: "none",
        display: "grid",
        gridTemplateColumns: { xs: "50% 50%", lg: "16% 84%" },
        gap: 1.5,
        p: 1.5,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          order: { xs: 2, lg: 2 },
          minWidth: 0,
          minHeight: 0,
          width: { lg: "100%" },
          border: "1px solid #D7D7D7",
          borderRadius: "10px",
          bgcolor: "#F1F1F1",
          p: 1.2,
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {activeCards.length === 0 ? (
          <TestsEmptyState />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(178px, 1fr))",
              gap: 1.2,
              alignItems: "start",
              justifyItems: "center",
              width: "100%",
            }}
          >
            {activeCards.map((card, index) => (
              <TestCard
                key={`${activeCategory}-${card.number}-${index}`}
                compact
                test={card}
              />
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          order: { xs: 1, lg: 1 },
          width: { lg: "100%" },
          border: "1px solid #D7D7D7",
          borderRadius: "14px",
          bgcolor: "#FFFFFF",
          p: 1.5,
        }}
      >
        <Typography
          sx={{
            color: "#263238",
            fontSize: 20,
            fontWeight: 800,
            textAlign: "right",
          }}
        >
          التصنيفات
        </Typography>

        <Stack spacing={1.4} sx={{ mt: 2 }}>
          {categoryCounts.map((category) => (
            <TestsCategoryButton
              key={category.id}
              title={category.title}
              count={category.count}
              color={category.color}
              active={category.id === activeCategory}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

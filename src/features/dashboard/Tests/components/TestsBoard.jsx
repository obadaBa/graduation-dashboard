import { Box, Stack, Typography } from "@mui/material";
import TestCard from "./TestCard";
import TestsEmptyState from "./TestsEmptyState";
import { TEST_STATUSES } from "../tests.constants";

function BoardColumn({ title, count, color, cards, showEmptyState, isLast }) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: 0,
        height: "100%",
        px: { xs: 0.5, sm: 0.75, lg: 1 },
        pt: 1,
        borderLeft: (theme) =>
          isLast
            ? `1px solid ${theme.palette.dashboard.divider}`
            : `2px dashed ${theme.palette.dashboard.divider}`,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={0.8}
        gap={0.8}
        sx={{ height: 24, direction: "rtl", mr: 2 }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color }} />
        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 14,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            minWidth: 29,
            height: 16,
            borderRadius: "9px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#4B5563" : "#B8B8B8",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 0.5,
          }}
        >
          {count}
        </Box>
      </Stack>

      <Stack
        spacing={1}
        alignItems="center"
        sx={{
          mt: 1,
          minHeight: 0,
          height: "calc(100% - 34px)",
          overflowY: "auto",
          overflowX: "hidden",
          pr: 0.3,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {showEmptyState ? (
          <TestsEmptyState
            description="لم يقم أي مستخدم بنشر اختبارات جديدة بهذا اليوم. لا تنسى العودة غداً أيضاً."
            maxWidth={170}
            px={1}
          />
        ) : (
          cards.map((card, index) => (
            <TestCard
              key={`${title}-${card.number}-${index}`}
              compact
              test={card}
              fluid
            />
          ))
        )}
      </Stack>
    </Box>
  );
}

export default function TestsBoard({ dayData }) {
  const isEmptyDay = TEST_STATUSES.every(
    (column) => (dayData?.[column.id] ?? []).length === 0,
  );

  return (
    <Box
      sx={{
        mt: 2,
        flex: "0 0 auto",
        height: { xs: 460, md: 500, lg: 476 }, 
        width: { xs: 1104, md: 1152, lg: "100%" },
        minWidth: { xs: 1104, md: 1152, lg: 0 },
        overflow: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
       
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          width: "100%",
          height: "100%",
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          borderRadius: "16px",
          bgcolor: (theme) => theme.palette.dashboard.chartBackground,
          overflowY: "hidden",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            width: "100%",
            height: "100%",
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          }}
        >
          {TEST_STATUSES.map((column, index) => {
            const cards = dayData?.[column.id] ?? [];

            return (
              <BoardColumn
                key={column.id}
                title={column.title}
              color={column.color}
              count={cards.length}
              cards={cards}
              showEmptyState={isEmptyDay && index === 0}
              isLast={index === TEST_STATUSES.length - 1}
            />
          );
        })}
        </Box>
      </Box>
    </Box>
  );
}

import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import TestsHeader from "./TestsHeader";
import TestsDaysScroller, { TODAY_DAY_ID } from "./TestsDaysScroller";
import TestsFilterBar from "./TestsFilterBar";
import TestsBoard from "./TestsBoard";
import TestsListView from "./TestsListView";
import { createEmptyDayData } from "../tests.mock";
import { useTestsManagementBoardQuery } from "../hooks/useTestsManagementBoardQuery";

function formatPrice(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function mapApiTestToCard(test) {
  return {
    id: test.id,
    number: test.id,
    price: Number(test.price || 0),
    created_at: test.created_at,
    difficulty_level: test.difficulty_level,
    question_count: Number(test.question_count || 0),
    title: test.title,
    timeLabel: test.created_at,
    description: test.description,
    tags: (test.scientific_interests || []).map((interest) => `# ${interest}`),
    levelLabel: "المستوى",
    levelValue: test.difficulty_level,
    questionsLabel: "الأسئلة",
    questionsValue: test.question_count,
    ratingLabel: "التقييم",
    ratingValue: test.average_rating ?? "0.0",
    priceValue: formatPrice(test.price),
    priceLabel: "ليرة سورية",
    previewLabel: "معاينة",
  };
}

function mapManagementBoardData(apiData) {
  const columns = apiData?.columns || {};

  return {
    new: (columns.new?.items || []).map(mapApiTestToCard),
    approved: (columns.approved?.items || []).map(mapApiTestToCard),
    "needs-edit": (columns.needs_revision?.items || []).map(mapApiTestToCard),
    deleted: (columns.deleted?.items || []).map(mapApiTestToCard),
    "under-review": (columns.under_review?.items || []).map(mapApiTestToCard),
    reported: (columns.reported?.items || []).map(mapApiTestToCard),
  };
}

function normalizeSearchText(value) {
  return String(value || "").trim().toLowerCase();
}

function filterDayDataByTitle(dayData, titleSearch) {
  const normalizedSearch = normalizeSearchText(titleSearch);

  if (!normalizedSearch) {
    return dayData;
  }

  return Object.fromEntries(
    Object.entries(dayData).map(([columnId, cards]) => [
      columnId,
      cards.filter((card) =>
        normalizeSearchText(card.title).includes(normalizedSearch),
      ),
    ]),
  );
}

function parseRelativeCreatedAt(value) {
  const text = String(value || "");
  const numberMatch = text.match(/\d+/);
  const amount = numberMatch ? Number(numberMatch[0]) : 0;

  if (text.includes("دقيقة") || text.includes("دقائق")) {
    return amount;
  }

  if (text.includes("ساعة") || text.includes("ساعات")) {
    return amount * 60;
  }

  if (text.includes("يوم") || text.includes("أيام")) {
    return amount * 24 * 60;
  }

  if (text.includes("أسبوع") || text.includes("أسابيع")) {
    return amount * 7 * 24 * 60;
  }

  if (text.includes("شهر") || text.includes("أشهر")) {
    return amount * 30 * 24 * 60;
  }

  const parsedDate = Date.parse(text);
  return Number.isNaN(parsedDate) ? Number.MAX_SAFE_INTEGER : -parsedDate;
}

function getDifficultyRank(value) {
  const difficulty = String(value || "").trim();

  if (difficulty === "صعب") return 3;
  if (difficulty === "متوسط") return 2;
  if (difficulty === "سهل") return 1;

  return 0;
}

function compareCardsBySort(cardA, cardB, sortBy) {
  if (sortBy === "price") {
    return cardB.price - cardA.price;
  }

  if (sortBy === "created_at") {
    return parseRelativeCreatedAt(cardA.created_at) - parseRelativeCreatedAt(cardB.created_at);
  }

  if (sortBy === "difficulty_level") {
    return getDifficultyRank(cardB.difficulty_level) - getDifficultyRank(cardA.difficulty_level);
  }

  if (sortBy === "question_count") {
    return cardB.question_count - cardA.question_count;
  }

  return 0;
}

function sortDayDataColumns(dayData, sortBy) {
  if (!sortBy || sortBy === "default") {
    return dayData;
  }

  return Object.fromEntries(
    Object.entries(dayData).map(([columnId, cards]) => [
      columnId,
      [...cards].sort((cardA, cardB) => compareCardsBySort(cardA, cardB, sortBy)),
    ]),
  );
}

export default function TestsSection1() {
  const [selectedDayId, setSelectedDayId] = useState(TODAY_DAY_ID);
  const [viewMode, setViewMode] = useState("board");
  const [titleSearch, setTitleSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const managementBoardQuery = useTestsManagementBoardQuery(selectedDayId);

  const selectedDayData = useMemo(
    () =>
      managementBoardQuery.data?.data
        ? mapManagementBoardData(managementBoardQuery.data.data)
        : createEmptyDayData(),
    [managementBoardQuery.data],
  );

  const filteredDayData = useMemo(
    () => sortDayDataColumns(filterDayDataByTitle(selectedDayData, titleSearch), sortBy),
    [selectedDayData, titleSearch, sortBy],
  );

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "auto", lg: "100%" },
        minHeight: { xs: "100vh", md: "100vh", lg: 0 },
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) => theme.palette.dashboard.pageBackground,
        color: (theme) => theme.palette.dashboard.textPrimary,
      }}
    >
      <TestsHeader />
      <TestsDaysScroller
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
      />
      <TestsFilterBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        titleSearch={titleSearch}
        onTitleSearchChange={setTitleSearch}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
      {viewMode === "board" ? (
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 auto", lg: 1 },
            minHeight: { xs: "auto", md: "auto", lg: 0 },
            width: "100%",
            minWidth: 0,
            overflowX: { xs: "auto", md: "auto", lg: "hidden" },
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <TestsBoard dayData={filteredDayData} />
        </Box>
      ) : (
        <TestsListView dayData={filteredDayData} />
      )}
    </Box>
  );
}

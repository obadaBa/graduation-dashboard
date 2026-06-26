import { useEffect, useMemo, useRef } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const DAY_LABELS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const MONTH_LABELS = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين الأول",
  "تشرين الثاني",
  "كانون الأول",
];

function getStartOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, daysCount) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + daysCount);
  return nextDate;
}

function formatDateId(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const TODAY_DAY_ID = formatDateId(getStartOfLocalDay(new Date()));

export function buildDays(baseDate = new Date()) {
  const today = getStartOfLocalDay(baseDate);

  return Array.from({ length: 29 }, (_, index) => {
    const offset = index - 14;
    const date = addDays(today, offset);

    return {
      id: formatDateId(date),
      day: DAY_LABELS[date.getDay()],
      date: date.getDate(),
      month: MONTH_LABELS[date.getMonth()],
      year: date.getFullYear(),
      isToday: offset === 0,
      status: offset < 0 ? "past" : offset === 0 ? "today" : "future",
    };
  });
}

function DayCard({ day, date, status, isToday, isSelected, onClick }) {
  const isFuture = status === "future";

  return (
    <Stack
      component="button"
      type="button"
      disabled={isFuture}
      onClick={isFuture ? undefined : onClick}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 54,
        minWidth: 54,
        height: 40,
        borderRadius: "8px",
        border: "1px solid",
        borderColor: (theme) =>
          isToday
            ? theme.palette.dashboard.logoPrimary
            : isFuture
              ? theme.palette.dashboard.divider
              : theme.palette.dashboard.chartBorder,
        bgcolor: (theme) =>
          isToday
            ? theme.palette.dashboard.activeItem.background
            : theme.palette.dashboard.chartBackground,
        color: (theme) =>
          isToday
            ? theme.palette.dashboard.logoPrimary
            : isFuture
              ? theme.palette.dashboard.textSecondary
              : theme.palette.dashboard.textPrimary,
        boxShadow: isToday
          ? "0 4px 10px rgba(85, 131, 255, 0.12)"
          : isSelected
            ? "inset 0 0 0 1px rgba(114, 152, 255, 0.45)"
            : "none",
        userSelect: "none",
        flexShrink: 0,
        cursor: isFuture ? "not-allowed" : "pointer",
        opacity: isFuture ? 0.62 : 1,
        font: "inherit",
        p: 0,
        "&:disabled": {
          pointerEvents: "none",
        },
      }}
    >
      <Typography sx={{ fontSize: 10, fontWeight: 700, lineHeight: 1.15 }}>
        {day}
      </Typography>
      <Typography sx={{ fontSize: 11, fontWeight: 700, lineHeight: 1.15 }}>
        {date}
      </Typography>
    </Stack>
  );
}

export default function TestsDaysScroller({ selectedDayId, onSelectDay }) {
  const days = useMemo(() => buildDays(), []);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const selectedIndex = days.findIndex((day) => day.id === selectedDayId);
    if (selectedIndex < 0) return;

    const cardWidth = 70;
    scrollerRef.current.scrollLeft = Math.max(0, selectedIndex * cardWidth - 280);
  }, [days, selectedDayId]);

  const selectedDay = days.find((day) => day.id === selectedDayId) ?? days[14];

  const scrollByCards = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction * 260,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: 4, width: "100%", minWidth: 0 }}>
      <Typography
        sx={{
          mb: 1.1,
              color: (theme) => theme.palette.dashboard.textPrimary,
          fontSize: { xs: 17, md: 19 },
          fontWeight: 800,
          textAlign: "left",
        }}
      >
        {selectedDay.day} - {selectedDay.date} {selectedDay.month} {selectedDay.year}
      </Typography>

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          display: "grid",
          gridTemplateColumns: "34px minmax(0, 1fr) 34px",
          alignItems: "center",
          columnGap: 1.5,
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={() => scrollByCards(1)}
          sx={{
            width: 34,
            height: 34,
            borderRadius: "8px",
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            color: (theme) => theme.palette.dashboard.textPrimary,
            flexShrink: 0,
          }}
        >
          <KeyboardArrowRightRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <Box
          ref={scrollerRef}
          onWheel={(event) => {
            if (!scrollerRef.current) return;
            event.preventDefault();
            scrollerRef.current.scrollLeft += event.deltaY;
          }}
          sx={{
            width: "100%",
            minWidth: 0,
            maxWidth: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            overscrollBehaviorX: "contain",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              width: "max-content",
              minWidth: "max-content",
              display: "flex",
              alignItems: "center",
              gap: 1.6,
            }}
          >
            {days.map((item) => (
              <DayCard
                key={item.id}
                day={item.day}
                date={item.date}
                status={item.status}
                isToday={item.isToday}
                isSelected={item.id === selectedDayId}
                onClick={() => onSelectDay(item.id)}
              />
            ))}
          </Box>
        </Box>

        <IconButton
          onClick={() => scrollByCards(-1)}
          sx={{
            width: 34,
            height: 34,
            borderRadius: "8px",
            bgcolor: (theme) => theme.palette.dashboard.chartBackground,
            border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            boxShadow: (theme) => theme.palette.dashboard.shadow,
            color: (theme) => theme.palette.dashboard.textPrimary,
            flexShrink: 0,
          }}
        >
          <KeyboardArrowLeftRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

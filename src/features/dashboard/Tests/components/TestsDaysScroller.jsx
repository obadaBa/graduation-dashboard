import { useEffect, useMemo, useRef } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

export const WEEK_DAYS = ["جمعة", "سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس"];
export const TODAY_DAY_ID = 6;

export function buildDays() {
  return Array.from({ length: 35 }, (_, index) => {
    const date = index + 1;

    return {
      id: date,
      day: WEEK_DAYS[index % WEEK_DAYS.length],
      date,
      isToday: date === TODAY_DAY_ID,
    };
  });
}

function DayCard({ day, date, status, isToday, isSelected, onClick }) {
  const isFuture = status === "future";

  return (
    <Stack
      component="button"
      type="button"
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 54,
        minWidth: 54,
        height: 40,
        borderRadius: "8px",
        border: "1px solid",
        borderColor: isToday ? "#5583FF" : isFuture ? "#DFDFDF" : "#263238",
        bgcolor: isToday ? "#EEF2FF" : "#FFFFFF",
        color: isToday ? "#5583FF" : isFuture ? "#A1A1A1" : "#263238",
        boxShadow: isToday
          ? "0 4px 10px rgba(85, 131, 255, 0.12)"
          : isSelected
            ? "inset 0 0 0 1px #CFCFCF"
            : "none",
        userSelect: "none",
        flexShrink: 0,
        cursor: "pointer",
        font: "inherit",
        p: 0,
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

  const getDayStatus = (index) => {
    const todayIndex = days.findIndex((day) => day.isToday);

    if (index < todayIndex) return "past";
    if (index === todayIndex) return "today";
    return "future";
  };

  const selectedDay = days.find((day) => day.id === selectedDayId) ?? days[0];

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
          color: "#263238",
          fontSize: { xs: 17, md: 19 },
          fontWeight: 800,
          textAlign: "left",
        }}
      >
        {selectedDay.day} - {selectedDay.date} مارس
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
            bgcolor: "#FFFFFF",
            border: "1px solid #ECECEC",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
            color: "#263238",
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
            {days.map((item, index) => (
              <DayCard
                key={item.id}
                day={item.day}
                date={item.date}
                status={getDayStatus(index)}
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
            bgcolor: "#FFFFFF",
            border: "1px solid #ECECEC",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
            color: "#263238",
            flexShrink: 0,
          }}
        >
          <KeyboardArrowLeftRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

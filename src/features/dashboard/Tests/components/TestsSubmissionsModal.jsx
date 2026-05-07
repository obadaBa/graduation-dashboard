import { useRef } from "react";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AnimatePresence, motion } from "framer-motion";
import TestCard from "./TestCard";
import { TEST_SUBMISSIONS_SECTIONS } from "../tests.mock";

const MotionBox = motion(Box);

function SubmissionSection({ title, count, color, cards }) {
  const scrollerRef = useRef(null);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "44px minmax(0, 1fr)",
        gap: 1.4,
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          borderRadius: "12px",
          bgcolor: "#F7F8FC",
          borderRight: `6px solid ${color}`,
          display: "flex",
          alignItems: "self-end",
          pt: 2,
          justifyContent: "center",
          position: "relative",
          minHeight: 228,
        }}
      >
        <Typography
          sx={{
            color: "#263238",
            fontSize: 16,
            fontWeight: 800,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            lineHeight: 1,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: 20,
            height: 18,
            px: 0.7,
            borderRadius: "999px",
            bgcolor: color,
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 0.2,
          }}
        >
          {count}
        </Box>
      </Box>

      <Box
        ref={scrollerRef}
        onWheel={(event) => {
          if (!scrollerRef.current) return;
          event.preventDefault();
          scrollerRef.current.scrollLeft += event.deltaY;
        }}
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          pb: 0.5,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.2}
          gap={1.2}
          sx={{ width: "max-content", minWidth: "100%" }}
        >
          {cards.map((card, index) => (
            <TestCard
              key={`${title}-${card.number}-${index}`}
              compact
              test={card}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default function TestsSubmissionsModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(255, 255, 255, 0.34)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <AnimatePresence>
        {open && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "calc(100% - 24px)", lg: 720 },
              outline: "none",
            }}
          >
            <MotionBox
              dir="rtl"
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              sx={{
                width: "100%",
                minHeight: 620,
                bgcolor: "#FFFFFF",
                borderRadius: "18px",
                boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
                overflow: "hidden",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 1.8,
                  py: 1.8,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "3px",
                    backgroundImage:
                      "repeating-linear-gradient(to left, #CFCFCF 0 18px, transparent 18px 29px)",
                  },
                }}
              >
                <Typography
                  sx={{ color: "#263238", fontSize: 19, fontWeight: 800 }}
                >
                  قائمة المشاركات
                  <Box component="span" sx={{ color: "#5583FF" }}>
                    {" "}للاختبارات
                  </Box>
                </Typography>

                <IconButton
                  onClick={onClose}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "6px",
                    border: "1px solid #DFDFDF",
                    color: "#263238",
                    bgcolor: "#FFFFFF",
                    "&:hover": { bgcolor: "#F8F8F8" },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </Stack>

              <Stack
                spacing={4}
                sx={{
                  p: 1.8,
                  maxHeight: "78vh",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {TEST_SUBMISSIONS_SECTIONS.map((section) => (
                  <SubmissionSection key={section.id} {...section} />
                ))}
              </Stack>
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>
    </Modal>
  );
}

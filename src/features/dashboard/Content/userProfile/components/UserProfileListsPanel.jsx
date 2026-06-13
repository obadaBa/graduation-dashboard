import { useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ContentStatsPanel from "../../components/ContentStatsPanel";
import FolderContentModal from "./FolderContentModal";
import folderWithFilesImage from "../../../Assets/folder-with-files-svgrepo-com.svg";

const listsStats = [
  {
    id: "all-lists",
    title: "عدد القوائم الكلي",
    value: "320",
    unit: "قائمة",
  },
  {
    id: "shared-lists",
    title: "عدد القوائم المشاركة",
    value: "120",
    unit: "قائمة",
  },
  {
    id: "saved-lists",
    title: "عدد القوائم المحفوظة",
    value: "200",
    unit: "قائمة",
  },
];

const listItems = [
  {
    id: 1,
    title: "جلسة امتحانية أولى",
    testsCount: "8",
    duration: "مدة خمس دقائق",
    tags: ["...", "# علوم أساسية", "# برمجة", "# الذكاء الاصطناعي"],
    tests: [
      {
        title: "جلسة امتحانية أولى",
        difficulty: "صعب",
        difficultyColor: "#FF7373",
        price: "180",
        rating: "3.2",
        questionsCount: "89",
        duration: "5",
        durationLabel: "يوم",
        tags: ["# علوم أساسية", "# برمجة", "..."],
      },
      {
        title: "جلسة امتحانية ثانية",
        difficulty: "متوسط",
        difficultyColor: "#FFB54D",
        price: "240",
        rating: "4.5",
        questionsCount: "22",
        duration: "4",
        durationLabel: "أشهر",
        tags: ["# برمجة", "# أرشفة", "..."],
      },
      {
        title: "جلسة امتحانية ثالثة",
        difficulty: "مستمر",
        difficultyColor: "#7ED957",
        price: "1280",
        rating: "4.5",
        questionsCount: "89",
        questionsLabel: "دقيقة",
        duration: "2",
        durationLabel: "شهر",
        tags: ["# علوم أساسية", "# برمجة", "..."],
      },
    ],
  },
  {
    id: 2,
    title: "جلسة امتحانية ثانية",
    testsCount: "8",
    duration: "مدة خمس دقائق",
    tags: ["# علوم أساسية", "# برمجة"],
    tests: [
      {
        title: "جلسة امتحانية أولى",
        difficulty: "صعب",
        difficultyColor: "#FF7373",
        price: "180",
        rating: "3.2",
        questionsCount: "89",
        duration: "5",
        durationLabel: "يوم",
        tags: ["# علوم أساسية", "# برمجة", "..."],
      },
      {
        title: "جلسة امتحانية ثانية",
        difficulty: "متوسط",
        difficultyColor: "#FFB54D",
        price: "240",
        rating: "4.5",
        questionsCount: "22",
        duration: "4",
        durationLabel: "أشهر",
        tags: ["# برمجة", "# أرشفة", "..."],
      },
      {
        title: "جلسة امتحانية ثالثة",
        difficulty: "مستمر",
        difficultyColor: "#7ED957",
        price: "1280",
        rating: "4.5",
        questionsCount: "89",
        questionsLabel: "دقيقة",
        duration: "2",
        durationLabel: "شهر",
        tags: ["# علوم أساسية", "# برمجة", "..."],
      },
    ],
  },
  {
    id: 3,
    title: "جلسة امتحانية ثالثة",
    testsCount: "8",
    duration: "مدة خمس دقائق",
    tags: ["...", "# علوم أساسية", "# برمجة", "# الذكاء الاصطناعي"],
    tests: [
      {
        title: "جلسة امتحانية أولى",
        difficulty: "صعب",
        difficultyColor: "#FF7373",
        price: "180",
        rating: "3.2",
        questionsCount: "89",
        duration: "5",
        durationLabel: "يوم",
        tags: ["# علوم أساسية", "# برمجة", "..."],
      },
      {
        title: "جلسة امتحانية ثانية",
        difficulty: "متوسط",
        difficultyColor: "#FFB54D",
        price: "240",
        rating: "4.5",
        questionsCount: "22",
        duration: "4",
        durationLabel: "أشهر",
        tags: ["# برمجة", "# أرشفة", "..."],
      },
      {
        title: "جلسة امتحانية ثالثة",
        difficulty: "مستمر",
        difficultyColor: "#7ED957",
        price: "1280",
        rating: "4.5",
        questionsCount: "89",
        questionsLabel: "دقيقة",
        duration: "2",
        durationLabel: "شهر",
        tags: ["# علوم أساسية", "# برمجة", "..."],
      },
    ],
  },
];

function ListTag({ label }) {
  return (
    <Box
      sx={{
        px: 0.85,
        py: 0.35,
        borderRadius: "4px",
        bgcolor: "#EEF4FF",
        color: "#5C84FF",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

function UserListRow({ item, withDivider = true, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        py: 2.3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        cursor: "pointer",
      }}
    >
      <Stack direction="row" spacing={1.1} alignItems="center" sx={{ width: "fit-content" }}>
        <Box
          component="img"
          src={folderWithFilesImage}
          alt="folder"
          sx={{
            width: 72,
            height: 72,
            flexShrink: 0,
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            width: 320,
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              color: "#263238",
              fontSize: 18,
              fontWeight: 800,
              width: "100%",
              alignSelf: "stretch",
              textAlign: "right",
              pr: 2.2,
            }}
          >
            {item.title}
          </Typography>

          <Stack
            direction="row-reverse"
            spacing={1.6}
            alignItems="center"
            sx={{ mt: 1.1, color: "#8D8D8D", justifyContent: "flex-end", width: "100%" }}
            gap={1}
          >
            <Stack direction="row-reverse" spacing={0.4} alignItems="center">
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                {`${item.testsCount} اختبارات`}
              </Typography>
              <LinkRoundedIcon sx={{ fontSize: 17, color: "#263238" }} />
            </Stack>

            <Stack direction="row-reverse" spacing={0.4} alignItems="center">
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                {item.duration}
              </Typography>
              <AccessTimeRoundedIcon sx={{ fontSize: 17, color: "#263238" }} />
            </Stack>
          </Stack>

          <Stack
            direction="row-reverse"
            useFlexGap
            flexWrap="wrap"
            gap={0.7}
            sx={{ mt: 1.35, justifyContent: "flex-end", width: "100%", pr: 2.2 }}
          >
            {item.tags.map((tag) => (
              <ListTag key={tag} label={tag} />
            ))}
          </Stack>
        </Box>
      </Stack>

      {withDivider && (
        <Box
          sx={{
            mt: 2.1,
            width: 300,
            height: "1px",
            bgcolor: "#E8E8E8",
          }}
        />
      )}
    </Box>
  );
}

export default function UserProfileListsPanel() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <>
      <Box
        sx={{
          mt: 0.8,
          borderRadius: "18px",
          border: "1px solid #EAEAEA",
          bgcolor: "#FFFFFF",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
          overflow: "hidden",
          p: { xs: 1.5, md: 2.2 },
          direction: "rtl",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }} gap={1}>
            <Button
              endIcon={<KeyboardArrowDownRoundedIcon />}
              sx={{
                minWidth: 126,
                height: 42,
                borderRadius: "999px",
                bgcolor: "#F5F5F5",
                color: "#8A8A8A",
                fontSize: 15,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#F5F5F5",
                },
              }}
            >
              الترتيب حسب
            </Button>

            <Box
              sx={{
                width: { xs: "100%", md: 310 },
                height: 46,
                borderRadius: "999px",
                bgcolor: "#F5F5F5",
                px: 1.8,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SearchRoundedIcon sx={{ color: "#A0A0A0" }} />
              <InputBase
                placeholder="البحث عن قائمة"
                sx={{
                  flex: 1,
                  color: "#263238",
                  fontSize: 15,
                  textAlign: "right",
                  "& input": {
                    textAlign: "right",
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2.2,
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", lg: "12%" },
              flexShrink: 0,
              position: "relative",
              px: 2.4,
              py: 2.2,
              order: { xs: 2, lg: 2 },
              "&::before": {
                content: '""',
                display: { xs: "none", lg: "block" },
                position: "absolute",
                top: -64,
                bottom: -24,
                right: 0,
                width: "3px",
                background:
                  "repeating-linear-gradient(to bottom, #D7D7D7 0 10px, transparent 10px 18px)",
              },
            }}
          >
            <ContentStatsPanel
              stats={listsStats}
              showInfoIcon={false}
              borderSide="none"
              sx={{ height: "100%", px: 0, py: 0 }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", lg: "87%" },
              order: { xs: 1, lg: 1 },
              px: { xs: 0.5, lg: 1.4 },
            }}
          >
            {listItems.map((item, index) => (
              <UserListRow
                key={item.id}
                item={item}
                withDivider={index !== listItems.length - 1}
                onClick={() => setSelectedFolder(item)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <FolderContentModal
        open={Boolean(selectedFolder)}
        folder={selectedFolder}
        onClose={() => setSelectedFolder(null)}
      />
    </>
  );
}

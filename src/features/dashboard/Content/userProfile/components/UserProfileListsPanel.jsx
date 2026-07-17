import { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useParams } from "react-router";
import { ReactComponent as FolderWithFilesIcon } from "../../../Assets/folder-with-files-svgrepo-com.svg";
import ContentStatsPanel from "../../components/ContentStatsPanel";
import { useUserProfileFoldersQuery } from "../../hooks/useUserProfileFoldersQuery";
import FolderContentModal from "./FolderContentModal";

const EMPTY_FOLDERS = [];

function normalizeFolderColor(value) {
  const hex = String(value || "")
    .trim()
    .replace(/^#/, "");

  return /^[0-9a-fA-F]{6}$/.test(hex) ? `#${hex}` : "#5583FF";
}

function mapFolder(folder) {
  return {
    id: folder.id,
    title: folder.name || "-",
    testsCount: Number(folder.tests_count || 0),
    duration: folder.published_at || "-",
    tags: (folder.scientific_interests || []).map(
      (interest) => `# ${interest}`,
    ),
    color: normalizeFolderColor(folder.color_code),
    tests: [],
  };
}

function ListTag({ label }) {
  return (
    <Box
      sx={{
        px: 0.85,
        py: 0.35,
        borderRadius: "4px",
        bgcolor: (theme) => theme.palette.dashboard.activeItem.background,
        color: (theme) => theme.palette.dashboard.logoPrimary,
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

function FolderIcon({ color }) {
  return (
    <Box
      sx={{
        width: 72,
        height: 72,
        flexShrink: 0,
        "& svg": {
          width: "100%",
          height: "100%",
          display: "block",
        },
        "& #Path_11117": {
          fill: color,
        },
      }}
    >
      <FolderWithFilesIcon aria-label="مجلد" />
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
      <Stack
        direction="row"
        spacing={1.1}
        alignItems="center"
        sx={{ width: "fit-content" }}
      >
        <FolderIcon color={item.color} />

        <Box
          sx={{
            width: { xs: "min(260px, calc(100vw - 130px))", sm: 320 },
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 18,
              fontWeight: 800,
              width: "100%",
              textAlign: "right",
              pr: 2.2,
            }}
          >
            {item.title}
          </Typography>

          <Stack
            direction="row-reverse"
            alignItems="center"
            gap={1.6}
            sx={{
              mt: 1.1,
              color: (theme) => theme.palette.dashboard.textSecondary,
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Stack direction="row-reverse" gap={0.4} alignItems="center">
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                {`${item.testsCount} اختبارات`}
              </Typography>
              <LinkRoundedIcon
                sx={{
                  fontSize: 17,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                }}
              />
            </Stack>

            <Stack
              direction="row-reverse"
              gap={0.4}
              alignItems="center"
              sx={{ transform: "translateX(-12px)" }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                {item.duration}
              </Typography>
              <AccessTimeRoundedIcon
                sx={{
                  fontSize: 17,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                }}
              />
            </Stack>
          </Stack>

          <Stack
            direction="row-reverse"
            useFlexGap
            flexWrap="wrap"
            gap={0.7}
            sx={{
              mt: 1.35,
              justifyContent: "flex-end",
              width: "100%",
              pr: 2.2,
            }}
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
            maxWidth: "100%",
            height: "1px",
            bgcolor: (theme) => theme.palette.dashboard.divider,
          }}
        />
      )}
    </Box>
  );
}

export default function UserProfileListsPanel() {
  const { userId } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const foldersQuery = useUserProfileFoldersQuery(userId);
  const responseData = foldersQuery.data?.data || foldersQuery.data || {};
  const folders = responseData.folders || EMPTY_FOLDERS;
  const listItems = useMemo(() => folders.map(mapFolder), [folders]);
  const displayedItems = useMemo(() => {
    const search = searchValue.trim().toLocaleLowerCase("ar");

    if (!search) return listItems;

    return listItems.filter((item) =>
      [item.title, ...item.tags].some((value) =>
        value.toLocaleLowerCase("ar").includes(search),
      ),
    );
  }, [listItems, searchValue]);
  const listsStats = [
    {
      id: "all-lists",
      title: "عدد القوائم الكلي",
      value: Number(
        responseData.total_folders_count ?? folders.length,
      ).toLocaleString("en-US"),
      unit: "قائمة",
    },
  ];

  return (
    <>
      <Box
        sx={{
          mt: 0.8,
          borderRadius: "18px",
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          bgcolor: (theme) => theme.palette.dashboard.surface,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          overflow: "hidden",
          p: { xs: 1.5, md: 2.2 },
          direction: "rtl",
          height: { xs: "auto", lg: "calc(100vh - 230px)" },
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "stretch", md: "center" }}
            gap={1.5}
          >
            <Button
              endIcon={<KeyboardArrowDownRoundedIcon />}
              sx={{
                minWidth: 126,
                height: 42,
                borderRadius: "999px",
                bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                color: (theme) => theme.palette.dashboard.textSecondary,
                fontSize: 15,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
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
                bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                px: 1.8,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SearchRoundedIcon
                sx={{ color: (theme) => theme.palette.dashboard.textSecondary }}
              />
              <InputBase
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="البحث عن قائمة"
                sx={{
                  flex: 1,
                  color: (theme) => theme.palette.dashboard.textPrimary,
                  fontSize: 15,
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
            flex: 1,
            minHeight: 0,
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
                background: (theme) =>
                  `repeating-linear-gradient(to bottom, ${theme.palette.dashboard.divider} 0 10px, transparent 10px 18px)`,
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
              height: "100%",
              minHeight: 0,
              overflowY: { xs: "visible", lg: "auto" },
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {foldersQuery.isLoading ? (
              <Box sx={{ py: 12, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={34} />
              </Box>
            ) : displayedItems.length ? (
              displayedItems.map((item, index) => (
                <UserListRow
                  key={item.id}
                  item={item}
                  withDivider={index !== displayedItems.length - 1}
                  onClick={() => setSelectedFolder(item)}
                />
              ))
            ) : (
              <Typography
                sx={{
                  py: 12,
                  textAlign: "center",
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {searchValue
                  ? "لا توجد قوائم مطابقة للبحث"
                  : "لا توجد قوائم لهذا المستخدم"}
              </Typography>
            )}
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

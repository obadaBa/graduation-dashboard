import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDeleteScientificInterestCategoryMutation } from "../hooks/useDeleteScientificInterestCategoryMutation";
import { useScientificInterestCategoriesQuery } from "../hooks/useScientificInterestCategoriesQuery";

function TitleItemCard({ item, onEditCategory }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteScientificInterestCategoryMutation();
  const isMenuOpen = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEditCategory?.(item);
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteCategory(item.id);
  };

  return (
    <Box
      sx={{
        minHeight: 48,
        borderRadius: "8px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        px: 1.25,
        py: 0.9,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 15,
          fontWeight: 700,
          lineHeight: 1.2,
          textAlign: "right",
        }}
      >
        {item.title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={0.8} gap={0.8}>
        <Box
          sx={{
            minWidth: 46,
            height: 18,
            px: 0.7,
            borderRadius: "4px",
            border: (theme) =>
              `1px solid ${theme.palette.mode === "dark" ? "rgba(114, 152, 255, 0.36)" : "#9AB0FF"}`,
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(114, 152, 255, 0.14)"
                : "#F4F7FF",
            color: (theme) => theme.palette.dashboard.logoPrimary,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {item.interests_count} تصنيف
        </Box>

        <IconButton
          size="small"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          disabled={isDeleting}
          sx={{
            width: 18,
            height: 18,
            color: (theme) => theme.palette.dashboard.textPrimary,
            mr: -0.6,
          }}
        >
          <MoreVertRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 92,
              borderRadius: "8px",
              boxShadow: (theme) => theme.palette.dashboard.shadow,
              direction: "rtl",
              bgcolor: (theme) => theme.palette.dashboard.surface,
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            fontSize: 13,
            fontWeight: 700,
            justifyContent: "flex-end",
            color: (theme) => theme.palette.dashboard.textPrimary,
          }}
        >
          تعديل
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            fontSize: 13,
            fontWeight: 700,
            justifyContent: "flex-end",
            color: "#FF5E58",
          }}
        >
          حذف
        </MenuItem>
      </Menu>
    </Box>
  );
}

function ModalContentState({ children }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        px: 1.6,
        pt: 1.6,
        pb: 2.2,
      }}
    >
      {children}
    </Box>
  );
}

export default function CategoryTitlesModal({ open, onClose, onEditCategory }) {
  const { data, isLoading, isError } = useScientificInterestCategoriesQuery({
    enabled: open,
  });
  const titles = data?.data ?? [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(10, 18, 27, 0.18)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "calc(100% - 24px)", sm: 338 },
          height: { xs: "calc(100vh - 22px)", sm: 522 },
          borderRadius: "18px",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          boxShadow: "0 18px 50px rgba(15, 23, 42, 0.20)",
          overflow: "hidden",
          direction: "rtl",
          outline: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1.8, pt: 2.1, pb: 1.5 }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 19,
              fontWeight: 900,
            }}
          >
            عناوين التصنيفات العلمية
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "5px",
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              color: (theme) => theme.palette.dashboard.textPrimary,
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 21 }} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            mx: 1.8,
            borderTop: (theme) =>
              `3px dashed ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.22)" : "#D9D9D9"}`,
          }}
        />

        {isLoading ? (
          <ModalContentState>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: "100%" }}
              spacing={1.2}
            >
              <CircularProgress size={28} sx={{ color: "#5583FF" }} />
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                جاري تحميل عناوين التصنيفات...
              </Typography>
            </Stack>
          </ModalContentState>
        ) : isError ? (
          <ModalContentState>
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "100%" }}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                تعذر جلب عناوين التصنيفات
              </Typography>
            </Stack>
          </ModalContentState>
        ) : (
          <ModalContentState>
            <Stack spacing={1.05}>
              {titles.map((item) => (
                <TitleItemCard
                  key={item.id}
                  item={item}
                  onEditCategory={(category) => {
                    onEditCategory?.(category);
                    onClose?.();
                  }}
                />
              ))}
            </Stack>
          </ModalContentState>
        )}
      </Box>
    </Modal>
  );
}

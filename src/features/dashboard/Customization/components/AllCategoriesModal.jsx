import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDeleteScientificInterestMutation } from "../hooks/useDeleteScientificInterestMutation";
import { useScientificInterestsQuery } from "../hooks/useScientificInterestsQuery";

function buildColoredSvgDataUrl(svgText, color) {
  if (!svgText) return "";

  const normalizedColor = color?.startsWith("#") ? color : `#${color || "6B72FF"}`;
  const withoutXmlHeader = svgText.replace(/<\?xml[^>]*>/i, "");
  const withColor = withoutXmlHeader
    .replace(/fill="(?!none)[^"]*"/gi, `fill="${normalizedColor}"`)
    .replace(/stroke="(?!none)[^"]*"/gi, `stroke="${normalizedColor}"`)
    .replace(/fill:\s*(?!none)[^;"']+/gi, `fill:${normalizedColor}`)
    .replace(/stroke:\s*(?!none)[^;"']+/gi, `stroke:${normalizedColor}`)
    .replace(/currentColor/gi, normalizedColor);
  const ensuredColor =
    withColor.includes("<svg") && !withColor.includes("fill=")
      ? withColor.replace(
          "<svg",
          `<svg fill="${normalizedColor}" color="${normalizedColor}"`,
        )
      : withColor;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(ensuredColor)}`;
}

function hexToHsl(hex) {
  const normalized = hex?.replace("#", "") || "6B72FF";
  const parsed = Number.parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized,
    16,
  );
  const red = ((parsed >> 16) & 255) / 255;
  const green = ((parsed >> 8) & 255) / 255;
  const blue = (parsed & 255) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { hue: 0, saturation: 0, lightness };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return { hue: hue * 60, saturation, lightness };
}

function buildImageTintFilter(color) {
  const { hue, saturation, lightness } = hexToHsl(color);
  const invert = Math.round(Math.min(92, Math.max(18, lightness * 100)));
  const saturate = Math.round(Math.min(7600, Math.max(900, saturation * 5600)));
  const brightness = Math.round(Math.min(125, Math.max(72, 82 + lightness * 38)));

  return `brightness(0) saturate(100%) invert(${invert}%) sepia(95%) saturate(${saturate}%) hue-rotate(${Math.round(
    hue - 55,
  )}deg) brightness(${brightness}%) contrast(96%)`;
}

function CategoryIcon({ iconUrl, color }) {
  const [coloredIconUrl, setColoredIconUrl] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadIcon() {
      if (!iconUrl) {
        setColoredIconUrl("");
        return;
      }

      try {
        const response = await fetch(iconUrl);
        const svgText = await response.text();

        if (!isMounted) return;
        if (!response.ok || !svgText.includes("<svg")) {
          setColoredIconUrl(iconUrl);
          return;
        }

        setColoredIconUrl(buildColoredSvgDataUrl(svgText, color || "#6B72FF"));
      } catch {
        if (!isMounted) return;
        setColoredIconUrl(iconUrl);
      }
    }

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, [iconUrl, color]);

  if (!iconUrl) {
    return (
      <Box
        sx={{
          width: 19,
          height: 19,
          borderRadius: "4px",
          border: `1.6px solid ${color || "#6B72FF"}`,
        }}
      />
    );
  }

  return (
    <Box
      component="img"
      src={coloredIconUrl || iconUrl}
      alt="Category icon"
      sx={{
        width: 19,
        height: 19,
        objectFit: "contain",
        flexShrink: 0,
        filter:
          coloredIconUrl === iconUrl || !coloredIconUrl
            ? buildImageTintFilter(color)
            : "none",
      }}
    />
  );
}

function CategoryTile({ item, section, onEditInterest }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mutate: deleteInterest, isPending: isDeleting } =
    useDeleteScientificInterestMutation();
  const isMenuOpen = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEditInterest?.({
      ...item,
      interest_category_id: section.id,
      category_title: section.title,
    });
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteInterest(item.id);
  };

  return (
    <Box
      sx={{
        minHeight: 62,
        borderRadius: "10px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        px: 1.5,
        py: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: (theme) => theme.palette.dashboard.shadow,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <CategoryIcon iconUrl={item.icon_svg} color={item.color} />
        <IconButton
          size="small"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          disabled={isDeleting}
          sx={{
            width: 18,
            height: 18,
            color: (theme) => theme.palette.dashboard.textPrimary,
            mr: -0.65,
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

      <Typography
        sx={{
          mt: 0.7,
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.25,
          textAlign: "right",
        }}
      >
        {item.name}
      </Typography>
    </Box>
  );
}

function ModalContentState({ children }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        px: 1.6,
        pt: 1.8,
        pb: 2.2,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {children}
    </Box>
  );
}

export default function AllCategoriesModal({ open, onClose, onEditInterest }) {
  const { data, isLoading, isError } = useScientificInterestsQuery({ enabled: open });
  const sections = data?.data ?? [];

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
          width: { xs: "calc(100% - 24px)", sm: 398 },
          height: { xs: "calc(100vh - 22px)", sm: 720 },
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
              color: (theme) => theme.palette.dashboard.logoPrimary,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            قائمة التصنيفات
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
                جاري تحميل التصنيفات...
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
                تعذر جلب التصنيفات العلمية
              </Typography>
            </Stack>
          </ModalContentState>
        ) : (
          <ModalContentState>
            {sections.map((section) => (
              <Box key={section.id} sx={{ mb: 2.3 }}>
                <Typography
                  sx={{
                    mb: 1.2,
                    color: (theme) => theme.palette.dashboard.textPrimary,
                    fontSize: 18,
                    fontWeight: 900,
                    textAlign: "right",
                  }}
                >
                  {section.title}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 1.15,
                  }}
                >
                  {section.interests?.map((item) => (
                    <CategoryTile
                      key={item.id}
                      item={item}
                      section={section}
                      onEditInterest={(interest) => {
                        onEditInterest?.(interest);
                        onClose?.();
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </ModalContentState>
        )}
      </Box>
    </Modal>
  );
}

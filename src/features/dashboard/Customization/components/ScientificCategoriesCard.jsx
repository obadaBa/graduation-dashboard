import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo, useRef, useState } from "react";
import PhoneFrameLight from "../../Assets/Group 6551.svg";
import PhoneFrameDark from "../../Assets/Group 6551-dark.svg";
import SelfieIcon from "../../Assets/selfie-2.svg";
import { useAddScientificInterestMutation } from "../hooks/useAddScientificInterestMutation";
import { useScientificInterestsQuery } from "../hooks/useScientificInterestsQuery";
import { useUpdateScientificInterestMutation } from "../hooks/useUpdateScientificInterestMutation";
import AllCategoriesModal from "./AllCategoriesModal";

const COLOR_OPTIONS = [
  "#B43387",
  "#A63B9A",
  "#9849B7",
  "#8655C8",
  "#6B61DD",
  "#4F83FF",
  "#EFEA45",
  "#F4B944",
  "#F57F6C",
  "#E9509C",
  "#EF3D5B",
];

const EMPTY_SECTIONS = [];

const fieldIconSx = {
  width: 40,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: (theme) => theme.palette.dashboard.textSecondary,
  flexShrink: 0,
};

const fieldLabelSx = {
  mb: 1,
  color: (theme) => theme.palette.dashboard.textPrimary,
  fontSize: 14,
  fontWeight: 900,
  lineHeight: 1.2,
};

const fieldErrorSx = {
  mt: 0.6,
  color: "#FF5E58",
  fontSize: 11,
  fontWeight: 700,
};

const fallbackIconSx = {
  width: 18,
  height: 18,
  position: "relative",
};

const categoryFieldSpacingSx = {
  mb: 2.4,
};

const categoryHeaderSx = {
  mb: 2.2,
};

const allButtonArrowSx = {
  fontSize: 20,
  lineHeight: 1,
};

const loadingIconSx = {
  color: (theme) => theme.palette.dashboard.textSecondary,
};

const dropdownIconSx = {
  fontSize: 24,
};

const imageIconSx = {
  fontSize: 21,
};

const hiddenInputSx = {
  display: "none",
};

const scientificCardSx = {
  width: "100%",
  minWidth: 0,
  minHeight: { xs: 488, md: 598 },
  borderRadius: "8px",
  bgcolor: (theme) => theme.palette.dashboard.surface,
  boxShadow: (theme) => theme.palette.dashboard.shadow,
  border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
  px: { xs: 2, md: 2.4 },
  py: { xs: 2, md: 2.5 },
  direction: "rtl",
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: { xs: 3, md: 4.2 },
  flexDirection: { xs: "column", md: "row" },
};

const allCategoriesButtonSx = {
  position: "absolute",
  top: 24,
  left: 24,
  minWidth: "auto",
  p: 0,
  color: (theme) => theme.palette.dashboard.logoPrimary,
  fontSize: 14,
  fontWeight: 700,
  zIndex: 1,
  gap: 0.35,
  "&:hover": {
    bgcolor: "transparent",
  },
};

const formColumnSx = {
  width: { xs: "100%", md: 253 },
  flexShrink: 0,
  alignSelf: { xs: "stretch", md: "flex-start" },
};

const titleTextSx = {
  color: (theme) => theme.palette.dashboard.textPrimary,
  fontSize: 20,
  fontWeight: 900,
};

const counterTextSx = {
  color: (theme) => theme.palette.dashboard.logoPrimary,
  fontSize: 11,
  fontWeight: 700,
};

const colorFieldSpacingSx = {
  mb: 4.8,
};

const colorGridSx = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 26px)",
  gap: "16px 17px",
  justifyContent: "start",
  direction: "rtl",
};

const submitButtonSx = {
  height: 42,
  borderRadius: "6px",
  bgcolor: "#5583FF",
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: 700,
  boxShadow: "0 5px 10px rgba(85, 131, 255, 0.38)",
  "&:hover": {
    bgcolor: "#5583FF",
    boxShadow: "0 5px 10px rgba(85, 131, 255, 0.38)",
  },
  "&.Mui-disabled": {
    bgcolor: "#8FAEFF",
    color: "#FFFFFF",
  },
};

const phonePreviewFrameSx = {
  width: 224,
  height: 434,
  position: "relative",
  flexShrink: 0,
  mt: { xs: 0, md: 7.2 },
};

const phoneFrameImageSx = {
  width: "100%",
  height: "100%",
  display: "block",
};

const phoneHeaderSx = {
  height: 29,
  px: 1.1,
};

const phoneSearchSx = {
  mx: 1,
  height: 23,
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 1,
};

const phoneContentSx = {
  mt: 2.2,
  px: 1.3,
  textAlign: "right",
};

const getPhoneScreenSx = ({ previewBackground, theme }) => ({
  position: "absolute",
  top: 32,
  left: 22,
  right: 22,
  bottom: 22,
  direction: "rtl",
  overflow: "hidden",
  bgcolor: previewBackground,
  borderRadius: "0 0 28px 28px",
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.shorter,
  }),
});

const getPhoneHeaderTitleSx = (theme) => ({
  color: theme.palette.dashboard.textPrimary,
  fontSize: 13,
  fontWeight: 900,
});

const getPhoneBackButtonSx = ({ theme, previewPanel }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  bgcolor: previewPanel,
  color: theme.palette.dashboard.textSecondary,
  display: "grid",
  placeItems: "center",
  fontSize: 16,
  fontWeight: 900,
});

const getPhoneSearchSx = (previewPanel) => ({
  ...phoneSearchSx,
  bgcolor: previewPanel,
});

const getPhoneSearchTextSx = (theme) => ({
  color: theme.palette.dashboard.textSecondary,
  fontSize: 8.5,
  fontWeight: 600,
});

const getPhoneSearchCloseSx = (theme) => ({
  color: theme.palette.dashboard.textSecondary,
  fontSize: 14,
  lineHeight: 1,
});

const getPhoneSectionTitleSx = (theme) => ({
  color: theme.palette.dashboard.textPrimary,
  fontSize: 11.5,
  fontWeight: 900,
});

const getPhoneCategoryCardSx = ({ theme, previewBorder }) => ({
  mt: 0.7,
  mr: 0,
  width: 102,
  minHeight: 56,
  borderRadius: "7px",
  border: `1px solid ${previewBorder}`,
  bgcolor: theme.palette.dashboard.chartBackground,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  gap: 0.6,
  px: 0.95,
});

const getPhoneIconPreviewSx = ({ color, isExternalIcon }) => ({
  width: 20,
  height: 20,
  objectFit: "contain",
  filter: isExternalIcon ? buildImageTintFilter(color) : "none",
});

const getPhoneCategoryNameSx = (theme) => ({
  color: theme.palette.dashboard.textSecondary,
  fontSize: 9,
  fontWeight: 600,
  maxWidth: "100%",
  width: "100%",
  textAlign: "right",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const getFieldShellSx = (error) => ({
  height: 33,
  borderRadius: "6px",
  border: (theme) =>
    `1px solid ${error ? "#FF5E58" : theme.palette.dashboard.chartBorder}`,
  bgcolor: (theme) => theme.palette.dashboard.chartBackground,
  display: "flex",
  alignItems: "center",
  flexDirection: "row-reverse",
  overflow: "hidden",
});

const getFallbackIconSx = (color) => ({
  ...fallbackIconSx,
  color,
});

const getFallbackDotSx = ({ color, item }) => ({
  position: "absolute",
  width: 7,
  height: 7,
  border: `1.7px solid ${color}`,
  borderRadius: "50%",
  top: item < 2 ? 0 : 10,
  left: item % 2 === 0 ? 0 : 10,
});

function buildColoredSvgDataUrl(svgText, color) {
  if (!svgText) return "";

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    buildColoredSvgText(svgText, color),
  )}`;
}

function buildColoredSvgText(svgText, color) {
  const normalizedColor = color?.startsWith("#") ? color : `#${color || "4F83FF"}`;
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

  return ensuredColor;
}

function hexToHsl(hex) {
  const normalized = hex?.replace("#", "") || "4F83FF";
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

function FieldShell({ children, icon, error = false }) {
  return (
    <Box
      sx={getFieldShellSx(error)}
    >
      <Box sx={fieldIconSx}>
        {icon}
      </Box>
      {children}
    </Box>
  );
}

function FieldLabel({ children }) {
  return (
    <Typography
      sx={fieldLabelSx}
    >
      {children}
    </Typography>
  );
}

function FieldError({ children }) {
  if (!children) return null;

  return (
    <Typography
      sx={fieldErrorSx}
    >
      {children}
    </Typography>
  );
}

function FallbackIcon({ color }) {
  return (
    <Box
      sx={getFallbackIconSx(color)}
    >
      {[0, 1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={getFallbackDotSx({ color, item })}
        />
      ))}
    </Box>
  );
}

function PhonePreview({ title, name, iconPreview, color }) {
  const theme = useTheme();
  const phoneFrameSrc =
    theme.palette.mode === "dark" ? PhoneFrameDark : PhoneFrameLight;
  const displayTitle = title.trim() || "لم يتم التحديد";
  const displayName = name.trim() || "لم يتم التحديد";
  const isExternalIcon = iconPreview?.startsWith("http");
  const previewBackground =
    theme.palette.mode === "dark" ? "rgba(20, 24, 31, 0.88)" : "#FFFFFF";
  const previewPanel =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "#F4F4F4";
  const previewBorder =
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.16)"
      : theme.palette.dashboard.chartBorder;

  return (
    <Box
      sx={phonePreviewFrameSx}
    >
      <Box
        component="img"
        src={phoneFrameSrc}
        alt="Mobile preview"
        sx={phoneFrameImageSx}
      />

      <Box
        sx={getPhoneScreenSx({ previewBackground, theme })}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={phoneHeaderSx}
        >
          <Typography
            sx={getPhoneHeaderTitleSx(theme)}
          >
            قائمة التصنيفات
          </Typography>
          <Box
            sx={getPhoneBackButtonSx({ theme, previewPanel })}
          >
            ‹
          </Box>
        </Stack>

        <Box
          sx={getPhoneSearchSx(previewPanel)}
        >
          <Typography
            sx={getPhoneSearchTextSx(theme)}
          >
            ابحث عن تصنيف
          </Typography>
          <Typography
            sx={getPhoneSearchCloseSx(theme)}
          >
            ×
          </Typography>
        </Box>

        <Box sx={phoneContentSx}>
          <Typography
            sx={getPhoneSectionTitleSx(theme)}
          >
            {displayTitle}
          </Typography>

          <Box
            sx={getPhoneCategoryCardSx({ theme, previewBorder })}
          >
            {iconPreview ? (
              <Box
                component="img"
                src={iconPreview}
                alt="Selected category icon"
                sx={getPhoneIconPreviewSx({ color, isExternalIcon })}
              />
            ) : (
              <FallbackIcon color={color} />
            )}
            <Typography
              sx={getPhoneCategoryNameSx(theme)}
            >
              {displayName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function ScientificCategoriesCard() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingInterest, setEditingInterest] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4F83FF");
  const [iconSvgText, setIconSvgText] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [existingIconUrl, setExistingIconUrl] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [nameError, setNameError] = useState("");
  const [iconError, setIconError] = useState("");
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);

  const { data: scientificInterestsResponse, isLoading: isCategoriesLoading } =
    useScientificInterestsQuery();

  const sections = scientificInterestsResponse?.data ?? EMPTY_SECTIONS;
  const totalInterestsCount = useMemo(
    () => sections.reduce((sum, section) => sum + (section.interests?.length || 0), 0),
    [sections],
  );
  const selectedCategory =
    sections.find((section) => String(section.id) === String(selectedCategoryId)) || null;

  const iconPreview = iconSvgText
    ? buildColoredSvgDataUrl(iconSvgText, selectedColor)
    : existingIconUrl;
  const isEditMode = Boolean(editingInterest);

  const resetForm = () => {
    setEditingInterest(null);
    setSelectedCategoryId("");
    setName("");
    setSelectedColor("#4F83FF");
    setIconSvgText("");
    setIconFile(null);
    setExistingIconUrl("");
    setCategoryError("");
    setNameError("");
    setIconError("");
  };

  const { mutate: addScientificInterest, isPending: isSaving } =
    useAddScientificInterestMutation({
      onSuccess: resetForm,
    });
  const { mutate: updateScientificInterest, isPending: isUpdating } =
    useUpdateScientificInterestMutation({
      onSuccess: resetForm,
    });

  const handleIconChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const isSvg =
      file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");

    if (!isSvg) {
      setIconSvgText("");
      setIconFile(null);
      setIconError("يجب اختيار ملف بصيغة SVG فقط");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setIconSvgText(String(reader.result));
      setIconFile(file);
      setExistingIconUrl("");
      setIconError("");
    };
    reader.readAsText(file);
  };

  const handleEditInterest = async (interest) => {
    setEditingInterest(interest);
    setSelectedCategoryId(interest.interest_category_id || "");
    setName(interest.name || "");
    setSelectedColor(interest.color || "#4F83FF");
    setExistingIconUrl(interest.icon_svg || "");
    setIconFile(null);
    setIconSvgText("");
    setCategoryError("");
    setNameError("");
    setIconError("");

    if (!interest.icon_svg) return;

    try {
      const response = await fetch(interest.icon_svg);
      const svgText = await response.text();

      if (response.ok && svgText.includes("<svg")) {
        setIconSvgText(svgText);
      }
    } catch {
      // Keep the existing icon URL visible if the SVG text cannot be read.
    }
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    const nextCategoryError = selectedCategoryId
      ? ""
      : "اختر العنوان الذي يضم هذا التصنيف";
    const nextNameError = trimmedName ? "" : "اسم التصنيف العلمي مطلوب";
    const nextIconError =
      iconFile || isEditMode || existingIconUrl
        ? ""
        : "اختر أيقونة SVG لهذا التصنيف";

    setCategoryError(nextCategoryError);
    setNameError(nextNameError);
    setIconError(nextIconError);

    if (nextCategoryError || nextNameError || nextIconError) {
      return;
    }

    const shouldSendIcon = iconSvgText && (iconFile || isEditMode);
    const coloredIconFile = shouldSendIcon
      ? new File(
          [buildColoredSvgText(iconSvgText, selectedColor)],
          iconFile?.name || `scientific-interest-${editingInterest?.id || "icon"}.svg`,
          { type: "image/svg+xml" },
        )
      : null;

    if (isEditMode) {
      updateScientificInterest({
        interestId: editingInterest.id,
        interestCategoryId: selectedCategoryId,
        name: trimmedName,
        icon: coloredIconFile,
        color: selectedColor,
      });
      return;
    }

    addScientificInterest({
      interestCategoryId: selectedCategoryId,
      name: trimmedName,
      icon: coloredIconFile,
      color: selectedColor,
    });
  };

  return (
    <>
      <Box
        sx={scientificCardSx}
      >
        <Button
          type="button"
          onClick={() => setIsAllCategoriesOpen(true)}
          sx={allCategoriesButtonSx}
        >
          عرض الكل
          <Box component="span" sx={allButtonArrowSx}>
            ›
          </Box>
        </Button>

        <Box sx={formColumnSx}>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="flex-start"
            spacing={0.7}
            gap={0.7}
            sx={categoryHeaderSx}
          >
            <Typography sx={titleTextSx}>
              التصنيفات العلمية
            </Typography>
            <Typography sx={counterTextSx}>
              ({` ${totalInterestsCount || 0} تصنيف `})
            </Typography>
          </Stack>

          <Box sx={categoryFieldSpacingSx}>
            <FieldLabel>العنوان</FieldLabel>
            <FieldShell
              icon={
                isCategoriesLoading ? (
                  <CircularProgress
                    size={16}
                    sx={loadingIconSx}
                  />
                ) : (
                  <KeyboardArrowDownRoundedIcon sx={dropdownIconSx} />
                )
              }
              error={Boolean(categoryError)}
            >
              <Button
                type="button"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                disabled={isCategoriesLoading || !sections.length}
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                  color: selectedCategory
                    ? theme.palette.dashboard.textPrimary
                    : theme.palette.dashboard.textSecondary,
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 0,
                  px: 1,
                  textAlign: "right",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  "&.Mui-disabled": {
                    color: theme.palette.dashboard.textSecondary,
                  },
                }}
              >
                {selectedCategory?.title || "اختر العنوان الذي يضم هذا التصنيف"}
              </Button>
            </FieldShell>
            <FieldError>{categoryError}</FieldError>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 0.5,
                  minWidth: 253,
                  borderRadius: "8px",
                  boxShadow: theme.palette.dashboard.shadow,
                  direction: "rtl",
                  bgcolor: theme.palette.dashboard.surface,
                  border: `1px solid ${theme.palette.dashboard.chartBorder}`,
                },
              },
            }}
          >
            {sections.map((section) => (
              <MenuItem
                key={section.id}
                onClick={() => {
                  setSelectedCategoryId(section.id);
                  setCategoryError("");
                  setAnchorEl(null);
                }}
                sx={{
                  minHeight: 38,
                  justifyContent: "flex-end",
                  textAlign: "right",
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.palette.dashboard.textPrimary,
                }}
              >
                {section.title}
              </MenuItem>
            ))}
          </Menu>

          <Box sx={categoryFieldSpacingSx}>
            <FieldLabel>الاسم</FieldLabel>
            <FieldShell
              icon={
                <Box
                  component="img"
                  src={SelfieIcon}
                  alt="Name icon"
                  sx={{
                    width: 18,
                    height: 18,
                    objectFit: "contain",
                    filter:
                      theme.palette.mode === "dark"
                        ? "brightness(0) saturate(100%) invert(83%) sepia(7%) saturate(359%) hue-rotate(182deg) brightness(88%) contrast(90%)"
                        : "none",
                  }}
                />
              }
              error={Boolean(nameError)}
            >
              <InputBase
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (nameError) {
                    setNameError("");
                  }
                }}
                placeholder="ادخل اسم التصنيف العلمي"
                fullWidth
                sx={{
                  height: "100%",
                  color: theme.palette.dashboard.textPrimary,
                  fontSize: 12,
                  fontWeight: 600,
                  "& input": {
                    textAlign: "right",
                    pl: 0.8,
                  },
                  "& input::placeholder": {
                    color: theme.palette.dashboard.textSecondary,
                    opacity: 1,
                  },
                }}
              />
            </FieldShell>
            <FieldError>{nameError}</FieldError>
          </Box>

          <Box sx={categoryFieldSpacingSx}>
            <FieldLabel>الأيقونة</FieldLabel>
            <FieldShell
              icon={<ImageOutlinedIcon sx={imageIconSx} />}
              error={Boolean(iconError)}
            >
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                  color: iconPreview
                    ? theme.palette.dashboard.textPrimary
                    : theme.palette.dashboard.textSecondary,
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 0,
                  px: 1,
                  textAlign: "right",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                {iconPreview
                  ? "تم اختيار أيقونة SVG"
                  : "اختر الأيقونة التي ستمثل هذا التصنيف"}
              </Button>
              <Box
                component="input"
                ref={fileInputRef}
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleIconChange}
                sx={hiddenInputSx}
              />
            </FieldShell>
            <FieldError>{iconError}</FieldError>
          </Box>

          <Box sx={colorFieldSpacingSx}>
            <FieldLabel>اللون</FieldLabel>
            <Box sx={colorGridSx}>
              {COLOR_OPTIONS.map((color) => {
                const isSelected = selectedColor === color;

                return (
                  <Box
                    key={color}
                    component="button"
                    type="button"
                    aria-label={`اختيار اللون ${color}`}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: isSelected
                        ? `1.7px solid ${theme.palette.dashboard.textPrimary}`
                        : "0",
                      bgcolor: theme.palette.dashboard.surface,
                      p: isSelected ? "2px" : 0,
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: isSelected ? 20 : 22,
                        height: isSelected ? 20 : 22,
                        borderRadius: "50%",
                        bgcolor: color,
                        boxShadow: "0 2px 5px rgba(15, 23, 42, 0.18)",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Button
            fullWidth
            onClick={handleSave}
            disabled={isSaving || isUpdating}
            sx={submitButtonSx}
          >
            {isSaving || isUpdating
              ? "جاري الحفظ..."
              : isEditMode
                ? "حفظ التعديل"
                : "حفظ التصنيف العلمي"}
          </Button>
        </Box>

        <PhonePreview
          title={selectedCategory?.title || ""}
          name={name}
          iconPreview={iconPreview}
          color={selectedColor}
        />
      </Box>

      <AllCategoriesModal
        open={isAllCategoriesOpen}
        onClose={() => setIsAllCategoriesOpen(false)}
        onEditInterest={handleEditInterest}
      />
    </>
  );
}

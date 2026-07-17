import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useAddScientificInterestCategoryMutation } from "../hooks/useAddScientificInterestCategoryMutation";
import { useScientificInterestCategoriesQuery } from "../hooks/useScientificInterestCategoriesQuery";
import { useUpdateScientificInterestCategoryMutation } from "../hooks/useUpdateScientificInterestCategoryMutation";
import CategoryTitlesModal from "./CategoryTitlesModal";

function FieldShell({ children, icon }) {
  return (
    <Box
      sx={{
        height: 33,
        borderRadius: "6px",
        border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: (theme) => theme.palette.dashboard.textSecondary,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      {children}
    </Box>
  );
}

function FieldLabel({ children }) {
  return (
    <Typography
      sx={{
        mb: 1,
        color: (theme) => theme.palette.dashboard.textPrimary,
        fontSize: 14,
        fontWeight: 900,
        lineHeight: 1.2,
      }}
    >
      {children}
    </Typography>
  );
}

function FieldError({ children }) {
  if (!children) return null;

  return (
    <Typography
      sx={{
        mt: 0.6,
        color: "#FF5E58",
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {children}
    </Typography>
  );
}

export default function CategoryTitlesCard() {
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [nameError, setNameError] = useState("");
  const [isTitlesModalOpen, setIsTitlesModalOpen] = useState(false);
  const { data: categoriesResponse } = useScientificInterestCategoriesQuery();
  const titlesCount = categoriesResponse?.data?.length || 0;
  const isEditMode = Boolean(editingCategory);

  const resetForm = () => {
    setName("");
    setEditingCategory(null);
    setNameError("");
  };

  const { mutate: addCategory, isPending: isAdding } =
    useAddScientificInterestCategoryMutation({
      onSuccess: resetForm,
    });
  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateScientificInterestCategoryMutation({
      onSuccess: resetForm,
    });

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setName(category.title || "");
    setNameError("");
  };

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("اسم العنوان مطلوب");
      return;
    }

    if (isEditMode) {
      updateCategory({
        categoryId: editingCategory.id,
        title: trimmedName,
      });
      return;
    }

    addCategory({ title: trimmedName });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          height: { xs: "auto", md: "40vh" },
          minHeight: 224,
          maxHeight: { md: 260 },
          borderRadius: "8px",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
          px: { xs: 2, md: 2.4 },
          py: { xs: 2, md: 2.3 },
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ mb: 1.1 }}
        >
        
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="flex-start"
            spacing={0.7}
            gap={0.7}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 20,
                fontWeight: 900,
              }}
            >
              عناوين التصنيفات
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.logoPrimary,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              ( {titlesCount} عناوين )
            </Typography>
          </Stack>
            <Button
            type="button"
            onClick={() => setIsTitlesModalOpen(true)}
            sx={{
              minWidth: "auto",
              p: 0,
              color: (theme) => theme.palette.dashboard.logoPrimary,
              fontSize: 14,
              fontWeight: 700,
              gap: 0.35,
              mt: 0.3,
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            عرض الكل
            <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
              ›
            </Box>
          </Button>

        </Stack>

        <Typography
          sx={{
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1.65,
            maxWidth: 310,
            ml: "auto",
            textAlign: "right",
            alignSelf: "flex-end",
          }}
        >
          وظيفة عنوان التصنيفات هي تجميع مجموعة من التصنيفات العلمية تحت مسمى
          واحد لتسهيل إيجاد أي تصنيف بحسب عنوانه
        </Typography>

        <Box sx={{ mt: 2.2, mb: 1.9 }}>
          <FieldLabel>الاسم</FieldLabel>
          <FieldShell icon={<ImageOutlinedIcon sx={{ fontSize: 21 }} />}>
            <InputBase
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (nameError) {
                  setNameError("");
                }
              }}
              placeholder="ادخل اسم العنوان..."
              fullWidth
              sx={{
                height: "100%",
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 12,
                fontWeight: 600,
                "& input": {
                  textAlign: "right",
                  pl: 0.8,
                },
                "& input::placeholder": {
                  color: (theme) => theme.palette.dashboard.textSecondary,
                  opacity: 1,
                },
              }}
            />
          </FieldShell>
          <FieldError>{nameError}</FieldError>
        </Box>

        <Button
          onClick={handleSave}
          disabled={isAdding || isUpdating}
          sx={{
            mt: "auto",
            alignSelf: "flex-end",
            minWidth: 124,
            height: 31,
            px: 2.2,
            borderRadius: "6px",
            bgcolor: "#5583FF",
            color: "#FFFFFF",
            fontSize: 14,
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
          }}
        >
          {isAdding || isUpdating
            ? "جاري الحفظ..."
            : isEditMode
              ? "حفظ التعديل"
              : "حفظ العنوان الجديد"}
        </Button>
      </Box>

      <CategoryTitlesModal
        open={isTitlesModalOpen}
        onClose={() => setIsTitlesModalOpen(false)}
        onEditCategory={handleEditCategory}
      />
    </>
  );
}

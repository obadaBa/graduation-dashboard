import { Box, Button, Stack } from "@mui/material";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useState } from "react";
import { useNavigate } from "react-router";
import ApproveTestConfirmationModal from "../../../Tests/testDetails/components/ApproveTestConfirmationModal";
import DeleteTestConfirmationModal from "../../../Tests/testDetails/components/DeleteTestConfirmationModal";
import { useApproveLibraryMaterialMutation } from "../../hooks/useApproveLibraryMaterialMutation";
import { useDeleteLibraryMaterialMutation } from "../../hooks/useDeleteLibraryMaterialMutation";

function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function GhostIconButton({
  children,
  color,
  borderColor,
  bgcolor = "#FFFFFF",
  onClick,
  disabled = false,
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      sx={{
        minWidth: 48,
        width: 48,
        height: 42,
        borderRadius: "10px",
        border: `1.5px dashed ${borderColor}`,
        bgcolor,
        color,
        p: 0,
        "&:hover": {
          bgcolor,
          borderColor,
        },
        "&.Mui-disabled": {
          bgcolor,
          color,
          borderColor,
          opacity: 0.55,
        },
      }}
    >
      {children}
    </Button>
  );
}

function TabAction({ label, icon, active = false, onClick }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      startIcon={icon}
      sx={{
        height: 46,
        px: 2.1,
        borderRadius: active ? "10px" : 0,
        border: active ? "1px solid #5C84FF" : "none",
        bgcolor: active ? "#FFFFFF" : "transparent",
        color: active ? "#5C84FF" : "#8F8F8F",
        fontSize: 19,
        fontWeight: active ? 700 : 600,
        whiteSpace: "nowrap",
        "&:hover": {
          bgcolor: active ? "#FFFFFF" : "transparent",
        },
        "& .MuiButton-startIcon": {
          marginInlineStart: 0,
          marginInlineEnd: "8px",
        },
      }}
    >
      {label}
    </Button>
  );
}

export default function ContentDetailsAppBar({
  contentId,
  activeTab,
  onTabChange,
}) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const navigate = useNavigate();
  const approveMutation = useApproveLibraryMaterialMutation(contentId);
  const deleteMutation = useDeleteLibraryMaterialMutation(contentId);
  const isActionPending = approveMutation.isPending || deleteMutation.isPending;

  const handleApprove = () => {
    if (!contentId || isActionPending) {
      return;
    }

    setIsApproveModalOpen(true);
  };

  const handleConfirmApprove = () => {
    if (!contentId || isActionPending) {
      return;
    }

    approveMutation.mutate(
      {
        contentId,
        idempotencyKey: createIdempotencyKey(),
      },
      {
        onSuccess: () => {
          setIsApproveModalOpen(false);
        },
      },
    );
  };

  const handleCloseApproveModal = () => {
    if (!approveMutation.isPending) {
      setIsApproveModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (!contentId || isActionPending) {
      return;
    }

    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const reason = deleteReason.trim();

    if (!contentId || !reason || isActionPending) {
      return;
    }

    deleteMutation.mutate(
      {
        contentId,
        reason,
        idempotencyKey: createIdempotencyKey(),
      },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setDeleteReason("");
          navigate("/dashboard/content", { replace: true });
        },
      },
    );
  };

  const handleCloseDeleteModal = () => {
    if (deleteMutation.isPending) {
      return;
    }

    setIsDeleteModalOpen(false);
    setDeleteReason("");
  };

  return (
    <>
      <Box
        sx={{
          mt: 2.5,
          width: "100%",
          minHeight: 68,
          borderRadius: "14px",
          bgcolor: "#FFFFFF",
          px: { xs: 1, md: 2 },
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", lg: "nowrap" },
          gap: 1.5,
          direction: "rtl",
        }}
      >
        <Stack
          direction="row-reverse"
          alignItems="center"
          sx={{
            minHeight: 46,
            flex: { xs: "1 1 100%", lg: "0 1 auto" },
            border: "1px solid #EBEBEB",
            overflow: "hidden",
            bgcolor: "#FFFFFF",
            p: 0.6,
          }}
        >
          <TabAction
            label="سجل الحالة"
            icon={<ViewAgendaOutlinedIcon sx={{ fontSize: 22 }} />}
            active={activeTab === "status"}
            onClick={() => onTabChange("status")}
          />

          <TabAction
            label="سجل الإبلاغات"
            icon={<FlagOutlinedIcon sx={{ fontSize: 22 }} />}
            active={activeTab === "creations"}
            onClick={() => onTabChange("creations")}
          />

          <TabAction
            label="نظرة عامة"
            icon={<WidgetsOutlinedIcon sx={{ fontSize: 22 }} />}
            active={activeTab === "overview"}
            onClick={() => onTabChange("overview")}
          />
        </Stack>

        <Stack
          direction="row-reverse"
          alignItems="center"
          spacing={1.2}
          sx={{ px: { xs: 0, md: 1.4 }, flexShrink: 0 }}
          gap={1}
        >
          <GhostIconButton
            color="#3FD547"
            borderColor="#3FD547"
            onClick={handleApprove}
            disabled={isActionPending}
          >
            <CheckBoxRoundedIcon sx={{ fontSize: 26 }} />
          </GhostIconButton>

          <GhostIconButton
            color="#FF6A64"
            borderColor="#FF6A64"
            onClick={handleDelete}
            disabled={isActionPending}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 26 }} />
          </GhostIconButton>
        </Stack>

        <Button
          type="button"
          sx={{
            minWidth: 132,
            height: 36,
            px: 2,
            marginInlineStart: { xs: 0, lg: "auto" },
            borderRadius: "8px",
            bgcolor: "#5C84FF",
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: 700,
            boxShadow: "0 8px 16px rgba(92, 132, 255, 0.28)",
            "&:hover": {
              bgcolor: "#5C84FF",
            },
          }}
        >
          تنزيل المحتوى
        </Button>
      </Box>

      <ApproveTestConfirmationModal
        open={isApproveModalOpen}
        onClose={handleCloseApproveModal}
        onConfirm={handleConfirmApprove}
        isPending={approveMutation.isPending}
        title="هل أنت متأكد من الموافقة على نشر هذا المحتوى؟"
        description="في حال الموافقة سيظهر هذا المحتوى للعامة داخل تطبيق الموبايل وسيستطيع المستخدمون تصفحه والتفاعل معه."
        pendingLabel="جاري الموافقة..."
      />
      <DeleteTestConfirmationModal
        open={isDeleteModalOpen}
        reason={deleteReason}
        onReasonChange={setDeleteReason}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isPending={deleteMutation.isPending}
        title="هل أنت متأكد من حذف هذا المحتوى؟"
        description="في حال الموافقة فإن المحتوى لن يظهر مرة أخرى للمستخدمين، وسيتم تحديث حالته ضمن سجلات المحتوى."
        placeholder="ادخل سبب اختيارك لحذف هذا المحتوى ..."
      />
    </>
  );
}

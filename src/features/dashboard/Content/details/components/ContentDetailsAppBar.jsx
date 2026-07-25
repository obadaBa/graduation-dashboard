import { Box, Button, Stack } from "@mui/material";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createIdempotencyKey } from "../../../../../shared/lib/idempotency";
import ApproveTestConfirmationModal from "../../../Tests/testDetails/components/ApproveTestConfirmationModal";
import DeleteTestConfirmationModal from "../../../Tests/testDetails/components/DeleteTestConfirmationModal";
import { useApproveLibraryMaterialMutation } from "../../hooks/useApproveLibraryMaterialMutation";
import { useDeleteLibraryMaterialMutation } from "../../hooks/useDeleteLibraryMaterialMutation";
import ContentDetailsDownloadButton from "./ContentDetailsDownloadButton";

const tabStartIconSx = {
  marginInlineStart: 0,
  marginInlineEnd: "8px",
};

const appBarSx = {
  mt: 2.5,
  width: "100%",
  minHeight: 68,
  borderRadius: "14px",
  bgcolor: (theme) => theme.palette.dashboard.surface,
  px: { xs: 1, md: 2 },
  py: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: { xs: "wrap", lg: "nowrap" },
  gap: 1.5,
  direction: "rtl",
};

const tabsStackSx = {
  minHeight: 46,
  flex: { xs: "1 1 100%", lg: "0 1 auto" },
  border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
  overflow: "hidden",
  bgcolor: (theme) => theme.palette.dashboard.surface,
  p: 0.6,
};

const actionStackSx = {
  px: { xs: 0, md: 1.4 },
  flexShrink: 0,
};

const approveIconSx = {
  fontSize: 26,
};

const deleteIconSx = {
  fontSize: 26,
};

const tabIconSx = {
  fontSize: 22,
};

const getGhostIconButtonSx = ({ color, borderColor, bgcolor }) => ({
  minWidth: 48,
  width: 48,
  height: 42,
  borderRadius: "10px",
  border: `1.5px dashed ${borderColor}`,
  bgcolor: bgcolor || ((theme) => theme.palette.dashboard.surface),
  color,
  p: 0,
  "&:hover": {
    bgcolor: bgcolor || ((theme) => theme.palette.dashboard.surface),
    borderColor,
  },
  "&.Mui-disabled": {
    bgcolor: bgcolor || ((theme) => theme.palette.dashboard.surface),
    color,
    borderColor,
    opacity: 0.55,
  },
});

const getTabActionSx = (active) => ({
  height: 46,
  px: 2.1,
  borderRadius: active ? "10px" : 0,
  border: active ? "1px solid #5C84FF" : "none",
  bgcolor: active ? ((theme) => theme.palette.dashboard.surface) : "transparent",
  color: active
    ? "#5C84FF"
    : ((theme) => theme.palette.dashboard.textSecondary),
  fontSize: 19,
  fontWeight: active ? 700 : 600,
  whiteSpace: "nowrap",
  "&:hover": {
    bgcolor: active ? ((theme) => theme.palette.dashboard.surface) : "transparent",
  },
  "& .MuiButton-startIcon": tabStartIconSx,
});

function GhostIconButton({
  children,
  color,
  borderColor,
  bgcolor,
  onClick,
  disabled = false,
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      sx={getGhostIconButtonSx({ color, borderColor, bgcolor })}
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
      sx={getTabActionSx(active)}
    >
      {label}
    </Button>
  );
}

export default function ContentDetailsAppBar({
  contentId,
  contentDetails,
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
      <Box sx={appBarSx}>
        <Stack
          direction="row-reverse"
          alignItems="center"
          sx={tabsStackSx}
        >
          <TabAction
            label="سجل الحالة"
            icon={<ViewAgendaOutlinedIcon sx={tabIconSx} />}
            active={activeTab === "status"}
            onClick={() => onTabChange("status")}
          />

          <TabAction
            label="سجل الإبلاغات"
            icon={<FlagOutlinedIcon sx={tabIconSx} />}
            active={activeTab === "creations"}
            onClick={() => onTabChange("creations")}
          />

          <TabAction
            label="نظرة عامة"
            icon={<WidgetsOutlinedIcon sx={tabIconSx} />}
            active={activeTab === "overview"}
            onClick={() => onTabChange("overview")}
          />
        </Stack>

        <Stack
          direction="row-reverse"
          alignItems="center"
          spacing={1.2}
          sx={actionStackSx}
          gap={1}
        >
          <GhostIconButton
            color="#3FD547"
            borderColor="#3FD547"
            onClick={handleApprove}
            disabled={isActionPending}
          >
            <CheckBoxRoundedIcon sx={approveIconSx} />
          </GhostIconButton>

          <GhostIconButton
            color="#FF6A64"
            borderColor="#FF6A64"
            onClick={handleDelete}
            disabled={isActionPending}
          >
            <DeleteOutlineRoundedIcon sx={deleteIconSx} />
          </GhostIconButton>
        </Stack>

        <ContentDetailsDownloadButton contentDetails={contentDetails} />

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


import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function ApproveTestConfirmationModal({
  open,
  onClose,
  onConfirm,
  isPending = false,
  title = "هل أنت متأكد من الموافقة على نشر هذا الاختبار؟",
  description = "في حال الموافقة سيظهر هذا الاختبار للعامة على تطبيق الموبايل وسيستطيع المستخدمين التفاعل معه",
  pendingLabel = "جاري الموافقة...",
}) {
  return (
    <Modal
      open={open}
      onClose={isPending ? undefined : onClose}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(8, 10, 14, 0.55)",
            backdropFilter: "blur(5px)",
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
          width: { xs: "calc(100% - 32px)", sm: 472 },
          borderRadius: "14px",
          bgcolor: (theme) => theme.palette.dashboard.surface,
          boxShadow: (theme) => theme.palette.dashboard.shadow,
          px: { xs: 2.2, sm: 3.2 },
          pt: 3,
          pb: 2.5,
          direction: "rtl",
          outline: 0,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            ml: "auto",
            borderRadius: "50%",
            bgcolor: "#E9FFE9",
            color: "#20D83A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px dashed #20D83A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 28 }} />
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 2,
            color: (theme) => theme.palette.dashboard.textPrimary,
            fontSize: 21,
            fontWeight: 900,
            textAlign: "start",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.7,
            textAlign: "start",
          }}
        >
          {description}
        </Typography>

        <Stack direction="row" spacing={2} gap={2} sx={{ mt: 2.8 }}>
          <Button
            fullWidth
            type="button"
            onClick={onClose}
            disabled={isPending}
            sx={{
              height: 40,
              borderRadius: "5px",
              border: (theme) => `1px solid ${theme.palette.dashboard.chartBorder}`,
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 16,
              fontWeight: 800,
              "&:hover": {
                bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
              },
            }}
          >
            إلغاء
          </Button>
          <Button
            fullWidth
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            sx={{
              height: 40,
              borderRadius: "5px",
              bgcolor: "#28E83F",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 800,
              "&:hover": { bgcolor: "#28E83F" },
              "&.Mui-disabled": {
                bgcolor: "#9AF2A5",
                color: "#FFFFFF",
              },
            }}
          >
            {isPending ? pendingLabel : "تأكيد"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

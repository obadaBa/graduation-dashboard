import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";

const MAX_REASON_LENGTH = 250;

export default function DeleteTestConfirmationModal({
  open,
  reason,
  onReasonChange,
  onClose,
  onConfirm,
  isPending = false,
  title = "هل أنت متأكد من حذف هذا الاختبار؟",
  description = "في حال الموافقة فإن الاختبار لن يظهر مرة أخرى للمستخدمين غير المشتركين وسيبقى ظاهرا للمشتركين",
  placeholder = "ادخل سبب اختيارك لحذف هذا الاختبار ...",
}) {
  const trimmedReason = reason.trim();
  const hasError = open && reason.length > 0 && !trimmedReason;

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
            bgcolor: "#FFE8E8",
            color: "#FF5B61",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DeleteOutlineRoundedIcon sx={{ fontSize: 40 }} />
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

        <TextField
          fullWidth
          value={reason}
          onChange={(event) =>
            onReasonChange(event.target.value.slice(0, MAX_REASON_LENGTH))
          }
          placeholder={placeholder}
          error={hasError}
          disabled={isPending}
          inputProps={{
            maxLength: MAX_REASON_LENGTH,
            dir: "rtl",
          }}
          sx={{
            mt: 1.5,
            "& .MuiOutlinedInput-root": {
              height: 38,
              borderRadius: "6px",
              bgcolor: (theme) => theme.palette.dashboard.chartBackground,
              fontSize: 12,
            },
          }}
        />

        <Typography
          sx={{
            mt: 0.45,
            color: (theme) => theme.palette.dashboard.textSecondary,
            fontSize: 11,
            direction: "ltr",
            textAlign: "left",
          }}
        >
          {reason.length}\{MAX_REASON_LENGTH}
        </Typography>

        <Stack direction="row" spacing={2} gap={2} sx={{ mt: 2.2 }}>
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
            disabled={!trimmedReason || isPending}
            sx={{
              height: 40,
              borderRadius: "5px",
              bgcolor: "#FF5B61",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 800,
              "&:hover": { bgcolor: "#FF5B61" },
              "&.Mui-disabled": {
                bgcolor: "#FFB0B3",
                color: "#FFFFFF",
              },
            }}
          >
            {isPending ? "جاري الحذف..." : "تأكيد"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

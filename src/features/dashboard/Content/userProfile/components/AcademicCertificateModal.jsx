import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";

export default function AcademicCertificateModal({
  open,
  onClose,
  imageUrl,
  isLoading,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(38, 50, 56, 0.35)",
            backdropFilter: "blur(7px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          dir="rtl"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "calc(100vw - 28px)", md: 720 },
            maxHeight: "calc(100dvh - 36px)",
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.22)",
            outline: "none",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2.2,
              py: 1.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "3px",
                backgroundImage:
                  "repeating-linear-gradient(to left, #CFCFCF 0 18px, transparent 18px 29px)",
              },
            }}
          >
            <Typography sx={{ color: "#263238", fontSize: 22, fontWeight: 900 }}>
              الشهادة الجامعية
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="إغلاق"
              sx={{
                width: 34,
                height: 34,
                borderRadius: "6px",
                border: "1px solid #DFDFDF",
                color: "#263238",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              minHeight: 420,
              maxHeight: "calc(100dvh - 110px)",
              p: 2,
              bgcolor: "#FAFAFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {isLoading ? (
              <CircularProgress size={34} />
            ) : imageUrl ? (
              <Box
                component="img"
                src={imageUrl}
                alt="الشهادة الجامعية"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "calc(100dvh - 150px)",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography
                sx={{ color: "#8A8A8A", fontSize: 15, fontWeight: 700 }}
              >
                تعذر عرض الشهادة الجامعية
              </Typography>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { VERIFICATION_DOCUMENT_TYPES } from "../../hooks/useAcademicVerificationDocumentsMutation";

export default function VerificationDocumentsModal({
  open,
  onClose,
  documents,
  errors,
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
            width: { xs: "calc(100vw - 28px)", md: 820 },
            maxHeight: "calc(100dvh - 36px)",
            borderRadius: "12px",
            bgcolor: (theme) => theme.palette.dashboard.surface,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.22)",
            outline: "none",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2.2,
              py: 1.8,
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
                backgroundImage: (theme) =>
                  `repeating-linear-gradient(to left, ${theme.palette.dashboard.divider} 0 18px, transparent 18px 29px)`,
              },
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.dashboard.textPrimary,
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              وثائق طلب التوثيق
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="إغلاق"
              sx={{
                width: 34,
                height: 34,
                borderRadius: "6px",
                border: (theme) =>
                  `1px solid ${theme.palette.dashboard.chartBorder}`,
                color: (theme) => theme.palette.dashboard.textPrimary,
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 2.5,
              minHeight: 360,
              maxHeight: "calc(100dvh - 120px)",
              overflowY: "auto",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={34} />
              </Box>
            ) : (
              VERIFICATION_DOCUMENT_TYPES.map((documentType) => {
                const document = documents.find(
                  (item) => item.documentType === documentType,
                );
                const documentError = errors.find(
                  (item) => item.documentType === documentType,
                );

                return (
                  <Box
                    key={documentType}
                    sx={{
                      minHeight: 320,
                      borderRadius: "8px",
                      border: (theme) =>
                        `1px solid ${theme.palette.dashboard.chartBorder}`,
                      bgcolor: (theme) => theme.palette.dashboard.chartBackground,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        px: 1.5,
                        py: 1.2,
                        color: (theme) => theme.palette.dashboard.textPrimary,
                        bgcolor: (theme) => theme.palette.dashboard.surface,
                        borderBottom: (theme) =>
                          `1px solid ${theme.palette.dashboard.chartBorder}`,
                        fontSize: 15,
                        fontWeight: 800,
                        textAlign: "right",
                      }}
                    >
                      {documentType}
                    </Typography>

                    {document ? (
                      <Box
                        component="img"
                        src={document.url}
                        alt={documentType}
                        sx={{
                          width: "100%",
                          flex: 1,
                          minHeight: 0,
                          objectFit: "contain",
                          p: 1,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          flex: 1,
                          px: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#FF5E58",
                            fontSize: 14,
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {documentError?.error?.message ||
                            "الوثيقة المطلوبة غير موجودة"}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

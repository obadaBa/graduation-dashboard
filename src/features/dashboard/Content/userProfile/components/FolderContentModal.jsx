import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TicketCard from "../../../Home/components/TicketCard";
import folderOpenImage from "../../../Assets/folder-open.svg";

export default function FolderContentModal({ open, onClose, folder }) {
  if (!folder) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(16, 24, 40, 0.18)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          direction: "rtl",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 560,
            height: "98vh",
            maxHeight: 820,
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 20px 48px rgba(15, 23, 42, 0.18)",
            px: 2.2,
            py: 1.8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              direction: "rtl",
            }}
          >
            <Typography
              sx={{ color: "#263238", fontSize: 20, fontWeight: 800 }}
            >
              محتوى المجلد
            </Typography>

            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                border: "1px solid #D8D8D8",
                borderRadius: "6px",
                color: "#263238",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              mt: 1.2,
              mb: 1.6,
              height: "3px",
              background:
                "repeating-linear-gradient(to left, #D7D7D7 0 14px, transparent 14px 24px)",
            }}
          />

          <Box
            sx={{
              borderRadius: "8px",
              bgcolor: "#5A84FF",
              color: "#FFFFFF",
              px: 2.1,
              py: 1.4,
              boxShadow: "0 8px 18px rgba(92, 132, 255, 0.24)",
            }}
          >
            <Stack
              direction="row-reverse"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                component="img"
                src={folderOpenImage}
                alt="folder"
                sx={{
                  width: 74,
                  height: 64,
                  flexShrink: 0,
                  objectFit: "contain",
                }}
              />

              <Box sx={{ flex: 1, textAlign: "right" }}>
                <Typography
                  sx={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25 }}
                >
                  {folder.title}
                </Typography>

                <Stack
                  direction="row-reverse"
                  spacing={1.4}
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{
                    mt: 1.2,
                    color: "rgba(255,255,255,0.94)",
                    transform: "translateX(16px)",
                  }}
                  gap={1}
                >
                  <Stack
                    direction="row-reverse"
                    spacing={0.35}
                    alignItems="center"
                    gap={0.5}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {folder.duration}
                    </Typography>
                    <AccessTimeRoundedIcon sx={{ fontSize: 16 , color:"black"  }} />
                  </Stack>
                  <Stack
                    direction="row-reverse"
                    spacing={0.35}
                    alignItems="center"
                    gap={0.5}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {`${folder.testsCount} عناصر`}
                    </Typography>
                    <LinkRoundedIcon sx={{ fontSize: 19 , color:"black" }} />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Stack
            spacing={1.3}
            sx={{
              mt: 1.6,
              maxHeight: "72vh",
              overflowY: "auto",
              overflowX: "hidden",
              pr: 0.2,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {folder.tests.map((test, index) => (
              <TicketCard
                key={`${folder.id}-${index}`}
                {...test}
                sx={{
                  height: { xs: 285, sm: 295, lg: 212 },
                  minHeight: { xs: 285, sm: 295, lg: 105 },
                  flexShrink: 0,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

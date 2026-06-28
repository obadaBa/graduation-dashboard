import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ProfileForm from "./ProfileForm";
import { useSupervisorProfileQuery } from "../hooks/useSupervisorProfileQuery";

function getStoredSupervisorId() {
  try {
    return JSON.parse(localStorage.getItem("authUser"))?.id;
  } catch {
    return null;
  }
}

export default function ProfileModal({ open, onClose }) {
  const supervisorId = getStoredSupervisorId();
  const profileQuery = useSupervisorProfileQuery(supervisorId, open);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(255, 255, 255, 0.44)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <Slide
        direction="left"
        in={open}
        timeout={{ enter: 320, exit: 260 }}
        mountOnEnter
        unmountOnExit
      >
        <Box
          dir="rtl"
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: { xs: "100%", sm: 390 },
            height: "100dvh",
            bgcolor: "#FFFFFF",
            boxShadow: "-10px 0 30px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            outline: "none",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 2,
              py: 2.2,
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
            <Typography
              sx={{ color: "#263238", fontSize: 20, fontWeight: 700, mt: 2 }}
            >
              ملفي الشخصي
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#FFFFFF",
                boxShadow: "0 2px 10px rgba(15, 23, 42, 0.08)",
                color: "#263238",
                "&:hover": { bgcolor: "#F7F7F7" },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          {profileQuery.isLoading ? (
            <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
              <CircularProgress size={32} />
            </Box>
          ) : profileQuery.isError ? (
            <Box sx={{ flex: 1, display: "grid", placeItems: "center", px: 3 }}>
              <Typography
                sx={{
                  color: "#FF5E58",
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                تعذر تحميل معلومات الملف الشخصي
              </Typography>
            </Box>
          ) : (
            <ProfileForm
              profile={profileQuery.data?.data}
              supervisorId={supervisorId}
              onUpdateSuccess={onClose}
            />
          )}
        </Box>
      </Slide>
    </Modal>
  );
}

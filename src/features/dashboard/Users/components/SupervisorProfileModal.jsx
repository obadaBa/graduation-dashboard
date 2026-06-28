import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BoyOutlinedIcon from "@mui/icons-material/BoyOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GirlOutlinedIcon from "@mui/icons-material/GirlOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SyriaFlagIcon from "../../Assets/flag-for-flag-syria-svgrepo-com.svg";
import { useSupervisorProfileQuery } from "../../profile/hooks/useSupervisorProfileQuery";
import { useDeleteSupervisorMutation } from "../hooks/useDeleteSupervisorMutation";

function ReadOnlyField({ label, value, icon, prefix, suffix }) {
  return (
    <Box>
      <Typography
        sx={{
          mb: 0.7,
          color: "#263238",
          fontSize: 15,
          fontWeight: 800,
          textAlign: "right",
        }}
      >
        {label}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: 40,
          borderRadius: "6px",
          border: "1px solid #DFDFDF",
          bgcolor: "#FAFAFA",
          overflow: "hidden",
        }}
      >
        {suffix}
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            px: 1.2,
            color: "#8C8C8C",
            fontSize: 13,
            fontWeight: 500,
            textAlign: "right",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value || "-"}
        </Typography>
        {prefix}
        {icon && (
          <Box
            sx={{
              width: 42,
              height: "100%",
              color: "#A4A4A4",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function GenderChoice({ active, children }) {
  return (
    <Box
      sx={{
        width: 38,
        height: 38,
        borderRadius: "7px",
        border: active ? "1px solid #5C84FF" : "1px solid #DFDFDF",
        bgcolor: active ? "#F2F6FF" : "#FFFFFF",
        color: active ? "#5C84FF" : "#A7A7A7",
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

function normalizeGender(value) {
  const gender = String(value || "").toLowerCase();
  if (gender === "ذكر" || gender === "male") return "male";
  if (gender === "أنثى" || gender === "انثى" || gender === "female") {
    return "female";
  }
  return "";
}

export default function SupervisorProfileModal({
  open,
  onClose,
  supervisorId,
}) {
  const profileQuery = useSupervisorProfileQuery(supervisorId, open);
  const deleteSupervisorMutation = useDeleteSupervisorMutation({
    onSuccess: onClose,
  });
  const supervisor = profileQuery.data?.data || {};
  const gender = normalizeGender(supervisor.gender);

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(20, 24, 29, 0.28)",
            backdropFilter: "blur(7px)",
          },
        },
      }}
    >
      <Box
        dir="rtl"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "calc(100% - 24px)", sm: 350 },
          height: "min(532px, calc(100vh - 24px))",
          borderRadius: "14px",
          bgcolor: "#FFFFFF",
          boxShadow: "0 16px 42px rgba(22, 29, 37, 0.2)",
          outline: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ px: 2.2, pt: 2.2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              sx={{
                color: "#263238",
                fontSize: 21,
                fontWeight: 900,
                whiteSpace: "nowrap",
              }}
            >
              الملف الشخصي{" "}
              <Box component="span" sx={{ color: "#5C84FF" }}>
                للمشرف
              </Box>
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="إغلاق ملف المشرف"
              sx={{
                width: 30,
                height: 30,
                borderRadius: "3px",
                border: "1px solid #D1D5D8",
                color: "#263238",
                p: 0,
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 23 }} />
            </IconButton>
          </Stack>

          <Box
            sx={{
              mt: 1.6,
              height: 3,
              background:
                "repeating-linear-gradient(to left, #CFCFCF 0 14px, transparent 14px 25px)",
            }}
          />
        </Box>

        {profileQuery.isLoading ? (
          <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
            <CircularProgress size={30} />
          </Box>
        ) : profileQuery.isError ? (
          <Box sx={{ flex: 1, display: "grid", placeItems: "center", px: 3 }}>
            <Typography sx={{ color: "#FF5E58", fontSize: 14, fontWeight: 700 }}>
              تعذر تحميل معلومات المشرف
            </Typography>
          </Box>
        ) : (
          <Stack
            spacing={1.65}
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              px: 2.7,
              pt: 2.4,
              pb: 1.4,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ReadOnlyField
              label="الاسم"
              value={supervisor.name}
              icon={<BadgeOutlinedIcon sx={{ fontSize: 22 }} />}
            />
            <ReadOnlyField
              label="البريد الالكتروني"
              value={supervisor.email}
              icon={<EmailOutlinedIcon sx={{ fontSize: 21 }} />}
            />
            <ReadOnlyField
              label="المحافظة"
              value={supervisor.governorate}
              icon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 28 }} />}
            />
            <ReadOnlyField
              label="رقم الهاتف"
              value={supervisor.phone}
              prefix={
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.45}
                  sx={{
                    height: "100%",
                    px: 0.8,
                    borderRight: "1px solid #DFDFDF",
                    color: "#8C8C8C",
                    direction: "ltr",
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: "#8C8C8C", fontSize: 12 }}>
                    +963
                  </Typography>
                  <Box
                    component="img"
                    src={SyriaFlagIcon}
                    alt="علم سوريا"
                    sx={{ width: 17, height: 17, objectFit: "contain" }}
                  />
                </Stack>
              }
            />

            <Box>
              <Typography
                sx={{
                  mb: 0.7,
                  color: "#263238",
                  fontSize: 15,
                  fontWeight: 800,
                  textAlign: "right",
                }}
              >
                الجنس
              </Typography>
              <Stack direction="row" gap={1} justifyContent="flex-start">
                <GenderChoice active={gender === "female"}>
                  <GirlOutlinedIcon sx={{ fontSize: 27 }} />
                </GenderChoice>
                <GenderChoice active={gender === "male"}>
                  <BoyOutlinedIcon sx={{ fontSize: 27 }} />
                </GenderChoice>
              </Stack>
            </Box>
          </Stack>
        )}

        <Box
          sx={{
            px: 1.2,
            py: 1.05,
            borderTop: "1px solid #EEEEEE",
            boxShadow: "0 -5px 12px rgba(28, 38, 49, 0.08)",
            bgcolor: "#FFFFFF",
          }}
        >
          <Button
            fullWidth
            type="button"
            onClick={() => deleteSupervisorMutation.mutate(supervisorId)}
            disabled={!supervisorId || deleteSupervisorMutation.isPending}
            sx={{
              height: 38,
              borderRadius: "4px",
              bgcolor: "#FF484D",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              boxShadow: "0 2px 7px rgba(255, 72, 77, 0.25)",
              "&:hover": { bgcolor: "#FF484D" },
              "&.Mui-disabled": {
                bgcolor: "#FF9A9D",
                color: "#FFFFFF",
              },
            }}
          >
            {deleteSupervisorMutation.isPending
              ? "جاري حذف المشرف..."
              : "حذف المشرف"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

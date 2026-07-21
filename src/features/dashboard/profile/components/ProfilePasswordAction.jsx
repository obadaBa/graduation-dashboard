import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

export default function ProfilePasswordAction({ onClick }) {
  return (
    <Button
      type="button"
      fullWidth
      onClick={onClick}
      sx={{
        mt: 0.5,
        height: 46,
        borderRadius: "8px",
        justifyContent: "space-between",
        bgcolor: (theme) => theme.palette.dashboard.chartBackground,
        color: (theme) => theme.palette.dashboard.textPrimary,
        px: 1.1,
        overflow: "hidden",
        "&:hover": {
          bgcolor: (theme) => theme.palette.dashboard.hoverItem.background,
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }} gap={1}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: (theme) =>
              alpha("#FF5252", theme.palette.mode === "dark" ? 0.18 : 0.24),
            color: "#FF5252",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
            fontWeight: 800,
            boxShadow: "0 4px 12px rgba(255, 82, 82, 0.22)",
            flexShrink: 0,
            pt: 1,
          }}
        >
          **
        </Box>

        <Box sx={{ textAlign: "right", minWidth: 0 }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textPrimary,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            تغيير كلمة المرور
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.dashboard.textSecondary,
              fontSize: 9.5,
              fontWeight: 500,
            }}
          >
            يمكنك فعل ذلك إذا احتجت لتعديل بيانات الدخول
          </Typography>
        </Box>
      </Stack>

      <KeyboardBackspaceRoundedIcon
        sx={{
          color: (theme) => theme.palette.dashboard.textSecondary,
          fontSize: 20,
        }}
      />
    </Button>
  );
}

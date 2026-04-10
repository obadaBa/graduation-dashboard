import { Box, Typography, useTheme } from "@mui/material";
import img from "../Assets/Group 7020.png";

export default function LoginFirstSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "block" },
        width: { lg: "40%", xl: "42%" },
        minWidth: { lg: 360, xl: 420 },
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        variant="h2"
        color="primary"
        sx={{
          position: "absolute",
          left: { lg: "42%", xl: "44%" },
          top: { lg: "61%", xl: "63%" },
          color: theme.palette.auth.title,
          fontWeight: 700,
          fontSize: { lg: "2.5rem", xl: "3rem" },
        }}
      >
        لوحة تحكم
      </Typography>
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          left: { lg: "42%", xl: "44%" },
          top: { lg: "70%", xl: "72%" },
          color: theme.palette.auth.loginTitle,
          fontWeight: 700,
          fontSize: { lg: "2.5rem", xl: "3rem" },
        }}
      >
        تطبيق نيرد
      </Typography>
      <Box
        component="img"
        src={img}
        alt="لوحة إدارة مشروع التخرج"
        sx={{
          height: "105%",
          display: "block",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Box>
  );
}

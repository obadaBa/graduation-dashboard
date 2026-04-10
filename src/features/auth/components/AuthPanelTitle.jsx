import { Box, Typography, useTheme } from "@mui/material";

export default function AuthPanelTitle({ icon, iconAlt, title, sx }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        ...sx,
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={iconAlt}
        sx={{
          width: { xs: 46, sm: 54 },
          height: { xs: 46, sm: 54 },
          objectFit: "contain",
        }}
      />
      <Typography
        sx={{
          color: theme.palette.auth.title,
          fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.5rem" },
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

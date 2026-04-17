import { Box, Typography, useTheme } from "@mui/material";

export default function AuthVisualSection({
  illustration,
  illustrationAlt,
  title,
  description,
  backgroundDecoration,
  illustrationSx,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        width: { lg: "40%", xl: "42%" },
        minWidth: { lg: 360, xl: 420 },
        height: "99dvh",
        position: "relative",
        alignItems: "center",
        px: { lg: 2.5, xl: 3 },
        pt: 0,
        pb: { lg: 2.5, xl: 3 },
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={backgroundDecoration}
        alt=""
        sx={{
          position: "absolute",
          right: { lg: "-15%", xl: "-20%" },
          width: "auto",
          height: "130%",
          objectFit: "contain",
          objectPosition: "right top",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
          mt: 8,
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "36px",
          backgroundColor: theme.palette.auth.fixedContainer,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 3.5,
        }}
      >
        <Box
          component="img"
          src={illustration}
          alt={illustrationAlt}
          sx={{
            position: "relative",
            zIndex: 1,
            width: { lg: "78%", xl: "74%" },
            maxWidth: 360,
            height: "auto",
            objectFit: "contain",
            mb: { lg: 4, xl: 5 },
            ...illustrationSx,
          }}
        />

        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            color: theme.palette.auth.title,
            fontSize: { lg: "2.5rem", xl: "2.85rem" },
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.15,
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            color: theme.palette.auth.fieldLabel,
            fontSize: { lg: "1.15rem", xl: "1.3rem" },
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.7,
            maxWidth: 420,
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

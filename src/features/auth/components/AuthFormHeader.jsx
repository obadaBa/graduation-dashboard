import { Box, Button, Typography, useTheme } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import logolight from "../Assets/logolight.png";
import logodark from "../Assets/logodark.png";

export default function AuthFormHeader({
  showBackButton = false,
  backLabel,
  backTo = "/login",
  backState,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentLogo = theme.palette.mode === "light" ? logolight : logodark;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: 56, sm: 64 },
        display: "flex",
        alignItems: "center",
        justifyContent: showBackButton ? "space-between" : "flex-end",
        mb: showBackButton ? { xs: 4, sm: 5, md: 6 } : { xs: 2, sm: 3 },
      }}
    >
      {showBackButton ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ArrowBack sx={{ color: theme.palette.auth.textlogo }} />
          <Button
            type="button"
            variant="text"
            onClick={() => navigate(backTo, backState ? { state: backState } : undefined)}
            sx={{
              color: theme.palette.auth.textlogo,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontWeight: 600,
              p: 0,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {backLabel}
          </Button>
        </Box>
      ) : null}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5 },
        }}
      >
        <Box
          component="img"
          src={currentLogo}
          alt="شعار نيرد"
          sx={{
            width: { xs: 38, sm: 44 },
            height: { xs: 38, sm: 44 },
            objectFit: "contain",
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", sm: "2rem" },
            fontWeight: 700,
            color: theme.palette.auth.textlogo,
            lineHeight: 1,
          }}
        >
          <Box component="span" sx={{ color: theme.palette.auth.title }}>
            ن
          </Box>
          يرد
        </Typography>
      </Box>
    </Box>
  );
}

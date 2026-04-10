import { Button, useTheme } from "@mui/material";

export default function AuthPrimaryButton({
  children,
  type = "button",
  sx,
  ...props
}) {
  const theme = useTheme();
  const authButtonShadow =
    theme.palette.mode === "dark"
      ? `0 0 10px ${theme.palette.auth.button}CC, 0 0 20px ${theme.palette.auth.button}33`
      : "0 4px 12px rgba(66, 117, 255, 0.28)";

  return (
    <Button
      type={type}
      variant="contained"
      sx={{
        borderRadius: "10px",
        backgroundColor: theme.palette.auth.button,
        color: theme.palette.auth.buttonText,
        fontWeight: 700,
        boxShadow: authButtonShadow,
        "&:hover": {
          backgroundColor: theme.palette.auth.button,
          boxShadow: authButtonShadow,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

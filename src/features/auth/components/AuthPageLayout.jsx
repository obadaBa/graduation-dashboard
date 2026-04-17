import { Box } from "@mui/material";

export default function AuthPageLayout({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      {children}
    </Box>
  );
}

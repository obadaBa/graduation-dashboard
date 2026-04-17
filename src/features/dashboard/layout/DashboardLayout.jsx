import { useState } from "react";
import { Box, Fab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Outlet } from "react-router";
import DashboardDrawer from "../components/DashboardDrawer";

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <DashboardDrawer
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {isMobile && !mobileOpen && (
        <Fab
          onClick={() => setMobileOpen(true)}
          size="medium"
          sx={{
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: theme.palette.dashboard.activeItem.color,
            color: "#FFFFFF",
            boxShadow: "0 8px 20px rgba(85, 131, 255, 0.28)",
            "&:hover": {
              bgcolor: theme.palette.dashboard.activeItem.color,
            },
          }}
        >
          <MenuRoundedIcon />
        </Fab>
      )}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserProfileView from "./components/UserProfileView";

export default function UserProfile() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: { xs: "auto", md: "auto", lg: "100vh" },
        overflowY: { xs: "auto", md: "auto", lg: "hidden" },
        overflowX: "visible",
        bgcolor: theme.palette.dashboard.pageBackground,
        color: theme.palette.dashboard.textPrimary,
        scrollBehavior: "smooth",
        pr: { xs: 0, md: 1 },
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <UserProfileView />
    </Box>
  );
}

import { Box } from "@mui/material";
import UserProfileView from "./components/UserProfileView";

export default function UserProfile() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "hidden",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        pr: { xs: 0, md: 1 },
      }}
    >
      <UserProfileView />
    </Box>
  );
}

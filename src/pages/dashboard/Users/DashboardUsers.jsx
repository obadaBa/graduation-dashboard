import { Box } from "@mui/material";
import UsersSection1 from "../../../features/dashboard/Users/components/UsersSection1";

export default function DashboardUsers() {
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
      <UsersSection1 />
    </Box>
  );
}

import { Box } from "@mui/material";
import ContentDetailsView from "../../../features/dashboard/Content/details/components/ContentDetailsView";

export default function ContentDetails() {
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
      <ContentDetailsView />
    </Box>
  );
}

import { Box } from "@mui/material";
import ContentHeader from "./ContentHeader";
import ContentFilterBar from "./ContentFilterBar";
import ContentLibraryBoard from "./ContentLibraryBoard";

export default function ContentSection1() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ContentHeader />
      <ContentFilterBar />
      <ContentLibraryBoard />
    </Box>
  );
}

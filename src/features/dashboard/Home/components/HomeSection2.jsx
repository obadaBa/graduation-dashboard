import { forwardRef } from "react";
import { Box } from "@mui/material";
import HomeSection2Header from "./HomeSection2Header";
import HalfCircleSales from "./HalfCircleSales";

const HomeSection2 = forwardRef(function HomeSection2(
  { onScrollPrev, onScrollNext },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
      }}
    >
      <HomeSection2Header />
      <HalfCircleSales onScrollPrev={onScrollPrev} onScrollNext={onScrollNext} />
    </Box>
  );
});

export default HomeSection2;

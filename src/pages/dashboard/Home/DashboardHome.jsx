import { useRef } from "react";
import { Box } from "@mui/material";
import HomeSection1 from "../../../features/dashboard/Home/components/HomeSection1";
import HomeSection2 from "../../../features/dashboard/Home/components/HomeSection2";
import HomeSection3 from "../../../features/dashboard/Home/components/HomeSection3";

export default function DashboardHome() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const handleScrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollToSection1 = () => {
    section1Ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollToSection3 = () => {
    section3Ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pr: { xs: 0, md: 1 },
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Box ref={section1Ref}>
        <HomeSection1 onScrollNext={handleScrollToSection2} />
      </Box>
      <HomeSection2
        ref={section2Ref}
        onScrollPrev={handleScrollToSection1}
        onScrollNext={handleScrollToSection3}
      />
      <Box ref={section3Ref}>
        <HomeSection3 />
      </Box>
    </Box>
  );
}

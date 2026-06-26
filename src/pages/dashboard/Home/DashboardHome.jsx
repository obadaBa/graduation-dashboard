import { useRef } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeSection1 from "../../../features/dashboard/Home/components/HomeSection1";
import HomeSection2 from "../../../features/dashboard/Home/components/HomeSection2";
import HomeSection3 from "../../../features/dashboard/Home/components/HomeSection3";

function getStoredUserRole() {
  try {
    const rawUser = localStorage.getItem("authUser");

    if (!rawUser) {
      return null;
    }

    return JSON.parse(rawUser)?.role || null;
  } catch {
    return null;
  }
}

export default function DashboardHome() {
  const theme = useTheme();
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const role = getStoredUserRole();
  const isOwner = role === "owner";

  const handleScrollToSection1 = () => {
    section1Ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollToSection2 = () => {
    if (!isOwner) {
      section3Ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    section2Ref.current?.scrollIntoView({
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
        bgcolor: theme.palette.dashboard.pageBackground,
        color: theme.palette.dashboard.textPrimary,
        overflowY: "auto",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pr: { xs: 0, md: 1 },
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Box ref={section1Ref} sx={{ flexShrink: 0 }}>
        <HomeSection1 onScrollNext={handleScrollToSection2} />
      </Box>

      {isOwner && (
        <HomeSection2
          ref={section2Ref}
          onScrollPrev={handleScrollToSection1}
          onScrollNext={handleScrollToSection3}
        />
      )}

      <Box ref={section3Ref} sx={{ flexShrink: 0 }}>
        <HomeSection3 />
      </Box>
    </Box>
  );
}

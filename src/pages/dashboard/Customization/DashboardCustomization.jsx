import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomizationSection1 from "../../../features/dashboard/Customization/components/CustomizationSection1";

export default function DashboardCustomization() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: { xs: "auto", md: "auto", lg: "100vh" },
        overflowY: { xs: "auto", md: "auto", lg: "hidden" },
        overflowX: "hidden",
        scrollBehavior: "smooth",
        pr: { xs: 0, md: 1 },
        bgcolor: theme.palette.dashboard.pageBackground,
        color: theme.palette.dashboard.textPrimary,
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <CustomizationSection1 />
    </Box>
  );
}

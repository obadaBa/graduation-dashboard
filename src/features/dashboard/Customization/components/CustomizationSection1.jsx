import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CategoryTitlesCard from "./CategoryTitlesCard";
import CustomizationHeader from "./CustomizationHeader";
import ScientificCategoriesCard from "./ScientificCategoriesCard";
/* import TaxRateCard from "./TaxRateCard"; */

export default function CustomizationSection1() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.dashboard.pageBackground,
        color: theme.palette.dashboard.textPrimary,
        overflow: "hidden",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <CustomizationHeader />
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 1.5, md: 2 },
          pb: 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
            },
            alignItems: "start",
            gap: 2.2,
          }}
        >
          <Box
            sx={{
              order: { xs: 1, md: 1 },
              gridRow: { md: "span 2" },
              minWidth: 0,
            }}
          >
            <ScientificCategoriesCard />
          </Box>
          <Box sx={{ order: { xs: 2, md: 2 }, minWidth: 0 }}>
            <CategoryTitlesCard />
          </Box>
         {/*  <Box sx={{ order: { xs: 3, md: 3 }, minWidth: 0 }}>
            <TaxRateCard />
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

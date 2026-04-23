import { Box } from "@mui/material";
import HomeSection3Header from "./HomeSection3Header";
import HomeSection3AudienceChart from "./HomeSection3AudienceChart";
import HomeSection3SourceChart from "./HomeSection3SourceChart";
import HomeSection3ContentChart from "./HomeSection3ContentChart";

export default function HomeSection3() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
        borderRadius: "24px",
      }}
    >
      <HomeSection3Header />

      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 2.5,
          alignItems: "stretch",
          justifyItems: { xs: "start", lg: "stretch" },
        }}
      >
       
        <HomeSection3SourceChart />
         <HomeSection3AudienceChart />
      </Box>

      <HomeSection3ContentChart />
    </Box>
  );
}

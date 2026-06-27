import { Box } from "@mui/material";
import SalesActions from "./SalesActions";
import SalesHeader from "./SalesHeader";
import SalesTable from "./SalesTable";

export default function SalesSection1() {
  return (
    <Box sx={{ width: "100%", minHeight: "100%", direction: "rtl" }}>
      <SalesHeader />
      <SalesActions />
      <SalesTable />
    </Box>
  );
}

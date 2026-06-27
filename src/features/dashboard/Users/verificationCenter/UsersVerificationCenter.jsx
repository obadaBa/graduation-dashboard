import { Box } from "@mui/material";
import VerificationCenterHeader from "./components/VerificationCenterHeader";
import VerificationCenterTable from "./components/VerificationCenterTable";

export default function UsersVerificationCenter() {
  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F9FB",
        px: { xs: 2, md: 5 },
        py: 4,
      }}
    >
      <VerificationCenterHeader />
      <VerificationCenterTable />
    </Box>
  );
}

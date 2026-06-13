import { useState } from "react";
import { Box } from "@mui/material";
import TestDetailsActionButtons from "./components/TestDetailsActionButtons";
import TestDetailsAppBar from "./components/TestDetailsAppBar";
import TestDetailsHeader from "./components/TestDetailsHeader";
import TestDetailsOverview from "./components/TestDetailsOverview";
import TestDetailsQuestions from "./components/TestDetailsQuestions";
import TestDetailsReviews from "./components/TestDetailsReviews";
import TestDetailsSampleQuestions from "./components/TestDetailsSampleQuestions";
import TestDetailsStatusRecord from "./components/TestDetailsStatusRecord";
import ContentCreationsRecord from "../details/components/ContentCreationsRecord";

export default function TestDetails() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#FFFFFF",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <TestDetailsHeader />
      <TestDetailsActionButtons />
      <TestDetailsAppBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" && <TestDetailsOverview />}
      {activeTab === "questions" && <TestDetailsQuestions />}
      {activeTab === "sample" && <TestDetailsSampleQuestions />}
      {activeTab === "reviews" && <TestDetailsReviews />}
      {activeTab === "status" && <TestDetailsStatusRecord />}
      {activeTab === "creations" && <ContentCreationsRecord />}
    </Box>
  );
}

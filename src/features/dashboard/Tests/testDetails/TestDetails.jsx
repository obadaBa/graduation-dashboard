import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import TestDetailsActionButtons from "./components/TestDetailsActionButtons";
import TestDetailsAppBar from "./components/TestDetailsAppBar";
import TestDetailsHeader from "./components/TestDetailsHeader";
import TestDetailsOverview from "./components/TestDetailsOverview";
import TestDetailsQuestions from "./components/TestDetailsQuestions";
import TestDetailsReviews from "./components/TestDetailsReviews";
import TestDetailsSampleQuestions from "./components/TestDetailsSampleQuestions";
import TestDetailsStatusRecord from "./components/TestDetailsStatusRecord";
import ContentCreationsRecord from "../../Content/details/components/ContentCreationsRecord";
import { useTestManagementDetailsQuery } from "../hooks/useTestManagementDetailsQuery";
import { useTestManagementRealtime } from "../hooks/useTestManagementRealtime";

export default function TestDetails() {
  const theme = useTheme();
  useTestManagementRealtime();
  const { testId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const testDetailsQuery = useTestManagementDetailsQuery(testId);
  const testDetails = testDetailsQuery.data?.data;

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: theme.palette.dashboard.pageBackground,
        color: theme.palette.dashboard.textPrimary,
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        direction: "rtl",
        overflow: "hidden",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <TestDetailsHeader />
      <TestDetailsActionButtons
        testId={testId}
        testTitle={testDetails?.basic_information?.title}
      />
      <TestDetailsAppBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" && (
        <TestDetailsOverview
          testDetails={testDetails}
          isLoading={testDetailsQuery.isLoading}
        />
      )}
      {activeTab === "questions" && <TestDetailsQuestions testId={testId} />}
      {activeTab === "sample" && <TestDetailsSampleQuestions testId={testId} />}
      {activeTab === "reviews" && <TestDetailsReviews testId={testId} />}
      {activeTab === "status" && (
        <TestDetailsStatusRecord
          testId={testId}
          onShowReports={() => setActiveTab("creations")}
        />
      )}
      {activeTab === "creations" && <ContentCreationsRecord testId={testId} />}
    </Box>
  );
}

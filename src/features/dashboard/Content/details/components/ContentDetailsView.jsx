import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useLibraryMaterialDetailsQuery } from "../../hooks/useLibraryMaterialDetailsQuery";
import ContentDetailsAppBar from "./ContentDetailsAppBar";
import ContentCreationsRecord from "./ContentCreationsRecord";
import ContentDetailsHeader from "./ContentDetailsHeader";
import ContentOverviewCard from "./ContentOverviewCard";
import ContentStatusRecord from "./ContentStatusRecord";

export default function ContentDetailsView() {
  const { contentId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const detailsQuery = useLibraryMaterialDetailsQuery(contentId);
  const contentDetails = detailsQuery.data?.data;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: (theme) => theme.palette.dashboard.pageBackground,
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <ContentDetailsHeader />
      <ContentDetailsAppBar
        contentId={contentId}
        contentDetails={contentDetails}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "creations" ? (
        <ContentCreationsRecord contentId={contentId} />
      ) : activeTab === "status" ? (
        <ContentStatusRecord
          contentId={contentId}
          onNavigateReports={() => setActiveTab("creations")}
        />
      ) : (
        <ContentOverviewCard
          contentDetails={contentDetails}
          isLoading={detailsQuery.isLoading}
        />
      )}
    </Box>
  );
}

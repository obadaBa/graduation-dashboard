import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { CONTENT_ITEMS } from "../../content.mock";
import ContentDetailsAppBar from "./ContentDetailsAppBar";
import ContentCreationsRecord from "./ContentCreationsRecord";
import ContentDetailsHeader from "./ContentDetailsHeader";
import ContentOverviewCard from "./ContentOverviewCard";
import ContentStatusRecord from "./ContentStatusRecord";

export default function ContentDetailsView() {
  const { contentId } = useParams();
  const currentItem = CONTENT_ITEMS.find((item) => String(item.id) === String(contentId));
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "#FFFFFF",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <ContentDetailsHeader />
      <ContentDetailsAppBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "creations" ? (
        <ContentCreationsRecord item={currentItem} />
      ) : activeTab === "status" ? (
        <ContentStatusRecord item={currentItem} />
      ) : (
        <ContentOverviewCard item={currentItem} />
      )}
    </Box>
  );
}

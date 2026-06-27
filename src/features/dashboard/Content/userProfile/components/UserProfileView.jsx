import { useState } from "react";
import { Box } from "@mui/material";
import ContentLibraryBoard from "../../components/ContentLibraryBoard";
import UserProfileAppBar from "./UserProfileAppBar";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileListsPanel from "./UserProfileListsPanel";
import UserProfileOverview from "./UserProfileOverview";
import UserProfileTestsPanel from "./UserProfileTestsPanel";

export default function UserProfileView() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFFFFF",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        overflow: "hidden",
      }}
    >
      <UserProfileHeader />
      <UserProfileAppBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "tests" ? (
        <UserProfileTestsPanel />
      ) : activeTab === "content" ? (
        <ContentLibraryBoard />
      ) : activeTab === "lists" ? (
        <UserProfileListsPanel />
      ) : (
        <UserProfileOverview />
      )}
    </Box>
  );
}

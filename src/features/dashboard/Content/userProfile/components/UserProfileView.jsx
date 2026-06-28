import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router";
import BlockUserModal from "./BlockUserModal";
import UserProfileAppBar from "./UserProfileAppBar";
import UserProfileContentPanel from "./UserProfileContentPanel";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileListsPanel from "./UserProfileListsPanel";
import UserProfileOverview from "./UserProfileOverview";
import UserProfileTestsPanel from "./UserProfileTestsPanel";

export default function UserProfileView() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

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
      <UserProfileAppBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBlockUser={() => setIsBlockModalOpen(true)}
      />

      {activeTab === "tests" ? (
        <UserProfileTestsPanel />
      ) : activeTab === "content" ? (
        <UserProfileContentPanel />
      ) : activeTab === "lists" ? (
        <UserProfileListsPanel />
      ) : (
        <UserProfileOverview />
      )}

      <BlockUserModal
        open={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        userId={userId}
      />
    </Box>
  );
}

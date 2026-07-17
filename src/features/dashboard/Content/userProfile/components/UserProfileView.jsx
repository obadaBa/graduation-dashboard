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
import { useBlockedUsersQuery } from "../../../Users/hooks/useBlockedUsersQuery";
import { useUserBanHistoryQuery } from "../../../Users/hooks/useUserBanHistoryQuery";

export default function UserProfileView() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const blockedUsersQuery = useBlockedUsersQuery({
    tab: "all",
    enabled: Boolean(userId),
  });
  const blockedUsers = Array.isArray(blockedUsersQuery.data?.data)
    ? blockedUsersQuery.data.data
    : [];
  const blockedUser = blockedUsers.find(
    (user) => String(user.user_id) === String(userId),
  );
  const banHistoryQuery = useUserBanHistoryQuery(userId, Boolean(userId));
  const firstBanRecord = Array.isArray(banHistoryQuery.data?.data)
    ? banHistoryQuery.data.data[0]
    : null;
  const hasActiveOrFutureBan = ["active", "future"].includes(firstBanRecord?.ban_status);
  const isUserBlocked = hasActiveOrFutureBan || Boolean(blockedUser);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.dashboard.pageBackground,
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
        isUserBlocked={isUserBlocked}
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
        initiallyBlocked={isUserBlocked}
        blockedUser={blockedUser}
      />
    </Box>
  );
}

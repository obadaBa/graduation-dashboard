import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router";
import AcademicCertificateModal from "./AcademicCertificateModal";
import BlockUserModal from "./BlockUserModal";
import UserProfileAppBar from "./UserProfileAppBar";
import UserProfileContentPanel from "./UserProfileContentPanel";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileListsPanel from "./UserProfileListsPanel";
import UserProfileOverview from "./UserProfileOverview";
import UserProfileTestsPanel from "./UserProfileTestsPanel";
import { useBlockedUsersQuery } from "../../../Users/hooks/useBlockedUsersQuery";
import { useUserBanHistoryQuery } from "../../../Users/hooks/useUserBanHistoryQuery";
import { useUserAcademicCertificateMutation } from "../../hooks/useUserAcademicCertificateMutation";
import { useUserProfileOverviewQuery } from "../../hooks/useUserProfileOverviewQuery";

export default function UserProfileView() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState("");
  const profileQuery = useUserProfileOverviewQuery(userId);
  const certificateMutation = useUserAcademicCertificateMutation();
  const header = profileQuery.data?.data?.header || {};
  const showCertificateButton = Boolean(header.is_academically_verified);
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

  useEffect(() => {
    return () => {
      if (certificateUrl) URL.revokeObjectURL(certificateUrl);
    };
  }, [certificateUrl]);

  const handleShowCertificate = async () => {
    setCertificateUrl("");
    setIsCertificateOpen(true);

    try {
      const certificateBlob = await certificateMutation.mutateAsync(userId);
      setCertificateUrl(URL.createObjectURL(certificateBlob));
    } catch {
      setCertificateUrl("");
    }
  };

  const handleCloseCertificate = () => {
    setIsCertificateOpen(false);
    setCertificateUrl("");
    certificateMutation.reset();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.dashboard.pageBackground,
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        overflowX: "hidden",
        overflowY: "auto",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <UserProfileHeader />
      <UserProfileAppBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBlockUser={() => setIsBlockModalOpen(true)}
        onShowCertificate={handleShowCertificate}
        isUserBlocked={isUserBlocked}
        showCertificateButton={showCertificateButton}
        isCertificateLoading={certificateMutation.isPending}
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
      <AcademicCertificateModal
        open={isCertificateOpen}
        onClose={handleCloseCertificate}
        imageUrl={certificateUrl}
        isLoading={certificateMutation.isPending}
      />
    </Box>
  );
}

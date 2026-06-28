import { useParams } from "react-router";
import ContentLibraryBoard from "../../components/ContentLibraryBoard";
import { useUserProfileMaterialsQuery } from "../../hooks/useUserProfileMaterialsQuery";

export default function UserProfileContentPanel() {
  const { userId } = useParams();
  const materialsQuery = useUserProfileMaterialsQuery(userId);
  const responseData = materialsQuery.data?.data || materialsQuery.data || {};

  return (
    <ContentLibraryBoard
      materialsQuery={materialsQuery}
      statistics={responseData.stats || {}}
    />
  );
}

import { useState } from "react";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import TableUser from "../../components/TableUser";
import { useSearchUsersQuery } from "../hooks/useSearchUsersQuery";
import { useUsersQuery } from "../hooks/useUsersQuery";
import UsersActions from "./UsersActions";
import UsersHeader from "./UsersHeader";

export default function UsersSection1() {
  const queryClient = useQueryClient();
  const [userType, setUserType] = useState("mobile_users");
  const [sortBy, setSortBy] = useState("created_at");
  const [searchValue, setSearchValue] = useState("");
  const usersQuery = useUsersQuery({ type: userType, sortBy });
  const searchQuery = useSearchUsersQuery({
    role: userType,
    search: searchValue,
  });
  const isSearching = Boolean(searchValue.trim());
  const displayedQuery = isSearching ? searchQuery : usersQuery;

  const resetUsersPagination = (nextType, nextSortBy) => {
    queryClient.removeQueries({
      queryKey: ["users", "list", nextType, nextSortBy],
      exact: true,
    });
  };

  const handleTypeChange = (nextType) => {
    if (nextType === userType) return;

    if (isSearching) {
      queryClient.removeQueries({
        queryKey: ["users", "search", nextType, searchValue.trim()],
        exact: true,
      });
    } else {
      resetUsersPagination(nextType, sortBy);
    }

    setUserType(nextType);
  };

  const handleSortChange = (nextSort) => {
    if (nextSort === sortBy) return;
    resetUsersPagination(userType, nextSort);
    setSortBy(nextSort);
  };

  const handleSearchChange = (nextSearchValue) => {
    const normalizedSearch = nextSearchValue.trim();

    if (normalizedSearch) {
      queryClient.removeQueries({
        queryKey: ["users", "search", userType, normalizedSearch],
        exact: true,
      });
    } else {
      resetUsersPagination(userType, sortBy);
    }

    setSearchValue(nextSearchValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <UsersHeader />
      <UsersActions
        userType={userType}
        onUserTypeChange={handleTypeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onClearSearch={() => handleSearchChange("")}
      />
      <TableUser usersQuery={displayedQuery} isSearching={isSearching} />
    </Box>
  );
}

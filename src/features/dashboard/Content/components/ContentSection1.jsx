import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLibraryMaterialsQuery } from "../hooks/useLibraryMaterialsQuery";
import { useSearchLibraryMaterialsQuery } from "../hooks/useSearchLibraryMaterialsQuery";
import ContentHeader from "./ContentHeader";
import ContentFilterBar from "./ContentFilterBar";
import ContentLibraryBoard from "./ContentLibraryBoard";

export default function ContentSection1() {
  const [sortBy, setSortBy] = useState("latest");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const materialsQuery = useLibraryMaterialsQuery(sortBy);
  const searchQuery = useSearchLibraryMaterialsQuery(debouncedSearch);
  const isSearching = Boolean(debouncedSearch.trim());
  const displayedQuery = isSearching ? searchQuery : materialsQuery;
  const statistics = materialsQuery.data?.pages?.[0]?.data?.statistics || {};

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        px: { xs: 1.5, md: 3 },
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ContentHeader />
      <ContentFilterBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onClearSearch={() => {
          setSearchValue("");
          setDebouncedSearch("");
        }}
      />
      <ContentLibraryBoard
        materialsQuery={displayedQuery}
        statistics={statistics}
        isSearching={isSearching}
      />
    </Box>
  );
}

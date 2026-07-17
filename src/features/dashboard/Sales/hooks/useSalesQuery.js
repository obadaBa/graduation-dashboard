import { useInfiniteQuery } from "@tanstack/react-query";
import { getSales } from "../Api/sales.api";

function getSalesMeta(page) {
  return page?.data?.meta || page?.meta || {};
}

export function useSalesQuery({
  period = "today",
  startDate = "",
  endDate = "",
  sortBy = "purchased_at",
}) {
  return useInfiniteQuery({
    queryKey: ["sales", "list", period, startDate, endDate, sortBy],
    queryFn: ({ pageParam }) => {
      const params = {
        period,
        sort_by: sortBy,
        per_page: 50,
        cursor: pageParam || undefined,
      };

      if (period === "custom") {
        params.start_date = startDate || undefined;
        params.end_date = endDate || undefined;
      }

      return getSales(params);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      getSalesMeta(lastPage).next_cursor || undefined,
    getPreviousPageParam: (firstPage) =>
      getSalesMeta(firstPage).previous_cursor ||
      getSalesMeta(firstPage).prev_cursor ||
      undefined,
    retry: false,
  });
}

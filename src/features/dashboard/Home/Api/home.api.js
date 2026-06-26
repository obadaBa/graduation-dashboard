import httpClient from "../../../../lib/api/httpClient";

export function getHomeYearlyTestActivity() {
  return httpClient.get("home/test-yearly-activity", {
    showErrorToast: true,
  });
}

export function getHomeLibraryStats(year) {
  return httpClient.get("home/library_stats", {
    params: { year },
    showErrorToast: true,
  });
}

export function getHomeFinancialStats(year) {
  return httpClient.get("financial-stats", {
    params: { year },
    showErrorToast: true,
  });
}

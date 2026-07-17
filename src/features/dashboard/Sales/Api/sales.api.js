import httpClient from "../../../../lib/api/httpClient";

export function getSales(params = {}) {
  return httpClient.get("sales", {
    params,
    showErrorToast: true,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getSupervisorProfile } from "../api/profile.api";

export function useSupervisorProfileQuery(supervisorId, enabled = true) {
  return useQuery({
    queryKey: ["supervisors", "profile", supervisorId],
    queryFn: () => getSupervisorProfile(supervisorId),
    enabled: Boolean(supervisorId) && enabled,
    retry: false,
  });
}

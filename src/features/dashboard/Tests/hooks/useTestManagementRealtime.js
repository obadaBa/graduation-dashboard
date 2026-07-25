import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createEchoClient } from "../../../../lib/realtime/echoClient";
import {
  moveTestInManagementBoard,
  updateTestDeletionInBoard,
} from "../utils/managementBoardCache";

const CHANNEL_NAME = "dashboard.test-management";
const EVENT_NAME = ".test.status.changed";

function normalizeStatusEvent(event) {
  return {
    testId: event?.test_id ?? event?.testId,
    changedDate: event?.changed_date ?? event?.changedDate,
    toStatus: event?.to_status ?? event?.toStatus,
    deletionType: event?.deletion_type ?? event?.deletionType,
    shouldAppearInDeletedColumn:
      event?.should_appear_in_deleted_column ??
      event?.shouldAppearInDeletedColumn ??
      false,
  };
}

function getStatusColumn(toStatus) {
  const status = String(toStatus || "").trim().toLowerCase();

  if (status === "تم الموافقة عليه" || status === "approved") {
    return "approved";
  }

  if (status === "يحتاج تعديل" || status === "needs_revision") {
    return "needs_revision";
  }

  return null;
}

export function useTestManagementRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const echo = createEchoClient();

    if (!echo) {
      return undefined;
    }

    const channel = echo.private(CHANNEL_NAME);

    channel.listen(EVENT_NAME, async (event) => {
      const {
        testId: rawTestId,
        changedDate,
        toStatus,
        deletionType,
        shouldAppearInDeletedColumn,
      } = normalizeStatusEvent(event);

      if (rawTestId == null) {
        return;
      }

      const testId = String(rawTestId);
      const targetColumn = getStatusColumn(toStatus);

      const boardQueries = queryClient.getQueriesData({
        queryKey: ["tests", "management-board"],
      });

      boardQueries.forEach(([queryKey, boardResponse]) => {
        const boardDate = queryKey[2];
        const shouldMoveToDeleted =
          deletionType === "soft_delete" &&
          Boolean(shouldAppearInDeletedColumn) &&
          String(boardDate) === String(changedDate);

        queryClient.setQueryData(queryKey, () => {
          if (targetColumn) {
            return moveTestInManagementBoard(
              boardResponse,
              testId,
              targetColumn,
            );
          }

          if (!deletionType) {
            return boardResponse;
          }

          return updateTestDeletionInBoard(
            boardResponse,
            testId,
            shouldMoveToDeleted ? "soft_delete" : "force_delete",
          );
        });
      });

      const shouldRefetchBoards =
        deletionType !== "force_delete" &&
        (!deletionType ||
          deletionType === "soft_delete" ||
          Boolean(shouldAppearInDeletedColumn));

      if (shouldRefetchBoards) {
        await queryClient.refetchQueries({
          queryKey: ["tests", "management-board"],
          type: "active",
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["tests", "management-details", testId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tests", "status-history", testId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tests", "reviews", testId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tests", "reports", testId],
      });
    });

    return () => {
      channel.stopListening(EVENT_NAME);
      echo.leave(CHANNEL_NAME);
    };
  }, [queryClient]);
}

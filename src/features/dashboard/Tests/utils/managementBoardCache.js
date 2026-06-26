function findBoardItem(columns, testId) {
  return Object.values(columns).flatMap((column) => column?.items || []).find(
    (item) => String(item.id) === String(testId),
  );
}

export function moveTestInManagementBoard(
  boardResponse,
  testId,
  targetColumnKey,
) {
  const columns = boardResponse?.data?.columns;

  if (!columns) {
    return boardResponse;
  }

  const movedItem = findBoardItem(columns, testId);
  const nextColumns = Object.fromEntries(
    Object.entries(columns).map(([columnKey, column]) => {
      const items = (column?.items || []).filter(
        (item) => String(item.id) !== String(testId),
      );

      if (columnKey === targetColumnKey && movedItem) {
        items.unshift(movedItem);
      }

      return [
        columnKey,
        {
          ...column,
          items,
          count: items.length,
        },
      ];
    }),
  );

  return {
    ...boardResponse,
    data: {
      ...boardResponse.data,
      columns: nextColumns,
    },
  };
}

export function updateTestDeletionInBoard(
  boardResponse,
  testId,
  deletionType,
) {
  return moveTestInManagementBoard(
    boardResponse,
    testId,
    deletionType === "soft_delete" ? "deleted" : null,
  );
}

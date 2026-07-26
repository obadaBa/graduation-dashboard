import httpClient from "../../../../lib/api/httpClient";
import { getIdempotencyHeaders } from "../../../../shared/lib/idempotency";

export function getTestsManagementBoard(date) {
  return httpClient.get("test-management/management-board", {
    params: { date },
    showErrorToast: true,
  });
}

export function getTestManagementDetails(testId, config = {}) {
  return httpClient.get(`test-management/management-board/details/${testId}`, {
    showErrorToast: true,
    ...config,
  });
}

export function getTestQuestions(testId) {
  return httpClient.get(`test-management/questions/${testId}`, {
    showErrorToast: true,
  });
}

export function getTestSampleQuestions(testId) {
  return httpClient.get(`test-management/questions-samples/${testId}`, {
    showErrorToast: true,
  });
}

export function getTestReviews(testId, params = {}) {
  return httpClient.get(`test-management/reviews/${testId}`, {
    params,
    showErrorToast: true,
  });
}

export function deleteTestReview(reviewId) {
  const normalizedReviewId =
    typeof reviewId === "object" ? reviewId.reviewId : reviewId;
  const idempotencyKey =
    typeof reviewId === "object" ? reviewId.idempotencyKey : undefined;

  return httpClient.delete(
    `test-management/delete/review/${normalizedReviewId}`,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function getTestStatusHistory(testId) {
  return httpClient.get(`test-management/status-history/${testId}`, {
    showErrorToast: true,
  });
}

export function getTestReports(testId, params = {}) {
  return httpClient.get(`test-management/reports/${testId}`, {
    params,
    showErrorToast: true,
  });
}

export function approveManagementTest({ testId, idempotencyKey }) {
  return httpClient.post(
    `test-management/approve/${testId}`,
    {},
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function deleteManagementTest({ testId, reason, idempotencyKey }) {
  const formData = new FormData();
  formData.append("deletion_reason", reason);

  return httpClient.post(
    `test-management/delete/${testId}`,
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function requestManagementTestRevisions({
  testId,
  revisions,
  idempotencyKey,
}) {
  return httpClient.post(
    `test-management/need-revision/${testId}`,
    { revisions },
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function updateManagementTestRevisions({
  testId,
  revisions,
  idempotencyKey,
}) {
  const normalizedRevisions = revisions.map((revision) => {
    const normalizedRevision = {
      revision_type: revision.revision_type,
      problem_note: revision.problem_note,
    };

    if (revision.question_position != null) {
      normalizedRevision.question_position = revision.question_position;
    }

    if (revision.option_position != null) {
      normalizedRevision.option_position = revision.option_position;
    }

    return normalizedRevision;
  });

  return httpClient.put(
    `test-management/update/need-revision/${testId}`,
    { revisions: normalizedRevisions },
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function requestTestAiEvaluation(testId) {
  const normalizedTestId =
    typeof testId === "object" ? testId.testId : testId;
  const idempotencyKey =
    typeof testId === "object" ? testId.idempotencyKey : undefined;

  return httpClient.post(
    `test-management/ai-evaluation/${normalizedTestId}`,
    {},
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function getTestAiEvaluationStatus(evaluationRequestId) {
  return httpClient.get(
    `test-management/ai-evaluation/status/${evaluationRequestId}`,
    {
      showErrorToast: false,
    },
  );
}

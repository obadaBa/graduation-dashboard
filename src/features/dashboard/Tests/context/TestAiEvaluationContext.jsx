import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  showActionSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../../../shared/lib/Toast/toastService";
import { createIdempotencyKey } from "../../../../shared/lib/idempotency";
import { useRequestTestAiEvaluationMutation } from "../hooks/useRequestTestAiEvaluationMutation";
import { useTestAiEvaluationStatusQuery } from "../hooks/useTestAiEvaluationStatusQuery";

const STORAGE_KEY = "testAiEvaluationJob";
const TERMINAL_STATUSES = new Set(["completed", "failed", "finished"]);
const JOB_MAX_AGE_MS = 60 * 60 * 1000;
const TestAiEvaluationContext = createContext(null);

function readStoredJob() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const storedJob = value ? JSON.parse(value) : null;

    if (!storedJob) {
      return null;
    }

    const createdAt = Number(storedJob.createdAt);
    const isExpired =
      !Number.isFinite(createdAt) || Date.now() - createdAt > JOB_MAX_AGE_MS;

    if (!storedJob.requestId || isExpired || storedJob.notified) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return storedJob;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function TestAiEvaluationProvider({ children, onOpenResult }) {
  const [job, setJob] = useState(readStoredJob);
  const [requestingTestId, setRequestingTestId] = useState(null);
  const notifiedRequestRef = useRef(job?.notified ? job.requestId : null);
  const requestMutation = useRequestTestAiEvaluationMutation();
  const statusQuery = useTestAiEvaluationStatusQuery(
    job?.requestId,
    Boolean(job?.requestId),
  );
  const evaluation = statusQuery.data?.data;
  const responseStatus = evaluation?.status?.toLowerCase();
  const status =
    responseStatus ||
    job?.status ||
    (job?.notified ? "finished" : null);
  const isProcessing =
    requestMutation.isPending ||
    (Boolean(job?.requestId) &&
      !statusQuery.isError &&
      !TERMINAL_STATUSES.has(status));

  useEffect(() => {
    if (!responseStatus || !job?.requestId || job.status === responseStatus) {
      return;
    }

    setJob((currentJob) =>
      currentJob?.requestId === job.requestId
        ? { ...currentJob, status: responseStatus }
        : currentJob,
    );
  }, [job?.requestId, job?.status, responseStatus]);

  useEffect(() => {
    if (job) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(job));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [job]);

  useEffect(() => {
    if (
      !job?.requestId ||
      notifiedRequestRef.current === job.requestId
    ) {
      return;
    }

    if (status === "completed") {
      notifiedRequestRef.current = job.requestId;
      setJob((currentJob) =>
        currentJob?.requestId === job.requestId
          ? { ...currentJob, notified: true }
          : currentJob,
      );

      showActionSuccessToast({
        title: "انتهى تقييم الاختبار",
        message: "اكتملت عملية التقييم بالذكاء الاصطناعي وأصبحت النتيجة جاهزة.",
        actionLabel: "اضغط لعرض النتيجة",
        onClick: () => onOpenResult?.(job.testId),
      });
    }

    if (status === "failed") {
      notifiedRequestRef.current = job.requestId;
      setJob((currentJob) =>
        currentJob?.requestId === job.requestId
          ? { ...currentJob, notified: true }
          : currentJob,
      );
      showErrorToast(
        evaluation?.failure || "تعذر إكمال تقييم الاختبار بالذكاء الاصطناعي.",
        "فشل تقييم الاختبار",
      );
    }
  }, [
    evaluation?.failure,
    job,
    onOpenResult,
    status,
  ]);

  useEffect(() => {
    if (
      job?.requestId &&
      statusQuery.isError &&
      notifiedRequestRef.current !== job.requestId
    ) {
      notifiedRequestRef.current = job.requestId;
      setJob(null);
      showErrorToast(
        "تعذر متابعة حالة تقييم الاختبار. يمكنك إعادة تشغيل العملية.",
        "تعذر متابعة التقييم",
      );
    }
  }, [job?.requestId, statusQuery.isError]);

  const startEvaluation = useCallback(
    (testId) => {
      if (!testId || isProcessing) {
        return;
      }

      notifiedRequestRef.current = null;
      setJob(null);
      setRequestingTestId(String(testId));

      requestMutation.mutate({
        testId,
        idempotencyKey: createIdempotencyKey(),
      }, {
        onSuccess: (response) => {
          const requestId = response?.data?.evaluation_request_id;

          if (!requestId) {
            setRequestingTestId(null);
            showErrorToast(
              "لم يُرجع الخادم رقم طلب التقييم.",
              "تعذر بدء التقييم",
            );
            return;
          }

          setJob({
            requestId,
            testId: String(testId),
            status: response?.data?.status?.toLowerCase() || "pending",
            notified: false,
            createdAt: Date.now(),
          });
          setRequestingTestId(null);
          showInfoToast(
            "العملية قيد المعالجة، سنبلغك عند انتهاء تقييم الاختبار.",
          );
        },
        onError: () => {
          setRequestingTestId(null);
        },
      });
    },
    [isProcessing, requestMutation],
  );

  const value = useMemo(
    () => ({
      job,
      evaluation,
      status,
      isProcessing,
      requestingTestId,
      isError: requestMutation.isError || statusQuery.isError,
      startEvaluation,
    }),
    [
      evaluation,
      isProcessing,
      job,
      requestingTestId,
      requestMutation.isError,
      startEvaluation,
      status,
      statusQuery.isError,
    ],
  );

  return (
    <TestAiEvaluationContext.Provider value={value}>
      {children}
    </TestAiEvaluationContext.Provider>
  );
}

export function useTestAiEvaluation() {
  const context = useContext(TestAiEvaluationContext);

  if (!context) {
    throw new Error(
      "useTestAiEvaluation must be used inside TestAiEvaluationProvider",
    );
  }

  return context;
}

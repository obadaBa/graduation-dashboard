import { useEffect, useMemo, useState } from "react";

const SECOND_IN_MS = 1000;

const getInitialEndTime = (storageKey, durationInSeconds) => {
  const storedEndTime = window.localStorage.getItem(storageKey);
  const parsedEndTime = Number(storedEndTime);

  if (Number.isFinite(parsedEndTime) && parsedEndTime > Date.now()) {
    return parsedEndTime;
  }

  const nextEndTime = Date.now() + durationInSeconds * SECOND_IN_MS;
  window.localStorage.setItem(storageKey, String(nextEndTime));
  return nextEndTime;
};

export default function usePersistentCountdown({
  storageKey,
  durationInSeconds,
}) {
  const [endTime, setEndTime] = useState(() =>
    getInitialEndTime(storageKey, durationInSeconds),
  );
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    Math.max(0, Math.ceil((endTime - Date.now()) / SECOND_IN_MS)),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / SECOND_IN_MS),
      );

      setRemainingSeconds(nextRemainingSeconds);

      if (nextRemainingSeconds === 0) {
        window.clearInterval(intervalId);
      }
    }, SECOND_IN_MS);

    return () => window.clearInterval(intervalId);
  }, [endTime]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      window.localStorage.removeItem(storageKey);
    }
  }, [remainingSeconds, storageKey]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingSeconds]);

  const restart = () => {
    const nextEndTime = Date.now() + durationInSeconds * SECOND_IN_MS;
    window.localStorage.setItem(storageKey, String(nextEndTime));
    setEndTime(nextEndTime);
    setRemainingSeconds(durationInSeconds);
  };

  return {
    formattedTime,
    remainingSeconds,
    restart,
  };
}

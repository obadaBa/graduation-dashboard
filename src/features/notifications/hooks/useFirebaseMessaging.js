import { useCallback, useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "../../../lib/firebase";
import { requestFirebaseMessagingToken } from "../services/firebaseMessagingToken";

export function useFirebaseMessaging({ onForegroundMessage } = {}) {
  const [fcmToken, setFcmToken] = useState(null);
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissionAndGetToken = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await requestFirebaseMessagingToken();
      const permissionResult = Notification.permission;
      setPermission(permissionResult);

      setFcmToken(token);
      console.log("FCM Token:", token);
      console.log("Copy this FCM token:", token);

      return token;
    } catch (exception) {
      console.error("Firebase messaging error:", exception);
      setError(exception.message || "حدث خطأ أثناء تجهيز الإشعارات.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let unsubscribe = null;

    const listenToForegroundMessages = async () => {
      try {
        const messaging = await getFirebaseMessaging();

        if (!messaging) return;

        unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground notification:", payload);
          onForegroundMessage?.(payload);
        });
      } catch (exception) {
        console.error("Firebase foreground listener error:", exception);
        setError(exception.message || "تعذر تشغيل مستمع الإشعارات.");
      }
    };

    listenToForegroundMessages();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [onForegroundMessage]);

  useEffect(() => {
    if (fcmToken) {
      console.log("Current FCM Token:", fcmToken);
    }
  }, [fcmToken]);

  return {
    fcmToken,
    permission,
    error,
    isLoading,
    requestPermissionAndGetToken,
  };
}

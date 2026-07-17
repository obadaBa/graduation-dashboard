import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "../../../lib/firebase";

const FIREBASE_MESSAGING_SW_PATH = "/firebase-messaging-sw.js";
const FCM_TOKEN_STORAGE_KEY = "dashboardFcmToken";

export function getStoredFirebaseMessagingToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(FCM_TOKEN_STORAGE_KEY) || "";
}

function setStoredFirebaseMessagingToken(token) {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
  }
}

async function getMessagingServiceWorkerRegistration() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("هذا المتصفح لا يدعم Service Workers اللازمة للإشعارات.");
  }

  return navigator.serviceWorker.register(FIREBASE_MESSAGING_SW_PATH);
}

export async function requestFirebaseMessagingToken() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    throw new Error("هذا المتصفح لا يدعم الإشعارات.");
  }

  const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;

  if (!vapidKey) {
    throw new Error("مفتاح Firebase VAPID غير مضبوط في ملف البيئة.");
  }

  const permissionResult = await Notification.requestPermission();

  if (permissionResult !== "granted") {
    throw new Error("لم يتم السماح بالإشعارات.");
  }

  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    throw new Error("Firebase Messaging غير مدعوم في هذا المتصفح.");
  }

  const serviceWorkerRegistration =
    await getMessagingServiceWorkerRegistration();

  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration,
  });

  if (!token) {
    throw new Error("لم يتم توليد FCM Token.");
  }

  setStoredFirebaseMessagingToken(token);

  return token;
}

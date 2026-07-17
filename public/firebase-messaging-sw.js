/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCJov1sZyNSzSZ2weh4e6Umi-dErGB-URg",
  authDomain: "nerd-dashboard-3687f.firebaseapp.com",
  projectId: "nerd-dashboard-3687f",
  storageBucket: "nerd-dashboard-3687f.firebasestorage.app",
  messagingSenderId: "36789662041",
  appId: "1:36789662041:web:44fb15d9eb4eb8b85a1c48",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "إشعار جديد";

  const options = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
    data: {
      url: payload.fcmOptions?.link || payload.data?.url || "/",
    },
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = new URL(event.notification.data?.url || "/", self.location.origin)
    .href;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const matchingClient = clientList.find((client) => client.url === url);

        if (matchingClient) {
          return matchingClient.focus();
        }

        return clients.openWindow(url);
      }),
  );
});

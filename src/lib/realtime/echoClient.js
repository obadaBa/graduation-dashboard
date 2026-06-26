import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const TOKEN_STORAGE_KEYS = ["accessToken", "token", "authToken"];
let echoClient = null;

function getStoredToken() {
  return TOKEN_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
}

export function createEchoClient() {
  if (echoClient) {
    return echoClient;
  }

  const token = getStoredToken();
  const key = process.env.REACT_APP_REVERB_APP_KEY;

  if (!token || !key) {
    return null;
  }

  const scheme = process.env.REACT_APP_REVERB_SCHEME || "http";
  const port = 8081;

  echoClient = new Echo({
    broadcaster: "reverb",
    key,
    wsHost: process.env.REACT_APP_REVERB_HOST || window.location.hostname,
    wsPort: port,
    wssPort: port,
    forceTLS: scheme === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: "/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  return echoClient;
}

import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  // Always return the same instance once created to avoid losing listeners
  if (socket) return socket;
  // In dev, use same-origin (Vite proxies /socket.io) so auth cookie is sent.
  // In prod, default to known backend URL; allow override via VITE_BACKEND_URL.
  const prodUrl = import.meta.env.VITE_BACKEND_URL || "https://roastmedia-backend.onrender.com";
  const url = import.meta.env.PROD ? prodUrl : undefined;
  socket = io(url, {
    withCredentials: true,
    transports: ["websocket", "polling"], // allow polling fallback behind some proxies/CDNs
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 500,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
    path: "/socket.io",
  });
  return socket;
}

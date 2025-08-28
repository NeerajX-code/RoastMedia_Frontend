import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (socket && socket.connected) return socket;
  // In dev, use same-origin (Vite proxies /socket.io) so auth cookie (SameSite=Lax) is sent.
  // In production, you MUST set VITE_BACKEND_URL to your API origin (e.g., https://roastmedia-backend.onrender.com)
  const prodUrl = import.meta.env.VITE_BACKEND_URL;
  const url = import.meta.env.PROD ? prodUrl : undefined;
  if (import.meta.env.PROD && !url) {
    console.warn("[socket] VITE_BACKEND_URL is not set; Socket.IO will try same-origin which likely fails in production.");
  }
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

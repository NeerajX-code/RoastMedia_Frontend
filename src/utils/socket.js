import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (socket && socket.connected) return socket;
  // In dev, use same-origin (Vite proxies /socket.io) so auth cookie (SameSite=Lax) is sent
  const url = import.meta.env.PROD
    ? (import.meta.env.VITE_BACKEND_URL || window.location.origin)
    : undefined;
  socket = io(url, {
    withCredentials: true,
    transports: ["websocket"],
    autoConnect: true,
    path: "/socket.io",
  });
  return socket;
}

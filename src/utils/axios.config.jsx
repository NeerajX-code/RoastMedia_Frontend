import axios from "axios";

// In dev, use Vite proxy so cookies stay same-origin (baseURL "/").
// In prod, require VITE_BACKEND_URL to match your backend Render URL.
const baseURL = import.meta.env.DEV
  ? "/"
  : (import.meta.env.VITE_BACKEND_URL || "");

if (!import.meta.env.DEV && !baseURL) {
  console.warn("[axios] VITE_BACKEND_URL is not set; requests will go to same-origin, which likely fails in production.");
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
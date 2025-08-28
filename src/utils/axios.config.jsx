import axios from "axios";

// In dev, use Vite proxy so cookies stay same-origin (baseURL "/").
// In prod, default to known backend URL and allow override via VITE_BACKEND_URL.
const baseURL = import.meta.env.DEV
  ? "/"
  : (import.meta.env.VITE_BACKEND_URL || "https://roastmedia-backend.onrender.com");

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
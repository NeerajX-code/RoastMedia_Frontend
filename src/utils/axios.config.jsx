import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "/" // use Vite proxy in dev so cookies are same-origin
    : "https://roastmedia-backend.onrender.com";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
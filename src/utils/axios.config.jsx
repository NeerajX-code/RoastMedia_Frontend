import axios from "axios";

// Dynamic baseURL
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://roastmedia-backend.onrender.com";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
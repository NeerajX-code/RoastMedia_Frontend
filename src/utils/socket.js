import { io } from "socket.io-client";
import { baseURL } from "./axios.config.jsx";

const socket = io(baseURL, {
  withCredentials: true,
  autoConnect: true,
});

export default socket;

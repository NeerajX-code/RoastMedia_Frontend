import axios from "axios";

const instance = axios.create({
    baseURL: 'https://roastmedia-backend.onrender.com/',
    withCredentials: true,
});

export default instance;
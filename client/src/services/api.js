import axios from "axios";

const api = axios.create({
  baseURL: "https://civicwatch-ai.onrender.com/api/v1" || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
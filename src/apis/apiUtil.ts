import axios from "axios";

const api = axios.create({
  baseURL: `https://elearningnew.cybersoft.edu.vn/api/`,
});

api.interceptors.request.use((config: any) => {
  const userLocal = localStorage.getItem("user")
  const currentUser = userLocal ? JSON.parse(userLocal) : null;

  config.headers = {
    ...config.headers,
    Authorization: currentUser ? `Bearer ${currentUser.accessToken}` : "",
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MiIsIkhldEhhblN0cmluZyI6IjE3LzEwLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyOTEyMzIwMDAwMCIsIm5iZiI6MTcwMDE1NDAwMCwiZXhwIjoxNzI5MjcwODAwfQ.xKQVYYnO9233wkXRw5oU4Dtx41flqDuUnA0DbkDYRmM",
  };
  return config;
});

export default api;

import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  // baseURL: "/api/v1",
});
// export const BASE_URL = "/api/v1";
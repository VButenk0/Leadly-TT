import axios from "axios";

export const api = axios.create({
  baseURL: "https://leadly-tt-back.onrender.com/api",
});

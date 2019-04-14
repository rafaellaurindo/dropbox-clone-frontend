import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL_API || "http://rafabox-backend.herokuapp.com"
});

export default api;

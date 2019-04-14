import axios from "axios";

const api = axios.create({
  baseURL: "http://rafabox-backend.herokuapp.com"
});

export default api;

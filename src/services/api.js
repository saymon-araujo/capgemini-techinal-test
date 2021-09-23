import axios from "axios";

const api = axios.create({
  baseURL: "https://api.teste.appit.com.br",
});

export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "https://fswdecommerce.onrender.com/api",
});


export default API;
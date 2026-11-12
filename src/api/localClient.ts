import axios from "axios";

const localClient = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_URL,
});

export default localClient;

import axios from "axios";

const ninjasClient = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    "X-Api-Key": import.meta.env.VITE_NINJAS_KEY,
  },
});

export default ninjasClient;

import axios from "axios";
import { BASE_URL } from "src/constants";

export const login = (name, email) => {
  return axios.post(`${BASE_URL}/auth/login`, { name, email });
};

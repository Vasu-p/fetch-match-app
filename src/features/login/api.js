import { axiosInstance } from "src/axios";

export const login = (name, email) => {
  return axiosInstance.post(`/auth/login`, { name, email });
};

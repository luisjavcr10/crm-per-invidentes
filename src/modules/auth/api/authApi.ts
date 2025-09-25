import { api } from "../../shared/services";
import { AUTH_ENDPOINTS } from "./endpoints";

export const authApi ={
  login: async (data: { email: string; password: string }) => {
    return api.post(AUTH_ENDPOINTS.LOGIN, data);
  },
  register: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    return api.post(AUTH_ENDPOINTS.REGISTER, data);
  },
  getProfile: async () => {
    return api.get(AUTH_ENDPOINTS.GET_PROFILE);
  },
}
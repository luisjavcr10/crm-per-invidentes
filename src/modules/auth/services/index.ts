import { authApi } from "../api";

export class AuthService {
  async login(data: { email: string; password: string }) {
    return authApi.login(data);
  };

  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return authApi.register(data);
  }

  async getProfile() {
    return authApi.getProfile();
  }
}
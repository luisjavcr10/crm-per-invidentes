import { usersApi } from "../api";

export class UsersService {
  async getUsers() {
    return usersApi.getUsers();
  };
  async postUser(data: { email: string; password: string; firstName: string; lastName: string }) {
    return usersApi.postUser(data);
  };
  async getUser(id: string) {
    return usersApi.getUser(id);
  }
  async patchUser(id: string, data: { email?: string; password?: string; firstName?: string; lastName?: string }) {
    return usersApi.patchUser(id, data);
  }
  async deleteUser(id: string) {
    return usersApi.deleteUser(id);
  }
}
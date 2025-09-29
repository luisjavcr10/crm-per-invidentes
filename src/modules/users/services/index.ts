import { usersApi } from "../api";
import type { User, PostUser, PatchUser } from "../api/types";

class UsersServiceClass {
  async getUsers(): Promise<User[]> {
    const response = await usersApi.getUsers();
    return response.data;
  }

  async postUser(data: PostUser): Promise<User> {
    const response = await usersApi.postUser(data);
    return response.data;
  }

  async getUser(id: string): Promise<User> {
    const response = await usersApi.getUser(id);
    return response.data;
  }

  async patchUser(id: string, data: PatchUser): Promise<User> {
    const response = await usersApi.patchUser(id, data);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await usersApi.deleteUser(id);
    return response.data;
  }
}

export const UsersService = new UsersServiceClass();
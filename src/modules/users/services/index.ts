import { usersApi } from "../api";
import type { User, PostUser, PatchUser } from "../api/types";

export class UsersService {
  async getUsers() {
    return usersApi.getUsers();
  };
  async postUser(data: PostUser):Promise<User> {
    return usersApi.postUser(data);
  };
  async getUser(id: string): Promise<User> {
    return usersApi.getUser(id);
  }
  async patchUser(id: string, data: PatchUser): Promise<User> {
    return usersApi.patchUser(id, data);
  }
  async deleteUser(id: string) {
    return usersApi.deleteUser(id);
  }
}
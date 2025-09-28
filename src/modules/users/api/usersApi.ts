import { api } from "../../shared/services";
import { USERS_ENDPOINTS } from "./endpoints";
import type { User, PostUser, PatchUser } from "./types";

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    return api.get(USERS_ENDPOINTS.GET_USERS);
  },
  postUser: async (data: PostUser): Promise<User> => {
    return api.post(USERS_ENDPOINTS.POST_USERS, data);
  },
  getUser: async (id: string): Promise<User> => {
    return api.get(USERS_ENDPOINTS.GET_USER.replace(':id', id));
  },
  patchUser: async (id: string, data: PatchUser): Promise<User> => {
    return api.patch(USERS_ENDPOINTS.PATCH_USER.replace(':id', id), data);
  },
  deleteUser: async (id: string) => {
    return api.delete(USERS_ENDPOINTS.DELETE_USER.replace(':id', id));
  },
}
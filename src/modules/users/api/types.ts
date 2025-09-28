interface Role{
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  isActive: boolean;
  role: Role;
}

interface User {
  id: string;
  name: string;
  email:string;
  phone:string;
  isActive: boolean;
  password:string;
  userRoles: UserRole[];
};

interface PostUser extends Omit<User, 'id' | 'userRoles' | 'isActive'> {
  roleIds: string[];
};

interface PatchUser extends Partial<Omit<User, 'id' | 'userRoles'>> {};

export {
  type User,
  type PostUser,
  type PatchUser,
  type UserRole,
  type Role,
}






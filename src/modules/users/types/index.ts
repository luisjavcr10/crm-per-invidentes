/**
 * Tipos de datos para el módulo de usuarios
 */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
  phone?: string;
  department?: string;
}

export type UserRole = 'admin' | 'manager' | 'agent' | 'viewer';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
  status?: UserStatus;
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserPermissions {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canManageRoles: boolean;
}
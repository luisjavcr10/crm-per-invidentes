/**
 * Tipos para el módulo de autenticación
 */

/**
 * Interfaz que representa un usuario en el sistema
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interfaz para la respuesta del login exitoso
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  access_token: string;
}

/**
 * Interfaz para la respuesta del login con error
 */
export interface LoginErrorResponse {
  success: false;
  message: string;
  user: null;
  access_token: null;
}

/**
 * Interfaz para las credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interfaz para las credenciales de registro
 */
export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Interfaz para el contexto de autenticación
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (credentials: RegisterCredentials) => Promise<void>;
}
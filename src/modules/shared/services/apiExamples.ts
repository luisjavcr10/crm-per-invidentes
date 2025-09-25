import { api } from './index';

/**
 * Ejemplos de uso del módulo de API
 * Estos ejemplos muestran cómo realizar diferentes tipos de peticiones HTTP
 */

// Ejemplo de interfaz para un usuario
interface User {
  id: number;
  name: string;
  email: string;
}

// Ejemplo de interfaz para datos de login
interface LoginData {
  email: string;
  password: string;
}

// Ejemplo de interfaz para respuesta de login
interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Ejemplo de petición GET - Obtener lista de usuarios
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Ejemplo de petición GET - Obtener un usuario por ID
 */
export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Ejemplo de petición POST - Crear un nuevo usuario
 */
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await api.post<User>('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

/**
 * Ejemplo de petición PUT - Actualizar un usuario
 */
export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Ejemplo de petición DELETE - Eliminar un usuario
 */
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Ejemplo de petición POST - Login de usuario
 */
export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    
    // Guardar el token en localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

/**
 * Ejemplo de petición POST - Logout de usuario
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
    
    // Remover el token del localStorage
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error en el logout:', error);
    throw error;
  }
};
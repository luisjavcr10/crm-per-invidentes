import { authApi } from '../api';
import type { LoginCredentials, LoginResponse, RegisterCredentials, User } from '../types';
import type { AxiosResponse } from 'axios';

/**
 * Servicio de autenticación que maneja las operaciones de login, registro y perfil
 */
export class AuthService {
  /**
   * Realiza el login del usuario
   * @param credentials - Credenciales de login (email y password)
   * @returns Promise con la respuesta del login que incluye usuario y token
   */
  async login(credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> {
    return authApi.login(credentials);
  }

  /**
   * Registra un nuevo usuario
   * @param data - Datos del usuario a registrar
   * @returns Promise con la respuesta del registro
   */
  async register(data: RegisterCredentials): Promise<AxiosResponse<User>> {
    return authApi.register(data);
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @returns Promise con los datos del usuario
   */
  async getProfile(): Promise<AxiosResponse<User>> {
    return authApi.getProfile();
  }
}
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthService } from '../services';
import type { User, LoginCredentials, RegisterCredentials, AuthContextType } from '../types';

/**
 * Contexto de autenticación
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props del proveedor de autenticación
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de autenticación
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authService = new AuthService();

  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = !!user && !!token;

  /**
   * Inicializa el estado de autenticación desde localStorage
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Función de login
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      
      const { success, message, user: userData, access_token } = response.data;
      
      // Verificar si el login fue exitoso
      if (success && userData && access_token) {
        // Guardar en estado
        setUser(userData);
        setToken(access_token);
        
        // Guardar en localStorage
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('authUser', JSON.stringify(userData));
      } else {
        // Si success es false, lanzar error con el mensaje del backend
        throw new Error(message || 'Error en el login');
      }
      
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función de logout
   */
  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  /**
   * Función de registro
   */
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.register(credentials);
      // Después del registro, el usuario debe hacer login
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services';
import { routes } from '../../../router/routes';

/**
 * Página de Login con soporte para modo oscuro
 * @returns JSX.Element
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks de React Router
  const navigate = useNavigate();

  // Instancia del servicio de autenticación
  const authService = new AuthService();

  /**
   * Maneja el envío del formulario de login
   * @param e - Evento del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      
      // Si el login es exitoso, guardar el token y redirigir
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        console.log('Login exitoso:', response.data);
        
        // Redirigir al dashboard principal
        navigate(routes.home, { replace: true });
      }
    } catch (error: any) {
      console.error('Error en el login:', error);
      setError(
        error.response?.data?.message || 
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-start text-3xl font-extrabold text-gray-900 dark:text-white">
            CRM Cynosure
          </h2>
          <p className="mt-2 text-start text-sm text-gray-600 dark:text-gray-300">
            Sistema de gestión administrativa
          </p>
        </div>
        
        <div className="">
          {/* Mensaje de error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-[12px] text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[12px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-[#A9C46C] focus:border-[#A9C46C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[12px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-[#A9C46C] focus:border-[#A9C46C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[12px] shadow-sm text-sm font-medium text-white bg-[#A9C46C] hover:bg-[#96B85A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9C46C] dark:focus:ring-offset-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#A9C46C]"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ingresando...
                  </div>
                ) : (
                  'Ingresar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context';
import { routes } from '../../../router/routes';

interface PublicRouteProps {
  children: ReactNode;
}

/**
 * Componente para rutas públicas (login, registro)
 * Redirige al home si el usuario ya está autenticado
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#A9C46C]"></div>
      </div>
    );
  }

  // Si ya está autenticado, redirigir al home
  if (user) {
    return <Navigate to={routes.home} replace />;
  }

  // Si no está autenticado, mostrar el contenido (login, registro, etc.)
  return <>{children}</>;
};
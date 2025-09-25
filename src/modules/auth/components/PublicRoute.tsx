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

  // Si ya está autenticado, redirigir al home
  if (!isLoading && user) {
    return <Navigate to={routes.home} replace />;
  }

  // Si no está autenticado o está cargando, mostrar el contenido (login, registro, etc.)
  return <>{children}</>;
};
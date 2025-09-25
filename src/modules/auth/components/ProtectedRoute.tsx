import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context';
import { routes } from '../../../router/routes';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Componente para proteger rutas que requieren autenticación
 * Redirige al login si el usuario no está autenticado
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // Si está cargando o no hay usuario autenticado, redirigir al login
  if (isLoading || !user) {
    return <Navigate to={routes.login} replace />;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
};
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { routes } from './routes';

// Componentes como elementos JSX para evitar problemas de importación
const Layout = React.lazy(() => import('../components/Layout'));
const LoginPage = React.lazy(() => import('../modules/auth/pages/LoginPage'));
const HomePage = React.lazy(() => import('../modules/shared/pages/HomePage'));
const UsersPage = React.lazy(() => import('../modules/users/pages/UsersPage'));

/**
 * Wrapper para Suspense
 */
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
    {children}
  </React.Suspense>
);

/**
 * Configuración central de rutas de la aplicación
 * Utiliza React Router DOM v6 con createBrowserRouter
 */
export const router = createBrowserRouter([
  {
    path: routes.login,
    element: (
      <SuspenseWrapper>
        <LoginPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <Layout />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={routes.home} replace />,
      },
      {
        path: 'home',
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'users',
        element: (
          <SuspenseWrapper>
            <UsersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: <Navigate to={routes.home} replace />,
      },
    ],
  },
]);

// Re-export routes and types
export { routes, type AppRoutes } from './routes';
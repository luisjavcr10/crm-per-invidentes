/**
 * Rutas de la aplicación para uso en navegación
 */
export const routes = {
  login: '/login',
  home: '/home',
  users: '/users',
} as const;

/**
 * Tipo para las rutas disponibles
 */
export type AppRoutes = typeof routes[keyof typeof routes];
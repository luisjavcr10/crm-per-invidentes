import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './modules/auth/context';

/**
 * Componente principal de la aplicación
 * Configura React Router DOM para el enrutado y el contexto de autenticación
 * @returns JSX.Element
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App

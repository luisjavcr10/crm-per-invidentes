import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/**
 * Componente principal de la aplicación
 * Configura React Router DOM para el enrutado
 * @returns JSX.Element
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App

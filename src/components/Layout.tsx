import { Outlet, Link, useLocation } from 'react-router-dom';
import { routes } from '../router/routes';

/**
 * Componente Layout principal con navegación y soporte para modo oscuro
 * @returns JSX.Element
 */
const Layout: React.FC = () => {
  const location = useLocation();
  //const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar estado guardado (por defecto modo claro)
  //useEffect(() => {
  //  const savedTheme = localStorage.getItem('theme');
  //  
  //  if (savedTheme === 'dark') {
  //    setIsDarkMode(true);
  //    document.documentElement.classList.add('dark');
  //  } else {
  //    setIsDarkMode(false);
  //    document.documentElement.classList.remove('dark');
  //    // Asegurar que se guarde la preferencia de modo claro si no existe
  //    if (!savedTheme) {
  //      localStorage.setItem('theme', 'light');
  //    }
  //  }
  //}, []);

  // Toggle modo oscuro
  //const toggleDarkMode = () => {
  //  const newDarkMode = !isDarkMode;
  //  setIsDarkMode(newDarkMode);
  //  
  //  if (newDarkMode) {
  //    document.documentElement.classList.add('dark');
  //    localStorage.setItem('theme', 'dark');
  //  } else {
  //    document.documentElement.classList.remove('dark');
  //    localStorage.setItem('theme', 'light');
  //  }
  //};

  const navigationItems = [
    {
      name: 'Dashboard',
      href: routes.home,
      icon: '',
    },
    {
      name: 'Usuarios',
      href: routes.users,
      icon: '',
    },
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CRM Cynosure</h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-[#A9C46C] text-white'
                      : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu y Toggle Dark Mode */}
            <div className="flex items-center space-x-4">
              {/* Toggle Dark Mode */}
             {/**  <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>*/}
              
              <Link
                to={routes.login}
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar (opcional para futuro) */}
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React from 'react';

/**
 * Página de Home/Dashboard con soporte para modo oscuro
 * @returns JSX.Element
 */
const HomePage: React.FC = () => {
  const dashboardStats = [
    {
      title: 'Total Usuarios',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: '👥',
    },
    {
      title: 'Casos Activos',
      value: '89',
      change: '+5%',
      changeType: 'positive' as const,
      icon: '📋',
    },
    {
      title: 'Resoluciones',
      value: '456',
      change: '+8%',
      changeType: 'positive' as const,
      icon: '✅',
    },
    {
      title: 'Pendientes',
      value: '23',
      change: '-3%',
      changeType: 'negative' as const,
      icon: '⏳',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Bienvenido al CRM Per Invidentes</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="mt-2">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-[#A9C46C]'
                    : 'text-red-500'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#A9C46C] rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Nuevo usuario registrado</p>
              <span className="text-xs text-gray-400 dark:text-gray-500">hace 2 min</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Caso #123 actualizado</p>
              <span className="text-xs text-gray-400 dark:text-gray-500">hace 15 min</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Reunión programada</p>
              <span className="text-xs text-gray-400 dark:text-gray-500">hace 1 hora</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-[#A9C46C] hover:text-white transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:dark:text-white">
              Crear nuevo caso
            </button>
            <button className="w-full text-left p-3 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-[#A9C46C] hover:text-white transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:dark:text-white">
              Registrar usuario
            </button>
            <button className="w-full text-left p-3 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-[#A9C46C] hover:text-white transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:dark:text-white">
              Generar reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
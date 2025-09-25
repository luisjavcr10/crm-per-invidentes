import React from 'react';

/**
 * Componente para mostrar la lista de usuarios del CRM
 * @returns JSX.Element
 */
const UserList: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-2xl font-bold text-gray-900">Lista de Usuarios</h2>
        <p className="text-gray-600">Gestiona los usuarios del sistema CRM</p>
      </div>
      <div className="card-content">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="input max-w-sm"
            />
            <button className="btn-primary">
              Agregar Usuario
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Usuario Demo
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    demo@ejemplo.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Administrador
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="btn-ghost text-blue-600 hover:text-blue-900 mr-2">
                      Editar
                    </button>
                    <button className="btn-ghost text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
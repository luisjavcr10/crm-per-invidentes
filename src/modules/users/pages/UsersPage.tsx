import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { UsersService } from '../services';
import UserModal from '../components/UserModal';
import type { User, Role } from '../api/types';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  /**
   * Obtiene la lista de usuarios y roles
   * @param showSuccessToast - Si mostrar toast de éxito
   */
  const fetchUsers = async (showSuccessToast = false) => {
    try {
      setIsLoading(true);
      const users = await UsersService.getUsers();
      const roles = await UsersService.getRoles();
      setUsers(users);
      setRoles(roles);
      if (showSuccessToast) {
        toast.success('Usuarios cargados correctamente');
      }
    } catch (error) {
      toast.error('Error al cargar los usuarios');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Abre el modal para crear un nuevo usuario
   */
  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  /**
   * Abre el modal para editar un usuario
   * @param user - Usuario a editar
   */
  const handleEditUser = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  /**
   * Abre el modal para ver detalles de un usuario
   * @param user - Usuario a ver
   */
  const handleViewUser = (user: User) => {
    setModalMode('view');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  /**
   * Cierra el modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  /**
   * Maneja el éxito de las operaciones del modal
   */
  const handleModalSuccess = () => {
    fetchUsers(true);
  };

  const deleteUser = async (userId: string) => {
    // Mostrar confirmación antes de eliminar
    const confirmDelete = () => {
      toast((t) => (
        <div className="flex flex-col space-y-2">
          <span>¿Estás seguro de que quieres eliminar este usuario?</span>
          <div className="flex space-x-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await UsersService.deleteUser(userId);
                  toast.success('Usuario eliminado correctamente');
                  fetchUsers(true);
                } catch (error) {
                  toast.error('Error al eliminar el usuario');
                  console.error('Error deleting user:', error);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
            >
              Eliminar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      ), {
        duration: Infinity,
        style: {
          background: '#fff',
          color: '#000',
        },
      });
    };

    confirmDelete();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-300">Administra los usuarios del sistema</p>
        </div>
        <button 
          onClick={handleCreateUser}
          className="bg-[#A9C46C] hover:bg-[#96B85A] text-white px-4 py-1 rounded-md transition-colors duration-200"
        >
          Nuevo Usuario
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-[#A9C46C] focus:border-[#A9C46C] transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              
               <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Telefono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[#A9C46C] bg-opacity-20 text-white">
                      {user.userRoles[0].role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.isActive === true ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewUser(user)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 transition-colors"
                    >
                      Ver
                    </button>
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-[#A9C46C] hover:text-[#96B85A] mr-3 transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => deleteUser(user.id)} 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando...</p>
          </div>
        )}
        
        {!isLoading && filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">No se encontraron usuarios</p>
          </div>
        )}
      </div>

      {/* Modal de Usuario */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        user={selectedUser}
        roles={roles}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default UsersPage;
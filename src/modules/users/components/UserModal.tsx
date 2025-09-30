import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { UsersService } from '../services';
import type { User, PostUser, PatchUser, Role } from '../api/types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
  user?: User | null;
  roles: Role[];
  onSuccess: () => void;
}

/**
 * Modal para crear, editar y ver detalles de usuarios
 * @param props - Propiedades del componente
 * @returns JSX.Element
 */
const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  mode,
  user,
  roles,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    isActive: true,
    roleIds: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inicializar formulario cuando cambie el usuario o modo
  useEffect(() => {
    if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        isActive: true,
        roleIds: [],
      });
    } else if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: '', // No mostrar password existente
        isActive: user.isActive,
        roleIds: user.userRoles.map(ur => ur.roleId),
      });
    }
    setErrors({});
  }, [mode, user]);

  /**
   * Valida los campos del formulario
   * @returns boolean - true si es válido
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (mode === 'create' && !formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }

    if (mode === 'create' && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.roleIds.length === 0) {
      newErrors.roleIds = 'Debe seleccionar al menos un rol';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'view') return;
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (mode === 'create') {
        const userData: PostUser = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          roleIds: formData.roleIds,
        };
        await UsersService.postUser(userData);
        toast.success('Usuario creado correctamente');
      } else if (mode === 'edit' && user) {
        const userData: PatchUser = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          isActive: formData.isActive,
        };
        
        // Solo incluir password si se proporcionó uno nuevo
        if (formData.password.trim()) {
          userData.password = formData.password;
        }

        await UsersService.patchUser(user.id, userData);
        toast.success('Usuario actualizado correctamente');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(mode === 'create' ? 'Error al crear usuario' : 'Error al actualizar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja el cambio en los campos del formulario
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Maneja el cambio en la selección de roles
   */
  const handleRoleChange = (roleId: string, checked: boolean) => {
    if (mode === 'view') return;
    
    setFormData(prev => ({
      ...prev,
      roleIds: checked
        ? [...prev.roleIds, roleId]
        : prev.roleIds.filter(id => id !== roleId),
    }));
    
    if (errors.roleIds) {
      setErrors(prev => ({ ...prev, roleIds: '' }));
    }
  };

  /**
   * Obtiene el título del modal según el modo
   */
  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Crear Usuario';
      case 'edit': return 'Editar Usuario';
      case 'view': return 'Detalles del Usuario';
      default: return 'Usuario';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Sección 1: Título y botón cerrar */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {getModalTitle()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sección 2: Contenido del formulario */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={mode === 'view' || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-[#A9C46C] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } ${mode === 'view' ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
                placeholder="Ingrese el nombre"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={mode === 'view' || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-[#A9C46C] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } ${mode === 'view' ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
                placeholder="Ingrese el email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={mode === 'view' || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-[#A9C46C] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } ${mode === 'view' ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
                placeholder="Ingrese el teléfono"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña {mode === 'create' ? '*' : '(dejar vacío para mantener actual)'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={mode === 'view' || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-[#A9C46C] dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } ${mode === 'view' ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
                placeholder={mode === 'create' ? 'Ingrese la contraseña' : 'Nueva contraseña (opcional)'}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Estado activo (solo para editar) */}
            {mode === 'edit' && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="h-4 w-4 text-[#A9C46C] focus:ring-[#A9C46C] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Usuario activo
                </label>
              </div>
            )}

            {/* Roles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Roles *
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={formData.roleIds.includes(role.id)}
                      onChange={(e) => handleRoleChange(role.id, e.target.checked)}
                      disabled={mode === 'view' || isLoading}
                      className="h-4 w-4 text-[#A9C46C] focus:ring-[#A9C46C] border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`role-${role.id}`}
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      {role.name}
                      {role.description && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          {role.description}
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              {errors.roleIds && <p className="text-red-500 text-sm mt-1">{errors.roleIds}</p>}
            </div>
          </form>
        </div>

        {/* Sección 3: Botones de acción */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9C46C] transition-colors disabled:opacity-50"
          >
            {mode === 'view' ? 'Cerrar' : 'Cancelar'}
          </button>
          
          {mode !== 'view' && (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#A9C46C] hover:bg-[#96B85A] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9C46C] transition-colors disabled:opacity-50 flex items-center"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {mode === 'create' ? 'Crear Usuario' : 'Actualizar Usuario'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
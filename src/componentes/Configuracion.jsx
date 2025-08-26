import React, { useState } from 'react';

const Configuracion = ({ user }) => {
    const [selectedTab, setSelectedTab] = useState('perfil');
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
        reportes: true,
        actividades: true,
        evaluaciones: false
    });

    const [formData, setFormData] = useState({
        nombre: user?.name || '',
        email: user?.email || '',
        telefono: '',
        departamento: user?.department || '',
        cargo: user?.role || '',
        biografia: ''
    });

    const tabs = [
        { id: 'perfil', label: 'Mi Perfil', icon: '👤' },
        { id: 'sistema', label: 'Sistema', icon: '⚙️' },
        { id: 'notificaciones', label: 'Notificaciones', icon: '🔔' },
        { id: 'seguridad', label: 'Seguridad', icon: '🔒' }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNotificationChange = (type) => {
        setNotifications({
            ...notifications,
            [type]: !notifications[type]
        });
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'perfil':
                return <PerfilTab formData={formData} handleInputChange={handleInputChange} user={user} />;
            case 'sistema':
                return <SistemaTab />;
            case 'notificaciones':
                return <NotificacionesTab notifications={notifications} handleNotificationChange={handleNotificationChange} />;
            case 'seguridad':
                return <SeguridadTab />;
            default:
                return <PerfilTab formData={formData} handleInputChange={handleInputChange} user={user} />;
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Configuración del Sistema</h1>
                <p className="text-gray-600">Personalice su perfil y las configuraciones del sistema</p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <nav className="flex space-x-8 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                                selectedTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};

const PerfilTab = ({ formData, handleInputChange, user }) => (
    <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center mb-6">
                <div className="h-20 w-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-600">{user?.role} • {user?.department}</p>
                    <p className="text-sm text-gray-500">Último acceso: {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departamento
                    </label>
                    <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                        <option value="Sistemas y Computación">Sistemas y Computación</option>
                        <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                        <option value="Ciencias Básicas">Ciencias Básicas</option>
                        <option value="Económico Administrativas">Económico Administrativas</option>
                        <option value="Dirección Académica">Dirección Académica</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cargo
                    </label>
                    <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                </label>
                <textarea
                    name="biografia"
                    rows="4"
                    value={formData.biografia}
                    onChange={handleInputChange}
                    placeholder="Describa brevemente su experiencia y especialidades..."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Guardar Cambios
                </button>
            </div>
        </div>

        {/* Estadísticas del usuario simplificadas */}
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Mis Estadísticas</h3>
            <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-sm text-gray-600">Actividades este mes</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">0</p>
                    <p className="text-sm text-gray-600">Estudiantes alcanzados</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">0</p>
                    <p className="text-sm text-gray-600">Preparatorias visitadas</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">0%</p>
                    <p className="text-sm text-gray-600">Tasa de efectividad</p>
                </div>
            </div>
        </div>
    </div>
);

const SistemaTab = () => (
    <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración General</h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma del Sistema
                    </label>
                    <select className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg">
                        <option>Español</option>
                        <option>English</option>
                        <option>Français</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zona Horaria
                    </label>
                    <select className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg">
                        <option>América/México_Centro (UTC-6)</option>
                        <option>América/Tijuana (UTC-8)</option>
                        <option>América/Cancún (UTC-5)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formato de Fecha
                    </label>
                    <select className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg">
                        <option>DD/MM/AAAA</option>
                        <option>MM/DD/AAAA</option>
                        <option>AAAA-MM-DD</option>
                    </select>
                </div>

                <div>
                    <label className="flex items-center space-x-3">
                        <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                        <span className="text-sm text-gray-700">Mostrar tips de ayuda</span>
                    </label>
                </div>

                <div>
                    <label className="flex items-center space-x-3">
                        <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                        <span className="text-sm text-gray-700">Habilitar modo oscuro automático</span>
                    </label>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración de Reportes</h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frecuencia de Reportes Automáticos
                    </label>
                    <select className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg">
                        <option>Semanal</option>
                        <option>Quincenal</option>
                        <option>Mensual</option>
                        <option>Deshabilitado</option>
                    </select>
                </div>

                <div>
                    <label className="flex items-center space-x-3">
                        <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                        <span className="text-sm text-gray-700">Incluir gráficos en reportes PDF</span>
                    </label>
                </div>

                <div>
                    <label className="flex items-center space-x-3">
                        <input type="checkbox" className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Enviar copia a supervisores</span>
                    </label>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Información del Sistema</h3>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Versión del Sistema:</span>
                    <span className="font-medium">2.1.4</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Última Actualización:</span>
                    <span className="font-medium">15 de Enero, 2024</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Base de Datos:</span>
                    <span className="font-medium text-green-600">Conectada</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Almacenamiento Usado:</span>
                    <span className="font-medium">0.1 GB de 10 GB</span>
                </div>
            </div>
        </div>
    </div>
);

const NotificacionesTab = ({ notifications, handleNotificationChange }) => (
    <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Preferencias de Notificación</h3>

            <div className="space-y-6">
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Métodos de Notificación</h4>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">📧</span>
                                <div>
                                    <p className="font-medium">Correo Electrónico</p>
                                    <p className="text-sm text-gray-500">Recibir notificaciones por email</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.email}
                                onChange={() => handleNotificationChange('email')}
                                className="h-4 w-4 text-blue-600"
                            />
                        </label>

                        <label className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">📱</span>
                                <div>
                                    <p className="font-medium">Notificaciones Push</p>
                                    <p className="text-sm text-gray-500">Notificaciones en el navegador</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.push}
                                onChange={() => handleNotificationChange('push')}
                                className="h-4 w-4 text-blue-600"
                            />
                        </label>

                        <label className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">💬</span>
                                <div>
                                    <p className="font-medium">SMS</p>
                                    <p className="text-sm text-gray-500">Mensajes de texto importantes</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.sms}
                                onChange={() => handleNotificationChange('sms')}
                                className="h-4 w-4 text-blue-600"
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Tipos de Notificación</h4>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">📊</span>
                                <div>
                                    <p className="font-medium">Reportes y Estadísticas</p>
                                    <p className="text-sm text-gray-500">Reportes automáticos y actualizaciones</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.reportes}
                                onChange={() => handleNotificationChange('reportes')}
                                className="h-4 w-4 text-blue-600"
                            />
                        </label>

                        <label className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">📅</span>
                                <div>
                                    <p className="font-medium">Actividades Programadas</p>
                                    <p className="text-sm text-gray-500">Recordatorios de eventos y actividades</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.actividades}
                                onChange={() => handleNotificationChange('actividades')}
                                className="h-4 w-4 text-blue-600"
                            />
                        </label>

                        <label className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">📝</span>
                                <div>
                                    <p className="font-medium">Evaluaciones</p>
                                    <p className="text-sm text-gray-500">Resultados y fechas de evaluación</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.evaluaciones}
                                onChange={() => handleNotificationChange('evaluaciones')}
                                className="h-4 w-4 text-blue-600"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Guardar Preferencias
                </button>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Historial de Notificaciones</h3>

            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <span className="text-4xl mb-2">🔔</span>
                <p className="text-sm">Sin notificaciones recientes</p>
            </div>
        </div>
    </div>
);

const SeguridadTab = () => (
    <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Cambiar Contraseña</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña Actual
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Actualizar Contraseña
                </button>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Configuración de Seguridad</h3>

            <div className="space-y-6">
                <div>
                    <label className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Autenticación de dos factores</p>
                            <p className="text-sm text-gray-500">Añadir una capa extra de seguridad a tu cuenta</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4 text-blue-600" />
                    </label>
                </div>

                <div>
                    <label className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Cerrar sesión automáticamente</p>
                            <p className="text-sm text-gray-500">Cerrar sesión después de 30 minutos de inactividad</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                    </label>
                </div>

                <div>
                    <label className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Notificar inicios de sesión sospechosos</p>
                            <p className="text-sm text-gray-500">Recibir alertas de accesos desde ubicaciones nuevas</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                    </label>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Sesiones Activas</h3>

            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                        <span className="text-xl mr-3">💻</span>
                        <div>
                            <p className="font-medium text-sm">Chrome en Windows</p>
                            <p className="text-xs text-gray-500">192.168.1.100 • Tuxtla Gutiérrez, México</p>
                            <p className="text-xs text-green-600">Sesión actual</p>
                        </div>
                    </div>
                    <span className="text-green-600 text-xs">Activa</span>
                </div>
            </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Zona de Peligro</h3>
            <p className="text-sm text-red-700 mb-4">
                Las siguientes acciones son irreversibles. Proceda con precaución.
            </p>
            <div className="space-y-3">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                    Descargar mis datos
                </button>
                <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 text-sm ml-2">
                    Eliminar cuenta
                </button>
            </div>
        </div>
    </div>
);

export default Configuracion;
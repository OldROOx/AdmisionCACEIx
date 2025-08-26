import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage, user, onLogout }) => {
    const menuItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'Promoción E.S.', label: 'Promoción E.S.', icon: '📚' },
        { id: 'Registrar Docente', label: 'Registrar Docente', icon: '👨‍🏫' },
        { id: 'Registrar Preparatoria', label: 'Registrar Preparatoria', icon: '🏫' },
        { id: 'Registrar Actividad', label: 'Registrar Actividad', icon: '📝' },
        { id: 'Ver Registros', label: 'Ver Registros', icon: '📋' },
        { id: 'Inducción', label: 'Inducción', icon: '🎓' },
        { id: 'Evidencias Curso', label: 'Evidencias Curso', icon: '📄' },
        { id: 'Clases Nivelación', label: 'Clases Nivelación', icon: '📖' },
        { id: 'Control Asistencia', label: 'Control Asistencia', icon: '✓' },
        { id: 'Reportes', label: 'Reportes', icon: '📊' },
        { id: 'Configuración', label: 'Configuración', icon: '⚙️' }
    ];

    const handleLogout = () => {
        if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
            onLogout();
        }
    };

    return (
        <div className="w-80 bg-white shadow-lg flex flex-col h-screen">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    🎓 Sistema CACEI
                </h2>
                {user && (
                    <div className="mt-3 flex items-center">
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                    </div>
                )}
            </div>

            <nav className="p-4 flex-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full text-left p-3 mb-1 rounded-lg transition-colors flex items-center ${
                            currentPage === item.id
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-lg flex items-center transition-colors"
                >
                    <span className="mr-3">🚪</span>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
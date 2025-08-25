import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
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

    return (
        <div className="w-80 bg-white shadow-lg">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    🎓 Sistema Educativo
                </h2>
            </div>

            <nav className="p-4">
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

                <button className="w-full text-left p-3 mt-6 text-red-600 hover:bg-red-50 rounded-lg flex items-center">
                    <span className="mr-3">🚪</span>
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
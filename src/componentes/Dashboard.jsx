import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-600">Bienvenido al Sistema de Promoción e Inducción Educativa</p>
            </div>

            {/* Cards de resumen */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Docentes Registrados</h3>
                        <span className="text-2xl">👨‍🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                    <p className="text-xs text-gray-500">Sin registros</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Preparatorias Registradas</h3>
                        <span className="text-2xl">🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">0</p>
                    <p className="text-xs text-gray-500">Sin registros</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Actividades de Promoción</h3>
                        <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                    <p className="text-xs text-gray-500">Sin registros</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Estudiantes en Inducción</h3>
                        <span className="text-2xl">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">0</p>
                    <p className="text-xs text-gray-500">Sin registros</p>
                </div>
            </div>

            {/* Sección de acciones rápidas */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Acciones Rápidas - Promoción</h3>
                    <p className="text-gray-600 text-sm mb-4">Gestione las actividades de promoción en educación superior</p>
                    <div className="space-y-3">
                        <button className="w-full bg-gray-900 text-white p-3 rounded-lg flex items-center justify-center">
                            <span className="mr-2">👨‍🏫</span>
                            Registrar Nuevo Docente
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50">
                            <span className="mr-2">🏫</span>
                            Registrar Preparatoria
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50">
                            <span className="mr-2">📝</span>
                            Nueva Actividad de Promoción
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Acciones Rápidas - Inducción</h3>
                    <p className="text-gray-600 text-sm mb-4">Administre el proceso de inducción y nivelación</p>
                    <div className="space-y-3">
                        <button className="w-full bg-gray-900 text-white p-3 rounded-lg flex items-center justify-center">
                            <span className="mr-2">📄</span>
                            Subir Evidencias
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50">
                            <span className="mr-2">📖</span>
                            Gestionar Nivelación
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50">
                            <span className="mr-2">✓</span>
                            Control de Asistencia
                        </button>
                    </div>
                </div>
            </div>

            {/* Actividad reciente */}
            <div className="bg-white rounded-lg shadow border p-6">
                <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                <p className="text-gray-600 text-sm mb-4">Últimas acciones realizadas en el sistema</p>

                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📊</span>
                    <p className="text-lg font-medium mb-2">Sin actividad reciente</p>
                    <p className="text-sm text-center">
                        Comience registrando docentes, preparatorias y actividades de promoción.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
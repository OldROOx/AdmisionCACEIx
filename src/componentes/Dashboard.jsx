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
                    <p className="text-3xl font-bold text-blue-600">24</p>
                    <p className="text-xs text-gray-500">+2 desde el mes pasado</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Preparatorias Visitadas</h3>
                        <span className="text-2xl">🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">18</p>
                    <p className="text-xs text-gray-500">+2 este mes</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Actividades de Promoción</h3>
                        <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">42</p>
                    <p className="text-xs text-gray-500">+12 esta semana</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Estudiantes en Inducción</h3>
                        <span className="text-2xl">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">156</p>
                    <p className="text-xs text-gray-500">+23% vs mes anterior</p>
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

                <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="mr-3 text-xl">👨‍🏫</span>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Nuevo docente registrado</p>
                            <p className="text-xs text-gray-500">Dr. María González • hace 2 horas</p>
                        </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="mr-3 text-xl">🏫</span>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Preparatoria visitada</p>
                            <p className="text-xs text-gray-500">CETIS No. 45 • hace 4 horas</p>
                        </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="mr-3 text-xl">📝</span>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Actividad de promoción registrada</p>
                            <p className="text-xs text-gray-500">Presentación Ingeniería en Sistemas • hace 6 horas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
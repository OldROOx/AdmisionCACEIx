import React from 'react';

const RegistroActividades = () => {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button className="mr-4 text-gray-600">←</button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Registros de Actividades</h1>
                        <p className="text-gray-600">Consulte y administre todas las actividades de promoción</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center">
                        📤 Exportar
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">
                        Nueva Actividad
                    </button>
                </div>
            </div>

            {/* Filtros */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        placeholder="🔍 Buscar por docente, preparatoria o proyecto..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg mr-4"
                    />
                    <select className="p-3 border border-gray-300 rounded-lg mr-2">
                        <option>Todos los estados</option>
                        <option>Completada</option>
                        <option>Pendiente</option>
                        <option>Cancelada</option>
                    </select>
                    <select className="p-3 border border-gray-300 rounded-lg">
                        <option>Todos los tipos</option>
                        <option>Presentación</option>
                        <option>Taller</option>
                        <option>Conferencia</option>
                    </select>
                </div>
            </div>

            {/* Resumen */}
            <div className="mb-4 flex justify-between items-center text-sm">
                <p className="text-gray-600">Mostrando 4 de 4 registros</p>
                <div className="flex space-x-4">
                    <span className="text-green-600">3 Completadas</span>
                    <span className="text-blue-600">1 Pendiente</span>
                    <span className="text-red-600">0 Canceladas</span>
                </div>
            </div>

            {/* Lista de Actividades */}
            <div className="space-y-4">
                {/* Actividad 1 */}
                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">📚</span>
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-semibold mr-3">Ingeniería en Sistemas</h3>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completada</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <p>Docente: Dr. Juan Martínez</p>
                                        <p>Fecha: 2024-01-18</p>
                                        <p>Duración: 1 hora</p>
                                    </div>
                                    <div>
                                        <p>Preparatoria: CETIS No. 45</p>
                                        <p>Estudiantes: 45</p>
                                        <p>Tipo: Presentación</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">✏️</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>
                </div>

                {/* Actividad 2 */}
                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">🏭</span>
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-semibold mr-3">Ingeniería Industrial</h3>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completada</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <p>Docente: Dra. Ana López</p>
                                        <p>Fecha: 2024-01-17</p>
                                        <p>Duración: 45 min</p>
                                    </div>
                                    <div>
                                        <p>Preparatoria: CBTIS No. 12</p>
                                        <p>Estudiantes: 32</p>
                                        <p>Tipo: Taller</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">✏️</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>
                </div>

                {/* Actividad 3 */}
                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">🏗️</span>
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-semibold mr-3">Ingeniería Civil</h3>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Pendiente</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <p>Docente: Dr. Carlos Ruiz</p>
                                        <p>Fecha: 2024-01-20</p>
                                        <p>Duración: 1.5 horas</p>
                                    </div>
                                    <div>
                                        <p>Preparatoria: CONALEP No. 3</p>
                                        <p>Estudiantes: 28</p>
                                        <p>Tipo: Conferencia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">✏️</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>
                </div>

                {/* Actividad 4 */}
                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">💼</span>
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-semibold mr-3">Administración</h3>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completada</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div>
                                        <p>Docente: Dra. María González</p>
                                        <p>Fecha: 2024-01-16</p>
                                        <p>Duración: 1 hora</p>
                                    </div>
                                    <div>
                                        <p>Preparatoria: CBTIS No. 23</p>
                                        <p>Estudiantes: 38</p>
                                        <p>Tipo: Presentación</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">✏️</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-gray-800">143</p>
                    <p className="text-gray-600 text-sm">Total Estudiantes Alcanzados</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">4</p>
                    <p className="text-gray-600 text-sm">Preparatorias Visitadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">4</p>
                    <p className="text-gray-600 text-sm">Docentes Participantes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">75%</p>
                    <p className="text-gray-600 text-sm">Tasa de Éxito</p>
                </div>
            </div>
        </div>
    );
};

export default RegistroActividades;

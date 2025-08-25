import React from 'react';

const Reportes = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reportes y Estadísticas</h1>
                    <p className="text-gray-600">Análisis de efectividad de promoción e inducción educativa</p>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg">
                        🔽 Filtros
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">
                        📤 Exportar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <select className="p-3 border border-gray-300 rounded-lg">
                    <option>2024</option>
                    <option>2023</option>
                </select>
                <select className="p-3 border border-gray-300 rounded-lg">
                    <option>Todos</option>
                    <option>Enero</option>
                    <option>Febrero</option>
                    <option>Marzo</option>
                </select>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Efectividad Promoción</h3>
                        <span className="text-sm">📈</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">76%</p>
                    <p className="text-xs text-gray-500">+5% vs mes anterior</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Preparatorias Visitadas</h3>
                        <span className="text-sm">🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">18</p>
                    <p className="text-xs text-gray-500">+2 este mes</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Estudiantes Alcanzados</h3>
                        <span className="text-sm">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">203</p>
                    <p className="text-xs text-gray-500">en actividades de promoción</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Tasa de Inducción</h3>
                        <span className="text-sm">📊</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">89%</p>
                    <p className="text-xs text-gray-500">estudiantes en proceso</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Efectividad por Preparatoria</h3>
                    <p className="text-gray-600 text-sm mb-4">Número de estudiantes alcanzados y porcentaje de efectividad</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Gráfico de barras - Efectividad por institución</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Distribución por Carrera</h3>
                    <p className="text-gray-600 text-sm mb-4">Interés de estudiantes por programa académico</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Gráfico circular - Distribución por carrera</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Progreso de Inducción</h3>
                    <p className="text-gray-600 text-sm mb-4">Evolución mensual del proceso de inducción</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Gráfico de líneas - Progreso mensual</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Tendencias de Asistencia</h3>
                    <p className="text-gray-600 text-sm mb-4">Porcentajes de asistencia semanal en clases de nivelación</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Gráfico de área - Tendencias de asistencia</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Top Preparatorias</h3>
                    <p className="text-gray-600 text-sm mb-4">Instituciones con mayor efectividad de promoción</p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="bg-gray-100 text-gray-800 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3">1</span>
                                <div>
                                    <p className="font-medium text-sm">CONALEP 7</p>
                                    <p className="text-xs text-gray-500">35 estudiantes</p>
                                </div>
                            </div>
                            <span className="text-green-600 font-semibold text-sm">85%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="bg-gray-100 text-gray-800 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3">2</span>
                                <div>
                                    <p className="font-medium text-sm">CONALEP 3</p>
                                    <p className="text-xs text-gray-500">28 estudiantes</p>
                                </div>
                            </div>
                            <span className="text-green-600 font-semibold text-sm">82%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="bg-gray-100 text-gray-800 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3">3</span>
                                <div>
                                    <p className="font-medium text-sm">CETIS 45</p>
                                    <p className="text-xs text-gray-500">45 estudiantes</p>
                                </div>
                            </div>
                            <span className="text-green-600 font-semibold text-sm">78%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="bg-gray-100 text-gray-800 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3">4</span>
                                <div>
                                    <p className="font-medium text-sm">CBTIS 23</p>
                                    <p className="text-xs text-gray-500">38 estudiantes</p>
                                </div>
                            </div>
                            <span className="text-green-600 font-semibold text-sm">71%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="bg-gray-100 text-gray-800 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3">5</span>
                                <div>
                                    <p className="font-medium text-sm">CETIS 8</p>
                                    <p className="text-xs text-gray-500">25 estudiantes</p>
                                </div>
                            </div>
                            <span className="text-green-600 font-semibold text-sm">69%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Resumen Mensual</h3>
                    <p className="text-gray-600 text-sm mb-4">Actividades realizadas este mes</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Actividades de Promoción</p>
                                <p className="text-sm text-gray-500">Presentaciones realizadas</p>
                            </div>
                            <span className="text-2xl font-bold text-blue-600">42</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Clases de Nivelación</p>
                                <p className="text-sm text-gray-500">Sesiones completadas</p>
                            </div>
                            <span className="text-2xl font-bold text-green-600">28</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Evidencias Subidas</p>
                                <p className="text-sm text-gray-500">Documentos registrados</p>
                            </div>
                            <span className="text-2xl font-bold text-purple-600">156</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Nuevos Registros</p>
                                <p className="text-sm text-gray-500">Docentes y preparatorias</p>
                            </div>
                            <span className="text-2xl font-bold text-orange-600">12</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Opciones de Exportación</h3>
                <p className="text-gray-600 text-sm mb-4">Genere reportes detallados para análisis externo</p>
                <div className="grid grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="mr-2">📄</span>
                        Reporte de Promoción (PDF)
                    </button>
                    <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="mr-2">📊</span>
                        Estadísticas de Inducción (Excel)
                    </button>
                    <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="mr-2">📋</span>
                        Reporte Completo (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
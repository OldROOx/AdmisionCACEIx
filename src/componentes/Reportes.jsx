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

            {/* Selectores */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <select className="p-3 border border-gray-300 rounded-lg">
                    <option>2024</option>
                    <option>2023</option>
                </select>
                <select className="p-3 border border-gray-300 rounded-lg">
                    <option>Todos los meses</option>
                    <option>Enero</option>
                    <option>Febrero</option>
                    <option>Marzo</option>
                </select>
            </div>

            {/* Métricas principales */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Efectividad Promoción</h3>
                        <span className="text-sm">📈</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">0%</p>
                    <p className="text-xs text-gray-500">Sin datos disponibles</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Preparatorias Visitadas</h3>
                        <span className="text-sm">🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                    <p className="text-xs text-gray-500">Sin visitas registradas</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Estudiantes Alcanzados</h3>
                        <span className="text-sm">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                    <p className="text-xs text-gray-500">Sin actividades registradas</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Tasa de Inducción</h3>
                        <span className="text-sm">📊</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">0%</p>
                    <p className="text-xs text-gray-500">Sin estudiantes en proceso</p>
                </div>
            </div>

            {/* Gráficas vacías */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Efectividad por Preparatoria</h3>
                    <p className="text-gray-600 text-sm mb-4">Número de estudiantes alcanzados y porcentaje de efectividad</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Sin datos para mostrar</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Distribución por Carrera</h3>
                    <p className="text-gray-600 text-sm mb-4">Interés de estudiantes por programa académico</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Sin datos para mostrar</p>
                    </div>
                </div>
            </div>

            {/* Más gráficas */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Progreso de Inducción</h3>
                    <p className="text-gray-600 text-sm mb-4">Evolución mensual del proceso de inducción</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Sin datos para mostrar</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-2">Tendencias de Asistencia</h3>
                    <p className="text-gray-600 text-sm mb-4">Porcentajes de asistencia semanal en clases de nivelación</p>
                    <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Sin datos para mostrar</p>
                    </div>
                </div>
            </div>

            {/* Top y resumen */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Top Preparatorias</h3>
                    <p className="text-gray-600 text-sm mb-4">Instituciones con mayor efectividad de promoción</p>
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <span className="text-4xl mb-2">🏫</span>
                        <p className="text-sm">Sin datos disponibles</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Resumen Mensual</h3>
                    <p className="text-gray-600 text-sm mb-4">Actividades realizadas este mes</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Nuevos Registros</p>
                                <p className="text-sm text-gray-500">Docentes y preparatorias</p>
                            </div>
                            <span className="text-2xl font-bold text-orange-600">0</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Actividades de Promoción</p>
                                <p className="text-sm text-gray-500">Presentaciones realizadas</p>
                            </div>
                            <span className="text-2xl font-bold text-blue-600">0</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Clases de Nivelación</p>
                                <p className="text-sm text-gray-500">Sesiones completadas</p>
                            </div>
                            <span className="text-2xl font-bold text-green-600">0</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Evidencias Subidas</p>
                                <p className="text-sm text-gray-500">Documentos registrados</p>
                            </div>
                            <span className="text-2xl font-bold text-purple-600">0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Opciones de exportación */}
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

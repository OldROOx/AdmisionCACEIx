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
                <p className="text-gray-600">Sin registros encontrados</p>
                <div className="flex space-x-4">
                    <span className="text-green-600">0 Completadas</span>
                    <span className="text-blue-600">0 Pendientes</span>
                    <span className="text-red-600">0 Canceladas</span>
                </div>
            </div>

            {/* Lista de Actividades */}
            <div className="bg-white rounded-lg shadow border p-6 mb-8">
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📋</span>
                    <p className="text-lg font-medium mb-2">Sin actividades registradas</p>
                    <p className="text-sm text-center">
                        Comience registrando una nueva actividad de promoción.
                    </p>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-gray-800">0</p>
                    <p className="text-gray-600 text-sm">Total Estudiantes Alcanzados</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">0</p>
                    <p className="text-gray-600 text-sm">Preparatorias Visitadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">0</p>
                    <p className="text-gray-600 text-sm">Docentes Participantes</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">0%</p>
                    <p className="text-gray-600 text-sm">Tasa de Éxito</p>
                </div>
            </div>
        </div>
    );
};

export default RegistroActividades;
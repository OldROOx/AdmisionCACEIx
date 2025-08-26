import React from 'react';

const ControlAsistencia = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button className="mr-4 text-gray-600">←</button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Control de Asistencia</h1>
                        <p className="text-gray-600">Registre la asistencia de estudiantes a las clases de nivelación</p>
                    </div>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded flex items-center">
                    ✓ Tomar Asistencia
                </button>
            </div>

            <div className="bg-white rounded-lg shadow border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Registros de Asistencia</h3>
                <p className="text-gray-600 text-sm mb-4">Historial de asistencia a clases de nivelación</p>

                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">✓</span>
                    <p className="text-lg font-medium mb-2">Sin registros de asistencia</p>
                    <p className="text-sm text-center">
                        Comience tomando asistencia en las clases de nivelación programadas.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">0%</p>
                    <p className="text-gray-600 text-sm">Asistencia Promedio</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">0</p>
                    <p className="text-gray-600 text-sm">Estudiantes Activos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">0</p>
                    <p className="text-gray-600 text-sm">Clases Esta Semana</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-orange-600">0</p>
                    <p className="text-gray-600 text-sm">Materias Activas</p>
                </div>
            </div>
        </div>
    );
};

export default ControlAsistencia;
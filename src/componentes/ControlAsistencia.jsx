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
                <h3 className="text-lg font-semibold mb-4">Registros Recientes</h3>
                <p className="text-gray-600 text-sm mb-4">Últimos registros de asistencia</p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">📚</span>
                            <div>
                                <h4 className="font-semibold">Matemáticas Básicas</h4>
                                <p className="text-sm text-gray-500">Dr. Juan Martínez • 2024-01-18 • 09:00</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-green-600 text-sm font-medium">23/25 presentes (92%)</span>
                            <button className="text-blue-600 text-sm">Ver Detalles</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">⚛️</span>
                            <div>
                                <h4 className="font-semibold">Física Fundamental</h4>
                                <p className="text-sm text-gray-500">Dra. Ana López • 2024-01-17 • 14:00</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-yellow-600 text-sm font-medium">16/20 presentes (80%)</span>
                            <button className="text-blue-600 text-sm">Ver Detalles</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">🧪</span>
                            <div>
                                <h4 className="font-semibold">Química General</h4>
                                <p className="text-sm text-gray-500">Dr. Carlos Ruiz • 2024-01-16 • 11:00</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-green-600 text-sm font-medium">21/22 presentes (95%)</span>
                            <button className="text-blue-600 text-sm">Ver Detalles</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">89%</p>
                    <p className="text-gray-600 text-sm">Asistencia Promedio</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">156</p>
                    <p className="text-gray-600 text-sm">Estudiantes Activos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">12</p>
                    <p className="text-gray-600 text-sm">Clases Esta Semana</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-orange-600">3</p>
                    <p className="text-gray-600 text-sm">Materias Activas</p>
                </div>
            </div>
        </div>
    );
};

export default ControlAsistencia;
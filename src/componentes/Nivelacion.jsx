import React from 'react';

const Nivelacion = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button className="mr-4 text-gray-600">←</button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Clases de Nivelación</h1>
                        <p className="text-gray-600">Administra las clases de nivelación para estudiantes</p>
                    </div>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded flex items-center">
                    + Programar Clase
                </button>
            </div>

            <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">📚</span>
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold mr-2">Matemáticas Básicas</h3>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Programada</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span>📅 2024-01-20</span>
                                    <span>🕘 09:00 (2 horas)</span>
                                    <span>📍 Aula 101</span>
                                    <span>👥 25/30 estudiantes</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Instructor: Dr. Juan Martínez</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 text-sm">Ver Detalles</button>
                            <button className="text-gray-600 text-sm">Editar</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">⚛️</span>
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold mr-2">Física Fundamental</h3>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completada</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span>📅 2024-01-18</span>
                                    <span>🕘 14:00 (1.5 horas)</span>
                                    <span>📍 Lab. Física</span>
                                    <span>👥 18/20 estudiantes</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Instructor: Dra. Ana López</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 text-sm">Ver Detalles</button>
                            <button className="text-gray-600 text-sm">Editar</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">🧪</span>
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold mr-2">Química General</h3>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Programada</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span>📅 2024-01-22</span>
                                    <span>🕘 11:00 (2 horas)</span>
                                    <span>📍 Lab. Química</span>
                                    <span>👥 22/25 estudiantes</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Instructor: Dr. Carlos Ruiz</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 text-sm">Ver Detalles</button>
                            <button className="text-gray-600 text-sm">Editar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">2</p>
                    <p className="text-gray-600 text-sm">Programadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">1</p>
                    <p className="text-gray-600 text-sm">Completadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-orange-600">65</p>
                    <p className="text-gray-600 text-sm">Total Inscritos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">87%</p>
                    <p className="text-gray-600 text-sm">Ocupación</p>
                </div>
            </div>
        </div>
    );
};

export default Nivelacion;
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

            <div className="bg-white rounded-lg shadow border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Clases Programadas</h3>
                <p className="text-gray-600 text-sm mb-4">Lista de clases de nivelación programadas y completadas</p>

                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📖</span>
                    <p className="text-lg font-medium mb-2">Sin clases programadas</p>
                    <p className="text-sm text-center">
                        Comience programando clases de nivelación para los estudiantes.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">0</p>
                    <p className="text-gray-600 text-sm">Programadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">0</p>
                    <p className="text-gray-600 text-sm">Completadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-orange-600">0</p>
                    <p className="text-gray-600 text-sm">Total Inscritos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">0%</p>
                    <p className="text-gray-600 text-sm">Ocupación</p>
                </div>
            </div>
        </div>
    );
};

export default Nivelacion;
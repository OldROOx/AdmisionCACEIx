import React from 'react';

const Evidencias = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button className="mr-4 text-gray-600">←</button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Evidencias del Curso</h1>
                        <p className="text-gray-600">Gestione las evidencias del curso de inducción</p>
                    </div>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded flex items-center">
                    ⬆ Subir Evidencia
                </button>
            </div>

            <div className="bg-white rounded-lg shadow border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Evidencias Registradas</h3>
                <p className="text-gray-600 text-sm mb-4">Lista de todas las evidencias del curso de inducción</p>

                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📄</span>
                    <p className="text-lg font-medium mb-2">Sin evidencias registradas</p>
                    <p className="text-sm text-center">
                        Comience subiendo evidencias del curso de inducción.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">0</p>
                    <p className="text-gray-600 text-sm">Evidencias Aprobadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-yellow-600">0</p>
                    <p className="text-gray-600 text-sm">Pendientes de Revisión</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-red-600">0</p>
                    <p className="text-gray-600 text-sm">Evidencias Rechazadas</p>
                </div>
            </div>
        </div>
    );
};

export default Evidencias;
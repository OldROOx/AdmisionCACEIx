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

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">📄</span>
                            <div>
                                <h4 className="font-semibold">Asistencia Curso Inducción - Semana 1</h4>
                                <p className="text-sm text-gray-500">Juan Pérez • 2024-01-15 • asistencia_semana1.pdf</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Aprobada</span>
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">⬇</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">📄</span>
                            <div>
                                <h4 className="font-semibold">Evaluación Diagnóstica Matemáticas</h4>
                                <p className="text-sm text-gray-500">María González • 2024-01-14 • eval_matematicas.pdf</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Pendiente</span>
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">⬇</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                            <span className="mr-4 text-xl">📄</span>
                            <div>
                                <h4 className="font-semibold">Certificado Curso en Línea</h4>
                                <p className="text-sm text-gray-500">Carlos López • 2024-01-13 • certificado_curso.pdf</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Aprobada</span>
                            <button className="text-gray-500">👁</button>
                            <button className="text-gray-500">⬇</button>
                            <button className="text-red-500">🗑</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">2</p>
                    <p className="text-gray-600 text-sm">Evidencias Aprobadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-yellow-600">1</p>
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
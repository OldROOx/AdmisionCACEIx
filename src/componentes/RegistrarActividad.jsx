import React from 'react';

const RegistrarActividad = () => {
    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button className="mr-4 text-gray-600">←</button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Registrar Actividad de Promoción</h1>
                    <p className="text-gray-600">Registre una nueva actividad de promoción realizada</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        📋 Información de la Actividad
                    </h3>
                    <p className="text-gray-600 text-sm">Complete todos los campos requeridos para registrar la actividad</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Docente Responsable *
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Seleccione el docente</option>
                            <option>Dr. Juan Martínez</option>
                            <option>Dra. Ana López</option>
                            <option>Dr. Carlos Ruiz</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preparatoria Visitada *
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Seleccione la preparatoria</option>
                            <option>CETIS No. 45</option>
                            <option>CBTIS No. 12</option>
                            <option>CONALEP No. 3</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proyecto/Carrera Presentada *
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Ingeniería en Sistemas Computacionales"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha de la Actividad *
                        </label>
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hora de Inicio *
                        </label>
                        <input
                            type="time"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duración *
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Duración</option>
                            <option>30 minutos</option>
                            <option>1 hora</option>
                            <option>1.5 horas</option>
                            <option>2 horas</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Número de Estudiantes Alcanzados *
                        </label>
                        <input
                            type="number"
                            placeholder="Ej: 45"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Actividad *
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Seleccione el tipo</option>
                            <option>Presentación</option>
                            <option>Taller</option>
                            <option>Conferencia</option>
                            <option>Feria Vocacional</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Carreras Promovidas
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Liste las carreras que se promovieron durante la actividad"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material Utilizado
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Describa el material didáctico, tecnológico o de apoyo utilizado"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observaciones y Resultados
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Describa los resultados obtenidos, reacciones de los estudiantes, etc."
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Evidencias (Opcional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <button className="text-gray-600">
                            📎 Seleccionar archivo Ningún archivo seleccionado
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            Suba fotografías, listas de asistencia, o documentos relacionados con la actividad
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700">
                        Los campos marcados con (*) son obligatorios. Esta información será utilizada para generar reportes de efectividad de promoción.
                    </p>
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg">
                        Cancelar
                    </button>
                    <button className="px-6 py-2 bg-gray-900 text-white rounded-lg">
                        Registrar Actividad
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrarActividad;
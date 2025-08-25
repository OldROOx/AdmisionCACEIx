import React from 'react';

const RegistrarDocente = () => {
    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button className="mr-4 text-gray-600">←</button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Registrar Docente</h1>
                    <p className="text-gray-600">Registre un nuevo docente para actividades de promoción</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        👨‍🏫 Información del Docente
                    </h3>
                    <p className="text-gray-600 text-sm">Complete todos los campos requeridos para registrar al docente</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre(s) *
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese el nombre"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Apellidos *
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese los apellidos"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico *
                        </label>
                        <input
                            type="email"
                            placeholder="docente@institucion.edu"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            placeholder="(555) 123-4567"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cédula Profesional
                        </label>
                        <input
                            type="text"
                            placeholder="Número de cédula"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Especialidad *
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Seleccione la especialidad</option>
                            <option>Ingeniería en Sistemas</option>
                            <option>Ingeniería Industrial</option>
                            <option>Ingeniería Civil</option>
                            <option>Administración</option>
                            <option>Contaduría</option>
                            <option>Arquitectura</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Departamento *
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Seleccione el departamento</option>
                            <option>Sistemas y Computación</option>
                            <option>Ingeniería Industrial</option>
                            <option>Ciencias Básicas</option>
                            <option>Económico Administrativas</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Años de Experiencia
                        </label>
                        <input
                            type="number"
                            placeholder="Años de experiencia docente"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas Adicionales
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Información adicional sobre el docente"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700">
                        Los campos marcados con (*) son obligatorios. La información será utilizada para asignar actividades de promoción.
                    </p>
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg">
                        Cancelar
                    </button>
                    <button className="px-6 py-2 bg-gray-900 text-white rounded-lg">
                        Registrar Docente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrarDocente;
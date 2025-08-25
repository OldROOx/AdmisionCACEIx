import React from 'react';

const RegistrarPreparatoria = () => {
    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button className="mr-4 text-gray-600">←</button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Registrar Preparatoria</h1>
                    <p className="text-gray-600">Agregue una nueva preparatoria al catálogo de instituciones</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        🏫 Información de la Preparatoria
                    </h3>
                    <p className="text-gray-600 text-sm">Complete todos los campos requeridos para registrar la preparatoria</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la Institución *
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: CETIS No. 45"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Clave de la Institución
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: 14DCT0045K"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Institución *
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                        <option>Seleccione el tipo de institución</option>
                        <option>CETIS</option>
                        <option>CBTIS</option>
                        <option>CONALEP</option>
                        <option>Preparatoria Estatal</option>
                        <option>Preparatoria Federal</option>
                        <option>CCH</option>
                        <option>Preparatoria Privada</option>
                    </select>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Información de Ubicación</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dirección *
                        </label>
                        <input
                            type="text"
                            placeholder="Calle, número, colonia"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ciudad *
                            </label>
                            <input
                                type="text"
                                placeholder="Ciudad"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado *
                            </label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg">
                                <option>Seleccione el estado</option>
                                <option>Chiapas</option>
                                <option>Oaxaca</option>
                                <option>Veracruz</option>
                                <option>Tabasco</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Código Postal
                            </label>
                            <input
                                type="text"
                                placeholder="12345"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>

                    <div className="grid grid-cols-2 gap-6 mb-4">
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="contacto@preparatoria.edu.mx"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Director(a)
                            </label>
                            <input
                                type="text"
                                placeholder="Nombre del director"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Coordinador de Vinculación
                            </label>
                            <input
                                type="text"
                                placeholder="Nombre del coordinador"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas Adicionales
                    </label>
                    <textarea
                        rows="3"
                        placeholder="Información adicional sobre la preparatoria"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700">
                        Los campos marcados con (*) son obligatorios. Esta información será utilizada para programar visitas de promoción.
                    </p>
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg">
                        Cancelar
                    </button>
                    <button className="px-6 py-2 bg-gray-900 text-white rounded-lg">
                        Registrar Preparatoria
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrarPreparatoria;
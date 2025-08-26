// src/componentes/RegistrarPreparatoria.jsx
import React, { useState } from 'react';
import apiService from '../services/apiService';

const RegistrarPreparatoria = ({ onBack }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        clave: '',
        tipo: '',
        direccion: '',
        ciudad: '',
        estado: '',
        codigoPostal: '',
        telefono: '',
        correo: '',
        director: '',
        coordinador: '',
        notas: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const tiposInstitucion = [
        'CETIS',
        'CBTIS',
        'CONALEP',
        'Preparatoria Estatal',
        'Preparatoria Federal',
        'CCH',
        'Preparatoria Privada'
    ];

    const estados = [
        'Chiapas',
        'Oaxaca',
        'Veracruz',
        'Tabasco',
        'Campeche',
        'Yucatán',
        'Quintana Roo'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre de la institución es requerido';
        }

        if (!formData.tipo) {
            newErrors.tipo = 'El tipo de institución es requerido';
        }

        if (!formData.direccion.trim()) {
            newErrors.direccion = 'La dirección es requerida';
        }

        if (!formData.ciudad.trim()) {
            newErrors.ciudad = 'La ciudad es requerida';
        }

        if (!formData.estado) {
            newErrors.estado = 'El estado es requerido';
        }

        if (formData.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            newErrors.correo = 'El correo no tiene un formato válido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Preparar datos para enviar a la API
            const dataToSend = {
                nombre: formData.nombre.trim(),
                direccion: `${formData.direccion.trim()}, ${formData.ciudad.trim()}, ${formData.estado}`
            };

            const response = await apiService.createPreparatoria(dataToSend);

            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    setFormData({
                        nombre: '',
                        clave: '',
                        tipo: '',
                        direccion: '',
                        ciudad: '',
                        estado: '',
                        codigoPostal: '',
                        telefono: '',
                        correo: '',
                        director: '',
                        coordinador: '',
                        notas: ''
                    });
                    setSuccess(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating preparatoria:', error);
            setErrors({
                general: error.message || 'Error al registrar la preparatoria'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (onBack) {
            onBack();
        } else {
            setFormData({
                nombre: '',
                clave: '',
                tipo: '',
                direccion: '',
                ciudad: '',
                estado: '',
                codigoPostal: '',
                telefono: '',
                correo: '',
                director: '',
                coordinador: '',
                notas: ''
            });
            setErrors({});
        }
    };

    if (success) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-lg shadow border p-8 text-center">
                    <div className="text-6xl mb-4">🏫</div>
                    <h2 className="text-2xl font-bold text-green-600 mb-2">¡Preparatoria Registrada!</h2>
                    <p className="text-gray-600 mb-4">
                        La preparatoria {formData.nombre} ha sido registrada exitosamente.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Registrar Otra Preparatoria
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={handleCancel}
                    className="mr-4 text-gray-600 hover:text-gray-800"
                >
                    ←
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Registrar Preparatoria</h1>
                    <p className="text-gray-600">Agregue una nueva preparatoria al catálogo de instituciones</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        🏫 Información de la Preparatoria
                    </h3>
                    <p className="text-gray-600 text-sm">Complete todos los campos requeridos para registrar la preparatoria</p>
                </div>

                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la Institución *
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: CETIS No. 45"
                            className={`w-full p-3 border rounded-lg ${
                                errors.nombre ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Clave de la Institución
                        </label>
                        <input
                            type="text"
                            name="clave"
                            value={formData.clave}
                            onChange={handleChange}
                            placeholder="Ej: 14DCT0045K"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Institución *
                    </label>
                    <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg ${
                            errors.tipo ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Seleccione el tipo de institución</option>
                        {tiposInstitucion.map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                    {errors.tipo && (
                        <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Información de Ubicación</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dirección *
                        </label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Calle, número, colonia"
                            className={`w-full p-3 border rounded-lg ${
                                errors.direccion ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.direccion && (
                            <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ciudad *
                            </label>
                            <input
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                placeholder="Ciudad"
                                className={`w-full p-3 border rounded-lg ${
                                    errors.ciudad ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.ciudad && (
                                <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado *
                            </label>
                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${
                                    errors.estado ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Seleccione el estado</option>
                                {estados.map(estado => (
                                    <option key={estado} value={estado}>{estado}</option>
                                ))}
                            </select>
                            {errors.estado && (
                                <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Código Postal
                            </label>
                            <input
                                type="text"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleChange}
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
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
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
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                placeholder="contacto@preparatoria.edu.mx"
                                className={`w-full p-3 border rounded-lg ${
                                    errors.correo ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.correo && (
                                <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Director(a)
                            </label>
                            <input
                                type="text"
                                name="director"
                                value={formData.director}
                                onChange={handleChange}
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
                                name="coordinador"
                                value={formData.coordinador}
                                onChange={handleChange}
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
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
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
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Registrando...
                            </>
                        ) : (
                            'Registrar Preparatoria'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrarPreparatoria;
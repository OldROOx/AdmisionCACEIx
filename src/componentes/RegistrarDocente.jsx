// src/componentes/RegistrarDocente.jsx
import React, { useState } from 'react';
import apiService from '../services/apiService';

const RegistrarDocente = ({ onBack }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        cedula: '',
        especialidad: '',
        departamento: '',
        experiencia: '',
        notas: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const especialidades = [
        'Ingeniería en Sistemas',
        'Ingeniería Industrial',
        'Ingeniería Civil',
        'Administración',
        'Contaduría',
        'Arquitectura',
        'Ciencias Básicas',
        'Otra'
    ];

    const departamentos = [
        'Sistemas y Computación',
        'Ingeniería Industrial',
        'Ciencias Básicas',
        'Económico Administrativas',
        'Dirección Académica'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
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
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
        }

        if (!formData.correo.trim()) {
            newErrors.correo = 'El correo es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            newErrors.correo = 'El correo no tiene un formato válido';
        }

        if (!formData.especialidad) {
            newErrors.especialidad = 'La especialidad es requerida';
        }

        if (!formData.departamento) {
            newErrors.departamento = 'El departamento es requerido';
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
                apellido: formData.apellido.trim(),
                correo: formData.correo.trim().toLowerCase()
            };

            const response = await apiService.createDocente(dataToSend);

            if (response.success) {
                setSuccess(true);
                // Limpiar formulario después de 2 segundos
                setTimeout(() => {
                    setFormData({
                        nombre: '',
                        apellido: '',
                        correo: '',
                        telefono: '',
                        cedula: '',
                        especialidad: '',
                        departamento: '',
                        experiencia: '',
                        notas: ''
                    });
                    setSuccess(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating docente:', error);
            setErrors({
                general: error.message || 'Error al registrar el docente'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (onBack) {
            onBack();
        } else {
            // Reset form
            setFormData({
                nombre: '',
                apellido: '',
                correo: '',
                telefono: '',
                cedula: '',
                especialidad: '',
                departamento: '',
                experiencia: '',
                notas: ''
            });
            setErrors({});
        }
    };

    if (success) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-lg shadow border p-8 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-green-600 mb-2">¡Docente Registrado!</h2>
                    <p className="text-gray-600 mb-4">
                        El docente {formData.nombre} {formData.apellido} ha sido registrado exitosamente.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Registrar Otro Docente
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
                    <h1 className="text-2xl font-bold text-gray-800">Registrar Docente</h1>
                    <p className="text-gray-600">Registre un nuevo docente para actividades de promoción</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        👨‍🏫 Información del Docente
                    </h3>
                    <p className="text-gray-600 text-sm">Complete todos los campos requeridos para registrar al docente</p>
                </div>

                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre(s) *
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre"
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
                            Apellidos *
                        </label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Ingrese los apellidos"
                            className={`w-full p-3 border rounded-lg ${
                                errors.apellido ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.apellido && (
                            <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico *
                        </label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="docente@institucion.edu"
                            className={`w-full p-3 border rounded-lg ${
                                errors.correo ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.correo && (
                            <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
                        )}
                    </div>

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
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cédula Profesional
                        </label>
                        <input
                            type="text"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleChange}
                            placeholder="Número de cédula"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Especialidad *
                        </label>
                        <select
                            name="especialidad"
                            value={formData.especialidad}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${
                                errors.especialidad ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Seleccione la especialidad</option>
                            {especialidades.map(esp => (
                                <option key={esp} value={esp}>{esp}</option>
                            ))}
                        </select>
                        {errors.especialidad && (
                            <p className="text-red-500 text-sm mt-1">{errors.especialidad}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Departamento *
                        </label>
                        <select
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${
                                errors.departamento ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Seleccione el departamento</option>
                            {departamentos.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        {errors.departamento && (
                            <p className="text-red-500 text-sm mt-1">{errors.departamento}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Años de Experiencia
                        </label>
                        <input
                            type="number"
                            name="experiencia"
                            value={formData.experiencia}
                            onChange={handleChange}
                            placeholder="Años de experiencia docente"
                            min="0"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
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
                            'Registrar Docente'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrarDocente;
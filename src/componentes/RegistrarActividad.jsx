// src/componentes/RegistrarActividad.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const RegistrarActividad = ({ onBack }) => {
    const [formData, setFormData] = useState({
        id_docente: '',
        id_prepa: '',
        id_proyecto: '',
        fecha: '',
        hora: '',
        duracion: '',
        estudiantes: '',
        tipo: '',
        carreras: '',
        material: '',
        observaciones: ''
    });

    const [options, setOptions] = useState({
        docentes: [],
        preparatorias: [],
        proyectos: []
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const tiposActividad = [
        'Presentación',
        'Taller',
        'Conferencia',
        'Feria Vocacional',
        'Mesa Redonda'
    ];

    const duraciones = [
        '30 minutos',
        '1 hora',
        '1.5 horas',
        '2 horas',
        '3 horas'
    ];

    useEffect(() => {
        loadOptions();
    }, []);

    const loadOptions = async () => {
        try {
            const [docentes, preparatorias, proyectos] = await Promise.all([
                apiService.getDocentes(),
                apiService.getPreparatorias(),
                apiService.getProyectos()
            ]);

            setOptions({
                docentes: docentes.data || [],
                preparatorias: preparatorias.data || [],
                proyectos: proyectos.data || []
            });
        } catch (error) {
            console.error('Error loading options:', error);
        }
    };

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

        if (!formData.id_docente) {
            newErrors.id_docente = 'El docente responsable es requerido';
        }

        if (!formData.id_prepa) {
            newErrors.id_prepa = 'La preparatoria visitada es requerida';
        }

        if (!formData.id_proyecto) {
            newErrors.id_proyecto = 'El proyecto/carrera es requerido';
        }

        if (!formData.fecha) {
            newErrors.fecha = 'La fecha de la actividad es requerida';
        }

        if (!formData.tipo) {
            newErrors.tipo = 'El tipo de actividad es requerido';
        }

        if (!formData.estudiantes || isNaN(formData.estudiantes) || formData.estudiantes <= 0) {
            newErrors.estudiantes = 'El número de estudiantes debe ser mayor a 0';
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
            const dataToSend = {
                fecha: formData.fecha,
                id_docente: parseInt(formData.id_docente),
                id_prepa: parseInt(formData.id_prepa),
                id_proyecto: parseInt(formData.id_proyecto)
            };

            const response = await apiService.createPromocion(dataToSend);

            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    setFormData({
                        id_docente: '',
                        id_prepa: '',
                        id_proyecto: '',
                        fecha: '',
                        hora: '',
                        duracion: '',
                        estudiantes: '',
                        tipo: '',
                        carreras: '',
                        material: '',
                        observaciones: ''
                    });
                    setSuccess(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating promocion:', error);
            setErrors({
                general: error.message || 'Error al registrar la actividad'
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
                id_docente: '',
                id_prepa: '',
                id_proyecto: '',
                fecha: '',
                hora: '',
                duracion: '',
                estudiantes: '',
                tipo: '',
                carreras: '',
                material: '',
                observaciones: ''
            });
            setErrors({});
        }
    };

    if (success) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-lg shadow border p-8 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-green-600 mb-2">¡Actividad Registrada!</h2>
                    <p className="text-gray-600 mb-4">
                        La actividad de promoción ha sido registrada exitosamente.
                    </p>
                    <div className="space-x-4">
                        <button
                            onClick={() => setSuccess(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Registrar Otra Actividad
                        </button>
                        <button
                            onClick={onBack}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Volver a Promoción
                        </button>
                    </div>
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
                    <h1 className="text-2xl font-bold text-gray-800">Registrar Actividad de Promoción</h1>
                    <p className="text-gray-600">Registre una nueva actividad de promoción realizada</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        📋 Información de la Actividad
                    </h3>
                    <p className="text-gray-600 text-sm">Complete todos los campos requeridos para registrar la actividad</p>
                </div>

                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Docente Responsable *
                        </label>
                        <select
                            name="id_docente"
                            value={formData.id_docente}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${
                                errors.id_docente ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Seleccione el docente</option>
                            {options.docentes.map(docente => (
                                <option key={docente.id_docente} value={docente.id_docente}>
                                    {docente.nombre} {docente.apellido}
                                </option>
                            ))}
                        </select>
                        {errors.id_docente && (
                            <p className="text-red-500 text-sm mt-1">{errors.id_docente}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preparatoria Visitada *
                        </label>
                        <select
                            name="id_prepa"
                            value={formData.id_prepa}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${
                                errors.id_prepa ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Seleccione la preparatoria</option>
                            {options.preparatorias.map(prep => (
                                <option key={prep.id_prepa} value={prep.id_prepa}>
                                    {prep.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.id_prepa && (
                            <p className="text-red-500 text-sm mt-1">{errors.id_prepa}</p>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proyecto/Carrera Presentada *
                    </label>
                    <select
                        name="id_proyecto"
                        value={formData.id_proyecto}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg ${
                            errors.id_proyecto ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Seleccione el proyecto/carrera</option>
                        {options.proyectos.map(proyecto => (
                            <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>
                                {proyecto.titulo}
                            </option>
                        ))}
                    </select>
                    {errors.id_proyecto && (
                        <p className="text-red-500 text-sm mt-1">{errors.id_proyecto}</p>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha de la Actividad *
                        </label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${
                                errors.fecha ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.fecha && (
                            <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hora de Inicio
                        </label>
                        <input
                            type="time"
                            name="hora"
                            value={formData.hora}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duración
                        </label>
                        <select
                            name="duracion"
                            value={formData.duracion}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Seleccione duración</option>
                            {duraciones.map(duracion => (
                                <option key={duracion} value={duracion}>{duracion}</option>
                            ))}
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
                            name="estudiantes"
                            value={formData.estudiantes}
                            onChange={handleChange}
                            placeholder="Ej: 45"
                            min="1"
                            className={`w-full p-3 border rounded-lg ${
                                errors.estudiantes ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.estudiantes && (
                            <p className="text-red-500 text-sm mt-1">{errors.estudiantes}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Actividad *
                        </label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${
                                errors.tipo ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Seleccione el tipo</option>
                            {tiposActividad.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                        {errors.tipo && (
                            <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Carreras Promovidas
                    </label>
                    <textarea
                        name="carreras"
                        value={formData.carreras}
                        onChange={handleChange}
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
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
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
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describa los resultados obtenidos, reacciones de los estudiantes, etc."
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700">
                        Los campos marcados con (*) son obligatorios. Esta información será utilizada para generar reportes de efectividad de promoción.
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
                            'Registrar Actividad'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrarActividad;
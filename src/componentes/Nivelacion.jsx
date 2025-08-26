// src/componentes/Nivelacion.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Nivelacion = () => {
    const [data, setData] = useState({
        clases: [],
        asistencias: [],
        alumnos: [],
        loading: true,
        stats: {
            programadas: 0,
            completadas: 0,
            totalInscritos: 0,
            ocupacion: 0
        }
    });

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        tema: '',
        fecha: '',
        descripcion: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [clases, asistencias, alumnos] = await Promise.all([
                apiService.getClasesNivelacion(),
                apiService.getAsistenciaNivelacion(),
                apiService.getAlumnos()
            ]);

            const clasesData = clases.data || [];
            const hoy = new Date();

            const completadas = clasesData.filter(clase => new Date(clase.fecha) < hoy).length;
            const programadas = clasesData.filter(clase => new Date(clase.fecha) >= hoy).length;

            const estudiantesUnicos = new Set((asistencias.data || []).map(a => a.id_alumno)).size;
            const capacidadTotal = clasesData.length * 30; // Asumiendo 30 estudiantes por clase
            const ocupacion = capacidadTotal > 0 ? Math.round((estudiantesUnicos / capacidadTotal) * 100) : 0;

            const stats = {
                programadas,
                completadas,
                totalInscritos: estudiantesUnicos,
                ocupacion
            };

            setData({
                clases: clasesData,
                asistencias: asistencias.data || [],
                alumnos: alumnos.data || [],
                stats,
                loading: false
            });
        } catch (error) {
            console.error('Error loading leveling data:', error);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSend = {
                tema: formData.tema.trim(),
                fecha: formData.fecha
            };

            const response = await apiService.createClaseNivelacion(dataToSend);

            if (response.success) {
                setShowForm(false);
                setFormData({
                    tema: '',
                    fecha: '',
                    descripcion: ''
                });
                loadData();
                alert('Clase programada exitosamente');
            }
        } catch (error) {
            console.error('Error creating class:', error);
            alert('Error al programar la clase: ' + (error.message || 'Error desconocido'));
        } finally {
            setLoading(false);
        }
    };

    const getEstadoClase = (fecha) => {
        const fechaClase = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        fechaClase.setHours(0, 0, 0, 0);

        if (fechaClase < hoy) {
            return { texto: 'Completada', color: 'bg-green-100 text-green-800' };
        } else if (fechaClase.getTime() === hoy.getTime()) {
            return { texto: 'En curso', color: 'bg-blue-100 text-blue-800' };
        } else {
            return { texto: 'Programada', color: 'bg-yellow-100 text-yellow-800' };
        }
    };

    const getAsistenciaClase = (idClase) => {
        const asistenciasClase = data.asistencias.filter(a => a.id_clase === idClase);
        const presentes = asistenciasClase.filter(a => a.estado === 'Presente').length;
        return {
            total: asistenciasClase.length,
            presentes,
            porcentaje: asistenciasClase.length > 0 ? Math.round((presentes / asistenciasClase.length) * 100) : 0
        };
    };

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando clases de nivelación...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Clases de Nivelación</h1>
                        <p className="text-gray-600">Administra las clases de nivelación para estudiantes</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-900 text-white px-4 py-2 rounded flex items-center hover:bg-gray-800"
                >
                    + Programar Clase
                </button>
            </div>

            {/* Formulario de programación */}
            {showForm && (
                <div className="bg-white rounded-lg shadow border p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Programar Nueva Clase</h3>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tema de la Clase *
                                </label>
                                <input
                                    type="text"
                                    name="tema"
                                    value={formData.tema}
                                    onChange={handleInputChange}
                                    placeholder="Ej: Álgebra Básica"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha de la Clase *
                                </label>
                                <input
                                    type="date"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción (opcional)
                            </label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Descripción detallada de los temas a tratar"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Programando...' : 'Programar Clase'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de clases */}
            <div className="bg-white rounded-lg shadow border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Clases Programadas</h3>
                <p className="text-gray-600 text-sm mb-4">Lista de clases de nivelación programadas y completadas</p>

                {data.clases.length > 0 ? (
                    <div className="space-y-4">
                        {data.clases
                            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                            .map((clase) => {
                                const estado = getEstadoClase(clase.fecha);
                                const asistencia = getAsistenciaClase(clase.id_clase);

                                return (
                                    <div key={clase.id_clase} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <span className="text-2xl">📖</span>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{clase.tema}</h4>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(clase.fecha).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                {asistencia.total > 0 && (
                                                    <div className="mt-2 text-sm text-gray-600">
                                                        <p>
                                                            Asistencia: {asistencia.presentes}/{asistencia.total} estudiantes
                                                            ({asistencia.porcentaje}%)
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-end space-y-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${estado.color}`}>
                                                    {estado.texto}
                                                </span>
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                        Ver detalles
                                                    </button>
                                                    {estado.texto !== 'Completada' && (
                                                        <button className="text-green-600 hover:text-green-800 text-sm">
                                                            Tomar asistencia
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="text-6xl mb-4">📖</span>
                        <p className="text-lg font-medium mb-2">Sin clases programadas</p>
                        <p className="text-sm text-center">
                            Comience programando clases de nivelación para los estudiantes.
                        </p>
                    </div>
                )}
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">{data.stats.programadas}</p>
                    <p className="text-gray-600 text-sm">Programadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">{data.stats.completadas}</p>
                    <p className="text-gray-600 text-sm">Completadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-orange-600">{data.stats.totalInscritos}</p>
                    <p className="text-gray-600 text-sm">Total Inscritos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">{data.stats.ocupacion}%</p>
                    <p className="text-gray-600 text-sm">Ocupación</p>
                </div>
            </div>
        </div>
    );
};

export default Nivelacion;
// src/componentes/Evidencias.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Evidencias = () => {
    const [data, setData] = useState({
        evidencias: [],
        cursos: [],
        clases: [],
        loading: true,
        stats: {
            evidenciasAprobadas: 0,
            pendientesRevision: 0,
            evidenciasRechazadas: 0
        }
    });

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        tipo: '',
        descripcion: '',
        archivo_url: '',
        id_curso: '',
        id_clase: '',
        asociacion: 'curso' // 'curso' o 'clase'
    });

    const [loading, setLoading] = useState(false);

    const tiposEvidencia = [
        'Fotografía',
        'Lista de Asistencia',
        'Presentación',
        'Video',
        'Documento PDF',
        'Informe',
        'Evaluación',
        'Material Didáctico'
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [evidencias, cursos, clases] = await Promise.all([
                apiService.getEvidencias(),
                apiService.getCursosInduccion(),
                apiService.getClasesNivelacion()
            ]);

            // Simular estados de evidencias
            const evidenciasData = evidencias.data || [];
            const stats = {
                evidenciasAprobadas: Math.floor(evidenciasData.length * 0.7),
                pendientesRevision: Math.floor(evidenciasData.length * 0.2),
                evidenciasRechazadas: Math.floor(evidenciasData.length * 0.1)
            };

            setData({
                evidencias: evidenciasData,
                cursos: cursos.data || [],
                clases: clases.data || [],
                stats,
                loading: false
            });
        } catch (error) {
            console.error('Error loading evidence data:', error);
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
                tipo: formData.tipo,
                descripcion: formData.descripcion,
                archivo_url: formData.archivo_url,
                ...(formData.asociacion === 'curso'
                        ? { id_curso: parseInt(formData.id_curso) }
                        : { id_clase: parseInt(formData.id_clase) }
                )
            };

            const response = await apiService.createEvidencia(dataToSend);

            if (response.success) {
                setShowForm(false);
                setFormData({
                    tipo: '',
                    descripcion: '',
                    archivo_url: '',
                    id_curso: '',
                    id_clase: '',
                    asociacion: 'curso'
                });
                loadData();
                alert('Evidencia subida exitosamente');
            }
        } catch (error) {
            console.error('Error creating evidence:', error);
            alert('Error al subir la evidencia');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = () => {
        // Simular selección de archivo
        const fileName = `evidencia_${Date.now()}.pdf`;
        setFormData(prev => ({
            ...prev,
            archivo_url: `/uploads/${fileName}`
        }));
    };

    const getEstadoColor = (index) => {
        const estados = ['aprobada', 'pendiente', 'rechazada'];
        const estado = estados[index % 3];

        switch (estado) {
            case 'aprobada':
                return 'bg-green-100 text-green-800';
            case 'pendiente':
                return 'bg-yellow-100 text-yellow-800';
            case 'rechazada':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getEstadoTexto = (index) => {
        const estados = ['Aprobada', 'Pendiente', 'Rechazada'];
        return estados[index % 3];
    };

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando evidencias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Evidencias del Curso</h1>
                        <p className="text-gray-600">Gestione las evidencias del curso de inducción y nivelación</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-900 text-white px-4 py-2 rounded flex items-center hover:bg-gray-800"
                >
                    ⬆ Subir Evidencia
                </button>
            </div>

            {/* Formulario de subida */}
            {showForm && (
                <div className="bg-white rounded-lg shadow border p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Subir Nueva Evidencia</h3>
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
                                    Asociar con *
                                </label>
                                <select
                                    name="asociacion"
                                    value={formData.asociacion}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="curso">Curso de Inducción</option>
                                    <option value="clase">Clase de Nivelación</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            {formData.asociacion === 'curso' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Curso de Inducción *
                                    </label>
                                    <select
                                        name="id_curso"
                                        value={formData.id_curso}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Seleccione curso</option>
                                        {data.cursos.map(curso => (
                                            <option key={curso.id_curso} value={curso.id_curso}>
                                                {curso.nombre} - {curso.modalidad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Clase de Nivelación *
                                    </label>
                                    <select
                                        name="id_clase"
                                        value={formData.id_clase}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Seleccione clase</option>
                                        {data.clases.map(clase => (
                                            <option key={clase.id_clase} value={clase.id_clase}>
                                                {clase.tema} - {new Date(clase.fecha).toLocaleDateString('es-ES')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción
                            </label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Describa brevemente la evidencia"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Archivo
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <button
                                    type="button"
                                    onClick={handleFileSelect}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    📎 Seleccionar archivo
                                </button>
                                {formData.archivo_url ? (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Archivo seleccionado: {formData.archivo_url.split('/').pop()}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Seleccione un archivo (PDF, imagen, video)
                                    </p>
                                )}
                            </div>
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
                                {loading ? 'Subiendo...' : 'Subir Evidencia'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de evidencias */}
            <div className="bg-white rounded-lg shadow border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Evidencias Registradas</h3>
                <p className="text-gray-600 text-sm mb-4">Lista de todas las evidencias del sistema</p>

                {data.evidencias.length > 0 ? (
                    <div className="space-y-4">
                        {data.evidencias.map((evidencia, index) => (
                            <div key={evidencia.id_evidencia || index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-2xl">📄</span>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{evidencia.tipo}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {evidencia.curso_nombre || evidencia.clase_tema || 'Sin asociación'}
                                                </p>
                                            </div>
                                        </div>

                                        {evidencia.descripcion && (
                                            <p className="text-sm text-gray-700 mb-2">{evidencia.descripcion}</p>
                                        )}

                                        {evidencia.archivo_url && (
                                            <div className="flex items-center space-x-2 text-sm">
                                                <span className="text-blue-600">📎</span>
                                                <a
                                                    href={evidencia.archivo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {evidencia.archivo_url.split('/').pop()}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end space-y-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(index)}`}>
                                            {getEstadoTexto(index)}
                                        </span>
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                Ver
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 text-sm">
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="text-6xl mb-4">📄</span>
                        <p className="text-lg font-medium mb-2">Sin evidencias registradas</p>
                        <p className="text-sm text-center">
                            Comience subiendo evidencias del curso de inducción o clases de nivelación.
                        </p>
                    </div>
                )}
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">{data.stats.evidenciasAprobadas}</p>
                    <p className="text-gray-600 text-sm">Evidencias Aprobadas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-yellow-600">{data.stats.pendientesRevision}</p>
                    <p className="text-gray-600 text-sm">Pendientes de Revisión</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-red-600">{data.stats.evidenciasRechazadas}</p>
                    <p className="text-gray-600 text-sm">Evidencias Rechazadas</p>
                </div>
            </div>
        </div>
    );
};

export default Evidencias;">
Tipo de Evidencia *
</label>
<select
    name="tipo"
    value={formData.tipo}
    onChange={handleInputChange}
    className="w-full p-3 border border-gray-300 rounded-lg"
    required
>
    <option value="">Seleccione tipo</option>
    {tiposEvidencia.map(tipo => (
        <option key={tipo} value={tipo}>{tipo}</option>
    ))}
</select>
</div>

<div>
    <label className="block text-sm font-medium text-gray-700 mb-2
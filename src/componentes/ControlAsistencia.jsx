// src/componentes/ControlAsistencia.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ControlAsistencia = () => {
    const [data, setData] = useState({
        asistenciasInduccion: [],
        asistenciasNivelacion: [],
        clases: [],
        cursos: [],
        alumnos: [],
        loading: true,
        stats: {
            asistenciaPromedio: 0,
            estudiantesActivos: 0,
            clasesSemana: 0,
            materiasActivas: 0
        }
    });

    const [selectedTab, setSelectedTab] = useState('induccion');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fecha: new Date().toISOString().split('T')[0],
        id_alumno: '',
        id_curso: '',
        id_clase: '',
        estado: 'Presente'
    });

    const tabs = [
        { id: 'induccion', label: 'Inducción', icon: '🎓' },
        { id: 'nivelacion', label: 'Nivelación', icon: '📖' },
        { id: 'estadisticas', label: 'Estadísticas', icon: '📊' }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [
                asistenciasInduccion,
                asistenciasNivelacion,
                clases,
                cursos,
                alumnos
            ] = await Promise.all([
                apiService.getAsistenciaInduccion(),
                apiService.getAsistenciaNivelacion(),
                apiService.getClasesNivelacion(),
                apiService.getCursosInduccion(),
                apiService.getAlumnos()
            ]);

            // Calcular estadísticas
            const totalAsistencias = [
                ...(asistenciasInduccion.data || []),
                ...(asistenciasNivelacion.data || [])
            ];
            const presentes = totalAsistencias.filter(a => a.estado === 'Presente').length;
            const asistenciaPromedio = totalAsistencias.length > 0
                ? Math.round((presentes / totalAsistencias.length) * 100)
                : 0;

            // Clases de esta semana
            const hoy = new Date();
            const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
            const finSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 6));

            const clasesSemana = (clases.data || []).filter(clase => {
                const fechaClase = new Date(clase.fecha);
                return fechaClase >= inicioSemana && fechaClase <= finSemana;
            }).length;

            const stats = {
                asistenciaPromedio,
                estudiantesActivos: new Set([
                    ...totalAsistencias.map(a => a.id_alumno)
                ]).size,
                clasesSemana,
                materiasActivas: (cursos.data?.length || 0) + (clases.data?.length || 0)
            };

            setData({
                asistenciasInduccion: asistenciasInduccion.data || [],
                asistenciasNivelacion: asistenciasNivelacion.data || [],
                clases: clases.data || [],
                cursos: cursos.data || [],
                alumnos: alumnos.data || [],
                stats,
                loading: false
            });
        } catch (error) {
            console.error('Error loading attendance data:', error);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleSubmitAsistencia = async (e) => {
        e.preventDefault();

        try {
            if (selectedTab === 'induccion') {
                await apiService.createAsistenciaInduccion({
                    fecha: formData.fecha,
                    estado: formData.estado,
                    id_alumno: parseInt(formData.id_alumno),
                    id_curso: parseInt(formData.id_curso)
                });
            } else {
                await apiService.createAsistenciaNivelacion({
                    fecha: formData.fecha,
                    estado: formData.estado,
                    id_alumno: parseInt(formData.id_alumno),
                    id_clase: parseInt(formData.id_clase)
                });
            }

            setShowForm(false);
            setFormData({
                fecha: new Date().toISOString().split('T')[0],
                id_alumno: '',
                id_curso: '',
                id_clase: '',
                estado: 'Presente'
            });
            loadData();
        } catch (error) {
            console.error('Error creating attendance:', error);
            alert('Error al registrar la asistencia');
        }
    };

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando datos de asistencia...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Control de Asistencia</h1>
                        <p className="text-gray-600">Registre la asistencia de estudiantes a las clases</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gray-900 text-white px-4 py-2 rounded flex items-center hover:bg-gray-800"
                >
                    ✓ Tomar Asistencia
                </button>
            </div>

            {/* Formulario de registro */}
            {showForm && (
                <div className="bg-white rounded-lg shadow border p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Registrar Asistencia</h3>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmitAsistencia} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha *
                                </label>
                                <input
                                    type="date"
                                    value={formData.fecha}
                                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estudiante *
                                </label>
                                <select
                                    value={formData.id_alumno}
                                    onChange={(e) => setFormData({...formData, id_alumno: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="">Seleccione estudiante</option>
                                    {data.alumnos.map(alumno => (
                                        <option key={alumno.id_alumno} value={alumno.id_alumno}>
                                            {alumno.nombre} {alumno.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedTab === 'induccion' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Curso *
                                    </label>
                                    <select
                                        value={formData.id_curso}
                                        onChange={(e) => setFormData({...formData, id_curso: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Seleccione curso</option>
                                        {data.cursos.map(curso => (
                                            <option key={curso.id_curso} value={curso.id_curso}>
                                                {curso.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Clase *
                                    </label>
                                    <select
                                        value={formData.id_clase}
                                        onChange={(e) => setFormData({...formData, id_clase: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Seleccione clase</option>
                                        {data.clases.map(clase => (
                                            <option key={clase.id_clase} value={clase.id_clase}>
                                                {clase.tema} - {new Date(clase.fecha).toLocaleDateString()}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estado *
                                </label>
                                <select
                                    value={formData.estado}
                                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="Presente">Presente</option>
                                    <option value="Ausente">Ausente</option>
                                </select>
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
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabs */}
            <div className="mb-6">
                <nav className="flex space-x-8 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                                selectedTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Contenido por tab */}
            {selectedTab === 'induccion' && (
                <AsistenciaInduccionTab data={data} onRefresh={loadData} />
            )}
            {selectedTab === 'nivelacion' && (
                <AsistenciaNivelacionTab data={data} onRefresh={loadData} />
            )}
            {selectedTab === 'estadisticas' && (
                <EstadisticasTab data={data} />
            )}

            {/* Estadísticas generales */}
            <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-green-600">{data.stats.asistenciaPromedio}%</p>
                    <p className="text-gray-600 text-sm">Asistencia Promedio</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-blue-600">{data.stats.estudiantesActivos}</p>
                    <p className="text-gray-600 text-sm">Estudiantes Activos</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-purple-600">{data.stats.clasesSemana}</p>
                    <p className="text-gray-600 text-sm">Clases Esta Semana</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border text-center">
                    <p className="text-3xl font-bold text-orange-600">{data.stats.materiasActivas}</p>
                    <p className="text-gray-600 text-sm">Materias Activas</p>
                </div>
            </div>
        </div>
    );
};

const AsistenciaInduccionTab = ({ data, onRefresh }) => (
    <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Registros de Asistencia - Inducción</h3>
        <p className="text-gray-600 text-sm mb-4">Historial de asistencia a cursos de inducción</p>

        {data.asistenciasInduccion.length > 0 ? (
            <div className="space-y-3">
                {data.asistenciasInduccion.map((asistencia, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <span className={`text-lg ${asistencia.estado === 'Presente' ? '✅' : '❌'}`}>
                                {asistencia.estado === 'Presente' ? '✅' : '❌'}
                            </span>
                            <div>
                                <p className="font-medium">
                                    {asistencia.alumno_nombre && asistencia.alumno_apellido
                                        ? `${asistencia.alumno_nombre} ${asistencia.alumno_apellido}`
                                        : 'Estudiante'
                                    }
                                </p>
                                <p className="text-sm text-gray-600">{asistencia.curso_nombre}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">{asistencia.estado}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(asistencia.fecha).toLocaleDateString('es-ES')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">✓</span>
                <p className="text-lg font-medium mb-2">Sin registros de asistencia</p>
                <p className="text-sm text-center">
                    Comience tomando asistencia en los cursos de inducción.
                </p>
            </div>
        )}
    </div>
);

const AsistenciaNivelacionTab = ({ data, onRefresh }) => (
    <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Registros de Asistencia - Nivelación</h3>
        <p className="text-gray-600 text-sm mb-4">Historial de asistencia a clases de nivelación</p>

        {data.asistenciasNivelacion.length > 0 ? (
            <div className="space-y-3">
                {data.asistenciasNivelacion.map((asistencia, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <span className={`text-lg ${asistencia.estado === 'Presente' ? '✅' : '❌'}`}>
                                {asistencia.estado === 'Presente' ? '✅' : '❌'}
                            </span>
                            <div>
                                <p className="font-medium">
                                    {asistencia.alumno_nombre && asistencia.alumno_apellido
                                        ? `${asistencia.alumno_nombre} ${asistencia.alumno_apellido}`
                                        : 'Estudiante'
                                    }
                                </p>
                                <p className="text-sm text-gray-600">{asistencia.clase_tema}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">{asistencia.estado}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(asistencia.fecha).toLocaleDateString('es-ES')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">✓</span>
                <p className="text-lg font-medium mb-2">Sin registros de asistencia</p>
                <p className="text-sm text-center">
                    Comience tomando asistencia en las clases de nivelación.
                </p>
            </div>
        )}
    </div>
);

const EstadisticasTab = ({ data }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <h4 className="font-semibold mb-4">Asistencia por Curso de Inducción</h4>
                <div className="space-y-3">
                    {data.cursos.map(curso => {
                        const asistenciasCurso = data.asistenciasInduccion.filter(a => a.id_curso === curso.id_curso);
                        const presentes = asistenciasCurso.filter(a => a.estado === 'Presente').length;
                        const total = asistenciasCurso.length;
                        const porcentaje = total > 0 ? Math.round((presentes / total) * 100) : 0;

                        return (
                            <div key={curso.id_curso} className="flex justify-between items-center">
                                <span className="text-sm">{curso.nombre}</span>
                                <div className="text-right">
                                    <span className={`font-semibold ${
                                        porcentaje >= 80 ? 'text-green-600' :
                                            porcentaje >= 60 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {porcentaje}%
                                    </span>
                                    <p className="text-xs text-gray-500">{total} registros</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h4 className="font-semibold mb-4">Asistencia por Clase de Nivelación</h4>
                <div className="space-y-3">
                    {data.clases.slice(0, 5).map(clase => {
                        const asistenciasClase = data.asistenciasNivelacion.filter(a => a.id_clase === clase.id_clase);
                        const presentes = asistenciasClase.filter(a => a.estado === 'Presente').length;
                        const total = asistenciasClase.length;
                        const porcentaje = total > 0 ? Math.round((presentes / total) * 100) : 0;

                        return (
                            <div key={clase.id_clase} className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm font-medium">{clase.tema}</span>
                                    <p className="text-xs text-gray-500">
                                        {new Date(clase.fecha).toLocaleDateString('es-ES')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`font-semibold ${
                                        porcentaje >= 80 ? 'text-green-600' :
                                            porcentaje >= 60 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {porcentaje}%
                                    </span>
                                    <p className="text-xs text-gray-500">{total} registros</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default ControlAsistencia;
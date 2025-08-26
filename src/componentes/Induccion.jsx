// src/componentes/Induccion.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Induccion = () => {
    const [selectedTab, setSelectedTab] = useState('resumen');
    const [data, setData] = useState({
        cursos: [],
        alumnos: [],
        asistencias: [],
        loading: true,
        stats: {
            estudiantesInduccion: 0,
            cursosActivos: 0,
            tasaAprobacion: 0,
            asistenciaPromedio: 0
        }
    });

    const tabs = [
        { id: 'resumen', label: 'Resumen', icon: '📊' },
        { id: 'estudiantes', label: 'Estudiantes', icon: '🎓' },
        { id: 'cursos', label: 'Cursos', icon: '📚' },
        { id: 'evaluaciones', label: 'Evaluaciones', icon: '📋' }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [cursos, alumnos, asistencias] = await Promise.all([
                apiService.getCursosInduccion(),
                apiService.getAlumnos(),
                apiService.getAsistenciaInduccion()
            ]);

            // Calcular estadísticas
            const totalAsistencias = asistencias.data?.length || 0;
            const presentes = asistencias.data?.filter(a => a.estado === 'Presente').length || 0;
            const asistenciaPromedio = totalAsistencias > 0 ? Math.round((presentes / totalAsistencias) * 100) : 0;

            const stats = {
                estudiantesInduccion: alumnos.data?.length || 0,
                cursosActivos: cursos.data?.length || 0,
                tasaAprobacion: Math.round(Math.random() * 100), // Simulado
                asistenciaPromedio
            };

            setData({
                cursos: cursos.data || [],
                alumnos: alumnos.data || [],
                asistencias: asistencias.data || [],
                stats,
                loading: false
            });
        } catch (error) {
            console.error('Error loading induction data:', error);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'resumen':
                return <ResumenInduccionTab data={data} onRefresh={loadData} />;
            case 'estudiantes':
                return <EstudiantesTab data={data} onRefresh={loadData} />;
            case 'cursos':
                return <CursosTab data={data} onRefresh={loadData} />;
            case 'evaluaciones':
                return <EvaluacionesTab data={data} onRefresh={loadData} />;
            default:
                return <ResumenInduccionTab data={data} onRefresh={loadData} />;
        }
    };

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando datos de inducción...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Proceso de Inducción</h1>
                    <p className="text-gray-600">Gestión integral del proceso de inducción y nivelación académica</p>
                </div>
                <button
                    onClick={loadData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                    🔄 Actualizar
                </button>
            </div>

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

            {renderTabContent()}
        </div>
    );
};

const ResumenInduccionTab = ({ data, onRefresh }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Estudiantes en Inducción</p>
                        <p className="text-3xl font-bold text-blue-600">{data.stats.estudiantesInduccion}</p>
                    </div>
                    <span className="text-3xl">🎓</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.estudiantesInduccion === 0 ? 'Sin estudiantes registrados' : 'Total registrados'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                        <p className="text-3xl font-bold text-green-600">{data.stats.cursosActivos}</p>
                    </div>
                    <span className="text-3xl">📚</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.cursosActivos === 0 ? 'Sin cursos programados' : 'Cursos disponibles'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tasa de Aprobación</p>
                        <p className="text-3xl font-bold text-purple-600">{data.stats.tasaAprobacion}%</p>
                    </div>
                    <span className="text-3xl">✅</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.tasaAprobacion === 0 ? 'Sin datos disponibles' : 'Promedio de aprobación'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Asistencia Promedio</p>
                        <p className="text-3xl font-bold text-orange-600">{data.stats.asistenciaPromedio}%</p>
                    </div>
                    <span className="text-3xl">📈</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.asistenciaPromedio === 0 ? 'Sin asistencia registrada' : 'Promedio general'}
                </p>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Progreso Reciente</h3>
            <p className="text-gray-600 text-sm mb-4">Actividades y avances en el proceso de inducción</p>

            {data.asistencias.length > 0 ? (
                <div className="space-y-4">
                    {data.asistencias.slice(0, 5).map((asistencia, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">
                                {asistencia.estado === 'Presente' ? '✅' : '❌'}
                            </span>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">Registro de Asistencia</h4>
                                <p className="text-sm text-gray-600">
                                    {asistencia.alumno_nombre && asistencia.alumno_apellido
                                        ? `${asistencia.alumno_nombre} ${asistencia.alumno_apellido}`
                                        : 'Estudiante'
                                    } - {asistencia.curso_nombre || 'Curso no especificado'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(asistencia.fecha).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📊</span>
                    <p className="text-lg font-medium mb-2">Sin actividad reciente</p>
                    <p className="text-sm text-center">
                        Comience registrando estudiantes y programando cursos de inducción.
                    </p>
                </div>
            )}
        </div>
    </div>
);

const EstudiantesTab = ({ data, onRefresh }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Estudiantes en Inducción</h3>
                    <p className="text-sm text-gray-600">Gestión de estudiantes en proceso de inducción</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Registrar Estudiante
                </button>
            </div>

            <div className="bg-white rounded-lg shadow border p-6">
                {data.alumnos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.alumnos.map((alumno) => (
                            <div key={alumno.id_alumno} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">🎓</span>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">
                                            {alumno.nombre} {alumno.apellido}
                                        </h4>
                                        {alumno.correo && (
                                            <p className="text-sm text-gray-600">{alumno.correo}</p>
                                        )}
                                        <div className="mt-2 text-xs text-gray-500">
                                            <p>
                                                Asistencias: {data.asistencias.filter(a => a.id_alumno === alumno.id_alumno).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="text-6xl mb-4">🎓</span>
                        <p className="text-lg font-medium mb-2">Sin estudiantes registrados</p>
                        <p className="text-sm text-center">
                            Registre estudiantes para comenzar el proceso de inducción.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CursosTab = ({ data, onRefresh }) => {
    const [showForm, setShowForm] = useState(false);
    const [newCurso, setNewCurso] = useState({
        nombre: '',
        modalidad: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCurso.nombre.trim() || !newCurso.modalidad) return;

        setLoading(true);
        try {
            await apiService.createCursoInduccion(newCurso);
            setNewCurso({ nombre: '', modalidad: '' });
            setShowForm(false);
            onRefresh();
        } catch (error) {
            console.error('Error creating curso:', error);
            alert('Error al crear el curso');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Cursos de Inducción</h3>
                    <p className="text-sm text-gray-600">Programación y gestión de cursos</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Programar Curso
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow border p-6">
                    <h4 className="text-lg font-semibold mb-4">Nuevo Curso de Inducción</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Curso *
                            </label>
                            <input
                                type="text"
                                value={newCurso.nombre}
                                onChange={(e) => setNewCurso({ ...newCurso, nombre: e.target.value })}
                                placeholder="Ej: Introducción a la Ingeniería"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Modalidad *
                            </label>
                            <select
                                value={newCurso.modalidad}
                                onChange={(e) => setNewCurso({ ...newCurso, modalidad: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                required
                            >
                                <option value="">Seleccione modalidad</option>
                                <option value="Presencial">Presencial</option>
                                <option value="En Línea">En Línea</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setNewCurso({ nombre: '', modalidad: '' });
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Creando...' : 'Crear Curso'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow border p-6">
                {data.cursos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.cursos.map((curso) => (
                            <div key={curso.id_curso} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">📚</span>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{curso.nombre}</h4>
                                        <p className="text-sm text-gray-600">Modalidad: {curso.modalidad}</p>
                                        <div className="mt-2 text-xs text-gray-500">
                                            <p>
                                                Estudiantes: {data.asistencias.filter(a => a.id_curso === curso.id_curso).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="text-6xl mb-4">📚</span>
                        <p className="text-lg font-medium mb-2">Sin cursos programados</p>
                        <p className="text-sm text-center">
                            Programme cursos de inducción para los nuevos estudiantes.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const EvaluacionesTab = ({ data, onRefresh }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Evaluaciones</h3>
                <p className="text-sm text-gray-600">Seguimiento y evaluación del proceso</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Nueva Evaluación
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <h4 className="font-semibold mb-4">Estadísticas de Asistencia</h4>
                <div className="space-y-3">
                    {data.cursos.map((curso) => {
                        const asistenciasCurso = data.asistencias.filter(a => a.id_curso === curso.id_curso);
                        const totalRegistros = asistenciasCurso.length;
                        const presentes = asistenciasCurso.filter(a => a.estado === 'Presente').length;
                        const porcentaje = totalRegistros > 0 ? Math.round((presentes / totalRegistros) * 100) : 0;

                        return (
                            <div key={curso.id_curso} className="flex justify-between items-center">
                                <span className="text-sm font-medium">{curso.nombre}</span>
                                <div className="text-right">
                                    <span className={`text-sm font-semibold ${
                                        porcentaje >= 80 ? 'text-green-600' :
                                            porcentaje >= 60 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {porcentaje}%
                                    </span>
                                    <p className="text-xs text-gray-500">{totalRegistros} registros</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h4 className="font-semibold mb-4">Tendencias de Participación</h4>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Estudiantes Activos:</span>
                        <span className="font-semibold">{data.stats.estudiantesInduccion}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cursos Disponibles:</span>
                        <span className="font-semibold">{data.stats.cursosActivos}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Asistencia General:</span>
                        <span className={`font-semibold ${
                            data.stats.asistenciaPromedio >= 80 ? 'text-green-600' :
                                data.stats.asistenciaPromedio >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                            {data.stats.asistenciaPromedio}%
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tasa de Aprobación:</span>
                        <span className="font-semibold text-purple-600">{data.stats.tasaAprobacion}%</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <h4 className="font-semibold mb-4">Evaluaciones Recientes</h4>
            {data.asistencias.length > 0 ? (
                <div className="space-y-3">
                    {data.asistencias.slice(0, 10).map((asistencia, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                                <span className={`text-lg ${asistencia.estado === 'Presente' ? '✅' : '❌'}`}>
                                    {asistencia.estado === 'Presente' ? '✅' : '❌'}
                                </span>
                                <div>
                                    <p className="font-medium text-sm">
                                        {asistencia.alumno_nombre && asistencia.alumno_apellido
                                            ? `${asistencia.alumno_nombre} ${asistencia.alumno_apellido}`
                                            : 'Estudiante'
                                        }
                                    </p>
                                    <p className="text-xs text-gray-600">{asistencia.curso_nombre}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">
                                    {new Date(asistencia.fecha).toLocaleDateString('es-ES')}
                                </p>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    asistencia.estado === 'Presente'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {asistencia.estado}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📋</span>
                    <p className="text-lg font-medium mb-2">Sin evaluaciones registradas</p>
                    <p className="text-sm text-center">
                        Registre evaluaciones para dar seguimiento al proceso de inducción.
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default Induccion;
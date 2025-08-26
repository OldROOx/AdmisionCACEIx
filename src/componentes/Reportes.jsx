// src/componentes/Reportes.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Reportes = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState('');
    const [data, setData] = useState({
        estadisticasGenerales: {},
        reportePromocion: {},
        reporteInduccion: {},
        reporteNivelacion: {},
        loading: true
    });

    const [activeReport, setActiveReport] = useState('general');

    const meses = [
        { value: '', label: 'Todos los meses' },
        { value: '01', label: 'Enero' },
        { value: '02', label: 'Febrero' },
        { value: '03', label: 'Marzo' },
        { value: '04', label: 'Abril' },
        { value: '05', label: 'Mayo' },
        { value: '06', label: 'Junio' },
        { value: '07', label: 'Julio' },
        { value: '08', label: 'Agosto' },
        { value: '09', label: 'Septiembre' },
        { value: '10', label: 'Octubre' },
        { value: '11', label: 'Noviembre' },
        { value: '12', label: 'Diciembre' }
    ];

    const años = [2024, 2023, 2022];

    useEffect(() => {
        loadReports();
    }, [selectedYear, selectedMonth]);

    const loadReports = async () => {
        setData(prev => ({ ...prev, loading: true }));

        try {
            const params = {
                año: selectedYear,
                ...(selectedMonth && { mes: selectedMonth })
            };

            const [estadisticasGenerales, reportePromocion, reporteInduccion, reporteNivelacion] = await Promise.all([
                apiService.getEstadisticasGenerales(),
                apiService.getReportePromocion(params),
                apiService.getReporteInduccion(params),
                apiService.getReporteNivelacion(params)
            ]);

            setData({
                estadisticasGenerales: estadisticasGenerales.data || {},
                reportePromocion: reportePromocion.data || {},
                reporteInduccion: reporteInduccion.data || {},
                reporteNivelacion: reporteNivelacion.data || {},
                loading: false
            });

        } catch (error) {
            console.error('Error loading reports:', error);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleExport = async (tipo) => {
        try {
            // Simular exportación
            const params = {
                año: selectedYear,
                ...(selectedMonth && { mes: selectedMonth })
            };

            let reportData;
            switch (tipo) {
                case 'promocion':
                    reportData = await apiService.getReportePromocion(params);
                    break;
                case 'induccion':
                    reportData = await apiService.getReporteInduccion(params);
                    break;
                case 'nivelacion':
                    reportData = await apiService.getReporteNivelacion(params);
                    break;
                default:
                    reportData = data.estadisticasGenerales;
            }

            // Crear y descargar archivo JSON como ejemplo
            const dataStr = JSON.stringify(reportData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `reporte_${tipo}_${selectedYear}${selectedMonth ? '_' + selectedMonth : ''}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

        } catch (error) {
            console.error('Error exporting report:', error);
            alert('Error al exportar el reporte');
        }
    };

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Generando reportes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reportes y Estadísticas</h1>
                    <p className="text-gray-600">Análisis de efectividad de promoción e inducción educativa</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => loadReports()}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        🔄 Actualizar
                    </button>
                    <button
                        onClick={() => handleExport('completo')}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                        📤 Exportar
                    </button>
                </div>
            </div>

            {/* Selectores de filtros */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="p-3 border border-gray-300 rounded-lg"
                >
                    {años.map(año => (
                        <option key={año} value={año}>{año}</option>
                    ))}
                </select>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg"
                >
                    {meses.map(mes => (
                        <option key={mes.value} value={mes.value}>{mes.label}</option>
                    ))}
                </select>
            </div>

            {/* Métricas principales */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Efectividad Promoción</h3>
                        <span className="text-sm">📈</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                        {data.estadisticasGenerales.efectividadPromocion || 0}%
                    </p>
                    <p className="text-xs text-gray-500">
                        {data.reportePromocion.estadisticas?.totalActividades > 0 ? 'Basado en actividades' : 'Sin datos disponibles'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Preparatorias Visitadas</h3>
                        <span className="text-sm">🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">
                        {data.estadisticasGenerales.preparatoriasVisitadas || 0}
                    </p>
                    <p className="text-xs text-gray-500">
                        {data.reportePromocion.estadisticas?.preparatoriasVisitadas > 0 ? 'Instituciones visitadas' : 'Sin visitas registradas'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Estudiantes Alcanzados</h3>
                        <span className="text-sm">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">
                        {data.estadisticasGenerales.estudiantesAlcanzados || 0}
                    </p>
                    <p className="text-xs text-gray-500">
                        {data.estadisticasGenerales.estudiantesAlcanzados > 0 ? 'Total alcanzados' : 'Sin actividades registradas'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Tasa de Inducción</h3>
                        <span className="text-sm">📊</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">
                        {data.reporteInduccion.estadisticas?.asistenciaPromedio || 0}%
                    </p>
                    <p className="text-xs text-gray-500">
                        {data.reporteInduccion.estadisticas?.estudiantesInduccion > 0 ? 'Promedio de asistencia' : 'Sin estudiantes en proceso'}
                    </p>
                </div>
            </div>

            {/* Tabs de reportes */}
            <div className="mb-6">
                <nav className="flex space-x-8 border-b border-gray-200">
                    {[
                        { id: 'general', label: 'General', icon: '📊' },
                        { id: 'promocion', label: 'Promoción', icon: '📚' },
                        { id: 'induccion', label: 'Inducción', icon: '🎓' },
                        { id: 'nivelacion', label: 'Nivelación', icon: '📖' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveReport(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                                activeReport === tab.id
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

            {/* Contenido de reportes */}
            {activeReport === 'general' && (
                <ReporteGeneral data={data} onExport={() => handleExport('general')} />
            )}
            {activeReport === 'promocion' && (
                <ReportePromocion data={data.reportePromocion} onExport={() => handleExport('promocion')} />
            )}
            {activeReport === 'induccion' && (
                <ReporteInduccion data={data.reporteInduccion} onExport={() => handleExport('induccion')} />
            )}
            {activeReport === 'nivelacion' && (
                <ReporteNivelacion data={data.reporteNivelacion} onExport={() => handleExport('nivelacion')} />
            )}
        </div>
    );
};

// ====== COMPONENTES DE REPORTES ======

const ReporteGeneral = ({ data, onExport }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Resumen de Promoción</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Cursos Activos:</span>
                        <span className="font-semibold">{data.estadisticasGenerales.cursosActivos || 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Estudiantes en Inducción:</span>
                        <span className="font-semibold">{data.estadisticasGenerales.estudiantesInduccion || 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tasa de Aprobación:</span>
                        <span className="font-semibold">{data.estadisticasGenerales.tasaAprobacion || 0}%</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Resumen de Nivelación</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Clases Programadas:</span>
                        <span className="font-semibold">{data.estadisticasGenerales.clasesNivelacion || 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Asistencia Promedio:</span>
                        <span className="font-semibold">{data.estadisticasGenerales.asistenciaPromedioNivelacion || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Evidencias:</span>
                        <span className="font-semibold">{data.estadisticasGenerales.totalEvidencias || 0}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Análisis General</h3>
                <button
                    onClick={onExport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                    📄 Exportar Reporte
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium mb-2">Indicadores de Rendimiento</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Efectividad General:</span>
                            <span className={`font-semibold ${
                                (data.estadisticasGenerales.efectividadPromocion || 0) > 70 ? 'text-green-600' :
                                    (data.estadisticasGenerales.efectividadPromocion || 0) > 50 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                                {data.estadisticasGenerales.efectividadPromocion || 0}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cobertura de Preparatorias:</span>
                            <span className="font-semibold">
                                {Math.round(((data.estadisticasGenerales.preparatoriasVisitadas || 0) /
                                    Math.max(data.estadisticasGenerales.totalPreparatorias || 1, 1)) * 100)}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Participación Docente:</span>
                            <span className="font-semibold">
                                {Math.round(((data.estadisticasGenerales.docentesParticipantes || 0) /
                                    Math.max(data.estadisticasGenerales.totalDocentes || 1, 1)) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium mb-2">Tendencias</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>• Incremento en actividades de promoción</p>
                        <p>• Mejora en tasas de asistencia</p>
                        <p>• Mayor participación estudiantil</p>
                        <p>• Diversificación de instituciones visitadas</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ReportePromocion = ({ data, onExport }) => (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Reporte de Actividades de Promoción</h3>
                    <p className="text-sm text-gray-600">Período: {data.periodo || 'Todos los períodos'}</p>
                </div>
                <button
                    onClick={onExport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                    📄 Exportar PDF
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        {data.estadisticas?.totalActividades || 0}
                    </p>
                    <p className="text-sm text-gray-600">Total Actividades</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {data.estadisticas?.preparatoriasVisitadas || 0}
                    </p>
                    <p className="text-sm text-gray-600">Preparatorias Visitadas</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {data.estadisticas?.docentesParticipantes || 0}
                    </p>
                    <p className="text-sm text-gray-600">Docentes Participantes</p>
                </div>
            </div>

            {data.actividades && data.actividades.length > 0 ? (
                <div className="space-y-4">
                    <h4 className="font-semibold">Actividades Realizadas</h4>
                    {data.actividades.map((actividad, index) => (
                        <div key={index} className="border border-gray-200 rounded p-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">
                                        {actividad.docente_nombre} {actividad.docente_apellido}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {actividad.preparatoria_nombre}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Proyecto: {actividad.proyecto_titulo}
                                    </p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-gray-600">
                                        {new Date(actividad.fecha).toLocaleDateString('es-ES')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">📅</span>
                    <p>Sin actividades en el período seleccionado</p>
                </div>
            )}
        </div>
    </div>
);

const ReporteInduccion = ({ data, onExport }) => (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Reporte de Proceso de Inducción</h3>
                    <p className="text-sm text-gray-600">Período: {data.periodo || 'Todos los períodos'}</p>
                </div>
                <button
                    onClick={onExport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                    📊 Exportar Excel
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        {data.estadisticas?.totalCursos || 0}
                    </p>
                    <p className="text-sm text-gray-600">Cursos Activos</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {data.estadisticas?.estudiantesInduccion || 0}
                    </p>
                    <p className="text-sm text-gray-600">Estudiantes</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {data.estadisticas?.asistenciaPromedio || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Asistencia Promedio</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                        {data.estadisticas?.tasaAprobacion || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Tasa Aprobación</p>
                </div>
            </div>

            {data.cursos && data.cursos.length > 0 ? (
                <div className="space-y-4">
                    <h4 className="font-semibold">Cursos de Inducción</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.cursos.map((curso, index) => (
                            <div key={curso.id_curso || index} className="border border-gray-200 rounded p-3">
                                <h5 className="font-medium">{curso.nombre}</h5>
                                <p className="text-sm text-gray-600">Modalidad: {curso.modalidad}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">🎓</span>
                    <p>Sin cursos de inducción registrados</p>
                </div>
            )}

            {data.estadisticasPorCurso && data.estadisticasPorCurso.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-4">Estadísticas por Curso</h4>
                    <div className="space-y-3">
                        {data.estadisticasPorCurso.map((stat, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium">{stat.curso_nombre}</p>
                                    <p className="text-sm text-gray-600">{stat.estudiantes} estudiantes</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        {stat.total_registros > 0
                                            ? Math.round((stat.presentes / stat.total_registros) * 100)
                                            : 0
                                        }% asistencia
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

const ReporteNivelacion = ({ data, onExport }) => (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Reporte de Clases de Nivelación</h3>
                    <p className="text-sm text-gray-600">Período: {data.periodo || 'Todos los períodos'}</p>
                </div>
                <button
                    onClick={onExport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                    📋 Exportar PDF
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        {data.estadisticas?.totalClases || 0}
                    </p>
                    <p className="text-sm text-gray-600">Total Clases</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {data.estadisticas?.estudiantesNivelacion || 0}
                    </p>
                    <p className="text-sm text-gray-600">Estudiantes</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {data.estadisticas?.asistenciaPromedio || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Asistencia Promedio</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                        {data.estadisticas?.clasesCompletadas || 0}
                    </p>
                    <p className="text-sm text-gray-600">Completadas</p>
                </div>
            </div>

            {data.clases && data.clases.length > 0 ? (
                <div className="space-y-4">
                    <h4 className="font-semibold">Clases Programadas</h4>
                    <div className="space-y-3">
                        {data.clases.map((clase, index) => (
                            <div key={clase.id_clase || index} className="border border-gray-200 rounded p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h5 className="font-medium">{clase.tema}</h5>
                                        <p className="text-sm text-gray-600">
                                            {new Date(clase.fecha).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            new Date(clase.fecha) < new Date()
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {new Date(clase.fecha) < new Date() ? 'Completada' : 'Programada'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">📖</span>
                    <p>Sin clases de nivelación registradas</p>
                </div>
            )}

            {data.estadisticasPorClase && data.estadisticasPorClase.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-4">Estadísticas por Clase</h4>
                    <div className="space-y-3">
                        {data.estadisticasPorClase.map((stat, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium">{stat.clase_tema}</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(stat.clase_fecha).toLocaleDateString('es-ES')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{stat.estudiantes} estudiantes</p>
                                    <p className="text-sm text-gray-600">
                                        {stat.total_registros > 0
                                            ? Math.round((stat.presentes / stat.total_registros) * 100)
                                            : 0
                                        }% asistencia
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default Reportes;<span className="text-gray-600">Total Docentes:</span>
<span className="font-semibold">{data.estadisticasGenerales.totalDocentes || 0}</span>
</div>
<div className="flex justify-between">
    <span className="text-gray-600">Total Preparatorias:</span>
    <span className="font-semibold">{data.estadisticasGenerales.totalPreparatorias || 0}</span>
</div>
<div className="flex justify-between">
    <span className="text-gray-600">Actividades Realizadas:</span>
    <span className="font-semibold">{data.estadisticasGenerales.totalActividades || 0}</span>
</div>
</div>
</div>

<div className="bg-white p-6 rounded-lg shadow border">
    <h3 className="text-lg font-semibold mb-4">Resumen de Inducción</h3>
    <div className="space-y-3">
        <div className="flex justify-between">
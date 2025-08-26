// src/componentes/PromocionES.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const PromocionES = () => {
    const [selectedTab, setSelectedTab] = useState('resumen');
    const [data, setData] = useState({
        promociones: [],
        docentes: [],
        preparatorias: [],
        proyectos: [],
        loading: true,
        stats: {
            totalActividades: 0,
            estudiantesAlcanzados: 0,
            preparatoriasVisitadas: 0,
            efectividad: 0
        }
    });

    const tabs = [
        { id: 'resumen', label: 'Resumen', icon: '📊' },
        { id: 'actividades', label: 'Actividades', icon: '📅' },
        { id: 'preparatorias', label: 'Preparatorias', icon: '🏫' },
        { id: 'docentes', label: 'Docentes', icon: '👨‍🏫' }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [promociones, docentes, preparatorias, proyectos] = await Promise.all([
                apiService.getPromociones(),
                apiService.getDocentes(),
                apiService.getPreparatorias(),
                apiService.getProyectos()
            ]);

            const stats = {
                totalActividades: promociones.data?.length || 0,
                estudiantesAlcanzados: promociones.data?.reduce((sum, p) => sum + (p.estudiantes_alcanzados || 0), 0) || 0,
                preparatoriasVisitadas: new Set(promociones.data?.map(p => p.id_prepa) || []).size,
                efectividad: Math.round(Math.random() * 100) // Simulado por ahora
            };

            setData({
                promociones: promociones.data || [],
                docentes: docentes.data || [],
                preparatorias: preparatorias.data || [],
                proyectos: proyectos.data || [],
                stats,
                loading: false
            });
        } catch (error) {
            console.error('Error loading promotion data:', error);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleRefresh = () => {
        setData(prev => ({ ...prev, loading: true }));
        loadData();
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'resumen':
                return <ResumenTab data={data} onRefresh={handleRefresh} />;
            case 'actividades':
                return <ActividadesTab data={data} onRefresh={handleRefresh} />;
            case 'preparatorias':
                return <PreparatoriasTab data={data} onRefresh={handleRefresh} />;
            case 'docentes':
                return <DocentesTab data={data} onRefresh={handleRefresh} />;
            default:
                return <ResumenTab data={data} onRefresh={handleRefresh} />;
        }
    };

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando datos de promoción...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Promoción Educación Superior</h1>
                    <p className="text-gray-600">Gestión integral de actividades de promoción y vinculación</p>
                </div>
                <button
                    onClick={handleRefresh}
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

// ====== TABS ======

const ResumenTab = ({ data, onRefresh }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Actividades</p>
                        <p className="text-3xl font-bold text-blue-600">{data.stats.totalActividades}</p>
                    </div>
                    <span className="text-3xl">📚</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.totalActividades === 0 ? 'Sin actividades registradas' : 'Actividades realizadas'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Estudiantes Alcanzados</p>
                        <p className="text-3xl font-bold text-green-600">{data.stats.estudiantesAlcanzados}</p>
                    </div>
                    <span className="text-3xl">🎓</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.estudiantesAlcanzados === 0 ? 'Sin estudiantes alcanzados' : 'Total alcanzado'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Preparatorias Visitadas</p>
                        <p className="text-3xl font-bold text-purple-600">{data.stats.preparatoriasVisitadas}</p>
                    </div>
                    <span className="text-3xl">🏫</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.preparatoriasVisitadas === 0 ? 'Sin visitas realizadas' : 'Instituciones visitadas'}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Efectividad</p>
                        <p className="text-3xl font-bold text-orange-600">{data.stats.efectividad}%</p>
                    </div>
                    <span className="text-3xl">📈</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.stats.efectividad === 0 ? 'Sin datos disponibles' : 'Tasa de efectividad'}
                </p>
            </div>
        </div>

        {/* Próximas actividades */}
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Actividades Recientes</h3>
            <p className="text-gray-600 text-sm mb-4">Últimas actividades de promoción realizadas</p>

            {data.promociones.length > 0 ? (
                <div className="space-y-4">
                    {data.promociones.slice(0, 5).map((promocion, index) => (
                        <div key={promocion.id_promocion || index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">📚</span>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                    Actividad de Promoción
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {promocion.docente_nombre && promocion.docente_apellido && (
                                        `${promocion.docente_nombre} ${promocion.docente_apellido} - `
                                    )}
                                    {promocion.preparatoria_nombre || 'Preparatoria no especificada'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {promocion.fecha ? new Date(promocion.fecha).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'Fecha no especificada'}
                                </p>
                            </div>
                        </div>
                    ))}
                    {data.promociones.length > 5 && (
                        <div className="text-center pt-4">
                            <button
                                onClick={() => onRefresh()}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Ver más actividades →
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">📅</span>
                    <p className="text-lg font-medium mb-2">Sin actividades registradas</p>
                    <p className="text-sm text-center">
                        Comience registrando una nueva actividad de promoción.
                    </p>
                </div>
            )}
        </div>

        {/* Carreras más promovidas y Rendimiento */}
        <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Docentes Participantes</h3>
                {data.docentes.length > 0 ? (
                    <div className="space-y-2">
                        {data.docentes.slice(0, 5).map(docente => (
                            <div key={docente.id_docente} className="flex items-center justify-between">
                                <span className="text-sm">{docente.nombre} {docente.apellido}</span>
                                <span className="text-xs text-gray-500">
                                    {data.promociones.filter(p => p.id_docente === docente.id_docente).length} act.
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <span className="text-4xl mb-2">👨‍🏫</span>
                        <p className="text-sm">Sin docentes registrados</p>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Preparatorias Registradas</h3>
                {data.preparatorias.length > 0 ? (
                    <div className="space-y-2">
                        {data.preparatorias.slice(0, 5).map(prep => (
                            <div key={prep.id_prepa} className="flex items-center justify-between">
                                <span className="text-sm truncate">{prep.nombre}</span>
                                <span className="text-xs text-gray-500">
                                    {data.promociones.filter(p => p.id_prepa === prep.id_prepa).length} visitas
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <span className="text-4xl mb-2">🏫</span>
                        <p className="text-sm">Sin preparatorias registradas</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const ActividadesTab = ({ data, onRefresh }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Gestión de Actividades</h3>
                    <p className="text-sm text-gray-600">Administre las actividades de promoción</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Nueva Actividad
                </button>
            </div>

            <div className="bg-white rounded-lg shadow border p-6">
                {data.promociones.length > 0 ? (
                    <div className="space-y-4">
                        {data.promociones.map((promocion, index) => (
                            <div key={promocion.id_promocion || index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-lg">📚</span>
                                            <h4 className="font-semibold">Actividad de Promoción</h4>
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                Completada
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Docente:</p>
                                                <p className="font-medium">
                                                    {promocion.docente_nombre && promocion.docente_apellido
                                                        ? `${promocion.docente_nombre} ${promocion.docente_apellido}`
                                                        : 'No especificado'
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Preparatoria:</p>
                                                <p className="font-medium">{promocion.preparatoria_nombre || 'No especificada'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Fecha:</p>
                                                <p className="font-medium">
                                                    {promocion.fecha ? new Date(promocion.fecha).toLocaleDateString('es-ES') : 'No especificada'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Proyecto:</p>
                                                <p className="font-medium">{promocion.proyecto_titulo || 'No especificado'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            Ver detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="text-6xl mb-4">📅</span>
                        <p className="text-lg font-medium mb-2">Sin actividades registradas</p>
                        <p className="text-sm text-center">
                            Registre su primera actividad de promoción para comenzar.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const PreparatoriasTab = ({ data, onRefresh }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Catálogo de Preparatorias</h3>
                <p className="text-sm text-gray-600">Instituciones de educación media superior</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Registrar Preparatoria
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            {data.preparatorias.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.preparatorias.map((preparatoria) => (
                        <div key={preparatoria.id_prepa} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">🏫</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{preparatoria.nombre}</h4>
                                    {preparatoria.direccion && (
                                        <p className="text-sm text-gray-600 mt-1">{preparatoria.direccion}</p>
                                    )}
                                    <div className="mt-2 text-xs text-gray-500">
                                        <p>
                                            Visitas: {data.promociones.filter(p => p.id_prepa === preparatoria.id_prepa).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">🏫</span>
                    <p className="text-lg font-medium mb-2">Sin preparatorias registradas</p>
                    <p className="text-sm text-center">
                        Registre preparatorias para comenzar las actividades de promoción.
                    </p>
                </div>
            )}
        </div>
    </div>
);

const DocentesTab = ({ data, onRefresh }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Docentes Registrados</h3>
                <p className="text-sm text-gray-600">Personal académico para actividades de promoción</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Registrar Docente
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            {data.docentes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.docentes.map((docente) => (
                        <div key={docente.id_docente} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">👨‍🏫</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">
                                        {docente.nombre} {docente.apellido}
                                    </h4>
                                    <p className="text-sm text-gray-600">{docente.correo}</p>
                                    <div className="mt-2 text-xs text-gray-500">
                                        <p>
                                            Actividades: {data.promociones.filter(p => p.id_docente === docente.id_docente).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <span className="text-6xl mb-4">👨‍🏫</span>
                    <p className="text-lg font-medium mb-2">Sin docentes registrados</p>
                    <p className="text-sm text-center">
                        Registre docentes para asignarlos a actividades de promoción.
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default PromocionES;
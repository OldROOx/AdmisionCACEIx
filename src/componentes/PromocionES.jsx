import React, { useState } from 'react';

const PromocionES = () => {
    const [selectedTab, setSelectedTab] = useState('resumen');

    const tabs = [
        { id: 'resumen', label: 'Resumen', icon: '📊' },
        { id: 'actividades', label: 'Actividades', icon: '📅' },
        { id: 'preparatorias', label: 'Preparatorias', icon: '🏫' },
        { id: 'docentes', label: 'Docentes', icon: '👨‍🏫' }
    ];

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'resumen':
                return <ResumenTab />;
            case 'actividades':
                return <ActividadesTab />;
            case 'preparatorias':
                return <PreparatoriasTab />;
            case 'docentes':
                return <DocentesTab />;
            default:
                return <ResumenTab />;
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Promoción Educación Superior</h1>
                <p className="text-gray-600">Gestión integral de actividades de promoción y vinculación</p>
            </div>

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

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};

// ====== TABS ======

const ResumenTab = () => (
    <div className="space-y-6">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Actividades</p>
                        <p className="text-3xl font-bold text-blue-600">0</p>
                    </div>
                    <span className="text-3xl">📚</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin actividades registradas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Estudiantes Alcanzados</p>
                        <p className="text-3xl font-bold text-green-600">0</p>
                    </div>
                    <span className="text-3xl">🎓</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin estudiantes alcanzados</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Preparatorias Visitadas</p>
                        <p className="text-3xl font-bold text-purple-600">0</p>
                    </div>
                    <span className="text-3xl">🏫</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin visitas realizadas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Efectividad</p>
                        <p className="text-3xl font-bold text-orange-600">0%</p>
                    </div>
                    <span className="text-3xl">📈</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin datos disponibles</p>
            </div>
        </div>

        {/* Próximas actividades */}
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Próximas Actividades</h3>
            <p className="text-gray-600 text-sm mb-4">Actividades de promoción programadas</p>

            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">📅</span>
                <p className="text-lg font-medium mb-2">Sin actividades programadas</p>
                <p className="text-sm text-center">
                    Comience programando una nueva actividad de promoción.
                </p>
            </div>
        </div>

        {/* Carreras más promovidas y Rendimiento */}
        <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Carreras Más Promovidas</h3>
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <span className="text-4xl mb-2">📚</span>
                    <p className="text-sm">Sin datos disponibles</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Rendimiento Mensual</h3>
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <span className="text-4xl mb-2">📊</span>
                    <p className="text-sm">Sin datos disponibles</p>
                </div>
            </div>
        </div>
    </div>
);

const ActividadesTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Gestión de Actividades</h3>
                <p className="text-sm text-gray-600">Administre las actividades de promoción</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Nueva Actividad
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">📅</span>
                <p className="text-lg font-medium mb-2">Sin actividades registradas</p>
                <p className="text-sm text-center">
                    Registre su primera actividad de promoción para comenzar.
                </p>
            </div>
        </div>
    </div>
);

const PreparatoriasTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Catálogo de Preparatorias</h3>
                <p className="text-sm text-gray-600">Instituciones de educación media superior</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Registrar Preparatoria
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">🏫</span>
                <p className="text-lg font-medium mb-2">Sin preparatorias registradas</p>
                <p className="text-sm text-center">
                    Registre preparatorias para comenzar las actividades de promoción.
                </p>
            </div>
        </div>
    </div>
);

const DocentesTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Docentes Registrados</h3>
                <p className="text-sm text-gray-600">Personal académico para actividades de promoción</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Registrar Docente
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">👨‍🏫</span>
                <p className="text-lg font-medium mb-2">Sin docentes registrados</p>
                <p className="text-sm text-center">
                    Registre docentes para asignarlos a actividades de promoción.
                </p>
            </div>
        </div>
    </div>
);

export default PromocionES;
import React, { useState } from 'react';

const Induccion = () => {
    const [selectedTab, setSelectedTab] = useState('resumen');

    const tabs = [
        { id: 'resumen', label: 'Resumen', icon: '📊' },
        { id: 'estudiantes', label: 'Estudiantes', icon: '🎓' },
        { id: 'cursos', label: 'Cursos', icon: '📚' },
        { id: 'evaluaciones', label: 'Evaluaciones', icon: '📋' }
    ];

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'resumen':
                return <ResumenInduccionTab />;
            case 'estudiantes':
                return <EstudiantesTab />;
            case 'cursos':
                return <CursosTab />;
            case 'evaluaciones':
                return <EvaluacionesTab />;
            default:
                return <ResumenInduccionTab />;
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Proceso de Inducción</h1>
                <p className="text-gray-600">Gestión integral del proceso de inducción y nivelación académica</p>
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

const ResumenInduccionTab = () => (
    <div className="space-y-6">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Estudiantes en Inducción</p>
                        <p className="text-3xl font-bold text-blue-600">0</p>
                    </div>
                    <span className="text-3xl">🎓</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin estudiantes registrados</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                        <p className="text-3xl font-bold text-green-600">0</p>
                    </div>
                    <span className="text-3xl">📚</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin cursos programados</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tasa de Aprobación</p>
                        <p className="text-3xl font-bold text-purple-600">0%</p>
                    </div>
                    <span className="text-3xl">✅</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin datos disponibles</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Asistencia Promedio</p>
                        <p className="text-3xl font-bold text-orange-600">0%</p>
                    </div>
                    <span className="text-3xl">📈</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sin asistencia registrada</p>
            </div>
        </div>

        {/* Progreso reciente */}
        <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Progreso Reciente</h3>
            <p className="text-gray-600 text-sm mb-4">Actividades y avances en el proceso de inducción</p>

            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">📊</span>
                <p className="text-lg font-medium mb-2">Sin actividad reciente</p>
                <p className="text-sm text-center">
                    Comience registrando estudiantes y programando cursos de inducción.
                </p>
            </div>
        </div>
    </div>
);

const EstudiantesTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Estudiantes en Inducción</h3>
                <p className="text-sm text-gray-600">Gestión de estudiantes en proceso de inducción</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Registrar Estudiante
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">🎓</span>
                <p className="text-lg font-medium mb-2">Sin estudiantes registrados</p>
                <p className="text-sm text-center">
                    Registre estudiantes para comenzar el proceso de inducción.
                </p>
            </div>
        </div>
    </div>
);

const CursosTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Cursos de Inducción</h3>
                <p className="text-sm text-gray-600">Programación y gestión de cursos</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Programar Curso
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">📚</span>
                <p className="text-lg font-medium mb-2">Sin cursos programados</p>
                <p className="text-sm text-center">
                    Programme cursos de inducción para los nuevos estudiantes.
                </p>
            </div>
        </div>
    </div>
);

const EvaluacionesTab = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Evaluaciones</h3>
                <p className="text-sm text-gray-600">Seguimiento y evaluación del proceso</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Nueva Evaluación
            </button>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <span className="text-6xl mb-4">📋</span>
                <p className="text-lg font-medium mb-2">Sin evaluaciones registradas</p>
                <p className="text-sm text-center">
                    Registre evaluaciones para dar seguimiento al proceso de inducción.
                </p>
            </div>
        </div>
    </div>
);

export default Induccion;
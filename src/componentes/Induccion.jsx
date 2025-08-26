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
        {/* Aquí va tu dashboard de estadísticas */}
        <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Estudiantes en Inducción</p>
                        <p className="text-3xl font-bold text-blue-600">156</p>
                    </div>
                    <span className="text-3xl">🎓</span>
                </div>
                <p className="text-xs text-green-600 mt-2">+23 nuevos esta semana</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                        <p className="text-3xl font-bold text-green-600">8</p>
                    </div>
                    <span className="text-3xl">📚</span>
                </div>
                <p className="text-xs text-blue-600 mt-2">3 materias básicas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tasa de Aprobación</p>
                        <p className="text-3xl font-bold text-purple-600">92%</p>
                    </div>
                    <span className="text-3xl">✅</span>
                </div>
                <p className="text-xs text-green-600 mt-2">+5% vs semestre anterior</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Asistencia Promedio</p>
                        <p className="text-3xl font-bold text-orange-600">89%</p>
                    </div>
                    <span className="text-3xl">📈</span>
                </div>
                <p className="text-xs text-green-600 mt-2">Excelente participación</p>
            </div>
        </div>
    </div>
);

// Tabs restantes
const EstudiantesTab = () => <div>Estudiantes aquí</div>;
const CursosTab = () => <div>Cursos aquí</div>;
const EvaluacionesTab = () => <div>Evaluaciones aquí</div>;

export default Induccion;

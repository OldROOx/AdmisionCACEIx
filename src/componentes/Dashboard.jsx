// src/componentes/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Dashboard = ({ user }) => {
    const [stats, setStats] = useState({
        docentes: 0,
        preparatorias: 0,
        promociones: 0,
        alumnos: 0,
        loading: true
    });

    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [docentes, preparatorias, promociones, alumnos] = await Promise.all([
                apiService.getDocentes(),
                apiService.getPreparatorias(),
                apiService.getPromociones(),
                apiService.getAlumnos()
            ]);

            setStats({
                docentes: docentes.data?.length || 0,
                preparatorias: preparatorias.data?.length || 0,
                promociones: promociones.data?.length || 0,
                alumnos: alumnos.data?.length || 0,
                loading: false
            });

            // Combinar actividad reciente
            const activities = [
                ...promociones.data?.slice(0, 3).map(p => ({
                    type: 'promocion',
                    title: `Nueva actividad de promoción`,
                    description: `${p.docente_nombre} visitó ${p.preparatoria_nombre}`,
                    date: new Date(p.fecha),
                    icon: '📚'
                })) || []
            ].sort((a, b) => b.date - a.date);

            setRecentActivity(activities.slice(0, 5));

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    if (stats.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-gray-600">
                    Bienvenido al Sistema de Promoción e Inducción Educativa
                    {user && `, ${user.name.split(' ')[0]}`}
                </p>
            </div>

            {/* Cards de resumen */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Docentes Registrados</h3>
                        <span className="text-2xl">👨‍🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{stats.docentes}</p>
                    <p className="text-xs text-gray-500">
                        {stats.docentes === 0 ? 'Sin registros' : 'Total registrado'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Preparatorias Registradas</h3>
                        <span className="text-2xl">🏫</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{stats.preparatorias}</p>
                    <p className="text-xs text-gray-500">
                        {stats.preparatorias === 0 ? 'Sin registros' : 'Total registrado'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Actividades de Promoción</h3>
                        <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{stats.promociones}</p>
                    <p className="text-xs text-gray-500">
                        {stats.promociones === 0 ? 'Sin registros' : 'Total registrado'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Estudiantes en Inducción</h3>
                        <span className="text-2xl">🎓</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{stats.alumnos}</p>
                    <p className="text-xs text-gray-500">
                        {stats.alumnos === 0 ? 'Sin registros' : 'Total registrado'}
                    </p>
                </div>
            </div>

            {/* Sección de acciones rápidas */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Acciones Rápidas - Promoción</h3>
                    <p className="text-gray-600 text-sm mb-4">Gestione las actividades de promoción en educación superior</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = '#docente'}
                            className="w-full bg-gray-900 text-white p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                        >
                            <span className="mr-2">👨‍🏫</span>
                            Registrar Nuevo Docente
                        </button>
                        <button
                            onClick={() => window.location.href = '#preparatoria'}
                            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="mr-2">🏫</span>
                            Registrar Preparatoria
                        </button>
                        <button
                            onClick={() => window.location.href = '#actividad'}
                            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="mr-2">📝</span>
                            Nueva Actividad de Promoción
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-semibold mb-4">Acciones Rápidas - Inducción</h3>
                    <p className="text-gray-600 text-sm mb-4">Administre el proceso de inducción y nivelación</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = '#evidencias'}
                            className="w-full bg-gray-900 text-white p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                        >
                            <span className="mr-2">📄</span>
                            Subir Evidencias
                        </button>
                        <button
                            onClick={() => window.location.href = '#nivelacion'}
                            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="mr-2">📖</span>
                            Gestionar Nivelación
                        </button>
                        <button
                            onClick={() => window.location.href = '#asistencia'}
                            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="mr-2">✓</span>
                            Control de Asistencia
                        </button>
                    </div>
                </div>
            </div>

            {/* Actividad reciente */}
            <div className="bg-white rounded-lg shadow border p-6">
                <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                <p className="text-gray-600 text-sm mb-4">Últimas acciones realizadas en el sistema</p>

                {recentActivity.length > 0 ? (
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <span className="text-2xl">{activity.icon}</span>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {activity.date.toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="text-center pt-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Ver más actividades →
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="text-6xl mb-4">📊</span>
                        <p className="text-lg font-medium mb-2">Sin actividad reciente</p>
                        <p className="text-sm text-center">
                            Comience registrando docentes, preparatorias y actividades de promoción.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
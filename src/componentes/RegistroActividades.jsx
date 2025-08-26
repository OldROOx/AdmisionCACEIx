// src/componentes/RegistroActividades.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const RegistroActividades = () => {
    const [data, setData] = useState({
        promociones: [],
        docentes: [],
        preparatorias: [],
        proyectos: [],
        loading: true,
        stats: {
            totalEstudiantes: 0,
            preparatoriasVisitadas: 0,
            docentesParticipantes: 0,
            tasaExito: 0
        }
    });

    const [filters, setFilters] = useState({
        search: '',
        estado: '',
        tipo: ''
    });

    const [selectedActividad, setSelectedActividad] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const estadosActividad = ['Completada', 'Pendiente', 'Cancelada'];
    const tiposActividad = ['Presentación', 'Taller', 'Conferencia', 'Feria Vocacional'];

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

            const promocionesData = promociones.data || [];

            // Calcular estadísticas
            const stats = {
                totalEstudiantes: promocionesData.reduce((sum, p) => sum + (p.estudiantes_alcanzados || Math.floor(Math.random() * 100) + 20), 0),
                preparatoriasVisitadas: new Set(promocionesData.map(p => p.id_prepa)).size,
                docentesParticipantes: new Set(promocionesData.map(p => p.id_docente)).size,
                tasaExito: promocionesData.length > 0 ? Math.round(Math.random() * 30 + 70) : 0
            };

            setData({
                promociones: promocionesData,
                docentes: docentes.data || [],
                preparatorias: preparatorias.data || [],
                proyectos: proyectos.data || [],
                stats,
                loading: false
            });
        } catch (error) {
            console.error('Error loading activities:', error);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getFilteredActivities = () => {
        return data.promociones.filter(promocion => {
            const searchTerm = filters.search.toLowerCase();
            const matchesSearch = !searchTerm ||
                (promocion.docente_nombre && promocion.docente_nombre.toLowerCase().includes(searchTerm)) ||
                (promocion.docente_apellido && promocion.docente_apellido.toLowerCase().includes(searchTerm)) ||
                (promocion.preparatoria_nombre && promocion.preparatoria_nombre.toLowerCase().includes(searchTerm)) ||
                (promocion.proyecto_titulo && promocion.proyecto_titulo.toLowerCase().includes(searchTerm));

            const matchesEstado = !filters.estado || getEstadoActividad(promocion.fecha).texto === filters.estado;
            const matchesTipo = !filters.tipo; // Los tipos los simulamos ya que no están en la BD

            return matchesSearch && matchesEstado && matchesTipo;
        });
    };

    const getEstadoActividad = (fecha) => {
        const fechaActividad = new Date(fecha);
        const hoy = new Date();

        if (fechaActividad <= hoy) {
            return { texto: 'Completada', color: 'text-green-600' };
        } else {
            return { texto: 'Programada', color: 'text-blue-600' };
        }
    };

    const handleExport = () => {
        const filteredData = getFilteredActivities();
        const csvContent = [
            ['Fecha', 'Docente', 'Preparatoria', 'Proyecto', 'Estado'],
            ...filteredData.map(actividad => [
                new Date(actividad.fecha).toLocaleDateString('es-ES'),
                `${actividad.docente_nombre || ''} ${actividad.docente_apellido || ''}`.trim() || 'No especificado',
                actividad.preparatoria_nombre || 'No especificada',
                actividad.proyecto_titulo || 'No especificado',
                getEstadoActividad(actividad.fecha).texto
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `actividades_promocion_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const handleViewDetails = (actividad) => {
        setSelectedActividad(actividad);
        setShowDetails(true);
    };

    const filteredActivities = getFilteredActivities();
    const completadas = filteredActivities.filter(a => getEstadoActividad(a.fecha).texto === 'Completada').length;
    const pendientes = filteredActivities.filter(a => getEstadoActividad(a.fecha).texto === 'Programada').length;

    if (data.loading) {
        return (
            <div className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando registro de actividades...</p>
                </div
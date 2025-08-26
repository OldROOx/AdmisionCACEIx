// src/services/api.js
// Servicio para conectar el frontend con la API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        if (config.body && typeof config.body !== 'string') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Error HTTP: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // ============== DOCENTES ==============
    async getDocentes() {
        return this.request('/docentes');
    }

    async getDocenteById(id) {
        return this.request(`/docentes/${id}`);
    }

    async createDocente(docenteData) {
        return this.request('/docentes', {
            method: 'POST',
            body: docenteData,
        });
    }

    async updateDocente(id, docenteData) {
        return this.request(`/docentes/${id}`, {
            method: 'PUT',
            body: docenteData,
        });
    }

    async deleteDocente(id) {
        return this.request(`/docentes/${id}`, {
            method: 'DELETE',
        });
    }

    // ============== PREPARATORIAS ==============
    async getPreparatorias() {
        return this.request('/preparatorias');
    }

    async getPreparatoriaById(id) {
        return this.request(`/preparatorias/${id}`);
    }

    async createPreparatoria(preparatoriaData) {
        return this.request('/preparatorias', {
            method: 'POST',
            body: preparatoriaData,
        });
    }

    async updatePreparatoria(id, preparatoriaData) {
        return this.request(`/preparatorias/${id}`, {
            method: 'PUT',
            body: preparatoriaData,
        });
    }

    async deletePreparatoria(id) {
        return this.request(`/preparatorias/${id}`, {
            method: 'DELETE',
        });
    }

    // ============== PROYECTOS ==============
    async getProyectos() {
        return this.request('/proyectos');
    }

    async getProyectoById(id) {
        return this.request(`/proyectos/${id}`);
    }

    async createProyecto(proyectoData) {
        return this.request('/proyectos', {
            method: 'POST',
            body: proyectoData,
        });
    }

    async updateProyecto(id, proyectoData) {
        return this.request(`/proyectos/${id}`, {
            method: 'PUT',
            body: proyectoData,
        });
    }

    async deleteProyecto(id) {
        return this.request(`/proyectos/${id}`, {
            method: 'DELETE',
        });
    }

    // ============== ALUMNOS ==============
    async getAlumnos() {
        return this.request('/alumnos');
    }

    async getAlumnoById(id) {
        return this.request(`/alumnos/${id}`);
    }

    async createAlumno(alumnoData) {
        return this.request('/alumnos', {
            method: 'POST',
            body: alumnoData,
        });
    }

    async updateAlumno(id, alumnoData) {
        return this.request(`/alumnos/${id}`, {
            method: 'PUT',
            body: alumnoData,
        });
    }

    async deleteAlumno(id) {
        return this.request(`/alumnos/${id}`, {
            method: 'DELETE',
        });
    }

    // ============== SALUD DE LA API ==============
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL.replace('/api/v1', '')}/health`);
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            return { success: false, message: 'API no disponible' };
        }
    }

    // ============== ENDPOINTS NO IMPLEMENTADOS ==============
    // Estos métodos son para futuras implementaciones

    // PROMOCIONES
    async getPromociones() {
        throw new Error('Endpoint /promociones no implementado en la API');
    }

    async createPromocion(promocionData) {
        throw new Error('Endpoint POST /promociones no implementado en la API');
    }

    // CURSOS DE INDUCCION
    async getCursosInduccion() {
        throw new Error('Endpoint /cursos-induccion no implementado en la API');
    }

    async createCursoInduccion(cursoData) {
        throw new Error('Endpoint POST /cursos-induccion no implementado en la API');
    }

    // ASISTENCIA INDUCCION
    async getAsistenciasInduccion() {
        throw new Error('Endpoint /asistencias-induccion no implementado en la API');
    }

    async createAsistenciaInduccion(asistenciaData) {
        throw new Error('Endpoint POST /asistencias-induccion no implementado en la API');
    }

    // CLASES NIVELACION
    async getClasesNivelacion() {
        throw new Error('Endpoint /clases-nivelacion no implementado en la API');
    }

    async createClaseNivelacion(claseData) {
        throw new Error('Endpoint POST /clases-nivelacion no implementado en la API');
    }

    // ASISTENCIA NIVELACION
    async getAsistenciasNivelacion() {
        throw new Error('Endpoint /asistencias-nivelacion no implementado en la API');
    }

    async createAsistenciaNivelacion(asistenciaData) {
        throw new Error('Endpoint POST /asistencias-nivelacion no implementado en la API');
    }

    // EVIDENCIAS
    async getEvidencias() {
        throw new Error('Endpoint /evidencias no implementado en la API');
    }

    async createEvidencia(evidenciaData) {
        throw new Error('Endpoint POST /evidencias no implementado en la API');
    }

    async uploadEvidencia(file, metadata) {
        throw new Error('Endpoint POST /evidencias/upload no implementado en la API');
    }
}

// Instancia singleton del servicio APIz
const apiService = new ApiService();

export default apiService;
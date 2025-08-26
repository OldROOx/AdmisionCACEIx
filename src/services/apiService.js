// src/services/apiService.js
class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:3000/api/v1';
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: this.headers,
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== DOCENTES =====
    async getDocentes() {
        return this.request('/docentes');
    }

    async getDocenteById(id) {
        return this.request(`/docentes/${id}`);
    }

    async createDocente(data) {
        return this.request('/docentes', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateDocente(id, data) {
        return this.request(`/docentes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteDocente(id) {
        return this.request(`/docentes/${id}`, {
            method: 'DELETE',
        });
    }

    // ===== PREPARATORIAS =====
    async getPreparatorias() {
        return this.request('/preparatorias');
    }

    async getPreparatoriaById(id) {
        return this.request(`/preparatorias/${id}`);
    }

    async createPreparatoria(data) {
        return this.request('/preparatorias', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updatePreparatoria(id, data) {
        return this.request(`/preparatorias/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deletePreparatoria(id) {
        return this.request(`/preparatorias/${id}`, {
            method: 'DELETE',
        });
    }

    // ===== PROYECTOS =====
    async getProyectos() {
        return this.request('/proyectos');
    }

    async getProyectoById(id) {
        return this.request(`/proyectos/${id}`);
    }

    async createProyecto(data) {
        return this.request('/proyectos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateProyecto(id, data) {
        return this.request(`/proyectos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteProyecto(id) {
        return this.request(`/proyectos/${id}`, {
            method: 'DELETE',
        });
    }

    // ===== PROMOCIONES =====
    async getPromociones() {
        return this.request('/promociones');
    }

    async getPromocionById(id) {
        return this.request(`/promociones/${id}`);
    }

    async createPromocion(data) {
        return this.request('/promociones', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updatePromocion(id, data) {
        return this.request(`/promociones/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deletePromocion(id) {
        return this.request(`/promociones/${id}`, {
            method: 'DELETE',
        });
    }

    // ===== ALUMNOS =====
    async getAlumnos() {
        return this.request('/alumnos');
    }

    async getAlumnoById(id) {
        return this.request(`/alumnos/${id}`);
    }

    async createAlumno(data) {
        return this.request('/alumnos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateAlumno(id, data) {
        return this.request(`/alumnos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteAlumno(id) {
        return this.request(`/alumnos/${id}`, {
            method: 'DELETE',
        });
    }

    // ===== CURSOS DE INDUCCIÓN =====
    async getCursosInduccion() {
        return this.request('/cursos-induccion');
    }

    async getCursoInduccionById(id) {
        return this.request(`/cursos-induccion/${id}`);
    }

    async createCursoInduccion(data) {
        return this.request('/cursos-induccion', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateCursoInduccion(id, data) {
        return this.request(`/cursos-induccion/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteCursoInduccion(id) {
        return this.request(`/cursos-induccion/${id}`, {
            method: 'DELETE',
        });
    }

    // ===== CLASES DE NIVELACIÓN =====
    async getClasesNivelacion() {
        return this.request('/clases-nivelacion');
    }

    async getClaseNivelacionById(id) {
        return this.request(`/clases-nivelacion/${id}`);
    }

    async createClaseNivelacion(data) {
        return this.request('/clases-nivelacion', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateClaseNivelacion(id, data) {
        return this.request(`/clases-nivelacion/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteClaseNivelacion(id) {
        return this.request(`/clases-nivelacion/${id}`, {
            method: 'DELETE',
        });
    }

    async getClasesProximas() {
        return this.request('/clases-nivelacion/proximas/lista');
    }

    // ===== ASISTENCIA INDUCCIÓN =====
    async getAsistenciaInduccion() {
        return this.request('/asistencia/induccion');
    }

    async getAsistenciaInduccionByCurso(idCurso) {
        return this.request(`/asistencia/induccion/curso/${idCurso}`);
    }

    async getAsistenciaInduccionByAlumno(idAlumno) {
        return this.request(`/asistencia/induccion/alumno/${idAlumno}`);
    }

    async createAsistenciaInduccion(data) {
        return this.request('/asistencia/induccion', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateAsistenciaInduccion(id, data) {
        return this.request(`/asistencia/induccion/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteAsistenciaInduccion(id) {
        return this.request(`/asistencia/induccion/${id}`, {
            method: 'DELETE',
        });
    }

    async getPorcentajeAsistenciaInduccion(idCurso) {
        return this.request(`/asistencia/induccion/porcentaje/${idCurso}`);
    }

    // ===== ASISTENCIA NIVELACIÓN =====
    async getAsistenciaNivelacion() {
        return this.request('/asistencia/nivelacion');
    }

    async getAsistenciaNivelacionByClase(idClase) {
        return this.request(`/asistencia/nivelacion/clase/${idClase}`);
    }

    async getAsistenciaNivelacionByAlumno(idAlumno) {
        return this.request(`/asistencia/nivelacion/alumno/${idAlumno}`);
    }

    async createAsistenciaNivelacion(data) {
        return this.request('/asistencia/nivelacion', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateAsistenciaNivelacion(id, data) {
        return this.request(`/asistencia/nivelacion/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteAsistenciaNivelacion(id) {
        return this.request(`/asistencia/nivelacion/${id}`, {
            method: 'DELETE',
        });
    }

    async getPorcentajeAsistenciaNivelacion(idClase) {
        return this.request(`/asistencia/nivelacion/porcentaje/${idClase}`);
    }

    // ===== EVIDENCIAS =====
    async getEvidencias() {
        return this.request('/evidencias');
    }

    async getEvidenciaById(id) {
        return this.request(`/evidencias/${id}`);
    }

    async getEvidenciasByCurso(idCurso) {
        return this.request(`/evidencias/curso/${idCurso}`);
    }

    async getEvidenciasByClase(idClase) {
        return this.request(`/evidencias/clase/${idClase}`);
    }

    async createEvidencia(data) {
        return this.request('/evidencias', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateEvidencia(id, data) {
        return this.request(`/evidencias/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteEvidencia(id) {
        return this.request(`/evidencias/${id}`, {
            method: 'DELETE',
        });
    }

    async getEstadisticasEvidencias() {
        return this.request('/evidencias/estadisticas/general');
    }

    // ===== REPORTES =====
    async getEstadisticasGenerales() {
        return this.request('/reportes/estadisticas');
    }

    async getReportePromocion(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/reportes/promocion${queryString ? `?${queryString}` : ''}`);
    }

    async getReporteInduccion(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/reportes/induccion${queryString ? `?${queryString}` : ''}`);
    }

    async getReporteNivelacion(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/reportes/nivelacion${queryString ? `?${queryString}` : ''}`);
    }
}

export default new ApiService();
// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './componentes/Sidebar';
import Dashboard from './componentes/Dashboard';
import ControlAsistencia from './componentes/ControlAsistencia';
import Evidencias from './componentes/Evidencias';
import Nivelacion from './componentes/Nivelacion';
import RegistrarActividad from './componentes/RegistrarActividad';
import RegistrarDocente from './componentes/RegistrarDocente';
import RegistrarPreparatoria from './componentes/RegistrarPreparatoria';
import RegistroActividades from './componentes/RegistroActividades';
import Reportes from './componentes/Reportes';
import Login from './componentes/Login';
import PromocionES from './componentes/PromocionES';
import Induccion from './componentes/Induccion';
import Configuracion from './componentes/Configuracion';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setCurrentPage('Dashboard');
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <Dashboard user={user} onNavigate={handlePageChange} />;
            case 'Promoción E.S.':
                return <PromocionES onNavigate={handlePageChange} />;
            case 'Control Asistencia':
                return <ControlAsistencia onNavigate={handlePageChange} />;
            case 'Evidencias Curso':
                return <Evidencias onNavigate={handlePageChange} />;
            case 'Clases Nivelación':
                return <Nivelacion onNavigate={handlePageChange} />;
            case 'Registrar Actividad':
                return <RegistrarActividad onBack={() => setCurrentPage('Promoción E.S.')} />;
            case 'Registrar Docente':
                return <RegistrarDocente onBack={() => setCurrentPage('Promoción E.S.')} />;
            case 'Registrar Preparatoria':
                return <RegistrarPreparatoria onBack={() => setCurrentPage('Promoción E.S.')} />;
            case 'Ver Registros':
                return <RegistroActividades onNavigate={handlePageChange} />;
            case 'Inducción':
                return <Induccion onNavigate={handlePageChange} />;
            case 'Reportes':
                return <Reportes onNavigate={handlePageChange} />;
            case 'Configuración':
                return <Configuracion user={user} onNavigate={handlePageChange} />;
            default:
                return <Dashboard user={user} onNavigate={handlePageChange} />;
        }
    };

    // Si no está autenticado, mostrar la pantalla de login
    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-gray-600 flex">
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                user={user}
                onLogout={handleLogout}
            />

            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
                    {renderCurrentPage()}
                </div>
            </div>
        </div>
    );
}

export default App;
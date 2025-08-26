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

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <Dashboard user={user} />;
            case 'Promoción E.S.':
                return <PromocionES/>;
            case 'Control Asistencia':
                return <ControlAsistencia />;
            case 'Evidencias Curso':
                return <Evidencias />;
            case 'Clases Nivelación':
                return <Nivelacion />;
            case 'Registrar Actividad':
                return <RegistrarActividad />;
            case 'Registrar Docente':
                return <RegistrarDocente />;
            case 'Registrar Preparatoria':
                return <RegistrarPreparatoria />;
            case 'Ver Registros':
                return <RegistroActividades />;
            case 'Inducción':
                return <Induccion />;
            case 'Reportes':
                return <Reportes />;
            case 'Configuración':
                return <Configuracion user={user} />;
            default:
                return <Dashboard user={user} />;
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
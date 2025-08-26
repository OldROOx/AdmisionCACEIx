import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Usuarios de demostración
    const demoUsers = [
        {
            email: 'admin@cacei.edu.mx',
            password: 'admin123',
            name: 'Administrador CACEI',
            role: 'Administrador',
            department: 'Dirección Académica'
        },
        {
            email: 'docente@cacei.edu.mx',
            password: 'docente123',
            name: 'Dr. Juan Martínez',
            role: 'Docente',
            department: 'Sistemas y Computación'
        },
        {
            email: 'coordinador@cacei.edu.mx',
            password: 'coord123',
            name: 'Mtra. Ana López',
            role: 'Coordinador',
            department: 'Promoción y Vinculación'
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simular delay de autenticación
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = demoUsers.find(
            u => u.email === formData.email && u.password === formData.password
        );

        if (user) {
            onLogin({
                ...user,
                lastLogin: new Date().toISOString()
            });
        } else {
            setError('Credenciales inválidas. Verifique su email y contraseña.');
        }

        setIsLoading(false);
    };

    const handleDemoLogin = (userType) => {
        const user = demoUsers.find(u => u.role === userType);
        if (user) {
            setFormData({
                email: user.email,
                password: user.password
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8">
                {/* Logo y título */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🎓</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Sistema CACEI
                    </h2>
                    <p className="text-blue-100">
                        Promoción e Inducción Educativa
                    </p>
                </div>

                {/* Formulario de login */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="usuario@cacei.edu.mx"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Iniciando sesión...
                                </div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    {/* Usuarios de demostración */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Acceso de demostración:</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('Administrador')}
                                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">👨‍💼</span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Administrador</p>
                                        <p className="text-xs text-gray-500">admin@cacei.edu.mx</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDemoLogin('Docente')}
                                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">👨‍🏫</span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Docente</p>
                                        <p className="text-xs text-gray-500">docente@cacei.edu.mx</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDemoLogin('Coordinador')}
                                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">🎯</span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Coordinador</p>
                                        <p className="text-xs text-gray-500">coordinador@cacei.edu.mx</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>© 2024 CACEI - Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
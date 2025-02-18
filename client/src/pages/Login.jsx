import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Layout } from 'lucide-react';
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            onLogin?.(formData);
        } catch (error) {
            setLoginError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-emerald-950 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl border border-emerald-900/50">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-emerald-50">Welcome back</h2>
                        <p className="mt-2 text-sm text-emerald-200/70">
                            Sign in to collaborate on your tasks
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {loginError && (
                            <div className="p-4 bg-red-900/50 border border-red-800 rounded-lg">
                                <p className="text-sm text-red-400">{loginError}</p>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-emerald-200/90">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500/50" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-emerald-900/50 rounded-lg outline-none transition-colors text-emerald-50 placeholder-emerald-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-emerald-200/90">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500/50" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-2 bg-gray-800/80 border border-emerald-900/50 rounded-lg outline-none transition-colors text-emerald-50 placeholder-emerald-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500/50 hover:text-emerald-400"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 bg-gray-800 border-emerald-900 rounded text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-900"
                                />
                                <span className="text-sm text-emerald-200/70">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-emerald-400 hover:text-emerald-300"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-emerald-200/70">
                            Don't have an account?{' '}
                            <button className="text-emerald-400 hover:text-emerald-300 font-medium">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

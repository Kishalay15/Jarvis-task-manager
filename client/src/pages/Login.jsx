import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
    const { user } = "";
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const submitHandler = async (data) => {
        console.log("Submit");
    };

    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl border border-emerald-900/50">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-emerald-50">Welcome back!</h2>
                    </div>

                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                        {errors.root && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                                <p className="text-sm text-red-400">{errors.root.message}</p>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-emerald-200/90">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500/50" />
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    {...register("email", {
                                        required: "Email Address is required!",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email"
                                        }
                                    })}
                                    className={`w-full pl-10 pr-4 py-2 bg-gray-800/80 border rounded-lg outline-none transition-colors text-emerald-50 placeholder-emerald-700 focus:ring-1 focus:ring-emerald-500 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-emerald-900/50 focus:border-emerald-500'
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-emerald-200/90">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500/50" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required!",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className={`w-full pl-10 pr-12 py-2 bg-gray-800/80 border rounded-lg outline-none transition-colors text-emerald-50 placeholder-emerald-700 focus:ring-1 focus:ring-emerald-500 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-emerald-900/50 focus:border-emerald-500'
                                        }`}
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
                                <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="text-sm text-emerald-400 hover:text-emerald-300"
                                onClick={() => toast.info('Password reset functionality coming soon!')}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

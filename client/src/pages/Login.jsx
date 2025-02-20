import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff} from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice"
import { setCredentials } from "../redux/slices/authSlice";
import Loader from "../components/Loader";

const Login = () => {
    const { user } = useSelector(state => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const submitHandler = async (data) => {
        try {
            const result = await login(data).unwrap()

            dispatch(setCredentials(result))
            navigate("/")

            console.log(result);

        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.message)
        }
    };

    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-300">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
                    </div>

                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                        {errors.root && (
                            <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                                <p className="text-sm text-red-600">{errors.root.message}</p>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                                    className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none transition-colors text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                                    className={`w-full pl-10 pr-12 py-2 bg-gray-50 border rounded-lg outline-none transition-colors text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-blue-500 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="text-sm text-blue-500 hover:text-blue-400"
                                onClick={() => toast.info('Password reset functionality coming soon!')}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {isLoading ? (<Loader />) : (<button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign in
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

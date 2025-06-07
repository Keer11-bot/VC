import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type FormMode = 'signin' | 'signup';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignupLogin: React.FC = () => {
    const navigate = useNavigate();
    const { signup, login, loginWithGoogle } = useAuth();
    const [mode, setMode] = useState<FormMode>('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const userType = localStorage.getItem('userType') || 'user';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (mode === 'signup') {
                await signup(formData.email, formData.password, userType, {
                    name: formData.name,
                });
                navigate(userType === 'startup' ? '/startup-dashboard' : '/investor-dashboard');
            } else {
                await login(formData.email, formData.password);
                navigate(userType === 'startup' ? '/startup-dashboard' : '/investor-dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError('');

        try {
            await loginWithGoogle(userType);
            navigate(userType === 'startup' ? '/startup-dashboard' : '/investor-dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred during Google sign-in');
        } finally {
            setGoogleLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    const toggleMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex items-center justify-center p-6">
            <motion.div
                className="w-full max-w-md"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="mb-8 flex flex-col items-center text-center"
                    variants={itemVariants}
                >
                    <h1 className="text-3xl font-bold mb-2">
                        {mode === 'signin' ? 'Welcome back' : 'Create your account'}
                    </h1>
                    <p className="text-gray-400 mb-2">
                        {mode === 'signin'
                            ? 'Sign in to continue as a'
                            : 'Sign up to join as a'}
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
                            {userType === 'startup' ? 'Startup' : 'Investor'}
                        </span>
                    </p>
                </motion.div>

                {error && (
                    <motion.div
                        className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {error}
                    </motion.div>
                )}

                <motion.div
                    className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8"
                    variants={itemVariants}
                >
                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit}>
                        {mode === 'signup' && (
                            <motion.div
                                className="mb-4"
                                variants={itemVariants}
                            >
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            className="mb-4"
                            variants={itemVariants}
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            className="mb-6"
                            variants={itemVariants}
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${loading || googleLoading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/20'
                                } transition-all duration-200`}
                            variants={itemVariants}
                            disabled={loading || googleLoading}
                            whileHover={{ scale: loading || googleLoading ? 1 : 1.02 }}
                            whileTap={{ scale: loading || googleLoading ? 1 : 0.98 }}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin mr-2"></div>
                            ) : null}
                            {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                        </motion.button>

                        <motion.div
                            className="mt-6 text-center text-sm"
                            variants={itemVariants}
                        >
                            <p className="text-gray-400">
                                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </motion.div>
                    </form>

                    {/* Divider */}
                    <motion.div
                        className="relative my-6"
                        variants={itemVariants}
                    >
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800/50 text-gray-400"></span>
                        </div>
                    </motion.div>

                    {/* Google Sign-in Button */}
                    <motion.button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading || loading}
                        className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        variants={itemVariants}
                        whileHover={{ scale: googleLoading || loading ? 1 : 1.02 }}
                        whileTap={{ scale: googleLoading || loading ? 1 : 0.98 }}
                    >
                        {googleLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mr-2"></div>
                        ) : (
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        )}
                        {googleLoading ? 'Signing in...' : `Continue with Google`}
                    </motion.button>
                </motion.div>

                <motion.div
                    className="mt-8 text-center"
                    variants={itemVariants}
                >
                    <button
                        onClick={() => navigate('/selection')}
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        <span>Back to selection</span>
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SignupLogin;


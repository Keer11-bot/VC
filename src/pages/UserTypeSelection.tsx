import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection: React.FC = () => {
    const navigate = useNavigate();

    const handleSelection = (type: 'startup' | 'investor') => {
        localStorage.setItem('userType', type);
        navigate('/auth');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white flex items-center justify-center p-4">
            <motion.div
                className="max-w-4xl w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="text-center mb-12"
                    variants={itemVariants}
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                        Tell us about yourself
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Select the option that best describes you to personalize your experience.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    <motion.div
                        className="bg-dark-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary-500/50 cursor-pointer transition-all duration-300 group"
                        whileHover={{
                            y: -5,
                            boxShadow: "0 10px 30px -10px rgba(12, 147, 228, 0.3)"
                        }}
                        onClick={() => handleSelection('startup')}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Building2 className="w-10 h-10 text-primary-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Start up or Entrepreneur</h3>
                        <p className="text-gray-400 mb-6">
                            Looking to grow my business and connect with potential investors
                        </p>
                        <motion.div
                            className="flex items-center text-primary-400 font-medium"
                            whileHover={{ x: 5 }}
                        >
                            <span>Continue</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="bg-dark-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-accent-500/50 cursor-pointer transition-all duration-300 group"
                        whileHover={{
                            y: -5,
                            boxShadow: "0 10px 30px -10px rgba(89, 89, 255, 0.3)"
                        }}
                        onClick={() => handleSelection('investor')}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-500/20 to-accent-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-10 h-10 text-accent-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Investor or VC</h3>
                        <p className="text-gray-400 mb-6">
                            Seeking promising startup opportunities and investment ventures
                        </p>
                        <motion.div
                            className="flex items-center text-accent-400 font-medium"
                            whileHover={{ x: 5 }}
                        >
                            <span>Continue</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-12 text-center"
                    variants={itemVariants}
                >
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Back to home
                    </button>
                </motion.div>
            </motion.div>

            {/* Background elements */}
            <motion.div
                className="fixed top-1/4 left-1/6 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl pointer-events-none"
                style={{ zIndex: -1 }}
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <motion.div
                className="fixed bottom-1/4 right-1/6 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl pointer-events-none"
                style={{ zIndex: -1 }}
                animate={{
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </div>
    );
};

export default UserTypeSelection;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccessDenied: React.FC = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate('/');
        }
    }, [countdown, navigate]);

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white flex items-center justify-center p-4">
            <motion.div
                className="max-w-lg w-full text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="mb-6 flex flex-col items-center"
                    variants={itemVariants}
                >
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Access Denied</h1>

                    <motion.div
                        className="bg-red-500/10 border border-red-500/30 rounded-lg px-6 py-4 text-red-300 mb-6 max-w-md"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        Please come back later. We're currently in a private beta phase.
                    </motion.div>

                    <p className="text-gray-400 mb-8">
                        You'll be redirected to the home page in {countdown} seconds.
                    </p>

                    <motion.button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Home size={18} />
                        <span>Return to Home</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Background elements */}
            <motion.div
                className="fixed top-1/3 left-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-3xl"
                animate={{
                    y: [0, -20, 0],
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
                className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-primary-500/5 blur-3xl"
                animate={{
                    y: [0, 20, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{
                    duration: 9,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </div>
    );
};

export default AccessDenied;
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset logging out state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsLoggingOut(false);
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsLoggingOut(false);
      document.body.style.overflow = '';
    };
  }, []);

  const handleConfirmLogout = useCallback(async () => {
    if (isLoggingOut || !logout) return;

    setIsLoggingOut(true);

    try {
      // Set a timeout to prevent hanging
      const logoutPromise = logout();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Logout timeout')), 10000); // 10 second timeout
      });

      await Promise.race([logoutPromise, timeoutPromise]);

      // Close modal and navigate immediately after successful logout
      onClose();
      setIsLoggingOut(false);
      
      // Use replace to prevent going back to authenticated pages
      navigate('/auth', { replace: true });

    } catch (error) {
      console.error('Failed to log out:', error);
      
      // Reset states
      setIsLoggingOut(false);
      onClose();
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error && error.message === 'Logout timeout' 
        ? 'Logout is taking longer than expected. Please refresh the page and try again.'
        : 'Logout failed. Please refresh the page and try again.';
      
      alert(errorMessage);
      
      // Force page refresh as fallback
      if (error instanceof Error && error.message === 'Logout timeout') {
        window.location.href = '/auth';
      }
    }
  }, [isLoggingOut, logout, navigate, onClose]);

  const handleCancel = useCallback(() => {
    if (isLoggingOut) return;
    onClose();
  }, [isLoggingOut, onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoggingOut) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isLoggingOut, handleCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm"
          onClick={!isLoggingOut ? handleCancel : undefined}
          style={{ pointerEvents: isLoggingOut ? 'none' : 'auto' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -50 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Are you sure you want to log out? You'll need to sign in again.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2 min-h-[40px]"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
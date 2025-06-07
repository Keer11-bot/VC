import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, AlertTriangle, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showLogoutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLogoutModal]);

  // Cleanup states on unmount
  useEffect(() => {
    return () => {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      document.body.style.overflow = '';
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/selection');
      return;
    }

    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }

    setIsOpen(false);
  };

  const handleLogoutClick = useCallback(() => {
    if (isLoggingOut) return;
    setShowLogoutModal(true);
    setIsOpen(false);
  }, [isLoggingOut]);

  const confirmLogout = useCallback(async () => {
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
      setShowLogoutModal(false);
      setIsLoggingOut(false);
      
      // Use replace to prevent going back to authenticated pages
      navigate('/auth', { replace: true });

    } catch (error) {
      console.error('Failed to log out:', error);
      
      // Reset states
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      
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
  }, [isLoggingOut, logout, navigate]);

  const cancelLogout = useCallback(() => {
    if (isLoggingOut) return;
    setShowLogoutModal(false);
  }, [isLoggingOut]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showLogoutModal && !isLoggingOut) {
        cancelLogout();
      }
    };

    if (showLogoutModal) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showLogoutModal, isLoggingOut, cancelLogout]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: currentUser ? '/services' : '#services' },
    { name: 'Portfolio', path: currentUser ? '/portfolio' : '#portfolio' },
    { name: 'About', path: currentUser ? '/about' : '#about' },
    { name: 'Collaborations', path: currentUser ? '/colaborations' : '#collaborations' },
    { name: 'Contact', path: '/contact' },
  ];

  // Don't show navbar on auth pages
  if (location.pathname === '/selection' || location.pathname === '/auth') {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark-400/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-10">
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center h-20 w-20">
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className="nav-link text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer relative py-2 px-1"
                  >
                    {item.name}
                  </a>
                ))}
                {currentUser && (
                  <Link
                    to="/assets"
                    className="nav-link text-gray-300 hover:text-white transition-colors duration-300 relative py-2 px-1"
                  >
                    Assets
                  </Link>
                )}
              </div>
            </div>

            {/* Right side - Logout button or empty div for balance */}
            <div className="hidden md:flex items-center min-w-[120px] justify-end">
              {currentUser ? (
                <button
                  onClick={handleLogoutClick}
                  disabled={isLoggingOut}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 min-h-[40px]"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="w-8 h-8"></div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 z-10 relative"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-dark-400/95 backdrop-blur-md rounded-lg mt-2 overflow-hidden"
              >
                <div className="px-4 py-2 space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className="block py-3 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer border-b border-gray-700/50 last:border-b-0"
                    >
                      {item.name}
                    </a>
                  ))}
                  {currentUser && (
                    <>
                      <Link
                        to="/assets"
                        className="block py-3 text-gray-300 hover:text-white transition-colors duration-300 border-b border-gray-700/50"
                        onClick={() => setIsOpen(false)}
                      >
                        Assets
                      </Link>
                      <button
                        onClick={handleLogoutClick}
                        disabled={isLoggingOut}
                        className="w-full text-left py-3 text-red-400 hover:text-red-300 disabled:text-red-500 disabled:cursor-not-allowed transition-colors duration-300 flex items-center space-x-2"
                      >
                        {isLoggingOut ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Logging out...</span>
                          </>
                        ) : (
                          <>
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm"
            onClick={!isLoggingOut ? cancelLogout : undefined}
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
                    onClick={cancelLogout}
                    disabled={isLoggingOut}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
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
    </>
  );
};

export default Navbar;
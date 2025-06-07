import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LogoutModal from './components/LogoutModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { currentUser } = useAuth();
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

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsOpen(false);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

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
                  {/* Add your logo here */}
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
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 min-h-[40px]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
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
                        className="w-full text-left py-3 text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={handleCloseLogoutModal} 
      />
    </>
  );
};

export default Navbar;
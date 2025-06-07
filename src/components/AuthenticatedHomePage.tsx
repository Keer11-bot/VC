import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import Testimonials from './Testimonials';
import Collaborations from './Collaborations';

const AuthenticatedHomePage: React.FC = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    // Always allow normal scrolling - we'll control content visibility instead
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [currentUser]);

  if (!currentUser) {
    // Show Hero and Collaborations sections for unauthenticated users
    return (
      <>
        <Hero />
        <Collaborations />
      </>
    );
  }

  // Show full homepage for authenticated users
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <Collaborations />
    </>
  );
};

export default AuthenticatedHomePage;
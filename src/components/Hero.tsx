import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TextAnimation from './ui/TextAnimation';
import BackgroundVideo from './ui/BackgroundVideo';
import './styles/3dText.css'; // Import custom 3D text styles

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });
  const [contentVisible, setContentVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Trigger animation after component mounts and is in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // 3D parallax effect for the title
  useEffect(() => {
    if (!titleRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;

      const { left, top, width, height } = titleRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;

      titleRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1, 1, 1)`;
    };

    const handleMouseLeave = () => {
      if (!titleRef.current) return;
      titleRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    const el = titleRef.current;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [contentVisible]);

  // Enhanced parallax effect with throttling for better performance
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();

        // Calculate normalized position (0-1)
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        // Apply easing to mouse movement for smoother parallax
        lastX = lastX + (x - lastX) * 0.1;
        lastY = lastY + (y - lastY) * 0.1;

        const elements = heroRef.current.querySelectorAll('.parallax');
        elements.forEach((el) => {
          const speed = parseFloat((el as HTMLElement).dataset.speed || '5');
          const xOffset = lastX * speed;
          const yOffset = lastY * speed;

          // Use hardware-accelerated transform
          (el as HTMLElement).style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });

        rafId = null;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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

  const handleGetStarted = () => {
    if (!currentUser) {
      navigate('/selection');
    } else {
      // If authenticated, navigate to appropriate dashboard
      const userType = localStorage.getItem('userType');
      if (userType === 'startup') {
        navigate('/startup-dashboard');
      } else if (userType === 'investor') {
        navigate('/investor-dashboard');
      } else {
        navigate('/selection');
      }
    }
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      // For unauthenticated users, scroll to collaborations section
      const collaborationsElement = document.querySelector('#collaborations');
      if (collaborationsElement) {
        collaborationsElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If authenticated, scroll to services section
      const servicesElement = document.querySelector('#services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      ref={heroRef}
    >
      <BackgroundVideo
        videoSrc="https://media.istockphoto.com/id/2154912168/video/technology-data-digitally-generated-image-abstract-backgrounds-marketing-the-media-technology.mp4?s=mp4-640x640-is&k=20&c=BdPIqGF5xJvKzmtbZwZRMo6j5XHdj7JdSvn-OP3Ka9o="
        className="z-0"
      />

      <motion.div
        className="container mx-auto px-4 z-10 py-20"
        style={{ opacity, y }}
      >
        <motion.div
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-6">
            {contentVisible && (
              <div ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold transition-transform duration-300 ease-out">
                {/* 3D Main title with enhanced effect */}
                <div className="hero-title-wrapper">
                  <h1 className="hero-title">
                        <img src="/images/VCccccccccccccc-removebg-preview.png" alt="logo" className="h-80 w-80" />
                     
                  </h1>
                </div>

                {/* Enhanced 3D subtitle */}
                <div className="relative inline-block overflow-hidden mt-4">
                  <div className="threed-subtitle-wrapper">
                    <TextAnimation
                      text="Igniting Ideas & Empowering Success"
                      className="threed-subtitle parallax"
                      delay={1.2}
                      duration={0.8}
                      tag="span"
                      charClassName="text-white threed-char"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.button
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 group w-full sm:w-auto relative overflow-hidden button-3d"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(12, 147, 228, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 transition-opacity z-0"
                whileHover={{ opacity: 1 }}
              />
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 3.5 }}
            className="mt-16 md:mt-24 flex items-center justify-center"
          >
            <motion.button
              onClick={handleScrollDown}
              className="flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors cursor-pointer"
              whileHover={{ y: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-0 left-0 w-full"
        >
          <div className="w-full h-24 bg-gradient-to-t from-dark-300 to-transparent"></div>
        </motion.div>

        {/* Floating elements with improved animation */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-16 h-16 rounded-full bg-primary-500/20 blur-xl parallax"
          data-speed="8"
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-24 h-24 rounded-full bg-accent-500/20 blur-xl parallax"
          data-speed="6"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-secondary-500/20 blur-xl parallax"
          data-speed="10"
          animate={{
            y: [0, -15, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 7,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
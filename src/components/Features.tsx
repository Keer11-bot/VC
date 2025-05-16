import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Layers, Zap } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // 3D effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);
  
  // Spring physics for smooth animation
  const springConfig = { damping: 30, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Floating animation
  const floatY = useMotionValue(0);
  const floatAnimation = useAnimation();
  
  useEffect(() => {
    // Floating animation sequence
    const startFloatingAnimation = async () => {
      while (true) {
        await floatAnimation.start({
          y: [0, -15, 0, 15, 0],
          transition: { 
            duration: 6, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      }
    };
    
    startFloatingAnimation();
    
    // Auto-cycle through features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mouse move handler for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee to keep your business running smoothly.',
      strength: "",
      color: 'from-black-500 to-black-600',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Scalable Architecture',
      description: 'Our solutions grow with your business, from startup to enterprise, without missing a beat.',
      strength: "",
      color: 'from-black-500 to-black-600',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with global CDN and edge caching for lightning-fast load times.',
      strength: "",
      color: 'from-black-500 to-black-600',
      image: 'https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24,
        mass: 1
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${features[i].strength}%`,
      transition: { 
        duration: 1.2, 
        delay: 0.6 + (i * 0.1),
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <section 
      id="features" 
      className="py-24 bg-dark-400 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Powerful Features"
          description="Our platform comes packed with features designed to elevate your digital presence and drive results."
        />
        
        <div className="mt-20 flex flex-col lg:flex-row gap-16">
          {/* Left side: Features list */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative group ${index === activeFeature ? 'scale-[1.02]' : 'scale-100'} transform transition-all duration-500`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`p-6 rounded-xl backdrop-blur-md ${index === activeFeature ? 'bg-white/10' : 'bg-white/5'} 
                  border border-white/10 transition-all duration-500 hover:border-white/20 cursor-pointer`}>
                  <div className="flex items-start gap-5">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white/90 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                          custom={index}
                          variants={progressVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Active indicator */}
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-transparent via-white to-transparent"
                  animate={{ 
                    height: index === activeFeature ? '80%' : '0%',
                    opacity: index === activeFeature ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Right side: 3D interactive graphic */}
          <motion.div 
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div 
              ref={imageRef}
              className="relative w-full max-w-lg aspect-square"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* 3D floating element */}
              <motion.div
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  y: floatY,
                  transformPerspective: 1000,
                  transformStyle: "preserve-3d"
                }}
                animate={floatAnimation}
                className="w-full h-full relative"
              >
                {/* Feature spotlight based on active feature */}
                <motion.div 
                  className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br shadow-2xl shadow-white/5
                    ${features[activeFeature].color} p-8 flex flex-col items-center justify-center text-white
                    before:absolute before:inset-0 before:bg-black/40 before:z-0`}
                  animate={{ 
                    rotateZ: [0, 2, 0, -2, 0],
                    scale: [1, 1.01, 1, 0.99, 1]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-ping-slow w-32 h-32 rounded-full bg-white/10"></div>
                  </div>
                  
                  {/* Image container replacing the icon */}
                  <motion.div 
                    className="relative z-10 w-full h-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "loop" 
                    }}
                  >
                    <div className="relative w-4/5 h-4/5 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img 
                        src={features[activeFeature].image} 
                        alt={features[activeFeature].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="mt-8 text-2xl font-bold text-center relative z-10"
                    animate={{ y: [0, -5, 0, 5, 0] }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "loop" 
                    }}
                  >
                    {features[activeFeature].title}
                  </motion.h3>
                  
                  <div className="mt-4 w-24 h-1 bg-white/30 rounded-full"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                    <svg preserveAspectRatio="none" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" 
                        className="relative block w-[112%] h-[60px] rotate-0">
                      <motion.path 
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                        opacity=".25" 
                        className="fill-white"
                        animate={{ 
                          d: [
                            "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                            "M0,0V46.29c47.79,22.2,95.59,42.17,178,38,84.36-5.37,132.33-33.31,202.8-37.5C454.64,42.43,504.34,53.67,583,72.05c39.27,18,148.3,14.88,209.4,3.08,56.15-6,79.85-17.84,114.45-29.34C999.49,35,1113-14.29,1200,52.47V0Z",
                            "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                          ]
                        }}
                        transition={{ 
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "loop" 
                        }}
                      />
                    </svg>
                  </div>
                </motion.div>
                
                {/* Highlight effect */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 blur-sm group-hover:blur-md transition-all duration-1000 opacity-70"></div>
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-white/5 to-transparent blur-md"></div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/30"
                    initial={{ 
                      x: Math.random() * 400 - 200, 
                      y: Math.random() * 400 - 200,
                      opacity: 0.1 + Math.random() * 0.5,
                      scale: 0.2 + Math.random() * 0.8
                    }}
                    animate={{ 
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      opacity: [0.1 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.1 + Math.random() * 0.5]
                    }}
                    transition={{ 
                      duration: 5 + Math.random() * 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <button className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-accent-500 text-white px-10 py-4 rounded-full group">
            <span className="relative z-10">Explore All Features</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 right-full w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-700"></span>
          </button>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-300 to-transparent"></div>
      <div className="absolute top-1/4 right-20 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Features;
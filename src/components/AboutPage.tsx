import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';

const AboutPage: React.FC = () => {
  const controls = useAnimation();
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  // Transform values for the bounce effect
  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  // Add spring physics for smoother animation
  const springConfig = { damping: 10, stiffness: 100, mass: 1 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Handle mouse movement for the bounce effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);

    // Trigger bounce animation
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const stats = [
    { value: '300+', label: 'Happy Clients' },
    { value: '27+', label: 'Successful Start-Ups' },
    { value: '73+', label: 'Completed Projects' },
    { value: '3+', label: 'Years of Experience' },
  ];


  return (
    <div className="min-h-screen pt-20 bg-dark-400">
      {/* Hero Section with Interactive Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-3/5"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h1>
              <p className="text-xl text-gray-400 mb-6">
               Vivaran Creations is a dynamic force in the world of innovation, founded with a vision to empower the next generation of entrepreneurs and businesses. Led by CEO Damodari Balaji, Vivaran Creations specializes as a Startup Incubator, providing technical assistance, executive management support, and strategic guidance to help startups transform ideas into successful ventures.
              </p>
              <p className="text-lg text-gray-400 mb-6">
                Our expertise spans across IT Services and IT Consulting, offering tailored technology solutions to fuel business growth, streamline operations, and enhance digital presence. At Vivaran Creations, we are committed to building a thriving ecosystem where innovation meets execution, and ideas find the resources and mentorship they need to succeed.
               </p>
              <p className="text-lg text-gray-400 mb-6">
                We believe in fostering a culture of collaboration, creativity, and excellence, turning ambitious visions into impactful realities.
               </p>
              <p className="text-lg text-gray-400 mb-6">
                Vivaran Creations - Igniting Ideas, Empowering Success
               </p>
            </motion.div>

            {/* Interactive Bouncing Image Container */}
            <motion.div
              className="lg:w-2/5 perspective-1000"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="relative w-full h-80 md:h-96 glass rounded-xl p-3 overflow-hidden"
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  transformStyle: "preserve-3d",
                }}
                animate={controls}
                whileHover={{ scale: 1.02 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg" />
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover rounded-lg"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-400/90 to-transparent p-6"
                  style={{ translateZ: 50 }}
                >
                  <p className="text-lg font-semibold text-white">Innovative solutions for the digital age</p>
                </motion.div>

                {/* Decorative elements for enhanced 3D effect */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-500/40 blur-md"
                  style={{ translateZ: 30 }}
                />
                <motion.div
                  className="absolute bottom-12 left-4 w-8 h-8 rounded-full bg-accent-500/40 blur-md"
                  style={{ translateZ: 20 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl"></div>
      </section>

      

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';
import { Code, Layers, Monitor, Server, Database, Shield } from 'lucide-react';

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
    { value: '500+', label: 'Clients Worldwide' },
    { value: '1200+', label: 'Projects Completed' },
    { value: '150+', label: 'Team Members' },
    { value: '25+', label: 'Countries Served' },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We constantly push boundaries and embrace emerging technologies.',
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We are committed in delivering exceptional results.',
    },
    {
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in everything we do.',
    },
    {
      title: 'Global Perspective',
      description: 'Our diverse team brings worldwide insights and expertise.',
    },
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
                From humble beginnings to industry leadership, we've been pioneering digital transformation
                since 2015. Our journey has been defined by constant innovation, exceptional talent, and
                unwavering commitment to our clients' success.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                As a full-service digital technology company, we specialize in developing enterprise-grade
                solutions that help businesses navigate the complexities of digital transformation. Our team
                of experts combines deep technical knowledge with strategic thinking to create solutions that
                not only meet today's needs but anticipate tomorrow's challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium inline-block"
                  style={{ transformOrigin: "center" }}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Our Services
                  </motion.span>
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-transparent border border-gray-600 rounded-lg font-medium hover:border-primary-400 inline-block"
                  style={{ transformOrigin: "center" }}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.span>
                </Link>
              </div>
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

      {/* Company Description Section */}
      <section className="py-20 bg-dark-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">What We <span className="text-gradient">Do</span></h2>
            <p className="text-xl text-gray-400">
              We transform businesses through technology, delivering innovative digital solutions
              that drive efficiency, growth, and competitive advantage. Our comprehensive suite of
              services is designed to address the most complex challenges facing modern enterprises.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Web Development & Digital Solutions</h3>
                <p className="text-gray-400 mb-6">
                  We create cutting-edge web applications and digital platforms that deliver exceptional user experiences.
                  Our solutions combine innovative design with robust architecture to ensure scalability and performance.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary-400" />
                    Custom Web Applications
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary-400" />
                    Progressive Web Apps
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary-400" />
                    E-commerce Solutions
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 glass rounded-xl p-6">
                <img
                  src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                  alt="Web Development"
                  className="rounded-lg w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row-reverse items-center gap-8"
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Enterprise Solutions & Cloud Architecture</h3>
                <p className="text-gray-400 mb-6">
                  We design and implement comprehensive enterprise solutions that streamline operations
                  and drive digital transformation. Our cloud-first approach ensures scalability and reliability.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary-400" />
                    Cloud Infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary-400" />
                    Data Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary-400" />
                    Security Solutions
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 glass rounded-xl p-6">
                <img
                  src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg"
                  alt="Enterprise Solutions"
                  className="rounded-lg w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
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

      {/* Values Section */}
      <section className="py-20 bg-dark-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto glass rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl text-gray-400">
              To be the global leader in digital innovation, empowering businesses to thrive in
              the digital age through cutting-edge solutions and unparalleled expertise.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
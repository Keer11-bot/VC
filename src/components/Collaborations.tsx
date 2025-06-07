import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';

const Collaborations: React.FC = () => {
  

  const partners = [
    {
      id: "bharat-edge",
      name: "Bharat Edge",
      logo: <img
        src="https://bharat-edge.com/wp-content/uploads/2024/01/BE-LOGO-Grey-2048x506.png"
        alt="Bharat Edge"
        className="h-18 w-20 object-cover"
      />,
      description: "Digital transformation and enterprise solutions provider.",
      partnership: "Strategic Partner",
      image: "https://bharat-edge.com/wp-content/uploads/2024/01/BE-LOGO-Grey-2048x506.png"
    },
    {
      id: "stellar",
      name: "Stellar",
      logo: <img
        src="/images/Stellar-Logo.jpg"
        alt="Stellar"
        className="h-18 w-20 object-cover"
      />,
      description: "Web Appliacations Development",
      partnership: "Strategic Partner",
      image: "/images/Stellar-Logo.jpg"
    },
    {
      id: "sprintm",
      name: "SprintM",
      logo: <img
        src="/images/Edu-Tech-Logo.jpg"
        alt="SprintM"
        className="h-16 w-auto object-cover"
      />,
      description: "Educational technology and e-learning platform solutions.",
      partnership: "Strategic Partner",
      image: "/images/Edu-Tech-Logo.jpg"
    },
    {
      id: "algowise-technologies",
      name: "AlgoWise Technologies",
      logo: <img
        src="/images/AlgoWise-logo.jpg"
        alt="AlgoWise"
        className="h-18 w-20"
      />,
      description: "AI and machine learning development solutions.",
      partnership: "R&D Partner",
      image: "/images/AlgoWise-logo.jpg"
    },
    {
      id: "vivaran-consultancies",
      name: "Vivaran Consultancy",
      logo: <img
        src="/images/V-consultancies-Logo.jpg"
        alt="Vivaran Consultancies"
        className="h-18 w-20"
      />,
      description: "Strategic technology consulting and business transformation services.",
      partnership: "Educational Consultancy",
      image: "/images/V-consultancies-Logo.jpg"
    }
  ];

  // Container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      }
    }
  };

  // Card variants with falling and arranging animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.9,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.8,
        duration: 2,
      }
    }
  };

  

  return (
    <section id="collaborations" className="py-20 bg-dark-400 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            subtitle="Our Partners"
            title="Strategic Collaborations"
            description="We partner with industry leaders to deliver exceptional value and innovation to our clients."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass rounded-xl overflow-hidden group animate-on-scroll cursor-pointer"
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              
            >
              <div className="relative h-48">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/50 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <span className="text-sm text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full">
                      {partner.partnership}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="p-3 rounded-lg bg-primary-500/10"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {partner.logo}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{partner.description}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <motion.button
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm font-medium"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Learn More →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            type: "spring",
            stiffness: 100
          }}
          className="mt-16 text-center"
        >
          <motion.button
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Become a Partner
          </motion.button>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Collaborations;
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Gamepad2, BookOpen } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  image: string;
  delay: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ icon, title, category, description, image, delay, onClick }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.1,
      filter: "blur(20px)",
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        delay: delay * 0.2,
        when: "beforeChildren"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.2 + 0.3,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="glass rounded-xl overflow-hidden cursor-pointer group animate-on-scroll relative"
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="relative h-48 overflow-hidden"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay * 0.2 + 0.2, duration: 0.6 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-transparent to-transparent"></div>
      </motion.div>

      <motion.div
        className="p-6"
        variants={contentVariants}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="p-2 rounded-lg bg-primary-500/10"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: delay * 0.2 + 0.4, duration: 0.6 }}
          >
            {icon}
          </motion.div>
          <span className="text-sm text-primary-400">{category}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 'PersonaMatch',
      icon: <img
        src="https://vivarancreations.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-06-at-17.31.51_301a8173-768x711.jpg"
        alt="PersonaMatch"
        className="h-6 w-6"
      />,
      title: "Online Dating Platform",
      category: "Web Application",
      description: "A comprehensive platform for managing innovation projects and team collaboration.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'Mentaura AI',
      icon: <img
        src="https://vivarancreations.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-06-at-17.31.51_0e6cccdb-e1743958439181-607x562.jpg"
        alt="Mentaura AI"
        className="h-6 w-6"
      />,
      title: "Mentaura AI",
      category: "Digital Art Platform",
      description: "Online marketplace for digital artists to showcase and sell their artwork.",
      image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'Meta-SEO',
      icon: <img
        src="https://vivarancreations.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-06-at-17.31.51_95473b7b-768x711.jpg"
        alt="Meta-SEO"
        className="h-6 w-6"
      />,
      title: "SEO Optimizer",
      category: "E-commerce",
      description: "Feature-rich e-commerce solution with advanced analytics and inventory management.",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'corporate-suite',
      icon: <Building2 className="h-6 w-6 text-primary-400" />,
      title: "Corporate Suite",
      category: "Enterprise Solution",
      description: "Integrated enterprise management system for large corporations.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'game-verse',
      icon: <Gamepad2 className="h-6 w-6 text-primary-400" />,
      title: "GameVerse",
      category: "Gaming Platform",
      description: "Cloud gaming platform with social features and tournament management.",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'Edu',
      icon: <BookOpen className="h-6 w-6 text-primary-400" />,
      title: "EduPortal",
      category: "Education",
      description: "Comprehensive learning management system for educational institutions.",
      image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const handleProjectClick = (projectId: string) => {
    navigate(`/portfolio?project=${projectId}`);
  };

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Our Work"
          title="Recent Projects"
          description="Explore our portfolio of successful projects that showcase our expertise and innovation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              icon={project.icon}
              title={project.title}
              category={project.category}
              description={project.description}
              image={project.image}
              delay={index}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Portfolio;
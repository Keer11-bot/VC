import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Layout, Smartphone, Globe, Rocket, Cpu } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  onClick: () => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, onClick, index }) => {
  // Determine if the card should come from left or right
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: isEven ? -100 : 100,
        y: 20,
        rotate: isEven ? -10 : 10
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        y: 0,
        rotate: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 1,
        delay: delay * 0.15
      }}
      className="glass rounded-xl p-6 animate-on-scroll group cursor-pointer"
      onClick={onClick}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="mb-4 p-3 rounded-lg bg-primary-500/10 inline-block group-hover:bg-primary-500/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors duration-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'startup',
      icon: <Layout className="h-6 w-6 text-primary-400" />,
      title: "Startup development",
      description: "Creating intuitive and engaging user experiences that delight customers and enhance brand perception."
    },
    {
      id: 'web-development',
      icon: <Code className="h-6 w-6 text-primary-400" />,
      title: "Web Development",
      description: "Building responsive, high-performance websites using the latest technologies and best practices."
    },
    {
      id: 'Incubator',
      icon: <Smartphone className="h-6 w-6 text-primary-400" />,
      title: "Incubator",
      description: "Developing cross-platform mobile applications that provide seamless experiences across all devices."
    },
    {
      id: 'digital-marketing',
      icon: <Globe className="h-6 w-6 text-primary-400" />,
      title: "Digital Marketing",
      description: "Strategic marketing solutions that increase visibility, drive traffic, and convert leads into customers."
    },
    {
      id: 'business-strategy',
      icon: <Rocket className="h-6 w-6 text-primary-400" />,
      title: "Business Analysis",
      description: "Comprehensive business analysis and strategic planning to help organizations achieve their goals."
    },
    {
      id: 'ai-integration',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "AI & ML Integration",
      description: "Implementing cutting-edge AI solutions to automate processes and provide data-driven insights."
    },
    {
      id: 'Stake holder engagement',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "Stake holder engagement",
      description: "Building strong relationships and fostering open communication between all key stakeholders to ensure alignment, transparency, and successful project outcomes."
    },
    {
      id: 'Database management',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "Database management",
      description: "Designing, maintaining, and optimizing secure, scalable databases to ensure data integrity, accessibility, and performance for seamless business operations."
    },
    {
      id: 'Network administration',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "Network administration",
      description: "Managing and securing network infrastructure to ensure reliable connectivity, high availability, and robust cybersecurity across distributed environments."
    },
    {
      id: 'Data analysis',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "Data analysis",
      description: "Extracting meaningful insights from complex datasets through advanced analytics, visualization, and reporting tools to drive informed decision-making."
    },
    {
      id: 'IT support and Troubleshooting',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "IT support and Troubleshooting",
      description: "Providing timely technical assistance, system maintenance, and issue resolution to keep your digital infrastructure running smoothly and efficiently."
    },
    {
      id: 'Human Resources',
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "Human Resources",
      description: "Supporting talent acquisition, employee engagement, and organizational development to build a motivated, productive, and inclusive workplace culture."
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services?service=${serviceId}`);
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="What We Offer"
          title="Our Services"
          description="We provide end-to-end digital solutions to help businesses thrive in the digital landscape."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
              onClick={() => handleServiceClick(service.id)}
              index={index}
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

export default Services;
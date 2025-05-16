import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Code, Layout, Smartphone, Globe, Rocket, Cpu } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface ServiceDetail {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  process: {
    title: string;
    description: string;
  }[];
  technologies: string[];
}

const ServiceDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeService, setActiveService] = useState<string>(searchParams.get('service') || 'web-development');

  const services: Record<string, ServiceDetail> = {
    'ui-ux-design': {
      id: 'ui-ux-design',
      icon: <Layout className="h-8 w-8 text-primary-400" />,
      title: "UI/UX Design",
      description: "Transform your digital presence with intuitive and engaging user experiences that delight customers and enhance brand perception.",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design",
        "Interaction Design",
        "Usability Testing",
        "Design Systems"
      ],
      process: [
        {
          title: "Discovery",
          description: "We start by understanding your users, business goals, and market position."
        },
        {
          title: "Design",
          description: "Create wireframes and visual designs that align with your brand and user needs."
        },
        {
          title: "Testing",
          description: "Rigorous testing ensures the design meets user expectations and business goals."
        }
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"]
    },
    'web-development': {
      id: 'web-development',
      icon: <Code className="h-8 w-8 text-primary-400" />,
      title: "Web Development",
      description: "Build powerful, scalable web applications using cutting-edge technologies and best practices.",
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "Content Management Systems",
        "Progressive Web Apps",
        "API Development",
        "Performance Optimization"
      ],
      process: [
        {
          title: "Planning",
          description: "Define technical requirements and create development roadmap."
        },
        {
          title: "Development",
          description: "Agile development process with regular updates and testing."
        },
        {
          title: "Deployment",
          description: "Smooth deployment with continuous monitoring and support."
        }
      ],
      technologies: ["React", "Node.js", "TypeScript", "Next.js", "GraphQL"]
    },
    'mobile-apps': {
      id: 'mobile-apps',
      icon: <Smartphone className="h-8 w-8 text-primary-400" />,
      title: "Mobile Apps",
      description: "Create native and cross-platform mobile applications that provide seamless experiences across all devices.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Solutions",
        "App Store Optimization",
        "Push Notifications",
        "Offline Support"
      ],
      process: [
        {
          title: "Strategy",
          description: "Define app features and create technical specifications."
        },
        {
          title: "Development",
          description: "Iterative development with focus on performance and user experience."
        },
        {
          title: "Launch",
          description: "App store submission and post-launch support."
        }
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
    },
    'digital-marketing': {
      id: 'digital-marketing',
      icon: <Globe className="h-8 w-8 text-primary-400" />,
      title: "Digital Marketing",
      description: "Drive growth through data-driven digital marketing strategies that increase visibility and conversions.",
      features: [
        "SEO Optimization",
        "Content Marketing",
        "Social Media Management",
        "Email Marketing",
        "PPC Campaigns",
        "Analytics & Reporting"
      ],
      process: [
        {
          title: "Analysis",
          description: "Research market trends and competitor analysis."
        },
        {
          title: "Strategy",
          description: "Develop comprehensive marketing plan and content strategy."
        },
        {
          title: "Execution",
          description: "Implement campaigns with continuous optimization."
        }
      ],
      technologies: ["Google Analytics", "SEMrush", "HubSpot", "Mailchimp", "Meta Ads"]
    },
    'business-strategy': {
      id: 'business-strategy',
      icon: <Rocket className="h-8 w-8 text-primary-400" />,
      title: "Business Strategy",
      description: "Develop comprehensive business strategies that drive growth and maximize ROI.",
      features: [
        "Market Analysis",
        "Growth Strategy",
        "Digital Transformation",
        "Process Optimization",
        "Risk Management",
        "Performance Metrics"
      ],
      process: [
        {
          title: "Assessment",
          description: "Evaluate current business state and identify opportunities."
        },
        {
          title: "Planning",
          description: "Develop strategic roadmap and action plans."
        },
        {
          title: "Implementation",
          description: "Execute strategy with measurable milestones."
        }
      ],
      technologies: ["Tableau", "Power BI", "Asana", "Slack", "Jira"]
    },
    'ai-integration': {
      id: 'ai-integration',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "AI Integration",
      description: "Leverage artificial intelligence to automate processes and gain valuable insights.",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics",
        "Process Automation",
        "AI Consulting"
      ],
      process: [
        {
          title: "Assessment",
          description: "Identify AI opportunities and feasibility analysis."
        },
        {
          title: "Development",
          description: "Build and train AI models for specific use cases."
        },
        {
          title: "Integration",
          description: "Seamless integration with existing systems."
        }
      ],
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Azure AI", "AWS SageMaker"]
    }
  };

  const currentService = services[activeService];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeService]);

  return (
    <div className="pt-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {Object.values(services).map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeService === service.id
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'bg-dark-200 text-gray-400 hover:bg-dark-100'
              }`}
            >
              {service.icon}
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={currentService.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <SectionTitle
            subtitle="Our Expertise"
            title={currentService.title}
            description={currentService.description}
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-4">
                {currentService.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary-400" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {currentService.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="px-4 py-2 rounded-full bg-dark-200 text-primary-400"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Our Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentService.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass rounded-xl p-6 relative"
                >
                  <div className="absolute -top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 mt-2">{step.title}</h4>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </div>
  );
};

export default ServiceDetails;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Code, Layout, Smartphone, Globe, Rocket, Cpu } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceDetail {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  process: ProcessStep[];
  technologies: string[];
}

const ServiceDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeService, setActiveService] = useState<string>(
    searchParams.get('service') || 'web-development'
  );

  // Sync state with URL query params
  useEffect(() => {
    const serviceId = searchParams.get('service') || 'web-development';
    setActiveService(serviceId);
  }, [searchParams]);

  // Define services object
  const services: Record<string, ServiceDetail> = {
    'startup': {
      id: 'startup',
      icon: <Layout className="h-8 w-8 text-primary-400" />,
      title: "Startup development",
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
    'Incubator': {
      id: 'Incubator',
      icon: <Smartphone className="h-8 w-8 text-primary-400" />,
      title: "Incubator",
      description: "Create native and cross-platform mobile applications that provide seamless experiences across all devices.",
      features: [
        "Startup Mentorship",
        "Business Strategy Development",
        "Access to Investors & Funding",
        "Legal & Compliance Support",
        "Product Validation & MVP Development",
        "Networking & Community Building"
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
      technologies: [
        "Notion",
        "Trello",
        "Slack",
        "Zoom",
        "Google Workspace",
        "PitchDeck Tools (Canva, Pitch)"
      ]
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
      title: "Business Analysis",
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
      title: "AI & ML Integration",
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
    },
    'Stake holder engagement': {
      id: 'Stake holder engagement',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "Stake holder engagement",
      description: "Building strong relationships and fostering open communication between all key stakeholders to ensure alignment, transparency, and successful project outcomes.",
      features: [
        "Stakeholder Mapping",
        "Communication Strategy",
        "Expectation Management",
        "Engagement Planning",
        "Feedback Collection",
        "Collaborative Decision-Making"
      ],
      process: [
        {
          title: "Stakeholder Mapping",
          description: "Identify key stakeholders and their roles."
        },
        {
          title: "Engagement Planning",
          description: "Develop communication strategies and engagement plans."
        },
        {
          title: "Execution & Feedback",
          description: "Implement engagement initiatives and gather feedback."
        }
      ],
      technologies: ["Microsoft Teams", "Slack", "Trello", "Asana", "Miro"]
    },
    'Database management': {
      id: 'Database management',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "Database management",
      description: "Designing, maintaining, and optimizing secure, scalable databases to ensure data integrity, accessibility, and performance for seamless business operations.",
      features: [
        "Database Design",
        "Data Modeling",
        "Backup & Recovery",
        "Performance Tuning",
        "Security & Compliance",
        "Migration & Integration"
      ],
      process: [
        {
          title: "Requirement Analysis",
          description: "Understand data needs and system requirements."
        },
        {
          title: "Design & Implementation",
          description: "Design database schema and deploy secure systems."
        },
        {
          title: "Maintenance & Optimization",
          description: "Ensure performance, security, and scalability over time."
        }
      ],
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "Oracle", "Redis", "Firebase"]
    },
    'Network administration': {
      id: 'Network administration',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "Network administration",
      description: "Managing and securing network infrastructure to ensure reliable connectivity, high availability, and robust cybersecurity across distributed environments.",
      features: [
        "Network Monitoring",
        "Firewall & Security",
        "LAN/WAN Management",
        "Cloud Networking",
        "Access Control",
        "Disaster Recovery"
      ],
      process: [
        {
          title: "Network Design",
          description: "Plan and configure scalable network architecture."
        },
        {
          title: "Deployment",
          description: "Implement and secure network infrastructure."
        },
        {
          title: "Monitoring & Maintenance",
          description: "Ensure uptime with proactive monitoring and support."
        }
      ],
      technologies: ["Cisco", "Juniper", "PfSense", "Zabbix", "Nagios", "Wireshark"]
    },
    'Data analysis': {
      id: 'Data analysis',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "Data analysis",
      description: "Extracting meaningful insights from complex datasets through advanced analytics, visualization, and reporting tools to drive informed decision-making.",
      features: [
        "Data Visualization",
        "Predictive Modeling",
        "Big Data Processing",
        "Business Intelligence",
        "KPI Dashboards",
        "Data-Driven Insights"
      ],
      process: [
        {
          title: "Data Collection",
          description: "Gather and clean relevant data from multiple sources."
        },
        {
          title: "Analysis & Modeling",
          description: "Apply statistical methods and visualization tools."
        },
        {
          title: "Reporting",
          description: "Deliver actionable insights through dashboards and reports."
        }
      ],
      technologies: ["Python", "R", "SQL", "Tableau", "Power BI", "Excel"]
    },
    'IT support and Troubleshooting': {
      id: 'IT support and Troubleshooting',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "IT support and Troubleshooting",
      description: "Providing timely technical assistance, system maintenance, and issue resolution to keep your digital infrastructure running smoothly and efficiently.",
      features: [
        "Help Desk Services",
        "System Maintenance",
        "Remote Support",
        "Hardware & Software Repair",
        "Troubleshooting",
        "End-User Training"
      ],
      process: [
        {
          title: "Issue Identification",
          description: "Diagnose hardware, software, or network problems."
        },
        {
          title: "Resolution",
          description: "Provide timely fixes and technical support."
        },
        {
          title: "Follow-Up",
          description: "Ensure long-term stability and user satisfaction."
        }
      ],
      technologies: ["Windows Admin Center", "Remote Desktop", "Spiceworks", "Zendesk", "Jira Service Desk"]
    },
    'Human Resources': {
      id: 'Human Resources',
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "Human Resources",
      description: "Supporting talent acquisition, employee engagement, and organizational development to build a motivated, productive, and inclusive workplace culture.",
      features: [
        "Recruitment & Onboarding",
        "Employee Relations",
        "HR Policy Development",
        "Training & Development",
        "Performance Management",
        "Payroll & Compliance"
      ],
      process: [
        {
          title: "Recruitment Strategy",
          description: "Define hiring goals and sourcing strategy."
        },
        {
          title: "Onboarding & Development",
          description: "Integrate new hires and provide growth opportunities."
        },
        {
          title: "Performance Management",
          description: "Track performance and drive continuous improvement."
        }
      ],
      technologies: ["BambooHR", "Workday", "Zoho People", "Greenhouse", "LinkedIn Recruiter", "Paycom"]
    }
  };

  // Get current service based on active ID
  const currentService = services[activeService];

  // Scroll to top on service change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeService]);

  // Handle invalid or undefined service
  if (!currentService) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-2">Service Not Found</h2>
        <p className="text-gray-400 mb-6">The requested service does not exist.</p>
        <button
          onClick={() => {
            setSearchParams({ service: 'web-development' });
            setActiveService('web-development');
          }}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded transition-colors duration-300"
        >
          Go to Web Development
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {Object.values(services).map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveService(service.id);
                setSearchParams({ service: service.id });
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${activeService === service.id
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
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
                    className="px-4 py-2 rounded-full bg-gray-800 text-primary-400"
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
                  <div className="absolute -top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-medium">
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

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </div>
  );
};

export default ServiceDetails;
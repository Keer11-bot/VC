import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Code2, CheckCircle, Users, Globe } from 'lucide-react';

interface ProjectDetail {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: {
    name: string;
    position: string;
    company: string;
    quote: string;
  };
  stats: {
    icon: React.ReactNode;
    value: string;
    label: string;
  }[];
}

const PortfolioDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeProject] = useState<string>(searchParams.get('project') || 'tech-innovate');

  const projects: Record<string, ProjectDetail> = {
    'PersonaMatch': {
      id: 'PersonaMatch',
      icon: <Code2 className="h-8 w-8 text-primary-400" />,
      title: "Online Dating Platform",
      category: "Web Application",
      description: "A comprehensive platform for managing innovation projects and team collaboration.",
      image: "https://vivarancreations.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-06-at-17.31.51_301a8173-768x711.jpg",
      challenge: "The client needed a scalable platform to manage multiple innovation projects across different teams while maintaining efficient collaboration and progress tracking.",
      solution: "We developed a custom web application with real-time collaboration features, project management tools, and advanced analytics to track innovation metrics.",
      results: [
        "50% increase in team productivity",
        "30% reduction in project completion time",
        "90% user satisfaction rate",
        "Successfully managing 100+ concurrent projects"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
      testimonial: {
        name: "Sarah Chen",
        position: "CTO",
        company: "TechCorp Inc.",
        quote: "The platform has transformed how we manage innovation projects. It's intuitive, powerful, and has become an essential part of our daily operations."
      },
      stats: [
        {
          icon: <Users className="h-6 w-6 text-primary-400" />,
          value: "10,000+",
          label: "Active Users"
        },
        {
          icon: <CheckCircle className="h-6 w-6 text-primary-400" />,
          value: "500+",
          label: "Projects Completed"
        },
        {
          icon: <Globe className="h-6 w-6 text-primary-400" />,
          value: "25+",
          label: "Countries"
        }
      ]
    },
    'Mentaura AI': {
      id: 'Mentaura AI',
      icon: <Code2 className="h-8 w-8 text-primary-400" />,
      title: "Mentaura AI",
      category: "Web Application",
      description: "A comprehensive platform for managing innovation projects and team collaboration.",
      image: "https://vivarancreations.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-06-at-17.31.51_0e6cccdb-e1743958439181-607x562.jpg",
      challenge: "The client needed a scalable platform to manage multiple innovation projects across different teams while maintaining efficient collaboration and progress tracking.",
      solution: "We developed a custom web application with real-time collaboration features, project management tools, and advanced analytics to track innovation metrics.",
      results: [
        "50% increase in team productivity",
        "30% reduction in project completion time",
        "90% user satisfaction rate",
        "Successfully managing 100+ concurrent projects"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
      testimonial: {
        name: "Sarah Chen",
        position: "CTO",
        company: "TechCorp Inc.",
        quote: "The platform has transformed how we manage innovation projects. It's intuitive, powerful, and has become an essential part of our daily operations."
      },
      stats: [
        {
          icon: <Users className="h-6 w-6 text-primary-400" />,
          value: "10,000+",
          label: "Active Users"
        },
        {
          icon: <CheckCircle className="h-6 w-6 text-primary-400" />,
          value: "500+",
          label: "Projects Completed"
        },
        {
          icon: <Globe className="h-6 w-6 text-primary-400" />,
          value: "25+",
          label: "Countries"
        }
      ]
    },
    'Meta-SEO': {
      id: 'Meta-SEO',
      icon: <Code2 className="h-8 w-8 text-primary-400" />,
      title: "SEO Optimizer",
      category: "Web Application",
      description: "A comprehensive platform for managing innovation projects and team collaboration.",
      image: "https://vivarancreations.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-06-at-17.31.51_95473b7b-768x711.jpg",
      challenge: "The client needed a scalable platform to manage multiple innovation projects across different teams while maintaining efficient collaboration and progress tracking.",
      solution: "We developed a custom web application with real-time collaboration features, project management tools, and advanced analytics to track innovation metrics.",
      results: [
        "50% increase in team productivity",
        "30% reduction in project completion time",
        "90% user satisfaction rate",
        "Successfully managing 100+ concurrent projects"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
      testimonial: {
        name: "Sarah Chen",
        position: "CTO",
        company: "TechCorp Inc.",
        quote: "The platform has transformed how we manage innovation projects. It's intuitive, powerful, and has become an essential part of our daily operations."
      },
      stats: [
        {
          icon: <Users className="h-6 w-6 text-primary-400" />,
          value: "10,000+",
          label: "Active Users"
        },
        {
          icon: <CheckCircle className="h-6 w-6 text-primary-400" />,
          value: "500+",
          label: "Projects Completed"
        },
        {
          icon: <Globe className="h-6 w-6 text-primary-400" />,
          value: "25+",
          label: "Countries"
        }
      ]
    },
    // Add more project details here...
  };

  const currentProject = projects[activeProject];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProject]);

  return (
    <div className="pt-28">
      <div className="container mx-auto px-4">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative h-96 rounded-xl overflow-hidden mb-12">
            <img 
              src={currentProject.image} 
              alt={currentProject.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary-500/10 backdrop-blur-sm">
                  {currentProject.icon}
                </div>
                <span className="text-sm text-primary-400 bg-dark-300/80 px-3 py-1 rounded-full">
                  {currentProject.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold">{currentProject.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {currentProject.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="bg-primary-500/10 p-3 rounded-lg inline-block mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <p className="text-gray-400">{currentProject.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
              <p className="text-gray-400">{currentProject.solution}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl p-6 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Key Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProject.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary-400" />
                  <span>{result}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {currentProject.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-8 mb-12"
            >
              <div className="flex flex-col items-center text-center">
                <blockquote className="text-xl italic text-gray-300 mb-6">
                  "{currentProject.testimonial.quote}"
                </blockquote>
                <div className="font-semibold">{currentProject.testimonial.name}</div>
                <div className="text-gray-400">
                  {currentProject.testimonial.position}, {currentProject.testimonial.company}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {currentProject.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-dark-200 text-primary-400"
                >
                  {tech}
                </motion.span>
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

export default PortfolioDetails;
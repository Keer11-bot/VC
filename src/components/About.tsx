import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const About: React.FC = () => {
  const stats = [
    { icon: <Users className="h-6 w-6 text-primary-400" />, value: '500+', label: 'Happy Clients' },
    { icon: <Briefcase className="h-6 w-6 text-primary-400" />, value: '1200+', label: 'Projects Completed' },
    { icon: <Calendar className="h-6 w-6 text-primary-400" />, value: '10+', label: 'Years of Experience' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <SectionTitle
              subtitle="Our Story"
              title="Pioneering Digital Innovation"
              description="We're a team of passionate individuals dedicated to pushing the boundaries of what's possible in the digital world."
              alignment="left"
            />
            
            <div className="space-y-6 text-gray-400">
              <p className="animate-on-scroll">
                Founded in 2015, Nexus has grown from a small startup to a global digital powerhouse. 
                Our mission is to help businesses of all sizes harness the power of technology to achieve 
                their goals and transform their industries.
              </p>
              
              <p className="animate-on-scroll">
                With a team of over 100 experts across design, development, marketing, and strategy, 
                we bring a multidisciplinary approach to every project. Our work has been recognized 
                with numerous industry awards and, more importantly, by the success of our clients.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-dark-300/80 p-3 rounded-lg backdrop-blur-sm inline-block mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-primary-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-on-scroll">
              <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300">
                Learn More
              </button>
              <button className="bg-transparent border border-gray-700 text-gray-300 px-6 py-3 rounded-full hover:bg-dark-200 transition-all duration-300">
                Meet Our Team
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden relative glass animate-on-scroll">
              <img 
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Modern office space" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 via-dark-300/20 to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-lg border border-primary-500/30 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-lg border border-accent-500/30 -z-10"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default About;
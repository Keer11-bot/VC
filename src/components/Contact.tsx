import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BarChart as ChartBar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './ui/SectionTitle';

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-primary-400" />,
      title: "Dedicated Support",
      description: "Get personalized attention from our expert team throughout your project journey."
    },
    {
      icon: <ChartBar className="h-6 w-6 text-primary-400" />,
      title: "Measurable Results",
      description: "Track your success with detailed analytics and performance metrics."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-400" />,
      title: "Quick Turnaround",
      description: "Experience fast delivery without compromising on quality."
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-400 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Benefits of Working Together"
          description="Join hundreds of satisfied clients who have transformed their business with our solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <div className="p-3 bg-primary-500/10 rounded-lg inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center relative z-10"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="max-w-2xl mx-auto glass p-8 rounded-xl min-h-[200px]">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-400 mb-6">
              Take the first step towards transforming your business. Our team is ready to understand your needs and create a tailored solution.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 mx-auto group cursor-pointer"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Contact;
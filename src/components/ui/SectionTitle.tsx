import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
  alignment?: 'center' | 'left';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  subtitle, 
  title, 
  description, 
  alignment = 'center' 
}) => {
  return (
    <div className={`max-w-3xl ${alignment === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="inline-block px-3 py-1 text-xs font-medium text-primary-400 bg-primary-400/10 rounded-full mb-4"
      >
        {subtitle}
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
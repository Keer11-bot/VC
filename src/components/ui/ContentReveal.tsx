import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ContentRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const ContentReveal: React.FC<ContentRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for professional easing
        staggerChildren: 0.1,
        delayChildren: delay + 0.1,
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ContentReveal;
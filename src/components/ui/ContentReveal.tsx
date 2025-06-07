import React, { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface ContentRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const ContentReveal: React.FC<ContentRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  threshold = 0.2,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getDirectionVariants = (): Variants => {
    const offset = 50;
    
    const directions = {
      up: { y: offset, x: 0 },
      down: { y: -offset, x: 0 },
      left: { x: offset, y: 0 },
      right: { x: -offset, y: 0 },
    };
    
    return {
      hidden: {
        opacity: 0,
        ...directions[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      variants={getDirectionVariants()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  );
};

export default ContentReveal;
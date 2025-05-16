import React from 'react';
import { motion } from 'framer-motion';

interface TextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: keyof JSX.IntrinsicElements;
  charClassName?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.7,
  charClassName = '',
}) => {
  // Split text into words
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, // Faster staggering for smoother appearance
        delayChildren: delay * i,
      },
    }),
  };
  
  const child = {
    hidden: {
      opacity: 0,
      y: 15, // Reduced y distance for more subtle animation
      x: -10, // Reduced x distance
      scale: 0.8, // Less dramatic scale
      rotate: Math.random() * 5 - 2.5, // More subtle rotation
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15, // Higher damping for less bouncy movement
        stiffness: 120, // Increased stiffness for snappier animation
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for professional easing
      },
    },
  };
  
  return (
    <motion.div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1.5">
          <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={child}
                className={`inline-block origin-center ${charClassName}`}
                style={{
                  animationDelay: `${delay + (charIndex * 0.03)}s`, // Faster delay between characters
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default TextAnimation;
import React, { useEffect, useState } from 'react';
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
  duration = 0.05,
  tag: Tag = 'div',
  charClassName = '',
}) => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    // Split the text into characters, preserving spaces
    setChars(text.split(''));
  }, [text]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Create unique delay for each character for a staggered effect
  const getCharDelay = (index: number) => {
    return delay + index * 0.02;
  };

  // Enhanced hover effect for each character
  const charHover = {
    scale: 1.1,
    y: -5,
    transition: { type: 'spring', stiffness: 300, damping: 10 },
  };

  // Calculate z-offset for 3D effect based on character position
  const getZOffset = (index: number, total: number) => {
    const middleIndex = Math.floor(total / 2);
    const distFromMiddle = Math.abs(index - middleIndex);
    const normalizedDist = distFromMiddle / middleIndex;
    return 20 - normalizedDist * 40; // Values between -20 and 20
  };

  return (
    <Tag className={className} data-text={text}>
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-flex flex-wrap justify-center"
        style={{ display: 'inline-flex' }}
      >
        {chars.map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            variants={child}
            className={`inline-block ${charClassName}`}
            custom={index}
            initial="hidden"
            animate="visible"
            transition={{ delay: getCharDelay(index) }}
            whileHover={charHover}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              transform: `translateZ(${getZOffset(index, chars.length)}px)`,
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
            data-char={char}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default TextAnimation;
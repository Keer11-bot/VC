import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParticleTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  duration?: number;
  delay?: number;
  particleCount?: number;
  particleColor?: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({
  text,
  className = '',
  textClassName = '',
  duration = 1.5,
  delay = 0,
  particleCount = 40,
  particleColor = 'rgba(255, 255, 255, 0.7)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !textRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Handle high-DPI displays
    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = containerRef.current.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const rect = textRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const textCenter = {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top,
    };
    
    // Create particles
    const particles: { 
      x: number; 
      y: number; 
      size: number; 
      vx: number; 
      vy: number; 
      color: string; 
      alpha: number; 
      targetX: number; 
      targetY: number;
      initialDelay: number;
    }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Strategic starting positions from edges
      let x, y;
      const edgeSelect = Math.random();
      
      if (edgeSelect < 0.25) {
        // Left edge
        x = -20;
        y = Math.random() * canvas.height;
      } else if (edgeSelect < 0.5) {
        // Right edge
        x = canvas.width + 20;
        y = Math.random() * canvas.height;
      } else if (edgeSelect < 0.75) {
        // Top edge
        x = Math.random() * canvas.width;
        y = -20;
      } else {
        // Bottom edge
        x = Math.random() * canvas.width;
        y = canvas.height + 20;
      }
      
      // Target position with controlled randomness around text
      const targetX = textCenter.x + (Math.random() * rect.width - rect.width / 2) * 0.8;
      const targetY = textCenter.y + (Math.random() * rect.height - rect.height / 2) * 0.8;
      
      // Staggered initial delay for more natural flow
      const initialDelay = Math.random() * 0.5 + (delay * 0.8);
      
      particles.push({
        x,
        y,
        size: Math.random() * 2.5 + 1, // Slightly larger particles
        vx: 0,
        vy: 0,
        color: particleColor,
        alpha: Math.random() * 0.5 + 0.4, // Higher base alpha for more visibility
        targetX,
        targetY,
        initialDelay
      });
    }
    
    let lastTimestamp = 0;
    let animationFrame: number;
    let animationStartTime = 0;
    
    const animate = (timestamp: number) => {
      // Track animation start time
      if (animationStartTime === 0) {
        animationStartTime = timestamp;
      }
      
      const elapsedTime = timestamp - animationStartTime;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allParticlesArrived = true;
      
      particles.forEach((p) => {
        // Skip particles that haven't started their animation yet
        if (elapsedTime < p.initialDelay * 1000) {
          allParticlesArrived = false;
          return;
        }
        
        // Calculate vector to target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Check if particle has arrived
        if (distance > 5) {
          allParticlesArrived = false;
          
          // Accelerate towards target - smooth easing
          const acceleration = 0.01 * (deltaTime / 16); // Adjust for frame rate differences
          p.vx += dx * acceleration;
          p.vy += dy * acceleration;
          
          // Apply drag - smoother with time-based calculation
          const drag = Math.pow(0.95, deltaTime / 16);
          p.vx *= drag;
          p.vy *= drag;
          
          // Update position
          p.x += p.vx;
          p.y += p.vy;
        }
        
        // Fade based on proximity to target
        const targetAlpha = distance < 20 
          ? Math.max(0, p.alpha * (distance / 20)) 
          : p.alpha;
        
        // Add subtle pulsing effect
        const pulseOffset = Math.sin(elapsedTime / 1000) * 0.1;
        const finalAlpha = Math.max(0, Math.min(1, targetAlpha + pulseOffset));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.7', finalAlpha.toString());
        ctx.fill();
        
        // Add subtle glow for more professional look
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('0.7', (finalAlpha * 0.2).toString());
          ctx.fill();
        }
      });
      
      // Continue animation or fade out if all particles have arrived
      if (!allParticlesArrived || elapsedTime < (delay + duration) * 1000) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Fade out particles gradually
        const fadeOut = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          let stillVisible = false;
          
          particles.forEach((p) => {
            p.alpha *= 0.95; // Reduce alpha gradually
            
            if (p.alpha > 0.01) {
              stillVisible = true;
              
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color.replace('0.7', p.alpha.toString());
              ctx.fill();
            }
          });
          
          if (stillVisible) {
            animationFrame = requestAnimationFrame(fadeOut);
          }
        };
        
        // Allow text to be visible for a while before fading particles
        setTimeout(fadeOut, 500);
      }
    };
    
    // Delay the start of animation
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [text, particleCount, delay, duration, particleColor]);
  
  return (
    <motion.div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { 
          duration: 0.3, 
          delay: delay 
        }
      }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      <motion.div 
        ref={textRef}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            duration: duration,
            delay: delay + 0.5,
            ease: [0.25, 0.1, 0.25, 1] // Custom easing for professional look
          }
        }}
        className={textClassName}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

export default ParticleText;
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParticleTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  delay?: number;
  particleCount?: number;
  particleColor?: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({
  text,
  className = '',
  textClassName = '',
  delay = 0,
  particleCount = 100,
  particleColor = 'rgba(255, 255, 255, 0.7)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const particles = useRef<any[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create particles
    const createParticles = () => {
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: particleColor,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          density: (Math.random() * 30) + 1,
          opacity: Math.random() * 0.5 + 0.5
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position with mouse interaction
        const dx = mousePosition.current.x - p.x;
        const dy = mousePosition.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        // Max distance, past which the force is 0
        const maxDistance = 100;
        let force = (maxDistance - distance) / maxDistance;
        if (force < 0) force = 0;
        
        // Movement based on mouse position
        const directionX = forceDirectionX * force * p.density;
        const directionY = forceDirectionY * force * p.density;
        
        if (distance < maxDistance) {
          p.x += directionX;
          p.y += directionY;
        } else {
          // Slowly return to base position
          if (p.x !== p.baseX) {
            const dx = p.x - p.baseX;
            p.x -= dx / 15;
          }
          if (p.y !== p.baseY) {
            const dy = p.y - p.baseY;
            p.y -= dy / 15;
          }
        }

        // Add some random movement
        p.x += p.speedX * 0.2;
        p.y += p.speedY * 0.2;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current.x = e.clientX - rect.left;
      mousePosition.current.y = e.clientY - rect.top;
    };
    
    // Start animation after delay
    setTimeout(() => {
      createParticles();
      animate();
      canvas.addEventListener('mousemove', handleMouseMove);
    }, delay * 1000);

    // Add 3D effect to text when hovering over canvas
    const handleCanvasHover = () => {
      if (textRef.current) {
        textRef.current.classList.add('text-3d-hover');
      }
    };

    const handleCanvasLeave = () => {
      if (textRef.current) {
        textRef.current.classList.remove('text-3d-hover');
      }
    };

    canvas.addEventListener('mouseenter', handleCanvasHover);
    canvas.addEventListener('mouseleave', handleCanvasLeave);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleCanvasHover);
      canvas.removeEventListener('mouseleave', handleCanvasLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [delay, particleCount, particleColor]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      <motion.div
        ref={textRef}
        className={`relative z-10 text-3d ${textClassName}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px)',
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default ParticleText;
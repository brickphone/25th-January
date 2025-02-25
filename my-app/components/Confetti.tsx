// components/Confetti.tsx
'use client'

import { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const Confetti: React.FC<ConfettiProps> = ({ 
  isActive, 
  duration = 3000, 
  particleCount = 100 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Create particles when component mounts or when isActive changes
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 8 + 4,
        color: getRandomColor(),
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }
    
    startTimeRef.current = Date.now();
    
    // Animation function
    const animate = () => {
      if (!context || !canvas || !startTimeRef.current) return;
      
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Apply gravity effect
        particle.speedY += 0.1;
        
        // Only draw if particle is still on screen
        if (particle.y < canvas.height + particle.size) {
          context.save();
          context.translate(particle.x, particle.y);
          context.rotate(particle.rotation * Math.PI / 180);
          
          // Draw particle
          context.fillStyle = particle.color;
          context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          
          context.restore();
        }
      });
      
      // Continue animation if duration hasn't elapsed
      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isActive, duration, particleCount]);
  
  // Helper function for random colors
  const getRandomColor = (): string => {
    const colors = [
      '#FF69B4', // Hot Pink
      '#FF1493', // Deep Pink
      '#FFB6C1', // Light Pink
      '#FFC0CB', // Pink
      '#DB7093', // Pale Violet Red
      '#FF0000', // Red
      '#FF4500', // Orange Red
      '#FFD700', // Gold
      '#FFFF00', // Yellow
      '#ADFF2F', // Green Yellow
      '#7CFC00', // Lawn Green
      '#00FA9A', // Medium Spring Green
      '#00FFFF', // Cyan
      '#1E90FF', // Dodger Blue
      '#0000FF', // Blue
      '#8A2BE2', // Blue Violet
      '#9400D3', // Dark Violet
      '#FF00FF', // Magenta
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ display: isActive ? 'block' : 'none' }}
    />
  );
};

export default Confetti;
// components/Confetti.tsx
'use client'

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  isActive: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
  useEffect(() => {
    if (isActive) {
      // Simple, brief confetti burst
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#ff0000', '#ffffff', '#ff69b4'],
        gravity: 1.5,  // Higher gravity makes particles fall faster
        ticks: 100     // Fewer ticks means shorter animation
      });
    }
  }, [isActive]);

  return null;
};

export default Confetti;
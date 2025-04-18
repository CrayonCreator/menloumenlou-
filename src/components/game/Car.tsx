'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CarProps {
  position?: { x: number; y: number };
  speed?: number;
  rotation?: number;
  isMoving?: boolean;
}

export default function Car({ 
  position = { x: 50, y: 80 }, 
  speed = 0, 
  rotation = 0,
  isMoving = false 
}: CarProps) {
  const t = useTranslations();
  const [carColor, setCarColor] = useState('red');

  const carStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.3s ease-out',
    width: '30px',
    height: '50px',
  };

  useEffect(() => {
    if (speed > 8) {
      setCarColor('orange');
    } else if (speed > 4) {
      setCarColor('yellow');
    } else {
      setCarColor('red');
    }
  }, [speed]);

  return (
    <div 
      className={cn(
        "car-container",
        isMoving && "animate-pulse"
      )} 
      style={carStyle}
      aria-label={t("game.car")}
    >
      <svg 
        viewBox="0 0 30 50" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="5" y="10" width="20" height="35" rx="5" fill={carColor} />
        
        <rect x="7" y="15" width="16" height="10" rx="2" fill="#333" />
        
        <circle cx="10" cy="45" r="2" fill="yellow" />
        <circle cx="20" cy="45" r="2" fill="yellow" />
        
        <rect x="2" y="20" width="4" height="10" rx="2" fill="#333" />
        <rect x="2" y="35" width="4" height="10" rx="2" fill="#333" />
        <rect x="24" y="20" width="4" height="10" rx="2" fill="#333" />
        <rect x="24" y="35" width="4" height="10" rx="2" fill="#333" />
      </svg>
      
      {speed > 2 && (
        <div className="car-speed-effect" style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: `${speed * 3}px`,
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
          transform: 'translateY(-50%)',
        }} />
      )}
    </div>
  );
}
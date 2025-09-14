import React from 'react';
import { interpolate } from 'remotion';

interface ParticleBackgroundProps {
  frame: number;
  theme: 'cyberpunk' | 'neon' | 'matrix';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ frame, theme }) => {
  const particleCount = 50;
  
  const getThemeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return ['#00BFFF', '#9A4CFF', '#FF6B9D'];
      case 'neon':
        return ['#00FF00', '#FF1493', '#00BFFF'];
      case 'matrix':
        return ['#00FF00', '#008000', '#00FF41'];
    }
  };

  const colors = getThemeColors();

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const baseX = (i / particleCount) * 100;
    const baseY = ((i * 37) % 100); // Pseudo-random distribution
    
    // Floating animation
    const x = baseX + interpolate(frame, [0, 300], [0, 20], { extrapolateRight: 'extend' }) * Math.sin(i * 0.1);
    const y = baseY + interpolate(frame, [0, 300], [0, 15], { extrapolateRight: 'extend' }) * Math.cos(i * 0.15);
    
    // Pulsing opacity
    const opacity = interpolate(frame + i * 10, [0, 60, 120], [0.3, 0.8, 0.3], { extrapolateRight: 'extend' });
    
    // Size variation
    const size = 2 + (i % 3);
    
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      opacity,
      size,
      color: colors[i % colors.length],
      delay: i * 50
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: `translate(-50%, -50%) scale(${interpolate(frame + particle.delay, [0, 60], [0.5, 1], { extrapolateRight: 'extend' })})`,
          }}
        />
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.slice(0, 20).map((particle, i) => {
          const nextParticle = particles[(i + 1) % 20];
          const opacity = interpolate(frame, [0, 100], [0, 0.2], { extrapolateRight: 'clamp' });
          
          return (
            <line
              key={i}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke={particle.color}
              strokeWidth="1"
              opacity={opacity}
              style={{
                filter: `drop-shadow(0 0 2px ${particle.color})`
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
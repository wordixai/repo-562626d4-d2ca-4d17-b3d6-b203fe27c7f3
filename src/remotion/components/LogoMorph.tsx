import React from 'react';
import { interpolate } from 'remotion';

interface LogoMorphProps {
  logoUrl: string;
  frame: number;
  theme: 'cyberpunk' | 'neon' | 'matrix';
}

export const LogoMorph: React.FC<LogoMorphProps> = ({ logoUrl, frame, theme }) => {
  // Morph animation phases
  const scale = interpolate(frame, [0, 30, 70, 100], [0, 1.2, 1, 0.8], { extrapolateRight: 'clamp' });
  const rotation = interpolate(frame, [0, 100], [0, 360]);
  const borderRadius = interpolate(frame, [20, 50, 80], [0, 50, 0], { extrapolateRight: 'clamp' });
  
  // Color shifting
  const hueShift = interpolate(frame, [0, 100], [0, 360]);
  
  // Particle effects
  const particleCount = 12;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = interpolate(frame, [30, 70], [0, 150], { extrapolateRight: 'clamp' });
    const particleOpacity = interpolate(frame, [30, 50, 70], [0, 1, 0], { extrapolateRight: 'clamp' });
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: particleOpacity,
      delay: i * 2
    };
  });

  const getThemeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          primary: '#00BFFF',
          secondary: '#9A4CFF',
          glow: '0 0 50px #00BFFF, 0 0 100px #00BFFF'
        };
      case 'neon':
        return {
          primary: '#00FF00',
          secondary: '#FF1493',
          glow: '0 0 50px #00FF00, 0 0 100px #00FF00'
        };
      case 'matrix':
        return {
          primary: '#00FF00',
          secondary: '#008000',
          glow: '0 0 50px #00FF00, 0 0 100px #00FF00'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="flex items-center justify-center h-full relative overflow-hidden">
      {/* Particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: themeColors.primary,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            opacity: particle.opacity,
            boxShadow: `0 0 10px ${themeColors.primary}`,
            animationDelay: `${particle.delay}ms`
          }}
        />
      ))}

      {/* Main logo container */}
      <div
        className="relative"
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          filter: `hue-rotate(${hueShift}deg)`
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 w-64 h-64 border-4 rounded-full"
          style={{
            borderColor: themeColors.primary,
            boxShadow: themeColors.glow,
            transform: `scale(${interpolate(frame, [0, 100], [1, 1.5])})`,
            opacity: interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0])
          }}
        />

        {/* Logo */}
        <div
          className="relative w-64 h-64 border-4 overflow-hidden"
          style={{
            borderRadius: `${borderRadius}%`,
            borderColor: themeColors.secondary,
            boxShadow: `inset 0 0 30px ${themeColors.primary}`
          }}
        >
          <img
            src={logoUrl}
            alt="Logo"
            className="w-full h-full object-cover"
            style={{
              filter: `sepia(1) hue-rotate(${hueShift}deg) saturate(2) brightness(1.2)`
            }}
          />
          
          {/* Overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
          
          {/* Scanning lines */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${themeColors.primary}20 2px,
                ${themeColors.primary}20 4px
              )`
            }}
          />
        </div>

        {/* Text elements */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div 
            className="text-2xl font-bold tracking-wider"
            style={{
              color: themeColors.primary,
              textShadow: `0 0 10px ${themeColors.primary}`,
              opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' })
            }}
          >
            TECH CORP
          </div>
        </div>
      </div>

      {/* Background geometric patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-opacity-20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              borderColor: themeColors.primary,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${rotation + i * 15}deg)`,
              opacity: interpolate(frame, [0, 100], [0.2, 0]),
              borderRadius: i % 2 === 0 ? '0' : '50%'
            }}
          />
        ))}
      </div>
    </div>
  );
};
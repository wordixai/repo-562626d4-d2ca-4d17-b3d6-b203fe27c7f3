import React from 'react';
import { interpolate } from 'remotion';

interface TitleSequenceProps {
  title: string;
  subtitle: string;
  frame: number;
  theme: 'cyberpunk' | 'neon' | 'matrix';
}

export const TitleSequence: React.FC<TitleSequenceProps> = ({ title, subtitle, frame, theme }) => {
  // Kinetic typography animations
  const titleScale = interpolate(frame, [0, 20, 40], [0, 1.2, 1], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp' });
  
  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleY = interpolate(frame, [20, 40], [30, 0], { extrapolateRight: 'clamp' });

  // Letter-by-letter reveal
  const titleLetters = title.split('');
  const subtitleWords = subtitle.split(' ');

  const getThemeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          primary: 'text-cyan-400',
          secondary: 'text-purple-400',
          glow: 'drop-shadow-[0_0_10px_#00BFFF]'
        };
      case 'neon':
        return {
          primary: 'text-green-400',
          secondary: 'text-pink-400',
          glow: 'drop-shadow-[0_0_10px_#00FF00]'
        };
      case 'matrix':
        return {
          primary: 'text-green-500',
          secondary: 'text-green-300',
          glow: 'drop-shadow-[0_0_10px_#00FF00]'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-600"
              style={{
                opacity: interpolate(frame, [0, 60], [0, 0.3]),
                animationDelay: `${i * 10}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main title */}
      <h1 
        className={`text-8xl font-bold mb-8 ${themeColors.primary} ${themeColors.glow}`}
        style={{
          transform: `scale(${titleScale}) translateY(${titleY}px)`,
          opacity: titleOpacity
        }}
      >
        {titleLetters.map((letter, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animationDelay: `${i * 100}ms`,
              transform: `translateY(${interpolate(frame, [i * 2, i * 2 + 20], [20, 0], { extrapolateRight: 'clamp' })}px)`,
              opacity: interpolate(frame, [i * 2, i * 2 + 15], [0, 1], { extrapolateRight: 'clamp' })
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p 
        className={`text-3xl ${themeColors.secondary} max-w-4xl leading-relaxed`}
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity
        }}
      >
        {subtitleWords.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-3"
            style={{
              transform: `translateX(${interpolate(frame, [25 + i * 3, 35 + i * 3], [30, 0], { extrapolateRight: 'clamp' })}px)`,
              opacity: interpolate(frame, [25 + i * 3, 35 + i * 3], [0, 1], { extrapolateRight: 'clamp' })
            }}
          >
            {word}
          </span>
        ))}
      </p>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-400 rounded-full opacity-20"
           style={{
             transform: `rotate(${frame * 2}deg) scale(${interpolate(frame, [0, 60], [0, 1])})`,
             opacity: interpolate(frame, [0, 30, 60], [0, 0.3, 0])
           }} />
      
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-400 opacity-20"
           style={{
             transform: `rotate(${frame * -1.5}deg) scale(${interpolate(frame, [0, 60], [0, 1])})`,
             opacity: interpolate(frame, [10, 40, 60], [0, 0.3, 0])
           }} />

      {/* Scanning line */}
      <div 
        className={`absolute left-0 right-0 h-0.5 ${themeColors.primary} opacity-60`}
        style={{
          top: `${interpolate(frame, [0, 60], [0, 100])}%`,
          boxShadow: `0 0 20px ${theme === 'cyberpunk' ? '#00BFFF' : '#00FF00'}`
        }}
      />
    </div>
  );
};
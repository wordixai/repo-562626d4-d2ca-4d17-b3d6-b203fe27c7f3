import React from 'react';
import { interpolate } from 'remotion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeRevealProps {
  code: string;
  language: string;
  frame: number;
  theme: 'cyberpunk' | 'neon' | 'matrix';
}

export const CodeReveal: React.FC<CodeRevealProps> = ({ code, language, frame, theme }) => {
  // Calculate how much of the code to reveal
  const totalChars = code.length;
  const revealProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
  const charsToShow = Math.floor(totalChars * revealProgress);
  const visibleCode = code.substring(0, charsToShow);

  // Typewriter cursor animation
  const cursorOpacity = interpolate(frame % 60, [0, 30, 60], [1, 0, 1]);

  // Container animations
  const containerScale = interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp' });
  const containerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Line highlight effect
  const lineHighlight = Math.floor(interpolate(frame, [20, 80], [0, 5], { extrapolateRight: 'clamp' }));

  const getThemeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          bg: 'bg-gradient-to-br from-purple-900/20 to-blue-900/20',
          border: 'border-cyan-400',
          glow: 'shadow-2xl shadow-cyan-400/20'
        };
      case 'neon':
        return {
          bg: 'bg-gradient-to-br from-pink-900/20 to-green-900/20',
          border: 'border-green-400',
          glow: 'shadow-2xl shadow-green-400/20'
        };
      case 'matrix':
        return {
          bg: 'bg-gradient-to-br from-green-900/20 to-black/20',
          border: 'border-green-500',
          glow: 'shadow-2xl shadow-green-500/20'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div 
        className={`relative max-w-4xl w-full ${themeColors.bg} ${themeColors.border} border-2 rounded-lg ${themeColors.glow} backdrop-blur-sm`}
        style={{
          transform: `scale(${containerScale})`,
          opacity: containerOpacity
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono">
            main.{language} - Advanced Editor
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 relative">
          <div className="font-mono text-lg leading-relaxed">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                fontSize: '1.2rem',
                lineHeight: '1.8'
              }}
              wrapLongLines={true}
            >
              {visibleCode}
            </SyntaxHighlighter>
            
            {/* Typewriter cursor */}
            <span 
              className={`inline-block w-0.5 h-6 ml-1 ${theme === 'cyberpunk' ? 'bg-cyan-400' : theme === 'neon' ? 'bg-green-400' : 'bg-green-500'}`}
              style={{ opacity: cursorOpacity }}
            />
          </div>

          {/* Scanning line effect */}
          <div 
            className={`absolute left-0 right-0 h-0.5 ${theme === 'cyberpunk' ? 'bg-cyan-400' : theme === 'neon' ? 'bg-green-400' : 'bg-green-500'} opacity-60`}
            style={{
              top: `${20 + (lineHighlight * 30)}px`,
              transform: `translateY(${interpolate(frame % 120, [0, 120], [0, 400])}px)`,
              boxShadow: `0 0 10px ${theme === 'cyberpunk' ? '#00BFFF' : theme === 'neon' ? '#00FF00' : '#00FF00'}`
            }}
          />
        </div>

        {/* Syntax highlighting overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="p-6">
            {/* Add syntax highlighting effects */}
            <div className="space-y-2 mt-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-0.5 rounded-full opacity-40 transition-all duration-1000`}
                  style={{
                    width: `${20 + (i * 15)}%`,
                    backgroundColor: i === lineHighlight ? (theme === 'cyberpunk' ? '#00BFFF' : '#00FF00') : 'transparent',
                    boxShadow: i === lineHighlight ? `0 0 5px ${theme === 'cyberpunk' ? '#00BFFF' : '#00FF00'}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { interpolate } from 'remotion';

interface GeometricShapesProps {
  frame: number;
}

export const GeometricShapes: React.FC<GeometricShapesProps> = ({ frame }) => {
  const shapes = [
    { type: 'circle', size: 100, x: 20, y: 30, speed: 1 },
    { type: 'square', size: 80, x: 70, y: 60, speed: 1.5 },
    { type: 'triangle', size: 120, x: 40, y: 80, speed: 0.8 },
    { type: 'hexagon', size: 90, x: 80, y: 20, speed: 1.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {shapes.map((shape, i) => {
        const rotation = (frame * shape.speed) % 360;
        const scale = interpolate(frame, [0, 120, 240], [0.8, 1.2, 0.8], { extrapolateRight: 'extend' });
        
        const x = shape.x + interpolate(frame, [0, 300], [0, 10], { extrapolateRight: 'extend' }) * Math.sin(frame * 0.01 + i);
        const y = shape.y + interpolate(frame, [0, 300], [0, 8], { extrapolateRight: 'extend' }) * Math.cos(frame * 0.01 + i);

        const commonStyle = {
          position: 'absolute' as const,
          left: `${x}%`,
          top: `${y}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
          border: '2px solid #00BFFF',
          filter: 'drop-shadow(0 0 10px #00BFFF)',
        };

        switch (shape.type) {
          case 'circle':
            return (
              <div
                key={i}
                style={{
                  ...commonStyle,
                  borderRadius: '50%',
                }}
              />
            );
          case 'square':
            return (
              <div
                key={i}
                style={commonStyle}
              />
            );
          case 'triangle':
            return (
              <div
                key={i}
                style={{
                  ...commonStyle,
                  width: 0,
                  height: 0,
                  border: 'none',
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid #00BFFF`,
                  filter: 'drop-shadow(0 0 10px #00BFFF)',
                }}
              />
            );
          case 'hexagon':
            return (
              <div
                key={i}
                style={{
                  ...commonStyle,
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  backgroundColor: 'transparent',
                }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
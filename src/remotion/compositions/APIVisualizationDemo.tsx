import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface APIEndpoint {
  method: string;
  path: string;
  description: string;
}

interface APIVisualizationDemoProps {
  apiName: string;
  endpoints: APIEndpoint[];
}

export const APIVisualizationDemo: React.FC<APIVisualizationDemoProps> = ({ apiName, endpoints }) => {
  const frame = useCurrentFrame();

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-400 border-green-400';
      case 'POST': return 'text-blue-400 border-blue-400';
      case 'PUT': return 'text-yellow-400 border-yellow-400';
      case 'DELETE': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <AbsoluteFill className="bg-tech-dark p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-neon-blue mb-4">{apiName}</h1>
        <p className="text-2xl text-gray-400">RESTful API Documentation</p>
      </div>

      {/* API Endpoints */}
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {endpoints.map((endpoint, i) => {
          const delay = i * 30;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });
          const translateY = interpolate(frame, [delay, delay + 30], [50, 0], { extrapolateRight: 'clamp' });
          
          return (
            <div
              key={i}
              className="bg-tech-surface border border-gray-700 rounded-lg p-6 relative overflow-hidden"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`
              }}
            >
              {/* Method badge */}
              <div className={`inline-block px-4 py-2 border rounded-full text-sm font-mono mb-4 ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </div>

              {/* Path */}
              <div className="text-xl font-mono text-white mb-3">
                {endpoint.path}
              </div>

              {/* Description */}
              <div className="text-gray-400">
                {endpoint.description}
              </div>

              {/* Animated indicator */}
              <div 
                className="absolute top-0 left-0 w-1 bg-neon-blue"
                style={{
                  height: `${interpolate(frame, [delay + 20, delay + 40], [0, 100], { extrapolateRight: 'clamp' })}%`,
                  boxShadow: '0 0 10px #00BFFF'
                }}
              />

              {/* Scanning effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                style={{
                  transform: `translateX(${interpolate(frame, [delay + 40, delay + 80], [-100, 100], { extrapolateRight: 'clamp' })}%)`
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Data flow visualization */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-neon-blue rounded-full flex items-center justify-center mb-2 glow-blue">
              <span className="text-sm font-bold">CLIENT</span>
            </div>
          </div>
          
          {/* Animated arrow */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-neon-green rounded-full"
                style={{
                  opacity: interpolate(frame, [i * 5, i * 5 + 30], [0, 1], { extrapolateRight: 'extend' })
                }}
              />
            ))}
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-neon-purple rounded-full flex items-center justify-center mb-2 glow-blue">
              <span className="text-sm font-bold">API</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
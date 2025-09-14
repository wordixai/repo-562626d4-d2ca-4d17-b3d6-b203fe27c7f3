import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface TerminalDemoProps {
  commands: string[];
}

export const TerminalDemo: React.FC<TerminalDemoProps> = ({ commands }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-tech-dark p-12">
      <div className="max-w-5xl mx-auto">
        {/* Terminal window */}
        <div className="bg-black border border-gray-600 rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-400 text-sm">terminal — bash — 80×24</div>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-green-400 bg-black min-h-96">
            <div className="text-purple-400 mb-2">user@techcorp:~$ </div>
            
            {commands.map((command, i) => {
              const commandStart = i * 40;
              const commandEnd = commandStart + 30;
              const isVisible = frame >= commandStart;
              
              if (!isVisible) return null;
              
              const progress = interpolate(frame, [commandStart, commandEnd], [0, 1], { extrapolateRight: 'clamp' });
              const visibleChars = Math.floor(command.length * progress);
              const visibleCommand = command.substring(0, visibleChars);
              
              return (
                <div key={i} className="mb-4">
                  <div className="flex">
                    <span className="text-purple-400">$ </span>
                    <span className="text-green-400">
                      {visibleCommand}
                      {progress < 1 && (
                        <span className="bg-green-400 text-black">_</span>
                      )}
                    </span>
                  </div>
                  
                  {progress >= 1 && (
                    <div 
                      className="ml-2 mt-1 text-gray-300"
                      style={{
                        opacity: interpolate(frame, [commandEnd, commandEnd + 10], [0, 1], { extrapolateRight: 'clamp' })
                      }}
                    >
                      {i === 0 && "✓ Dependencies installed successfully"}
                      {i === 1 && "✓ Build completed in 2.3s"}
                      {i === 2 && "✓ Docker image built: techapp:latest"}
                      {i === 3 && "✓ Deployed to Kubernetes cluster"}
                      {i === 4 && (
                        <div className="text-green-400 font-bold">
                          Deployment successful! 🚀
                          <div className="text-gray-400 text-sm mt-1">
                            Application available at: https://app.techcorp.com
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Cursor */}
            <div className="flex mt-4">
              <span className="text-purple-400">$ </span>
              <span 
                className="bg-green-400 text-black w-2 h-5 inline-block"
                style={{
                  opacity: interpolate(frame % 60, [0, 30, 60], [1, 0, 1])
                }}
              >
                _
              </span>
            </div>
          </div>
        </div>

        {/* System stats */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          {[
            { label: 'CPU Usage', value: '23%', color: 'text-green-400' },
            { label: 'Memory', value: '4.2/16 GB', color: 'text-blue-400' },
            { label: 'Network', value: '1.2 MB/s', color: 'text-purple-400' }
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-tech-surface border border-gray-700 rounded-lg p-4 text-center"
              style={{
                opacity: interpolate(frame, [100 + i * 10, 120 + i * 10], [0, 1], { extrapolateRight: 'clamp' })
              }}
            >
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
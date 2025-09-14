import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LogoMorph } from '../components/LogoMorph';

interface LogoMorphDemoProps {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
}

export const LogoMorphDemo: React.FC<LogoMorphDemoProps> = ({ brandName, primaryColor, secondaryColor }) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill className="bg-tech-dark">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-neon-purple mb-2">Logo Morphing Animation</h1>
        <p className="text-xl text-gray-400">Dynamic Brand Identity Showcase</p>
      </div>
      
      <LogoMorph
        logoUrl="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop"
        frame={frame}
        theme="neon"
      />

      <div className="absolute bottom-8 right-8 text-right">
        <div className="text-2xl font-bold text-neon-green">{brandName}</div>
        <div className="text-sm text-gray-400">Dynamic. Innovative. Future-Ready.</div>
      </div>
    </AbsoluteFill>
  );
};
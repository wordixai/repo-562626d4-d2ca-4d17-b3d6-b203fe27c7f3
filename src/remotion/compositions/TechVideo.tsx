import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CodeReveal } from '../components/CodeReveal';
import { LogoMorph } from '../components/LogoMorph';
import { TitleSequence } from '../components/TitleSequence';
import { ParticleBackground } from '../components/ParticleBackground';
import { GeometricShapes } from '../components/GeometricShapes';

interface TechVideoProps {
  title: string;
  subtitle: string;
  logoUrl: string;
  theme: 'cyberpunk' | 'neon' | 'matrix';
  codeSnippet: string;
}

export const TechVideo: React.FC<TechVideoProps> = ({
  title,
  subtitle,
  logoUrl,
  theme,
  codeSnippet
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene timing
  const titleStart = 0;
  const titleEnd = 60;
  const logoStart = 50;
  const logoEnd = 150;
  const codeStart = 140;
  const codeEnd = 250;
  const finalStart = 240;

  // Scene opacity calculations
  const titleOpacity = interpolate(frame, [titleStart, titleStart + 20, titleEnd - 20, titleEnd], [0, 1, 1, 0]);
  const logoOpacity = interpolate(frame, [logoStart, logoStart + 20, logoEnd - 20, logoEnd], [0, 1, 1, 0]);
  const codeOpacity = interpolate(frame, [codeStart, codeStart + 20, codeEnd - 20, codeEnd], [0, 1, 1, 0]);
  const finalOpacity = interpolate(frame, [finalStart, finalStart + 20], [0, 1]);

  return (
    <AbsoluteFill className="bg-tech-dark overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground frame={frame} theme={theme} />
      <GeometricShapes frame={frame} />

      {/* Title Sequence */}
      {frame >= titleStart && frame <= titleEnd && (
        <AbsoluteFill style={{ opacity: titleOpacity }}>
          <TitleSequence
            title={title}
            subtitle={subtitle}
            frame={frame - titleStart}
            theme={theme}
          />
        </AbsoluteFill>
      )}

      {/* Logo Morph Animation */}
      {frame >= logoStart && frame <= logoEnd && (
        <AbsoluteFill style={{ opacity: logoOpacity }}>
          <LogoMorph
            logoUrl={logoUrl}
            frame={frame - logoStart}
            theme={theme}
          />
        </AbsoluteFill>
      )}

      {/* Code Reveal */}
      {frame >= codeStart && frame <= codeEnd && (
        <AbsoluteFill style={{ opacity: codeOpacity }}>
          <CodeReveal
            code={codeSnippet}
            language="typescript"
            frame={frame - codeStart}
            theme={theme}
          />
        </AbsoluteFill>
      )}

      {/* Final Scene */}
      {frame >= finalStart && (
        <AbsoluteFill style={{ opacity: finalOpacity }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-6xl font-bold text-neon-blue mb-4">
                Ready to Innovate?
              </h2>
              <p className="text-2xl text-gray-300">
                Let's build the future together.
              </p>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
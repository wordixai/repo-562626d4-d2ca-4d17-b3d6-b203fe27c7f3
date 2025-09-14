import React from 'react';
import { Composition } from 'remotion';
import { TechVideo } from './compositions/TechVideo';
import { CodeRevealDemo } from './compositions/CodeRevealDemo';
import { LogoMorphDemo } from './compositions/LogoMorphDemo';
import { APIVisualizationDemo } from './compositions/APIVisualizationDemo';
import { TerminalDemo } from './compositions/TerminalDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TechVideo"
        component={TechVideo}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Advanced Tech Solutions",
          subtitle: "Building the Future with Code",
          logoUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=200&fit=crop",
          theme: "cyberpunk" as const,
          codeSnippet: `function revolutionize() {
  const future = await buildTechnology();
  return future.impact();
}`
        }}
      />
      <Composition
        id="CodeReveal"
        component={CodeRevealDemo}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          language: "typescript",
          title: "Code Animation Demo"
        }}
      />
      <Composition
        id="LogoMorph"
        component={LogoMorphDemo}
        durationInFrames={120}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          brandName: "TechCorp",
          primaryColor: "#00BFFF",
          secondaryColor: "#9A4CFF"
        }}
      />
      <Composition
        id="APIVisualization"
        component={APIVisualizationDemo}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          apiName: "TechAPI v2.0",
          endpoints: [
            { method: "GET", path: "/users", description: "Fetch user data" },
            { method: "POST", path: "/auth", description: "User authentication" },
            { method: "PUT", path: "/profile", description: "Update profile" },
            { method: "DELETE", path: "/sessions", description: "Logout user" }
          ]
        }}
      />
      <Composition
        id="Terminal"
        component={TerminalDemo}
        durationInFrames={200}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          commands: [
            "npm install @techcorp/advanced-toolkit",
            "npm run build:production",
            "docker build -t techapp .",
            "kubectl apply -f deployment.yaml",
            "echo 'Deployment successful! 🚀'"
          ]
        }}
      />
    </>
  );
};
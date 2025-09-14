import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CodeReveal } from '../components/CodeReveal';

interface CodeRevealDemoProps {
  language: string;
  title: string;
}

export const CodeRevealDemo: React.FC<CodeRevealDemoProps> = ({ language, title }) => {
  const codeExample = `// Advanced AI-Powered Analytics Dashboard
import { useAI, DataProcessor, VisualizationEngine } from '@techcorp/ai-toolkit';

class AdvancedAnalytics {
  private ai: AIEngine;
  private processor: DataProcessor;
  
  constructor() {
    this.ai = new AIEngine({
      model: 'gpt-4-turbo',
      capabilities: ['analysis', 'prediction', 'insights']
    });
    this.processor = new DataProcessor();
  }

  async generateInsights(data: Dataset): Promise<Insights> {
    const processed = await this.processor.clean(data);
    const predictions = await this.ai.predict(processed);
    
    return {
      trends: this.analyzeTrends(processed),
      predictions: predictions,
      recommendations: await this.ai.recommend(predictions),
      confidence: this.calculateConfidence(predictions)
    };
  }

  private analyzeTrends(data: ProcessedData): TrendAnalysis {
    return data.timeSeries.reduce((trends, point) => {
      const velocity = this.calculateVelocity(point);
      const momentum = this.calculateMomentum(velocity);
      
      return {
        ...trends,
        [point.metric]: {
          direction: velocity > 0 ? 'upward' : 'downward',
          strength: Math.abs(momentum),
          forecast: this.projectFuture(point, velocity)
        }
      };
    }, {} as TrendAnalysis);
  }
}

export default AdvancedAnalytics;`;

  return (
    <AbsoluteFill className="bg-tech-dark">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-neon-blue mb-2">{title}</h1>
        <p className="text-xl text-gray-400">Advanced Code Animation Showcase</p>
      </div>
      
      <CodeReveal
        code={codeExample}
        language={language}
        frame={0}
        theme="cyberpunk"
      />
    </AbsoluteFill>
  );
};
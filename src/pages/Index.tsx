import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TechVideo } from '@/remotion/compositions/TechVideo';
import { CodeRevealDemo } from '@/remotion/compositions/CodeRevealDemo';
import { LogoMorphDemo } from '@/remotion/compositions/LogoMorphDemo';
import { APIVisualizationDemo } from '@/remotion/compositions/APIVisualizationDemo';
import { TerminalDemo } from '@/remotion/compositions/TerminalDemo';
import { Play, Download, Settings, Code, Terminal, Layers, Database, Video } from 'lucide-react';

const Index = () => {
  const [currentComposition, setCurrentComposition] = useState('TechVideo');
  const [videoProps, setVideoProps] = useState({
    title: "Advanced Tech Solutions",
    subtitle: "Building the Future with Code",
    logoUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=200&fit=crop",
    theme: "cyberpunk" as const,
    codeSnippet: `function revolutionize() {
  const future = await buildTechnology();
  return future.impact();
}`
  });

  const compositions = [
    { id: 'TechVideo', name: 'Tech Video', icon: Video, component: TechVideo },
    { id: 'CodeReveal', name: 'Code Reveal', icon: Code, component: CodeRevealDemo },
    { id: 'LogoMorph', name: 'Logo Morph', icon: Layers, component: LogoMorphDemo },
    { id: 'APIVisualization', name: 'API Docs', icon: Database, component: APIVisualizationDemo },
    { id: 'Terminal', name: 'Terminal', icon: Terminal, component: TerminalDemo }
  ];

  const renderPlayer = () => {
    const props = {
      TechVideo: videoProps,
      CodeReveal: { language: "typescript", title: "Code Animation Demo" },
      LogoMorph: { brandName: "TechCorp", primaryColor: "#00BFFF", secondaryColor: "#9A4CFF" },
      APIVisualization: {
        apiName: "TechAPI v2.0",
        endpoints: [
          { method: "GET", path: "/users", description: "Fetch user data" },
          { method: "POST", path: "/auth", description: "User authentication" },
          { method: "PUT", path: "/profile", description: "Update profile" },
          { method: "DELETE", path: "/sessions", description: "Logout user" }
        ]
      },
      Terminal: {
        commands: [
          "npm install @techcorp/advanced-toolkit",
          "npm run build:production",
          "docker build -t techapp .",
          "kubectl apply -f deployment.yaml",
          "echo 'Deployment successful! 🚀'"
        ]
      }
    };

    const SelectedComponent = compositions.find(c => c.id === currentComposition)?.component;
    
    if (!SelectedComponent) return null;

    return (
      <Player
        component={SelectedComponent}
        durationInFrames={currentComposition === 'TechVideo' ? 300 : currentComposition === 'Terminal' ? 200 : currentComposition === 'APIVisualization' ? 240 : currentComposition === 'CodeReveal' ? 180 : 120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={60}
        controls
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '70vh'
        }}
        inputProps={props[currentComposition as keyof typeof props]}
      />
    );
  };

  return (
    <div className="min-h-screen bg-tech-dark text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-neon-blue mb-4 animate-pulse-neon">
            Remotion Video Studio
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Create stunning tech-focused videos with advanced animations, code reveals, 
            and dynamic visualizations using our professional video creation system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-tech-surface border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-neon-blue">Video Preview</CardTitle>
                    <CardDescription className="text-gray-400">
                      Real-time preview of your video composition
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg overflow-hidden">
                  {renderPlayer()}
                </div>
              </CardContent>
            </Card>

            {/* Composition Selection */}
            <Card className="bg-tech-surface border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-neon-green">Video Templates</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose from our professional video templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {compositions.map((comp) => {
                    const Icon = comp.icon;
                    return (
                      <Button
                        key={comp.id}
                        variant={currentComposition === comp.id ? "default" : "outline"}
                        onClick={() => setCurrentComposition(comp.id)}
                        className={`h-20 flex flex-col items-center justify-center ${
                          currentComposition === comp.id 
                            ? 'bg-neon-blue text-black' 
                            : 'border-gray-600 hover:border-neon-blue'
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-1" />
                        <span className="text-xs">{comp.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div>
            <Card className="bg-tech-surface border-gray-700">
              <CardHeader>
                <CardTitle className="text-neon-purple">Customization</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your video content and styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-tech-code">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="title" className="text-gray-300">Title</Label>
                      <Input
                        id="title"
                        value={videoProps.title}
                        onChange={(e) => setVideoProps(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-tech-code border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subtitle" className="text-gray-300">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={videoProps.subtitle}
                        onChange={(e) => setVideoProps(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="bg-tech-code border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="code" className="text-gray-300">Code Snippet</Label>
                      <Textarea
                        id="code"
                        value={videoProps.codeSnippet}
                        onChange={(e) => setVideoProps(prev => ({ ...prev, codeSnippet: e.target.value }))}
                        className="bg-tech-code border-gray-600 text-white font-mono text-sm"
                        rows={6}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="style" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="theme" className="text-gray-300">Theme</Label>
                      <Select
                        value={videoProps.theme}
                        onValueChange={(value) => setVideoProps(prev => ({ ...prev, theme: value as any }))}
                      >
                        <SelectTrigger className="bg-tech-code border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-tech-surface border-gray-600">
                          <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                          <SelectItem value="neon">Neon</SelectItem>
                          <SelectItem value="matrix">Matrix</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="logo" className="text-gray-300">Logo URL</Label>
                      <Input
                        id="logo"
                        value={videoProps.logoUrl}
                        onChange={(e) => setVideoProps(prev => ({ ...prev, logoUrl: e.target.value }))}
                        className="bg-tech-code border-gray-600 text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="export" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        1080p Ready
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-400">
                        60 FPS
                      </Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-400">
                        MP4 Export
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-neon-blue text-black hover:bg-neon-blue/90">
                        <Play className="w-4 h-4 mr-2" />
                        Render Video
                      </Button>
                      <Button variant="outline" className="w-full border-gray-600">
                        <Download className="w-4 h-4 mr-2" />
                        Download Assets
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-tech-surface border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-neon-green">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-gray-300">Code syntax highlighting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    <span className="text-gray-300">Morphing logo animations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                    <span className="text-gray-300">Kinetic typography</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                    <span className="text-gray-300">API documentation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-tech-neon-blue rounded-full"></div>
                    <span className="text-gray-300">Terminal simulations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
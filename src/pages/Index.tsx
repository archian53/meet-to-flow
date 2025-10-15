import { useState } from "react";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import { FileText, Zap } from "lucide-react";

export interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  mermaidCode: string;
}

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [diagramType, setDiagramType] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Meeting to Flow
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Transform meeting transcripts and recordings into clear technical diagrams and actionable summaries
        </p>
        
        <div className="flex items-center justify-center gap-8 mt-12 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Upload</div>
              <div className="text-sm text-muted-foreground">Transcript or video</div>
            </div>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Analyze</div>
              <div className="text-sm text-muted-foreground">AI processing</div>
            </div>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold">Visualize</div>
              <div className="text-sm text-muted-foreground">Get your diagram</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        {!result ? (
          <UploadSection 
            onAnalysisComplete={setResult} 
            onDiagramTypeSelect={setDiagramType}
          />
        ) : (
          <ResultsSection 
            result={result} 
            diagramType={diagramType}
            onReset={() => setResult(null)} 
          />
        )}
      </main>
    </div>
  );
};

export default Index;

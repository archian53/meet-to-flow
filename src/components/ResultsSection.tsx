import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import type { AnalysisResult } from "@/pages/Index";
import MermaidDiagram from "./MermaidDiagram";

interface ResultsSectionProps {
  result: AnalysisResult;
  diagramType: string;
  onReset: () => void;
}

const ResultsSection = ({ result, diagramType, onReset }: ResultsSectionProps) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `# Meeting Analysis\n\n## Summary\n${result.summary}\n\n## Key Points\n${result.keyPoints.map(p => `- ${p}`).join('\n')}\n\n## Diagram\n\`\`\`mermaid\n${result.mermaidCode}\n\`\`\``
      ],
      { type: 'text/markdown' }
    );
    element.href = URL.createObjectURL(file);
    element.download = "meeting-analysis.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onReset} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </Button>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="p-6 shadow-medium border-border/50 backdrop-blur-sm bg-card/80">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
      </Card>

      {/* Key Points Card */}
      <Card className="p-6 shadow-medium border-border/50 backdrop-blur-sm bg-card/80">
        <h2 className="text-2xl font-bold mb-4">Key Points</h2>
        <ul className="space-y-2">
          {result.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Diagram Card */}
      <Card className="p-6 shadow-medium border-border/50 backdrop-blur-sm bg-card/80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {diagramType === 'flowchart' ? 'Flowchart' : diagramType === 'blueprint' ? 'Blueprint' : 'Diagram'}
          </h2>
          <span className="text-sm text-muted-foreground px-3 py-1 bg-primary/10 rounded-full">
            {diagramType}
          </span>
        </div>
        <MermaidDiagram code={result.mermaidCode} />
      </Card>
    </div>
  );
};

export default ResultsSection;

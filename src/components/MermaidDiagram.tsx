import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
}

const MermaidDiagram = ({ code }: MermaidDiagramProps) => {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !code) return;

      try {
        setError(null);
        mermaid.initialize({ 
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram. The AI may have generated invalid syntax.');
      }
    };

    renderDiagram();
  }, [code]);

  if (error) {
    return (
      <Card className="p-6 bg-destructive/10 border-destructive/20">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">Diagram Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium">View raw code</summary>
          <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
            {code}
          </pre>
        </details>
      </Card>
    );
  }

  return (
    <div className="overflow-auto">
      <div 
        ref={containerRef} 
        className="flex items-center justify-center p-6 min-h-[300px]"
      />
    </div>
  );
};

export default MermaidDiagram;

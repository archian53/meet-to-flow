import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult } from "@/pages/Index";

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onDiagramTypeSelect: (type: string) => void;
}

const UploadSection = ({ onAnalysisComplete, onDiagramTypeSelect }: UploadSectionProps) => {
  const [transcript, setTranscript] = useState("");
  const [diagramType, setDiagramType] = useState("flowchart");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      toast.error("Please enter a transcript");
      return;
    }

    setIsProcessing(true);
    onDiagramTypeSelect(diagramType);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-transcript', {
        body: { transcript, diagramType }
      });

      if (error) throw error;

      onAnalysisComplete(data);
      toast.success("Analysis complete!");
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || "Failed to analyze transcript");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      toast.error("Video transcription coming soon! Please paste a text transcript for now.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setTranscript(text);
      toast.success("File loaded successfully");
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 shadow-medium border-border/50 backdrop-blur-sm bg-card/80">
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Upload Transcript</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.doc,.docx,video/*"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Click to upload transcript or video</p>
                <p className="text-xs text-muted-foreground">TXT, DOC, or video files supported</p>
              </label>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or paste transcript</span>
            </div>
          </div>

          {/* Text Input */}
          <div>
            <Label htmlFor="transcript" className="text-base font-semibold mb-3 block">
              Meeting Transcript
            </Label>
            <Textarea
              id="transcript"
              placeholder="Paste your meeting transcript here... Discuss technical solutions, processes, or system designs."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          {/* Diagram Type Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Diagram Type</Label>
            <RadioGroup value={diagramType} onValueChange={setDiagramType}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="cursor-pointer">
                  <div className={`border-2 rounded-lg p-4 hover:border-primary/50 transition-all ${
                    diagramType === "flowchart" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <RadioGroupItem value="flowchart" id="flowchart" className="sr-only" />
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold">Flowchart</div>
                        <div className="text-xs text-muted-foreground">Process flow</div>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer">
                  <div className={`border-2 rounded-lg p-4 hover:border-primary/50 transition-all ${
                    diagramType === "mermaid" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <RadioGroupItem value="mermaid" id="mermaid" className="sr-only" />
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                      </svg>
                      <div>
                        <div className="font-semibold">Diagram</div>
                        <div className="text-xs text-muted-foreground">Custom layout</div>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer">
                  <div className={`border-2 rounded-lg p-4 hover:border-primary/50 transition-all ${
                    diagramType === "blueprint" ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <RadioGroupItem value="blueprint" id="blueprint" className="sr-only" />
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <div>
                        <div className="font-semibold">Blueprint</div>
                        <div className="text-xs text-muted-foreground">Architecture</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Analyze Button */}
          <Button 
            onClick={handleAnalyze} 
            disabled={isProcessing || !transcript.trim()}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-medium"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze & Generate Diagram"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UploadSection;

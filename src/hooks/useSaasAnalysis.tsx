
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResult } from "@/lib/uxAnalyzer";

const useSaasAnalysis = (language: string, t: any) => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("saasAnalysisResults") || "[]"
    );
    if (Array.isArray(saved) && saved.length > 0) setResults(saved);
  }, []);

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast({
        title: t.inputRequired,
        description: t.inputRequiredDesc,
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Get API key from environment or use fallback
      const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;
      
      if (!OPENAI_API_KEY) {
        // If no API key, use the mock analyzer as fallback
        console.log("No API key found, using mock analysis");
        const { analyzeUX } = await import("@/lib/uxAnalyzer");
        const mockResult = analyzeUX(input, language === "ar" ? "ar" : "en");
        
        const newResult: AnalysisResult = {
          ...mockResult,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          input,
          language: language === "ar" ? "ar" : "en",
        };

        const updatedResults = [newResult, ...results];
        setResults(updatedResults);
        localStorage.setItem("saasAnalysisResults", JSON.stringify(updatedResults));
        setInput("");

        toast({
          title: t.analysisComplete,
          description: t.analysisCompleteDesc,
        });
        return;
      }

      const prompt = `
You are a SaaS business analyst. Analyze the following SaaS idea and provide a detailed business analysis.

SaaS Idea: "${input}"

Please provide your analysis in JSON format with the following structure:
{
  "score": <number between 40-95>,
  "issues": [
    "Issue 1 description",
    "Issue 2 description",
    "Issue 3 description"
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2", 
    "Recommendation 3"
  ]
}

Focus on:
- Market potential and target audience
- Technical feasibility and complexity
- Competitive landscape
- Revenue model viability
- Scalability challenges
- Key success factors

Respond in ${language === "ar" ? "Arabic" : "English"} language only.
Return only valid JSON, no additional text.
      `;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system", 
              content: "You are a professional SaaS business analyst. Always respond with valid JSON only."
            },
            {
              role: "user", 
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No response content received from API");
      }

      let parsed: Partial<AnalysisResult> = {};
      try {
        parsed = JSON.parse(content);
      } catch (parseError) {
        console.error("Failed to parse API response:", content);
        // Fallback to mock analysis if parsing fails
        const { analyzeUX } = await import("@/lib/uxAnalyzer");
        parsed = analyzeUX(input, language === "ar" ? "ar" : "en");
      }

      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input,
        score: typeof parsed.score === "number" ? Math.max(40, Math.min(95, parsed.score)) : 75,
        issues: Array.isArray(parsed.issues) ? parsed.issues : ["No specific issues identified"],
        recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : ["Focus on market validation"],
        language: language === "ar" ? "ar" : "en",
      };

      const updatedResults = [newResult, ...results];
      setResults(updatedResults);
      localStorage.setItem("saasAnalysisResults", JSON.stringify(updatedResults));
      setInput("");

      toast({
        title: t.analysisComplete,
        description: t.analysisCompleteDesc,
      });

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: t.analysisError,
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `saas-analysis-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: t.exportComplete,
      description: t.exportCompleteDesc,
    });
  };

  const handleClear = () => {
    setResults([]);
    localStorage.removeItem("saasAnalysisResults");
    toast({
      title: t.historyCleared,
      description: t.historyClearedDesc,
    });
  };

  return {
    input,
    setInput,
    isAnalyzing,
    results,
    handleAnalyze,
    handleExport,
    handleClear,
  };
};

export default useSaasAnalysis;

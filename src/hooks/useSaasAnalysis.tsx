import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResult } from "@/lib/uxAnalyzer";
import { SAAS_ANALYSIS_PROMPT } from "@/lib/analysisPrompt"; // This now contains your 1000-line super detailed prompt

const useSaasAnalysis = (language: string) => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saascanResults") || "[]");
    if (Array.isArray(saved) && saved.length > 0) setResults(saved);
  }, []);

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter your SaaS idea to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const GEMINI_API_KEY =
        import.meta.env.VITE_GEMINI_API_KEY ||
        process.env.REACT_APP_GEMINI_API_KEY ||
        "AIzaSyACk_TwCNngF9-vYxtUjkIq51ugGr4BY9Y";

      if (!GEMINI_API_KEY) {
        console.log("No API key found, using mock analysis");
        const { analyzeUX } = await import("@/lib/uxAnalyzer");
        const mockResult = analyzeUX(input, "en");

        const newResult: AnalysisResult = {
          ...mockResult,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          input,
          language: "en",
        };

        const updatedResults = [newResult, ...results];
        setResults(updatedResults);
        localStorage.setItem("saascanResults", JSON.stringify(updatedResults));
        setInput("");

        toast({
          title: "Analysis Complete",
          description: "Your SaaS idea has been analyzed successfully",
        });
        return;
      }

      // Insert the input into our massive analysis prompt
      const prompt = SAAS_ANALYSIS_PROMPT.replace("{INPUT}", input);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              topK: 1,
              topP: 0.8,
              maxOutputTokens: 4096, // Increased to accommodate bigger response from longer prompt
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Gemini API Error: ${response.status}`
        );
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error("No response content received from Gemini API");
      }

      let parsed: Partial<AnalysisResult> = {};
      try {
        const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
        parsed = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", content);
        const { analyzeUX } = await import("@/lib/uxAnalyzer");
        parsed = analyzeUX(input, "en");
      }

      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input,
        score:
          typeof parsed.score === "number"
            ? Math.max(40, Math.min(95, parsed.score))
            : 75,
        issues: Array.isArray(parsed.issues)
          ? parsed.issues
          : ["No specific issues identified"],
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations
          : ["Focus on market validation"],
        language: "en",
      };

      const updatedResults = [newResult, ...results];
      setResults(updatedResults);
      localStorage.setItem("saascanResults", JSON.stringify(updatedResults));
      setInput("");

      toast({
        title: "Analysis Complete",
        description: "Your SaaS idea has been analyzed with detailed insights",
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        title: "Analysis Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
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
    link.download = `saascan-results-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Your analysis results have been exported successfully",
    });
  };

  const handleClear = () => {
    setResults([]);
    localStorage.removeItem("saascanResults");
    toast({
      title: "History Cleared",
      description: "All analysis results have been cleared",
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

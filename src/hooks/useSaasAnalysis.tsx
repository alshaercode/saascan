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
      const OPENAI_API_KEY =
        import.meta.env.VITE_OPENAI_API_KEY ||
        "AIzaSyACk_TwCNngF9-vYxtUjkIq51ugGr4BY9Y";
      if (!OPENAI_API_KEY) throw new Error("Missing API key");

      const prompt = `
Analyze the following SaaS idea and provide a detailed analysis including:
- Market potential
- Strengths and weaknesses
- Key features to focus on
- Business model recommendations
- Possible challenges and risks

SaaS Idea: ${input}
Language: ${language === "ar" ? "ar" : "en"}

Return the response as JSON with keys: score (number), issues (array), recommendations (array).
      `;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 800,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API Error");
      }

      const data = await response.json();
      let parsed: Partial<AnalysisResult> = {};
      try {
        parsed = JSON.parse(data.choices[0].message?.content || "");
      } catch {
        parsed = {};
      }

      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input,
        score: typeof parsed.score === "number" ? parsed.score : 0,
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations
          : [],
        language: language === "ar" ? "ar" : "en",
      };

      const updatedResults = [newResult, ...results];
      setResults(updatedResults);
      localStorage.setItem(
        "saasAnalysisResults",
        JSON.stringify(updatedResults)
      );
      setInput("");

      toast({
        title: t.analysisComplete,
        description: t.analysisCompleteDesc,
      });
    } catch (error) {
      toast({
        title: t.analysisError,
        description: (error as Error).message,
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
    link.download = `saas-analysis-${
      new Date().toISOString().split("T")[0]
    }.json`;
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

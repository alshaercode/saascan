
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
      localStorage.getItem("saascanResults") || "[]"
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
      // Get API key from environment
      const GEMINI_API_KEY =
        import.meta.env.VITE_GEMINI_API_KEY ||
        process.env.REACT_APP_GEMINI_API_KEY ||
        "AIzaSyACk_TwCNngF9-vYxtUjkIq51ugGr4BY9Y";

      if (!GEMINI_API_KEY) {
        // If no API key, use the mock analyzer as fallback
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
        localStorage.setItem(
          "saascanResults",
          JSON.stringify(updatedResults)
        );
        setInput("");

        toast({
          title: t.analysisComplete,
          description: t.analysisCompleteDesc,
        });
        return;
      }

      const prompt = `
As a professional SaaS business analyst, conduct a comprehensive analysis of the following SaaS concept. Your analysis should be strategic, data-driven, and actionable.

SaaS Concept: "${input}"

Perform a detailed business analysis covering:

1. MARKET VIABILITY ASSESSMENT
- Target market size and addressable market
- Customer pain points and value proposition alignment
- Competitive landscape and differentiation opportunities
- Market entry barriers and timing considerations

2. BUSINESS MODEL EVALUATION
- Revenue model sustainability and scalability
- Customer acquisition cost (CAC) and lifetime value (LTV) potential
- Pricing strategy effectiveness
- Unit economics and profitability pathways

3. TECHNICAL & OPERATIONAL FEASIBILITY
- Development complexity and resource requirements
- Infrastructure scalability considerations
- Integration capabilities and dependencies
- Security and compliance requirements

4. RISK ASSESSMENT
- Market risks (competition, saturation, economic factors)
- Technical risks (scalability, security, maintenance)
- Business risks (customer churn, pricing pressure, regulatory)
- Operational risks (talent acquisition, funding, partnerships)

5. STRATEGIC RECOMMENDATIONS
- Priority improvements for concept validation
- Go-to-market strategy suggestions
- Product development roadmap considerations
- Key success metrics and milestones

Provide your analysis in JSON format:
{
  "score": <viability score 40-95>,
  "issues": [
    "Specific challenge or risk identified",
    "Another key concern requiring attention",
    "Additional strategic consideration"
  ],
  "recommendations": [
    "Specific actionable recommendation",
    "Strategic improvement suggestion", 
    "Implementation priority or next step"
  ]
}

Focus on providing specific, actionable insights rather than generic advice. Consider industry best practices, market trends, and proven SaaS success patterns in your analysis.

Return only valid JSON format without additional text or markdown formatting.
      `;

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
              maxOutputTokens: 2048,
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
        // Clean the response to extract JSON
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        parsed = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", content);
        // Fallback to mock analysis if parsing fails
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
      localStorage.setItem(
        "saascanResults",
        JSON.stringify(updatedResults)
      );
      setInput("");

      toast({
        title: t.analysisComplete,
        description: t.analysisCompleteDesc,
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        title: t.analysisError,
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
      title: t.exportComplete,
      description: t.exportCompleteDesc,
    });
  };

  const handleClear = () => {
    setResults([]);
    localStorage.removeItem("saascanResults");
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

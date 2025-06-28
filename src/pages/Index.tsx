
import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart3, Globe, Save, Trash2, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisTable from "@/components/AnalysisTable";
import { useLanguage } from "@/hooks/useLanguage";
import { useI18n } from "@/hooks/useI18n";
import { analyzeUX, AnalysisResult } from "@/lib/uxAnalyzer";
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/storage";

const Index = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { t, language, toggleLanguage } = useLanguage();
  const { t: translate } = useI18n();
  const { toast } = useToast();

  useEffect(() => {
    // Load existing results from localStorage on component mount
    const savedResults = loadFromLocalStorage();
    if (savedResults.length > 0) {
      setResults(savedResults);
      toast({
        title: t.dataRestored,
        description: t.dataRestoredDesc.replace('{count}', savedResults.length.toString()),
      });
    }
  }, [t]);

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysis = analyzeUX(input, language);
      const newResults = [analysis, ...results];
      
      setResults(newResults);
      saveToLocalStorage(newResults);
      setInput("");
      
      toast({
        title: t.analysisComplete,
        description: t.analysisCompleteDesc,
      });
    } catch (error) {
      toast({
        title: t.analysisError,
        description: t.analysisErrorDesc,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearHistory = () => {
    setResults([]);
    saveToLocalStorage([]);
    toast({
      title: t.historyCleared,
      description: t.historyClearedDesc,
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ux-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: t.exportComplete,
      description: t.exportCompleteDesc,
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] via-[hsl(var(--background))] to-[hsl(var(--hero-gradient-end))] ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Navbar language={language} onLanguageToggle={toggleLanguage} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-full">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Input Section */}
        <Card className="mx-auto max-w-4xl shadow-lg border-0 bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t.inputTitle}
            </CardTitle>
            <CardDescription>{t.inputDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={t.inputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-32 text-base border-2 focus:border-[hsl(var(--input-focus))] transition-colors"
              disabled={isAnalyzing}
            />
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-xs">
                {input.length} {t.characters}
              </Badge>
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim()}
                className="bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] hover:from-[hsl(var(--gradient-primary))]/90 hover:to-[hsl(var(--gradient-secondary))]/90 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.analyzing}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {t.analyzeButton}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-[hsl(var(--navbar-text))]">{t.resultsTitle}</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleExport}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t.exportButton}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 text-[hsl(var(--score-error))] hover:text-[hsl(var(--score-error))]/80"
                >
                  <Trash2 className="w-4 h-4" />
                  {t.clearHistory}
                </Button>
              </div>
            </div>
            <AnalysisTable results={results} language={language} />
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !isAnalyzing && (
          <Card className="mx-auto max-w-2xl text-center py-12 border-dashed border-2 border-[hsl(var(--border))]">
            <CardContent>
              <BarChart3 className="w-16 h-16 text-[hsl(var(--muted-foreground))] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[hsl(var(--muted-foreground))] mb-2">{t.noResults}</h3>
              <p className="text-[hsl(var(--muted-foreground))]">{t.noResultsDesc}</p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;

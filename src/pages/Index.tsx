
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb, Globe, Download, Trash2, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaasAnalysisTable from "@/components/SaasAnalysisTable";
import HistoryPreview from "@/components/HistoryPreview";
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
    const savedResults = loadFromLocalStorage();
    if (savedResults.length > 0) {
      setResults(savedResults);
    }
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
    link.download = `saas-analysis-${new Date().toISOString().split('T')[0]}.json`;
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
        {/* Enhanced Hero Section */}
        <div className="text-center space-y-8 py-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-2xl shadow-2xl">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-[hsl(var(--gradient-secondary))] animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] bg-clip-text text-transparent leading-tight">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] max-w-4xl mx-auto leading-relaxed font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              ⚡ Instant Analysis
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🎯 Market Insights
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📊 Detailed Reports
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🌍 Multi-language
            </Badge>
          </div>
        </div>

        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left column - Input and History */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Input Section */}
            <Card className="shadow-xl border-0 bg-[hsl(var(--card-bg))]/80 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-[hsl(var(--gradient-primary))]/10 to-[hsl(var(--gradient-secondary))]/10 rounded-lg">
                    <Globe className="w-6 h-6 text-[hsl(var(--gradient-primary))]" />
                  </div>
                  {t.inputTitle}
                </CardTitle>
                <CardDescription className="text-base text-[hsl(var(--muted-foreground))]">
                  {t.inputDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Textarea
                    placeholder={t.inputPlaceholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-48 text-base border-2 focus:border-[hsl(var(--gradient-primary))] transition-all duration-300 resize-none bg-[hsl(var(--background))]/50 backdrop-blur-sm"
                    disabled={isAnalyzing}
                  />
                  <div className="absolute bottom-4 right-4">
                    <Badge variant={input.length > 50 ? "default" : "secondary"} className="text-xs">
                      {input.length} {t.characters}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !input.trim()}
                    size="lg"
                    className="bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] hover:from-[hsl(var(--gradient-primary))]/90 hover:to-[hsl(var(--gradient-secondary))]/90 text-white px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="font-semibold">{t.analyzing}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg">{t.analyzeButton}</span>
                        <ArrowRight className="w-5 h-5" />
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
                  <h2 className="text-3xl font-bold text-[hsl(var(--navbar-text))] flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-full"></div>
                    {t.resultsTitle}
                  </h2>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleExport}
                      className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      {t.exportButton}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleClearHistory}
                      className="flex items-center gap-2 text-[hsl(var(--score-error))] hover:text-[hsl(var(--score-error))]/80 hover:bg-[hsl(var(--score-error-bg))] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t.clearHistory}
                    </Button>
                  </div>
                </div>
                <SaasAnalysisTable results={results} language={language} />
              </div>
            )}

            {/* Enhanced Empty State */}
            {results.length === 0 && !isAnalyzing && (
              <Card className="text-center py-20 border-dashed border-2 border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--accent))]/30">
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative inline-block">
                      <Lightbulb className="w-20 h-20 text-[hsl(var(--muted-foreground))]/50" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gradient-primary))]/20 to-[hsl(var(--gradient-secondary))]/20 rounded-full blur-xl"></div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-[hsl(var(--muted-foreground))]">
                        {t.noResults}
                      </h3>
                      <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-md mx-auto">
                        {t.noResultsDesc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - History Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <HistoryPreview results={results} language={language} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

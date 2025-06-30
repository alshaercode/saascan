"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useLanguage } from "@/hooks/useLanguage";
import useSaasAnalysis from "@/hooks/useSaasAnalysis";
import HeroSection from "@/components/layout/HeroSection";
import InputAnalysisSection from "@/components/layout/InputAnalysisSection";
import ResultsSection from "@/components/layout/ResultsSection";
import EmptyStateSection from "@/components/layout/EmptyStateSection";

const Index = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const {
    input,
    setInput,
    isAnalyzing,
    results,
    handleAnalyze,
    handleExport,
    handleClear,
  } = useSaasAnalysis(language, t);

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] via-[hsl(var(--background))] to-[hsl(var(--hero-gradient-end))] ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <Navbar language={language} onLanguageToggle={toggleLanguage} />

      <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
        <HeroSection t={t} />
        <InputAnalysisSection
          t={t}
          input={input}
          setInput={setInput}
          isAnalyzing={isAnalyzing}
          handleAnalyze={handleAnalyze}
        />
        {results.length > 0 ? (
          <ResultsSection
            t={t}
            results={results}
            language={language}
            handleExport={handleExport}
            handleClear={handleClear}
          />
        ) : (
          !isAnalyzing && <EmptyStateSection t={t} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;

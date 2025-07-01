"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useLanguage } from "@/hooks/useLanguage";
import useSaasAnalysis from "@/hooks/useSaasAnalysis";
import HeroSection from "@/components/layout/HeroSection";
import InputAnalysisSection from "@/components/layout/InputAnalysisSection";
import ResultsSection from "@/components/layout/ResultsSection";
import EmptyStateSection from "@/components/layout/EmptyStateSection";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import ExampleIdeas from "@/components/examples/ExampleIdeas";
import SkeletonLoader from "@/components/analysis/SkeletonLoader";
import ProgressIndicator from "@/components/analysis/ProgressIndicator";
import HistoryPreview from "@/components/HistoryPreview";

const Index = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const {
    input,
    setInput,
    isAnalyzing,
    results,
    handleAnalyze,
    handleExport,
    handleClear,
  } = useSaasAnalysis(language, t);

  const handleExampleSelect = (example: string) => {
    setInput(example);
    setShowOnboarding(false);
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] via-[hsl(var(--background))] to-[hsl(var(--hero-gradient-end))]
        
        ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <Navbar language={language} onLanguageToggle={toggleLanguage} />

      <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto gap-8">
          <div className="lg:col-span-2 space-y-6">
            <InputAnalysisSection
              input={input}
              setInput={setInput}
              isAnalyzing={isAnalyzing}
              handleAnalyze={handleAnalyze}
            />

            <ProgressIndicator isAnalyzing={isAnalyzing} />

            {isAnalyzing && <SkeletonLoader />}

            {results.length > 0 && !isAnalyzing && (
              <ResultsSection
                results={results}
                language={language}
                handleExport={handleExport}
                handleClear={handleClear}
              />
            )}

            {results.length === 0 && !isAnalyzing && !showOnboarding && (
              <EmptyStateSection />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

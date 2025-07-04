"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import useSaasAnalysis from "@/hooks/useSaasAnalysis";
import HeroSection from "@/components/layout/HeroSection";
import InputAnalysisSection from "@/components/layout/InputAnalysisSection";
import EmptyStateSection from "@/components/layout/EmptyStateSection";
import SkeletonLoader from "@/components/analysis/SkeletonLoader";
import ProgressIndicator from "@/components/analysis/ProgressIndicator";

const LastSaasDetailTable = ({ result, handleExport, handleClear }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Latest SaaS Analysis Report</h2>
        <div className="space-x-2">
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export JSON
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                Input
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                Score
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                Validity
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                Issues
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                Recommendations
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td
                className="px-4 py-2 text-sm text-gray-900 max-w-xs break-words"
                title={result.input}
              >
                {result.input}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {result.score}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {result.validity || "N/A"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                <ul className="list-disc list-inside space-y-1">
                  {result.issues?.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  )) || <li>No issues found</li>}
                </ul>
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                <ul className="list-disc list-inside space-y-1">
                  {result.recommendations?.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  )) || <li>No recommendations</li>}
                </ul>
              </td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {new Date(result.timestamp).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const {
    input,
    setInput,
    isAnalyzing,
    results,
    handleAnalyze,
    handleExport,
    handleClear,
  } = useSaasAnalysis("en");

  const lastResult = results[0]; // always show last result

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
        <HeroSection />

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <InputAnalysisSection
              input={input}
              setInput={setInput}
              isAnalyzing={isAnalyzing}
              handleAnalyze={handleAnalyze}
            />

            <ProgressIndicator isAnalyzing={isAnalyzing} />

            {isAnalyzing && <SkeletonLoader />}

            {lastResult && !isAnalyzing && (
              <LastSaasDetailTable
                result={lastResult}
                handleExport={handleExport}
                handleClear={handleClear}
              />
            )}

            {!lastResult && !isAnalyzing && !showOnboarding && (
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

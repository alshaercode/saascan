// src/pages/HistoryPage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaasAnalysisTable from "@/components/SaasAnalysisTable";
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const { t, language, toggleLanguage } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    setHistory(loadFromLocalStorage());
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    saveToLocalStorage([]);
    toast({
      title: t.historyCleared,
      description: t.historyClearedDesc,
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `saas-analysis-history-${
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

  return (
    <div className={`min-h-screen ${language === "ar" ? "rtl" : "ltr"}`}>
      <Navbar language={language} onLanguageToggle={toggleLanguage} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold mb-4">
          {t.historyPageTitle || "History"}
        </h1>
        <div className="flex gap-3 mb-6">
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
            className="flex items-center gap-2 text-[hsl(var(--score-error))]"
          >
            <Trash2 className="w-4 h-4" />
            {t.clearHistory}
          </Button>
        </div>
        <SaasAnalysisTable results={history} language={language} />
      </main>
      <Footer />
    </div>
  );
};

export default HistoryPage;

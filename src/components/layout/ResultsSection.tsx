
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import SaasAnalysisTable from "@/components/SaasAnalysisTable";

interface ResultsSectionProps {
  results: any[];
  language: string;
  handleExport: () => void;
  handleClear: () => void;
}

const ResultsSection = ({
  results,
  language,
  handleExport,
  handleClear,
}: ResultsSectionProps) => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[hsl(var(--navbar-text))] flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-full"></div>
          {t("resultsTitle")}
        </h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <Download className="w-4 h-4" />
            {t("exportButton")}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-2 text-[hsl(var(--score-error))] hover:text-[hsl(var(--score-error))]/80 hover:bg-[hsl(var(--score-error-bg))] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {t("clearHistory")}
          </Button>
        </div>
      </div>
      <SaasAnalysisTable results={results} language={language as "en" | "ar"} />
    </div>
  );
};

export default ResultsSection;

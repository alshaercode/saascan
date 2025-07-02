
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash2, FileText } from "lucide-react";
import SaasAnalysisTable from "@/components/SaasAnalysisTable";
import jsPDF from 'jspdf';

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
  
  const handlePDFExport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Saascan Analysis Results', 20, 30);
    
    let yPosition = 50;
    
    results.forEach((result, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      // Analysis header
      doc.setFontSize(14);
      doc.text(`Analysis #${results.length - index}`, 20, yPosition);
      yPosition += 10;
      
      // Date
      doc.setFontSize(10);
      const date = new Date(result.timestamp || '').toLocaleDateString();
      doc.text(`Date: ${date}`, 20, yPosition);
      yPosition += 10;
      
      // Score
      doc.text(`Viability Score: ${result.score || 0}/100`, 20, yPosition);
      yPosition += 10;
      
      // SaaS Concept (truncated)
      doc.text('SaaS Concept:', 20, yPosition);
      yPosition += 5;
      const concept = result.input || '';
      const lines = doc.splitTextToSize(concept.substring(0, 200) + '...', 170);
      doc.text(lines, 20, yPosition);
      yPosition += lines.length * 5 + 5;
      
      // Key Challenges
      if (result.issues && result.issues.length > 0) {
        doc.text('Key Challenges:', 20, yPosition);
        yPosition += 5;
        result.issues.slice(0, 3).forEach((issue: string) => {
          const issueLines = doc.splitTextToSize(`• ${issue}`, 170);
          doc.text(issueLines, 25, yPosition);
          yPosition += issueLines.length * 5;
        });
        yPosition += 5;
      }
      
      // Recommendations
      if (result.recommendations && result.recommendations.length > 0) {
        doc.text('Recommendations:', 20, yPosition);
        yPosition += 5;
        result.recommendations.slice(0, 3).forEach((rec: string) => {
          const recLines = doc.splitTextToSize(`• ${rec}`, 170);
          doc.text(recLines, 25, yPosition);
          yPosition += recLines.length * 5;
        });
        yPosition += 10;
      }
      
      // Separator line
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 15;
    });
    
    // Save the PDF
    doc.save(`saascan-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[hsl(var(--navbar-text))] flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-full"></div>
          Analysis Results
        </h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePDFExport}
            className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-2 text-[hsl(var(--score-error))] hover:text-[hsl(var(--score-error))]/80 hover:bg-[hsl(var(--score-error-bg))] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </Button>
        </div>
      </div>
      <SaasAnalysisTable results={results} language={language as "en" | "ar"} />
    </div>
  );
};

export default ResultsSection;

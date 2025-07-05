import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Users, 
  Wrench, 
  Lightbulb, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Rocket,
  Download,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ComprehensiveAnalysisResult } from "@/lib/uxAnalyzer";
import { createPdfExportService } from "@/lib/pdfExportService";
import { useToast } from "@/hooks/use-toast";

interface SaasAnalysisResultsTableProps {
  results: ComprehensiveAnalysisResult[];
  language: "en" | "ar";
  onClear?: () => void;
}

// Column configuration following Open/Closed Principle
interface TableColumn {
  key: keyof ComprehensiveAnalysisResult;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  width: string;
}

const TABLE_COLUMNS: TableColumn[] = [
  {
    key: "idea",
    icon: Target,
    label: "Idea",
    description: "Original user input text verbatim",
    width: "w-80"
  },
  {
    key: "targetAudience",
    icon: Users,
    label: "Target Audience",
    description: "AI-generated identification of primary user segments",
    width: "w-64"
  },
  {
    key: "problemsSolved",
    icon: Wrench,
    label: "Problems Solved",
    description: "AI-analyzed pain points the idea addresses",
    width: "w-72"
  },
  {
    key: "proposedSolution",
    icon: Lightbulb,
    label: "Proposed Solution",
    description: "AI-extracted unique value proposition",
    width: "w-72"
  },
  {
    key: "competitors",
    icon: Search,
    label: "Competitors",
    description: "AI-researched list of existing competitors",
    width: "w-56"
  },
  {
    key: "scalability",
    icon: TrendingUp,
    label: "Scalability",
    description: "AI-assessed growth potential with expansion strategies",
    width: "w-72"
  },
  {
    key: "profitModel",
    icon: DollarSign,
    label: "Profit Model",
    description: "AI-suggested revenue generation methods",
    width: "w-64"
  },
  {
    key: "innovationLevel",
    icon: Brain,
    label: "Innovation Level",
    description: "AI-rated novelty: Low, Medium, or High",
    width: "w-40"
  },
  {
    key: "overallRating",
    icon: Rocket,
    label: "Overall Rating",
    description: "AI-calculated score from 0-100",
    width: "w-36"
  }
];

const SaasAnalysisResultsTable: React.FC<SaasAnalysisResultsTableProps> = ({
  results,
  language,
  onClear
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleExportToPdf = async () => {
    if (results.length === 0) {
      toast({
        title: "No Data to Export",
        description: "Please analyze some SaaS ideas first.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      const pdfService = createPdfExportService();
      await pdfService.exportAnalysisResults(results);
      
      toast({
        title: "Export Successful",
        description: "Your analysis results have been exported to PDF.",
      });
    } catch (error) {
      console.error("PDF export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getInnovationLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return "text-green-700 bg-green-100";
    if (rating >= 60) return "text-yellow-700 bg-yellow-100";
    return "text-red-700 bg-red-100";
  };

  const renderCellContent = (result: ComprehensiveAnalysisResult, column: TableColumn) => {
    const value = result[column.key];
    
    switch (column.key) {
      case "idea":
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-900 leading-relaxed">
              {typeof value === "string" && value.length > 150 
                ? `${value.substring(0, 150)}...` 
                : value as string}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDate(result.timestamp)}
            </div>
          </div>
        );
      
      case "competitors":
        const competitors = Array.isArray(value) ? value : [value as string];
        return (
          <div className="space-y-1">
            {competitors.slice(0, 3).map((competitor, idx) => (
              <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                {competitor}
              </Badge>
            ))}
            {competitors.length > 3 && (
              <p className="text-xs text-gray-500">+{competitors.length - 3} more</p>
            )}
          </div>
        );
      
      case "innovationLevel":
        return (
          <Badge className={`${getInnovationLevelColor(value as string)} font-medium`}>
            {value as string}
          </Badge>
        );
      
      case "overallRating":
        return (
          <div className={`px-3 py-2 rounded-lg text-center font-bold ${getRatingColor(value as number)}`}>
            {value}/100
          </div>
        );
      
      default:
        return (
          <p className="text-sm text-gray-900 leading-relaxed">
            {typeof value === "string" && value.length > 120 
              ? `${value.substring(0, 120)}...` 
              : value as string}
          </p>
        );
    }
  };

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            </motion.div>
            <motion.h3
              className="text-lg font-semibold text-gray-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              No Analysis Results Yet
            </motion.h3>
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Start by analyzing your first SaaS concept to see detailed results here.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
          <p className="text-gray-600">
            {results.length} comprehensive analysis{results.length !== 1 ? "es" : ""} completed
          </p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleExportToPdf} 
              variant="outline" 
              size="sm"
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export to PDF"}
            </Button>
          </motion.div>
          {onClear && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onClear} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  #
                </th>
                {TABLE_COLUMNS.map((column) => {
                  const IconComponent = column.icon;
                  return (
                    <th
                      key={column.key}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width}`}
                      title={column.description}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {column.label}
                      </div>
                    </th>
                  );
                })}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, index) => (
                <React.Fragment key={result.id}>
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{results.length - index}
                    </td>
                    {TABLE_COLUMNS.map((column) => (
                      <td key={column.key} className="px-6 py-4 align-top">
                        {renderCellContent(result, column)}
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(result.id)}
                        className="p-1"
                      >
                        {expandedRows.has(result.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </motion.tr>
                  
                  <AnimatePresence>
                    {expandedRows.has(result.id) && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan={TABLE_COLUMNS.length + 2} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            {result.summary && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">📋 Executive Summary</h4>
                                <p className="text-sm text-gray-700">{result.summary}</p>
                              </div>
                            )}
                            
                            {result.detailedAnalysis?.recommendations && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">💡 Key Recommendations</h4>
                                <ul className="space-y-1">
                                  {result.detailedAnalysis.recommendations.map((rec, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                      <span className="text-blue-500 mt-1">→</span>
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helpful Tips Section */}
      <motion.div
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for Better Analysis</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Provide detailed descriptions of your SaaS idea for more accurate analysis</li>
          <li>• Include target market information and problem statements</li>
          <li>• Click the expand button (↓) to see detailed recommendations for each analysis</li>
          <li>• Export your results to PDF for sharing with stakeholders</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default SaasAnalysisResultsTable;

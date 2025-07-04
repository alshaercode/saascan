import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  Code,
  Shield,
  Lightbulb,
  Download,
  Trash2,
} from "lucide-react";
import { AnalysisResult } from "@/lib/uxAnalyzer";

interface AnalysisDataTableProps {
  results: AnalysisResult[];
  language: "en" | "ar";
  onExport?: () => void;
  onClear?: () => void;
}

const AnalysisDataTable = ({
  results,
  language,
  onExport,
  onClear,
}: AnalysisDataTableProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      backgroundColor: "rgba(59, 130, 246, 0.05)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-700 bg-green-100";
    if (score >= 60) return "text-yellow-700 bg-yellow-100";
    return "text-red-700 bg-red-100";
  };

  const getValidityColor = (validity?: string) => {
    switch (validity) {
      case "Realistic":
      case "Promising":
        return "text-green-700 bg-green-100";
      case "Weak":
        return "text-yellow-700 bg-yellow-100";
      case "High-Risk":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-700 bg-green-100";
      case "Medium":
        return "text-yellow-700 bg-yellow-100";
      case "High":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
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
                delay: 0.2,
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
              Start by analyzing your first SaaS concept to see detailed results
              here.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Actions */}
      <motion.div
        className="flex justify-between items-center"
        variants={tableVariants}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {results.length} analysis{results.length !== 1 ? "es" : ""}{" "}
            completed
          </motion.p>
        </motion.div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {onExport && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onExport} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </motion.div>
          )}
          {onClear && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onClear} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Comprehensive Data Table */}
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        variants={tableVariants}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analysis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score & Validity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Analysis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technical Feasibility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Financial Projections
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommendations
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, index) => (
                <motion.tr
                  key={result.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Analysis Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          #{results.length - index}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(result.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-900 max-w-xs">
                        <p className="truncate" title={result.input}>
                          {result.input.length > 100
                            ? `${result.input.substring(0, 100)}...`
                            : result.input}
                        </p>
                      </div>
                      {result.summary && (
                        <p className="text-xs text-gray-600 italic max-w-xs">
                          {result.summary.length > 80
                            ? `${result.summary.substring(0, 80)}...`
                            : result.summary}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Score & Validity Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                          result.score
                        )}`}
                      >
                        {result.score}/100
                      </div>
                      <Badge className={getValidityColor(result.validity)}>
                        {result.validity || "N/A"}
                      </Badge>
                    </div>
                  </td>

                  {/* Market Analysis Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2 max-w-xs">
                      {result.market?.pain_severity && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Pain Level:
                          </span>
                          <Badge
                            className={getRiskColor(
                              result.market.pain_severity
                            )}
                            size="sm"
                          >
                            {result.market.pain_severity}
                          </Badge>
                        </div>
                      )}
                      {result.market?.tam_estimate && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Market Size:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.market.tam_estimate}
                          </p>
                        </div>
                      )}
                      {result.market?.competitive_pressure && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Competition:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.market.competitive_pressure}
                          </p>
                        </div>
                      )}
                      {result.market?.buyer_personas &&
                        result.market.buyer_personas.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              Target:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {result.market.buyer_personas
                                .slice(0, 2)
                                .map((persona, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {persona}
                                  </Badge>
                                ))}
                              {result.market.buyer_personas.length > 2 && (
                                <span className="text-xs text-gray-500">
                                  +{result.market.buyer_personas.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </td>

                  {/* Technical Feasibility Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2 max-w-xs">
                      {result.technical?.complexity_rating && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Complexity:
                          </span>
                          <Badge
                            className={getRiskColor(
                              result.technical.complexity_rating === "Low"
                                ? "Low"
                                : result.technical.complexity_rating ===
                                  "Medium"
                                ? "Medium"
                                : "High"
                            )}
                            size="sm"
                          >
                            {result.technical.complexity_rating}
                          </Badge>
                        </div>
                      )}
                      {result.technical?.mvp_time_months && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            MVP Timeline:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.technical.mvp_time_months} months
                          </p>
                        </div>
                      )}
                      {result.technical?.development_cost && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Dev Cost:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.technical.development_cost}
                          </p>
                        </div>
                      )}
                      {result.technical?.team_size_needed && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Team Size:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.technical.team_size_needed} devs
                          </p>
                        </div>
                      )}
                      {result.technical?.tech_stack &&
                        result.technical.tech_stack.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              Tech Stack:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {result.technical.tech_stack
                                .slice(0, 3)
                                .map((tech, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              {result.technical.tech_stack.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{result.technical.tech_stack.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </td>

                  {/* User Experience Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2 max-w-xs">
                      {result.user_experience?.complexity_level && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            UX Complexity:
                          </span>
                          <Badge variant="outline" size="sm">
                            {result.user_experience.complexity_level}
                          </Badge>
                        </div>
                      )}
                      {result.user_experience?.user_journey_quality && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Journey Quality:
                          </span>
                          <Badge
                            className={getRiskColor(
                              result.user_experience.user_journey_quality ===
                                "Smooth"
                                ? "Low"
                                : result.user_experience
                                    .user_journey_quality === "Acceptable"
                                ? "Medium"
                                : "High"
                            )}
                            size="sm"
                          >
                            {result.user_experience.user_journey_quality}
                          </Badge>
                        </div>
                      )}
                      {result.user_experience?.onboarding_difficulty && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Onboarding:
                          </span>
                          <Badge variant="outline" size="sm">
                            {result.user_experience.onboarding_difficulty}
                          </Badge>
                        </div>
                      )}
                      {result.user_experience?.accessibility_score && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Accessibility:
                          </span>
                          <div
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              result.user_experience.accessibility_score >= 8
                                ? "text-green-700 bg-green-100"
                                : result.user_experience.accessibility_score >=
                                  6
                                ? "text-yellow-700 bg-yellow-100"
                                : "text-red-700 bg-red-100"
                            }`}
                          >
                            {result.user_experience.accessibility_score}/10
                          </div>
                        </div>
                      )}
                      {result.user_experience?.mobile_readiness && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Mobile:
                          </span>
                          <Badge variant="outline" size="sm">
                            {result.user_experience.mobile_readiness}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Financial Projections Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2 max-w-xs">
                      {result.financials?.pricing_model && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Pricing:
                          </span>
                          <Badge variant="outline" size="sm">
                            {result.financials.pricing_model}
                          </Badge>
                        </div>
                      )}
                      {result.financials?.arpu_range && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            ARPU:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.financials.arpu_range}
                          </p>
                        </div>
                      )}
                      {result.financials?.ltv_cac_ratio && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            LTV:CAC:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.financials.ltv_cac_ratio}
                          </p>
                        </div>
                      )}
                      {result.financials?.churn_rate && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Churn:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.financials.churn_rate}
                          </p>
                        </div>
                      )}
                      {result.financials?.gross_margin && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Margin:
                          </span>
                          <p className="text-xs text-gray-600">
                            {result.financials.gross_margin}
                          </p>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Risk Assessment Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2 max-w-xs">
                      {result.risks && result.risks.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-gray-700">
                            Top Risks:
                          </span>
                          <div className="space-y-1 mt-1">
                            {result.risks.slice(0, 3).map((risk, idx) => (
                              <div
                                key={idx}
                                className="border border-gray-200 rounded p-2"
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {risk.category}
                                  </Badge>
                                  <div className="flex gap-1">
                                    <Badge
                                      className={getRiskColor(risk.probability)}
                                      size="sm"
                                    >
                                      {risk.probability}
                                    </Badge>
                                    <Badge
                                      className={getRiskColor(risk.impact)}
                                      size="sm"
                                    >
                                      {risk.impact}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-700">
                                  {risk.risk}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  <strong>Mitigation:</strong> {risk.mitigation}
                                </p>
                              </div>
                            ))}
                            {result.risks.length > 3 && (
                              <p className="text-xs text-gray-500">
                                +{result.risks.length - 3} more risks
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {result.opportunities &&
                        result.opportunities.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              Opportunities:
                            </span>
                            <div className="space-y-1 mt-1">
                              {result.opportunities
                                .slice(0, 2)
                                .map((opp, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-green-200 rounded p-2 bg-green-50"
                                  >
                                    <div className="flex justify-between items-start mb-1">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {opp.area}
                                      </Badge>
                                      <Badge
                                        className={getRiskColor(
                                          opp.effort_required
                                        )}
                                        size="sm"
                                      >
                                        {opp.effort_required}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-700">
                                      {opp.opportunity}
                                    </p>
                                  </div>
                                ))}
                              {result.opportunities.length > 2 && (
                                <p className="text-xs text-gray-500">
                                  +{result.opportunities.length - 2} more
                                  opportunities
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </td>

                  {/* Recommendations Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2 max-w-xs">
                      {/* Legacy recommendations */}
                      {result.recommendations &&
                        result.recommendations.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              Key Actions:
                            </span>
                            <ul className="space-y-1 mt-1">
                              {result.recommendations
                                .slice(0, 3)
                                .map((rec, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs text-gray-600 flex items-start gap-1"
                                  >
                                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                                    <span>
                                      {typeof rec === "string"
                                        ? rec
                                        : rec.action ||
                                          rec.recommendation ||
                                          "No recommendation"}
                                    </span>
                                  </li>
                                ))}
                              {result.recommendations.length > 3 && (
                                <li className="text-xs text-gray-500">
                                  +{result.recommendations.length - 3} more
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                      {/* Structured recommendations */}
                      {result.structured_recommendations &&
                        result.structured_recommendations.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              Action Plan:
                            </span>
                            <div className="space-y-1 mt-1">
                              {result.structured_recommendations
                                .slice(0, 3)
                                .map((rec, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-blue-200 rounded p-2 bg-blue-50"
                                  >
                                    <div className="flex justify-between items-start mb-1">
                                      <Badge
                                        className={
                                          rec.priority === "High"
                                            ? "bg-red-100 text-red-700"
                                            : rec.priority === "Medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                        }
                                        size="sm"
                                      >
                                        {rec.priority}
                                      </Badge>
                                      <span className="text-xs text-gray-500">
                                        {rec.timeline}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-700">
                                      {rec.action}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {rec.rationale}
                                    </p>
                                  </div>
                                ))}
                              {result.structured_recommendations.length > 3 && (
                                <p className="text-xs text-gray-500">
                                  +
                                  {result.structured_recommendations.length - 3}{" "}
                                  more actions
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Validation experiments */}
                      {result.validation_experiments &&
                        result.validation_experiments.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              Validation Tests:
                            </span>
                            <div className="space-y-1 mt-1">
                              {result.validation_experiments
                                .slice(0, 2)
                                .map((exp, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-purple-200 rounded p-2 bg-purple-50"
                                  >
                                    <p className="text-xs text-gray-700 font-medium">
                                      {exp.experiment}
                                    </p>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>{exp.cost}</span>
                                      <span>{exp.timeline}</span>
                                    </div>
                                  </div>
                                ))}
                              {result.validation_experiments.length > 2 && (
                                <p className="text-xs text-gray-500">
                                  +{result.validation_experiments.length - 2}{" "}
                                  more tests
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisDataTable;

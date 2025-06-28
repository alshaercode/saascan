
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '@/lib/uxAnalyzer';

interface AnalysisTableProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
}

const AnalysisTable = ({ results, language }: AnalysisTableProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <Card key={result.id} className="overflow-hidden shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Input Text */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {language === 'en' ? 'Input Text' : 'النص المدخل'}
                </h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                  {result.input.length > 200 ? `${result.input.substring(0, 200)}...` : result.input}
                </p>
              </div>

              {/* Analysis Score */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {language === 'en' ? 'UX Score' : 'درجة تجربة المستخدم'}
                </h3>
                <div className={`flex items-center gap-2 p-3 rounded-lg font-bold text-2xl ${getScoreColor(result.score)}`}>
                  {getScoreIcon(result.score)}
                  {result.score}/100
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {language === 'en' ? 'Analysis Date' : 'تاريخ التحليل'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {formatDate(result.timestamp)}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {language === 'en' ? `Analysis #${results.length - index}` : `تحليل رقم ${results.length - index}`}
                </Badge>
              </div>
            </div>

            {/* Issues and Recommendations */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {language === 'en' ? 'Issues Found' : 'المشاكل المكتشفة'}
                </h4>
                <ul className="space-y-2 text-sm">
                  {result.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-red-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {language === 'en' ? 'Recommendations' : 'التوصيات'}
                </h4>
                <ul className="space-y-2 text-sm">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-green-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalysisTable;

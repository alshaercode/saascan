
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Target, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { AnalysisResult } from '@/lib/uxAnalyzer';
import { useI18n } from '@/hooks/useI18n';

interface SaasAnalysisTableProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
}

const SaasAnalysisTable = ({ results, language }: SaasAnalysisTableProps) => {
  const { t } = useI18n();

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
    if (score >= 80) return 'text-[hsl(var(--score-good))] bg-[hsl(var(--score-good-bg))]';
    if (score >= 60) return 'text-[hsl(var(--score-warning))] bg-[hsl(var(--score-warning-bg))]';
    return 'text-[hsl(var(--score-error))] bg-[hsl(var(--score-error-bg))]';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <Card key={result.id} className="overflow-hidden shadow-lg border-0 bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                {t('analysisNumber', { number: (results.length - index).toString() })}
              </div>
              <Badge variant="secondary" className="text-xs">
                {formatDate(result.timestamp)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* SaaS Concept Overview */}
            <div>
              <h3 className="font-semibold text-[hsl(var(--navbar-text))] mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t('inputText')}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--accent))] p-4 rounded-lg leading-relaxed">
                {result.input.length > 300 ? `${result.input.substring(0, 300)}...` : result.input}
              </p>
            </div>

            {/* Analysis Results Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Viability Score */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[hsl(var(--navbar-text))] mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t('saasScore')}
                  </h4>
                  <div className={`flex items-center gap-2 p-3 rounded-lg font-bold text-2xl ${getScoreColor(result.score)}`}>
                    {getScoreIcon(result.score)}
                    {result.score}/100
                  </div>
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[hsl(var(--issues-text))] mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t('issuesFound')}
                  </h4>
                  <ul className="space-y-2 text-sm max-h-32 overflow-y-auto">
                    {result.issues.slice(0, 3).map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2 bg-[hsl(var(--issues-bg))] rounded-lg">
                        <div className="w-1.5 h-1.5 bg-[hsl(var(--score-error))] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-[hsl(var(--issues-text))] text-xs">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[hsl(var(--recommendations-text))] mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t('recommendations')}
                  </h4>
                  <ul className="space-y-2 text-sm max-h-32 overflow-y-auto">
                    {result.recommendations.slice(0, 3).map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2 bg-[hsl(var(--recommendations-bg))] rounded-lg">
                        <div className="w-1.5 h-1.5 bg-[hsl(var(--score-good))] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-[hsl(var(--recommendations-text))] text-xs">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis Table */}
            <div>
              <h4 className="font-semibold text-[hsl(var(--navbar-text))] mb-3">Detailed Analysis</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aspect</TableHead>
                    <TableHead>Assessment</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Market Opportunity</TableCell>
                    <TableCell className="text-sm text-[hsl(var(--muted-foreground))]">
                      {result.recommendations[0] || 'Strong potential in target market'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={getScoreColor(result.score)}>
                        {Math.max(70, result.score - 10)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Technical Feasibility</TableCell>
                    <TableCell className="text-sm text-[hsl(var(--muted-foreground))]">
                      {result.issues[0] || 'Good technical foundation required'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={getScoreColor(result.score)}>
                        {Math.max(60, result.score - 20)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Competitive Advantage</TableCell>
                    <TableCell className="text-sm text-[hsl(var(--muted-foreground))]">
                      {result.recommendations[1] || 'Unique value proposition needed'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={getScoreColor(result.score)}>
                        {result.score}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SaasAnalysisTable;

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import InputValidation from "@/components/analysis/InputValidation";

interface InputAnalysisSectionProps {
  input: string;
  setInput: (value: string) => void;
  isAnalyzing: boolean;
  handleAnalyze: () => void;
}

const InputAnalysisSection = ({
  input,
  setInput,
  isAnalyzing,
  handleAnalyze,
}: InputAnalysisSectionProps) => {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 max-w-7xl gap-8 w-full mx-auto">
      <Card className="shadow-xl border-0 bg-[hsl(var(--card-bg))]/80 backdrop-blur-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center mx-auto gap-3 text-2xl">
            {/* <div className="p-2 bg-gradient-to-r from-[hsl(var(--gradient-primary))]/10 to-[hsl(var(--gradient-secondary))]/10 rounded-lg">
              <Globe className="w-6 h-6 text-[hsl(var(--gradient-primary))]" />
            </div> */}
            {t("inputTitle")}
          </CardTitle>
          {/* <CardDescription className="text-base text-[hsl(var(--muted-foreground))]">
            {t("inputDescription")}
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Textarea
              placeholder={t("inputPlaceholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-48 text-base border-2 focus:border-[hsl(var(--gradient-primary))] transition-all duration-300 resize-none bg-[hsl(var(--background))]/50 backdrop-blur-sm"
              disabled={isAnalyzing}
            />
            <InputValidation input={input} isAnalyzing={isAnalyzing} />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !input.trim() || input.length < 20}
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] hover:from-[hsl(var(--gradient-primary))]/90 hover:to-[hsl(var(--gradient-secondary))]/90 text-white px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="font-semibold">{t("analyzing")}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">
                    {t("analyzeButton")}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputAnalysisSection;

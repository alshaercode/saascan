
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  isAnalyzing: boolean;
}

const ProgressIndicator = ({ isAnalyzing }: ProgressIndicatorProps) => {
  const [progress, setProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    { icon: Brain, label: "Analyzing concept...", color: "text-blue-500" },
    { icon: Target, label: "Evaluating market...", color: "text-purple-500" },
    { icon: Zap, label: "Assessing feasibility...", color: "text-green-500" },
    { icon: TrendingUp, label: "Generating insights...", color: "text-orange-500" },
  ];

  React.useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isAnalyzing, steps.length]);

  if (!isAnalyzing) return null;

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <Card className="bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className={`p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100`}
          >
            <CurrentIcon className={`w-5 h-5 ${steps[currentStep]?.color || "text-blue-500"}`} />
          </motion.div>
          <div className="flex-1">
            <p className="font-medium text-sm">{steps[currentStep]?.label || "Processing..."}</p>
            <Progress value={progress} className="mt-2 h-2" />
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {Math.round(progress)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;

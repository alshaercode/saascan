import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressIndicatorProps {
  isAnalyzing: boolean;
}

const ProgressIndicator = ({ isAnalyzing }: ProgressIndicatorProps) => {
  const [progress, setProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    {
      icon: Brain,
      label: "Analyzing concept...",
      color: "text-blue-500",
      bgColor: "from-blue-100 to-blue-200",
      description: "Processing your SaaS idea structure",
    },
    {
      icon: Target,
      label: "Evaluating market...",
      color: "text-purple-500",
      bgColor: "from-purple-100 to-purple-200",
      description: "Assessing market potential and competition",
    },
    {
      icon: Zap,
      label: "Assessing feasibility...",
      color: "text-green-500",
      bgColor: "from-green-100 to-green-200",
      description: "Evaluating technical and business viability",
    },
    {
      icon: TrendingUp,
      label: "Generating insights...",
      color: "text-orange-500",
      bgColor: "from-orange-100 to-orange-200",
      description: "Creating comprehensive analysis report",
    },
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

  const currentStepData = steps[currentStep] || steps[0];
  const CurrentIcon = currentStepData.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r opacity-5"
            animate={{
              background: [
                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                "linear-gradient(90deg, #8b5cf6, #10b981)",
                "linear-gradient(90deg, #10b981, #f59e0b)",
                "linear-gradient(90deg, #f59e0b, #3b82f6)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <CardContent className="p-6 space-y-4 relative z-10">
            <div className="flex items-center gap-4">
              <motion.div
                key={currentStep}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  duration: 0.6,
                }}
                className={`p-3 rounded-full bg-gradient-to-r ${currentStepData.bgColor} shadow-lg`}
              >
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                >
                  <CurrentIcon className={`w-6 h-6 ${currentStepData.color}`} />
                </motion.div>
              </motion.div>

              <div className="flex-1 space-y-2">
                <motion.div
                  key={`${currentStep}-label`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-semibold text-base">
                    {currentStepData.label}
                  </p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {currentStepData.description}
                  </p>
                </motion.div>

                <div className="space-y-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  >
                    <Progress value={progress} className="h-3 bg-gray-200" />
                  </motion.div>

                  <div className="flex justify-between items-center text-xs">
                    <motion.span
                      className="text-[hsl(var(--muted-foreground))]"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Step {currentStep + 1} of {steps.length}
                    </motion.span>
                    <motion.span
                      className="font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {Math.round(progress)}%
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 pt-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-gray-200"
                  }`}
                  initial={{ width: 8 }}
                  animate={{
                    width: index === currentStep ? 24 : 8,
                    scale: index === currentStep ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgressIndicator;

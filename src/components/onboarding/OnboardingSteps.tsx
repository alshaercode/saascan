
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Brain, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const OnboardingSteps = () => {
  const steps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Describe Your Idea",
      description: "Share your SaaS concept, target market, and unique value proposition in detail.",
      color: "bg-blue-500",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Analysis",
      description: "Our AI analyzes market potential, technical feasibility, and competitive landscape.",
      color: "bg-purple-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Get Insights",
      description: "Receive detailed recommendations, risk assessment, and strategic guidance.",
      color: "bg-green-500",
    },
  ];

  return (
    <Card className="bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CheckCircle className="w-5 h-5 text-green-500" />
          How to Use Saascan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center space-y-4"
            >
              <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white mx-auto`}>
                {step.icon}
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  {step.title}
                </Badge>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingSteps;

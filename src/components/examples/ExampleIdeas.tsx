import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ExampleIdeasProps {
  onExampleSelect: (example: string) => void;
}

const ExampleIdeas = ({ onExampleSelect }: ExampleIdeasProps) => {
  const { toast } = useToast();

  const examples = [
    {
      title: "CRM Platform",
      description:
        "A SaaS customer relationship management tool for sales teams to track leads, deals, and automate follow-ups.",
      category: "Business Tools",
      complexity: "Medium",
    },
    {
      title: "Project Management",
      description:
        "An online project management app for remote teams with task boards, timelines, and client collaboration.",
      category: "Productivity",
      complexity: "High",
    },
    {
      title: "Analytics Dashboard",
      description:
        "A real-time analytics platform to monitor KPIs and generate automated reports for marketing campaigns.",
      category: "Analytics",
      complexity: "Medium",
    },
  ];

  const handleCopyExample = (example: string) => {
    navigator.clipboard.writeText(example);
    toast({
      title: "Example Copied!",
      description: "The example has been copied to your clipboard.",
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Example Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{example.title}</h4>
                    <Badge className={getComplexityColor(example.complexity)}>
                      {example.complexity}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {example.category}
                  </Badge>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {example.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => onExampleSelect(example.description)}
                    >
                      Use Example
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyExample(example.description)}
                      className="px-2"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExampleIdeas;

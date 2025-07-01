
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const EmptyStateSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-dashed border-2 border-[hsl(var(--border))]">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <motion.div 
            className="w-16 h-16 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightbulb className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
          </motion.div>
          <div className="space-y-2">
            <motion.h3 
              className="text-xl font-semibold text-[hsl(var(--navbar-text))]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No Results Yet
            </motion.h3>
            <motion.p 
              className="text-[hsl(var(--muted-foreground))] max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Enter your SaaS idea above to get a comprehensive analysis with insights and recommendations.
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyStateSection;

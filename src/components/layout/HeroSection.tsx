
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";

const HeroSection = () => {
  const title = "SaaS Idea Scanner";
  const words = title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.15, 
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      },
    },
  };

  const badges = [
    "Instant Analysis",
    "Market Insights", 
    "Detailed Reports"
  ];

  return (
    <motion.div 
      className="text-center space-y-8 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-6">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {firstPart}{" "}
          <RoughNotation
            type="underline"
            color="hsl(var(--gradient-primary))"
            animationDuration={1500}
            strokeWidth={3}
            padding={[-25, 0]}
            show
          >
            <motion.span
              animate={{ 
                color: ["hsl(var(--gradient-primary))", "hsl(var(--gradient-secondary))", "hsl(var(--gradient-primary))"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {lastWord}
            </motion.span>
          </RoughNotation>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] max-w-4xl mx-auto leading-relaxed font-medium"
        >
          Get comprehensive analysis of your SaaS ideas with AI-powered insights, market validation, and strategic recommendations
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-3 mt-8"
      >
        {badges.map((text, i) => (
          <motion.div
            key={text}
            variants={badgeVariants}
            whileHover={{ 
              scale: 1.1,
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm cursor-pointer hover:bg-[hsl(var(--gradient-primary))]/10 transition-colors"
            >
              {text}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

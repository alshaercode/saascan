
import React from "react";
import { Badge } from "@/components/ui/badge";
import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";

const HeroSection = () => {
  const { t } = useI18n();

  const words = t("title").trim().split(" ");
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

  const badgeVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      },
    },
  };

  return (
    <div className="text-center space-y-8 py-16">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          {firstPart}{" "}
          <RoughNotation
            type="underline"
            color="hsl(var(--gradient-primary))"
            animationDuration={1500}
            strokeWidth={3}
            padding={[-25, 0]}
            show
          >
            {lastWord}
          </RoughNotation>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] max-w-4xl mx-auto leading-relaxed font-medium"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-3 mt-8"
      >
        {[
          t("badges.instantAnalysis"),
          t("badges.marketInsights"),
          t("badges.detailedReports"),
        ].map((text, i) => (
          <motion.div
            key={text}
            variants={badgeVariant}
            transition={{ delay: i * 0.15 }}
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {text}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;

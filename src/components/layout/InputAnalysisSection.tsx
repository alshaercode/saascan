
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, Sparkles } from "lucide-react";
import InputValidation from "@/components/analysis/InputValidation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="grid grid-cols-1 max-w-7xl gap-8 w-full mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="shadow-xl border-0 bg-[hsl(var(--card-bg))]/80 backdrop-blur-md overflow-hidden">
        <motion.div
          animate={{ 
            background: isFocused 
              ? "linear-gradient(135deg, hsl(var(--gradient-primary))/5, hsl(var(--gradient-secondary))/5)"
              : "transparent"
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        />
        <CardHeader className="pb-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="flex items-center mx-auto gap-3 text-2xl">
              <motion.div
                animate={{ rotate: isFocused ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-[hsl(var(--gradient-primary))]" />
              </motion.div>
              Analyze Your SaaS Idea
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="space-y-3">
            <motion.div
              animate={{
                height: isFocused ? "200px" : "120px",
                scale: isFocused ? 1.02 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="overflow-hidden"
            >
              <Textarea
                placeholder="Describe your SaaS idea in detail... What problem does it solve? Who is your target audience? What makes it unique?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="h-full text-base border-2 focus:border-[hsl(var(--gradient-primary))] transition-all duration-300 resize-none bg-[hsl(var(--background))]/50 backdrop-blur-sm"
                disabled={isAnalyzing}
              />
            </motion.div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <InputValidation input={input} isAnalyzing={isAnalyzing} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim() || input.length < 20}
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] hover:from-[hsl(var(--gradient-primary))]/90 hover:to-[hsl(var(--gradient-secondary))]/90 text-white px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div 
                      key="analyzing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="font-semibold">Analyzing...</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="analyze"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <span className="font-semibold text-lg">
                        Analyze SaaS Idea
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InputAnalysisSection;

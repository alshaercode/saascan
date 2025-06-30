import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const EmptyStateSection = ({ t }: any) => (
  <Card className="text-center py-20 border-dashed border-2 border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--accent))]/30">
    <CardContent>
      <div className="space-y-6">
        <div className="relative inline-block">
          <Lightbulb className="w-20 h-20 text-[hsl(var(--muted-foreground))]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gradient-primary))]/20 to-[hsl(var(--gradient-secondary))]/20 rounded-full blur-xl"></div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-[hsl(var(--muted-foreground))]">
            {t.noResults}
          </h3>
          <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-md mx-auto">
            {t.noResultsDesc}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default EmptyStateSection;

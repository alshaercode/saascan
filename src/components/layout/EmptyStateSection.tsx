
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const EmptyStateSection = () => {
  const { t } = useI18n();

  return (
    <Card className="bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-dashed border-2 border-[hsl(var(--border))]">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[hsl(var(--navbar-text))]">
            {t("noResults")}
          </h3>
          <p className="text-[hsl(var(--muted-foreground))] max-w-md">
            {t("noResultsDesc")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyStateSection;

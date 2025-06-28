
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Github } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

const GitHubStar = () => {
  const { t } = useI18n();

  const handleStarClick = () => {
    window.open('https://github.com/your-username/saas-idea-analyzer', '_blank');
  };

  return (
    <Card className="bg-gradient-to-r from-[hsl(var(--gradient-primary))]/10 to-[hsl(var(--gradient-secondary))]/10 border-[hsl(var(--gradient-primary))]/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-full">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[hsl(var(--navbar-text))] mb-1">
                {t('githubStar')}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {t('githubStarDesc')}
              </p>
            </div>
          </div>
          <Button 
            onClick={handleStarClick}
            className="bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] hover:from-[hsl(var(--gradient-primary))]/90 hover:to-[hsl(var(--gradient-secondary))]/90 text-white"
          >
            <Star className="w-4 h-4 mr-2" />
            Star
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubStar;

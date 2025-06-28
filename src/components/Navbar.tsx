
import React from 'react';
import { Globe, BarChart3, Star, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/useI18n';

interface NavbarProps {
  language: 'en' | 'ar';
  onLanguageToggle: () => void;
}

const Navbar = ({ language, onLanguageToggle }: NavbarProps) => {
  const { t } = useI18n();

  const handleStarClick = () => {
    window.open('https://github.com/your-username/saas-idea-analyzer', '_blank');
  };

  return (
    <nav className={`bg-[hsl(var(--navbar-bg))]/80 backdrop-blur-md shadow-sm border-b border-[hsl(var(--navbar-border))] sticky top-0 z-50 ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[hsl(var(--navbar-text))]">
                {t('appTitle')}
              </h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleStarClick}
              className="bg-gradient-to-r from-[hsl(var(--gradient-primary))] to-[hsl(var(--gradient-secondary))] hover:from-[hsl(var(--gradient-primary))]/90 hover:to-[hsl(var(--gradient-secondary))]/90 text-white"
              size="sm"
            >
              <Star className="w-4 h-4 mr-2" />
              {t('githubStar')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageToggle}
              className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
            >
              <Globe className="w-4 h-4" />
              {t('languageToggle')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

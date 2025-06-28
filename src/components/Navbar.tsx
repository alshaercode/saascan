
import React from 'react';
import { Globe, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/useI18n';

interface NavbarProps {
  language: 'en' | 'ar';
  onLanguageToggle: () => void;
}

const Navbar = ({ language, onLanguageToggle }: NavbarProps) => {
  const { t } = useI18n();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t('appTitle')}
              </h1>
              <p className="text-sm text-gray-600">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onLanguageToggle}
            className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {t('languageToggle')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

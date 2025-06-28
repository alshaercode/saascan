
import React from 'react';
import { Heart, Code, Globe } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{t('appTitle')}</h3>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footerTagline')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">{t('footerFeatures')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• {t('features.realTimeAnalysis')}</li>
              <li>• {t('features.multiLanguageSupport')}</li>
              <li>• {t('features.dataPersistence')}</li>
              <li>• {t('features.exportFunctionality')}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">{t('footerLanguages')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• {t('languages.english')}</li>
              <li>• {t('languages.arabic')}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="flex items-center justify-center gap-1 text-sm text-gray-400">
            {t('footerMadeWith')} <Heart className="w-4 h-4 text-red-500" /> {t('footerAnd')} <Code className="w-4 h-4 text-blue-500" /> {t('footerForBetterUX')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

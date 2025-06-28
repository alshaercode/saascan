import { useI18n } from './useI18n';

// Keep this hook for backward compatibility, but delegate to useI18n
export const useLanguage = () => {
  const { language, toggleLanguage, t: translate } = useI18n();

  // Create a compatibility object that matches the old interface
  const t = {
    title: translate('title'),
    subtitle: translate('subtitle'),
    inputTitle: translate('inputTitle'),
    inputDescription: translate('inputDescription'),
    inputPlaceholder: translate('inputPlaceholder'),
    analyzeButton: translate('analyzeButton'),
    analyzing: translate('analyzing'),
    characters: translate('characters'),
    resultsTitle: translate('resultsTitle'),
    exportButton: translate('exportButton'),
    clearHistory: translate('clearHistory'),
    noResults: translate('noResults'),
    noResultsDesc: translate('noResultsDesc'),
    inputRequired: translate('inputRequired'),
    inputRequiredDesc: translate('inputRequiredDesc'),
    analysisComplete: translate('analysisComplete'),
    analysisCompleteDesc: translate('analysisCompleteDesc'),
    analysisError: translate('analysisError'),
    analysisErrorDesc: translate('analysisErrorDesc'),
    historyCleared: translate('historyCleared'),
    historyClearedDesc: translate('historyClearedDesc'),
    exportComplete: translate('exportComplete'),
    exportCompleteDesc: translate('exportCompleteDesc'),
    dataRestored: translate('dataRestored'),
    dataRestoredDesc: translate('dataRestoredDesc')
  };

  return {
    language,
    toggleLanguage,
    t
  };
};


import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageProvider";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  const { language, toggleLanguage, t: translate } = context;

  // Simplified object with only the translations we need
  const t = {
    title: translate("title"),
    subtitle: translate("subtitle"),
    inputTitle: translate("inputTitle"),
    inputDescription: translate("inputDescription"),
    inputPlaceholder: translate("inputPlaceholder"),
    analyzeButton: translate("analyzeButton"),
    analyzing: translate("analyzing"),
    characters: translate("characters"),
    resultsTitle: translate("resultsTitle"),
    exportButton: translate("exportButton"),
    clearHistory: translate("clearHistory"),
    noResults: translate("noResults"),
    noResultsDesc: translate("noResultsDesc"),
    inputRequired: translate("inputRequired"),
    inputRequiredDesc: translate("inputRequiredDesc"),
    analysisComplete: translate("analysisComplete"),
    analysisCompleteDesc: translate("analysisCompleteDesc"),
    analysisError: translate("analysisError"),
    analysisErrorDesc: translate("analysisErrorDesc"),
    historyCleared: translate("historyCleared"),
    historyClearedDesc: translate("historyClearedDesc"),
    exportComplete: translate("exportComplete"),
    exportCompleteDesc: translate("exportCompleteDesc"),
    dataRestored: translate("dataRestored"),
    dataRestoredDesc: translate("dataRestoredDesc"),
    historyPageTitle: translate("historyPageTitle"),
    appTitle: translate("appTitle"),
    appSubtitle: translate("appSubtitle"),
    languageToggle: translate("languageToggle"),
    inputText: translate("inputText"),
    saasScore: translate("saasScore"),
    analysisDate: translate("analysisDate"),
    analysisNumber: translate("analysisNumber"),
    issuesFound: translate("issuesFound"),
    recommendations: translate("recommendations"),
    footerTagline: translate("footerTagline"),
    footerFeatures: translate("footerFeatures"),
    footerLanguages: translate("footerLanguages"),
    footerMadeWith: translate("footerMadeWith"),
    footerAnd: translate("footerAnd"),
    footerForBetterSaas: translate("footerForBetterSaas"),
    githubStar: translate("githubStar"),
    githubStarDesc: translate("githubStarDesc"),
    showHistory: translate("showHistory"),
    backHome: translate("backHome"),
    howToUse: translate("howToUse"),
    examples: translate("examples"),
    exampleIdeas: translate("exampleIdeas"),
    successStories: translate("successStories"),
  };

  return {
    language: "en",
    toggleLanguage: () => {},
    t,
    translate,
  };
};

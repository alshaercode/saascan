import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageProvider";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  const { language, toggleLanguage, t: translate } = context;

  // Optional backward compatibility object
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
  };

  return {
    language,
    toggleLanguage,
    t,
    translate, // direct t() usage
  };
};

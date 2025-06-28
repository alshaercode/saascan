
import { useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  title: string;
  subtitle: string;
  inputTitle: string;
  inputDescription: string;
  inputPlaceholder: string;
  analyzeButton: string;
  analyzing: string;
  characters: string;
  resultsTitle: string;
  exportButton: string;
  clearHistory: string;
  noResults: string;
  noResultsDesc: string;
  inputRequired: string;
  inputRequiredDesc: string;
  analysisComplete: string;
  analysisCompleteDesc: string;
  analysisError: string;
  analysisErrorDesc: string;
  historyCleared: string;
  historyClearedDesc: string;
  exportComplete: string;
  exportCompleteDesc: string;
  dataRestored: string;
  dataRestoredDesc: string;
}

const translations: Record<Language, Translations> = {
  en: {
    title: 'Mindful UX Analyzer',
    subtitle: 'Analyze and improve your user experience with AI-powered insights',
    inputTitle: 'Enter Your UX Content',
    inputDescription: 'Describe your user interface, user journey, or UX concerns for detailed analysis',
    inputPlaceholder: 'Describe your website, app interface, user flow, or specific UX challenges you\'d like to analyze...\n\nExample: "My e-commerce checkout process has 5 steps. Users often abandon at step 3 where they need to create an account. The form has 12 required fields including phone number verification."',
    analyzeButton: 'Analyze UX',
    analyzing: 'Analyzing...',
    characters: 'characters',
    resultsTitle: 'Analysis Results',
    exportButton: 'Export Data',
    clearHistory: 'Clear History',
    noResults: 'No Analysis Yet',
    noResultsDesc: 'Enter some UX content above to get started with your first analysis',
    inputRequired: 'Input Required',
    inputRequiredDesc: 'Please enter some content to analyze',
    analysisComplete: 'Analysis Complete!',
    analysisCompleteDesc: 'Your UX analysis has been completed and saved',
    analysisError: 'Analysis Failed',
    analysisErrorDesc: 'There was an error processing your analysis. Please try again.',
    historyCleared: 'History Cleared',
    historyClearedDesc: 'All analysis history has been removed',
    exportComplete: 'Export Complete',
    exportCompleteDesc: 'Your analysis data has been downloaded',
    dataRestored: 'Data Restored',
    dataRestoredDesc: 'Found {count} saved analyses from previous sessions'
  },
  ar: {
    title: 'محلل تجربة المستخدم الذكي',
    subtitle: 'حلل وحسن تجربة المستخدم بواسطة الذكاء الاصطناعي',
    inputTitle: 'أدخل محتوى تجربة المستخدم',
    inputDescription: 'صف واجهة المستخدم أو رحلة المستخدم أو مخاوف تجربة المستخدم للحصول على تحليل مفصل',
    inputPlaceholder: 'صف موقعك الإلكتروني أو واجهة التطبيق أو تدفق المستخدم أو تحديات تجربة المستخدم المحددة التي تريد تحليلها...\n\nمثال: "عملية الدفع في متجري الإلكتروني تحتوي على 5 خطوات. المستخدمون غالباً ما يتركون العملية في الخطوة الثالثة حيث يحتاجون لإنشاء حساب. النموذج يحتوي على 12 حقل مطلوب بما في ذلك التحقق من رقم الهاتف."',
    analyzeButton: 'تحليل تجربة المستخدم',
    analyzing: 'جاري التحليل...',
    characters: 'حرف',
    resultsTitle: 'نتائج التحليل',
    exportButton: 'تصدير البيانات',
    clearHistory: 'مسح السجل',
    noResults: 'لا يوجد تحليل بعد',
    noResultsDesc: 'أدخل محتوى تجربة المستخدم أعلاه للبدء بأول تحليل',
    inputRequired: 'المدخل مطلوب',
    inputRequiredDesc: 'يرجى إدخال محتوى للتحليل',
    analysisComplete: 'اكتمل التحليل!',
    analysisCompleteDesc: 'تم إكمال تحليل تجربة المستخدم وحفظه',
    analysisError: 'فشل التحليل',
    analysisErrorDesc: 'حدث خطأ في معالجة التحليل. يرجى المحاولة مرة أخرى.',
    historyCleared: 'تم مسح السجل',
    historyClearedDesc: 'تم حذف جميع سجلات التحليل',
    exportComplete: 'اكتمل التصدير',
    exportCompleteDesc: 'تم تنزيل بيانات التحليل',
    dataRestored: 'تم استرداد البيانات',
    dataRestoredDesc: 'تم العثور على {count} تحليل محفوظ من جلسات سابقة'
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ux-analyzer-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('ux-analyzer-language', newLanguage);
  };

  return {
    language,
    toggleLanguage,
    t: translations[language]
  };
};

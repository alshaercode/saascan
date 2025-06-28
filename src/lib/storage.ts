import { AnalysisResult } from './uxAnalyzer';

const STORAGE_KEY = 'ux-analyzer-results';
const MAX_RESULTS = 50; // Limit stored results to prevent localStorage bloat

export const saveToLocalStorage = (results: AnalysisResult[]): void => {
  try {
    // Keep only the most recent results
    const limitedResults = results.slice(0, MAX_RESULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedResults));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): AnalysisResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with sample data for demo purposes
      const sampleData = generateSampleData();
      saveToLocalStorage(sampleData);
      return sampleData;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
};

const generateSampleData = (): AnalysisResult[] => {
  return [
    {
      id: 'sample_1',
      input: 'My e-commerce checkout process has multiple steps. Users need to create an account, verify email, fill shipping details, and payment info. Many users abandon during account creation.',
      score: 68,
      issues: [
        'Too many required form fields could cause abandonment',
        'Complex multi-step process may frustrate users',
        'Email verification step creates friction in checkout flow'
      ],
      recommendations: [
        'Allow guest checkout without account creation',
        'Reduce checkout steps to 2-3 maximum',
        'Make email verification optional or post-purchase'
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      language: 'en'
    },
    {
      id: 'sample_2',
      input: 'عملية التسجيل في تطبيقي معقدة ومتعددة الخطوات. المستخدمون يحتاجون لملء معلومات شخصية كثيرة والتحقق من الهاتف قبل الوصول للتطبيق.',
      score: 72,
      issues: [
        'كثرة الحقول المطلوبة في النموذج قد تسبب الهجر',
        'عملية التحقق من الهاتف قد تخلق حاجز دخول',
        'هيكل التنقل المعقد قد يربك المستخدمين'
      ],
      recommendations: [
        'تقليل حقول النموذج للمعلومات الأساسية فقط',
        'جعل التحقق من الهاتف اختياري في البداية',
        'تبسيط عملية التسجيل لخطوة واحدة أو خطوتين'
      ],
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      language: 'ar'
    }
  ];
};

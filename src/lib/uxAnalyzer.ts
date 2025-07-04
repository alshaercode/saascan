export interface Risk {
  category: "Market" | "Technical" | "Financial" | "Execution";
  risk: string;
  probability: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  mitigation: string;
}

export interface Opportunity {
  area: "Market" | "Product" | "Technology" | "Business Model";
  opportunity: string;
  potential_impact: string;
  effort_required: "Low" | "Medium" | "High";
}

export interface ValidationExperiment {
  experiment: string;
  cost: string;
  timeline: string;
  success_criteria: string;
  learning_goal: string;
}

export interface Recommendation {
  priority: "High" | "Medium" | "Low";
  action: string;
  rationale: string;
  timeline: string;
  resources_needed: string;
}

export interface Competitor {
  name: string;
  type: "Direct" | "Indirect" | "Substitute";
  market_share: string;
  differentiation: string;
  switching_cost: "Low" | "Medium" | "High";
}

export interface AnalysisResult {
  id: string;
  input: string;
  score: number;
  validity?: "Realistic" | "Promising" | "Weak" | "High-Risk";
  summary?: string;

  // Legacy fields for backward compatibility
  issues?: string[];
  recommendations?: string[];

  // Enhanced structured data
  market?: {
    pain_severity?: "Critical" | "High" | "Medium" | "Low";
    pain_description?: string;
    buyer_personas?: string[];
    tam_estimate?: string;
    market_timing?: string;
    competitive_pressure?: string;
  };

  user_experience?: {
    complexity_level?: "Simple" | "Moderate" | "Complex";
    user_journey_quality?: "Smooth" | "Acceptable" | "Problematic";
    onboarding_difficulty?: "Easy" | "Medium" | "Hard";
    learning_curve?: "Minimal" | "Moderate" | "Steep";
    accessibility_score?: number;
    mobile_readiness?: "Native" | "Responsive" | "Desktop-only";
  };

  financials?: {
    pricing_model?: string;
    arpu_range?: string;
    cac_estimate?: string;
    ltv_projection?: string;
    ltv_cac_ratio?: string;
    payback_period?: string;
    gross_margin?: string;
    churn_rate?: string;
  };

  technical?: {
    tech_stack?: string[];
    complexity_rating?: "Low" | "Medium" | "High" | "Very High";
    mvp_time_months?: number;
    team_size_needed?: number;
    development_cost?: string;
    scalability_concerns?: string[];
    security_requirements?: string[];
    integration_complexity?: "Simple" | "Moderate" | "Complex";
  };

  competition?: Competitor[];
  risks?: Risk[];
  opportunities?: Opportunity[];
  validation_experiments?: ValidationExperiment[];
  structured_recommendations?: Recommendation[];

  timestamp: string;
  language: "en" | "ar";
}

const generateAnalysisId = () => {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const sampleIssues = {
  en: [
    "Complex navigation structure may confuse users",
    "Too many required form fields could cause abandonment",
    "Lack of clear call-to-action buttons",
    "Insufficient visual hierarchy in content layout",
    "Missing feedback for user actions",
    "Poor mobile responsiveness detected",
    "Long loading times may impact user experience",
    "Unclear error messages and validation",
    "Inconsistent design patterns across pages",
    "Accessibility concerns for screen readers",
  ],
  ar: [
    "هيكل التنقل المعقد قد يربك المستخدمين",
    "كثرة الحقول المطلوبة في النموذج قد تسبب الهجر",
    "نقص في أزرار الدعوة للعمل الواضحة",
    "عدم كفاية التسلسل الهرمي المرئي في تخطيط المحتوى",
    "نقص في التغذية الراجعة لأعمال المستخدم",
    "ضعف في الاستجابة للأجهزة المحمولة",
    "أوقات التحميل الطويلة قد تؤثر على تجربة المستخدم",
    "رسائل خطأ غير واضحة والتحقق من الصحة",
    "أنماط تصميم غير متسقة عبر الصفحات",
    "مخاوف إمكانية الوصول لقارئات الشاشة",
  ],
};

const sampleRecommendations = {
  en: [
    "Simplify navigation with clear menu categories",
    "Reduce form fields to essential information only",
    "Add prominent, contrasting call-to-action buttons",
    "Implement clear visual hierarchy with proper spacing",
    "Provide immediate feedback for all user interactions",
    "Optimize layout for mobile-first design approach",
    "Implement progressive loading and performance optimization",
    "Write clear, actionable error messages",
    "Establish consistent design system and style guide",
    "Add ARIA labels and improve semantic HTML structure",
  ],
  ar: [
    "تبسيط التنقل بفئات قائمة واضحة",
    "تقليل حقول النموذج للمعلومات الأساسية فقط",
    "إضافة أزرار دعوة للعمل بارزة ومتباينة",
    "تنفيذ التسلسل الهرمي المرئي الواضح مع التباعد المناسب",
    "توفير تغذية راجعة فورية لجميع تفاعلات المستخدم",
    "تحسين التخطيط لنهج التصميم المحمول أولاً",
    "تنفيذ التحميل التدريجي وتحسين الأداء",
    "كتابة رسائل خطأ واضحة وقابلة للتنفيذ",
    "إنشاء نظام تصميم متسق ودليل أسلوب",
    "إضافة تسميات ARIA وتحسين هيكل HTML الدلالي",
  ],
};

export const analyzeUX = (
  input: string,
  language: "en" | "ar"
): AnalysisResult => {
  // Simulate AI analysis with realistic scoring
  const wordCount = input.trim().split(/\s+/).length;
  const complexityScore = Math.min(wordCount / 10, 10); // More words = more complexity

  // Base score calculation (simulated AI logic)
  let baseScore = 85;

  // Adjust score based on input content (simple keyword analysis)
  const problemKeywords =
    language === "en"
      ? [
          "problem",
          "issue",
          "difficult",
          "confusing",
          "abandon",
          "error",
          "slow",
          "broken",
        ]
      : ["مشكلة", "صعوبة", "مربك", "هجر", "خطأ", "بطيء", "معطل"];

  const positiveKeywords =
    language === "en"
      ? [
          "good",
          "easy",
          "clear",
          "simple",
          "fast",
          "intuitive",
          "user-friendly",
        ]
      : ["جيد", "سهل", "واضح", "بسيط", "سريع", "بديهي", "سهل الاستخدام"];

  const lowerInput = input.toLowerCase();

  problemKeywords.forEach((keyword) => {
    if (lowerInput.includes(keyword)) baseScore -= 5;
  });

  positiveKeywords.forEach((keyword) => {
    if (lowerInput.includes(keyword)) baseScore += 3;
  });

  const finalScore = Math.max(35, Math.min(95, baseScore));

  // Generate random issues and recommendations
  const issuePool = sampleIssues[language];
  const recommendationPool = sampleRecommendations[language];

  const numIssues = Math.max(
    2,
    Math.min(5, Math.floor((100 - finalScore) / 15))
  );
  const numRecommendations = numIssues;

  const shuffledIssues = [...issuePool].sort(() => 0.5 - Math.random());
  const shuffledRecommendations = [...recommendationPool].sort(
    () => 0.5 - Math.random()
  );

  return {
    id: generateAnalysisId(),
    input,
    score: Math.round(finalScore),
    issues: shuffledIssues.slice(0, numIssues),
    recommendations: shuffledRecommendations.slice(0, numRecommendations),
    timestamp: new Date().toISOString(),
    language,
  };
};

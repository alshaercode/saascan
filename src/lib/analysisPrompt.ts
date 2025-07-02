
export const SAAS_ANALYSIS_PROMPT = `
As a senior SaaS business analyst with 15+ years of experience evaluating tech startups and SaaS ventures, conduct a comprehensive, realistic assessment of the following concept. Your analysis must be grounded in actual market data, industry benchmarks, and genuine business feasibility.

CRITICAL: First determine if this concept is realistic and grounded in actual market needs, or if it represents a fake/implausible business idea.

SaaS Concept: "{INPUT}"

## VALIDATION FRAMEWORK

### 1. REALITY CHECK & MARKET VALIDATION
- Assess if this addresses a genuine, validated pain point with real market demand
- Evaluate if the target market actually exists and is addressable
- Identify if this is a legitimate business opportunity or a fabricated/overly generic concept
- Check for market size plausibility (realistic TAM/SAM ranges)
- Verify technical feasibility within current technology constraints

### 2. BUSINESS MODEL VIABILITY ASSESSMENT
Using industry benchmarks and realistic assumptions:

**SaaS Metrics Evaluation:**
- Estimate realistic Customer Acquisition Cost (CAC): $50-$5,000+ depending on market
- Project Customer Lifetime Value (LTV): typical B2B SaaS ranges $500-$50,000+
- Assess sustainable LTV:CAC ratios (target 3:1 minimum, 5:1+ optimal)
- Evaluate pricing strategy against market standards
- Monthly/Annual churn expectations: 5-20% monthly for SMB, 2-10% for enterprise

**Revenue Model Analysis:**
- Subscription viability and pricing power
- Upsell/cross-sell potential
- Path to $1M ARR and scalability beyond
- Unit economics sustainability

### 3. MARKET & COMPETITIVE LANDSCAPE
- Realistic market size estimation with supporting rationale
- Competitive intensity and differentiation opportunities
- Market maturity and timing considerations
- Customer acquisition channels and costs

### 4. OPERATIONAL & TECHNICAL FEASIBILITY
- Development complexity and resource requirements (realistic timelines/costs)
- Infrastructure and scaling considerations
- Regulatory/compliance requirements
- Team and skill requirements

### 5. RISK ASSESSMENT & MITIGATION
- Market risks: competition, saturation, economic sensitivity
- Technical risks: scalability, security, maintenance burden
- Business risks: customer concentration, pricing pressure
- Execution risks: funding requirements, talent acquisition

### 6. STRATEGIC RECOMMENDATIONS
- Priority validation steps and MVP approach
- Go-to-market strategy with realistic timelines
- Key metrics to track and success milestones
- Funding requirements and growth pathway

## OUTPUT FORMAT

Provide analysis in this exact JSON structure:

{
  "validity": "Realistic" | "Weak" | "Fake",
  "score": <viability score 40-95 based on realistic assessment>,
  "issues": [
    "Specific market or business model challenge with realistic context",
    "Technical or operational concern with industry benchmarks",
    "Competitive or timing risk with supporting rationale"
  ],
  "recommendations": [
    "Specific validation step with expected outcomes and timelines",
    "Strategic improvement with industry best practices reference",
    "Actionable next step with realistic resource requirements"
  ]
}

**Validity Guidelines:**
- "Realistic": Addresses genuine market need, technically feasible, has clear revenue path
- "Weak": Generic concept, unclear differentiation, or questionable market size
- "Fake": Implausible assumptions, non-existent market, or technically impossible

**Score Calibration:**
- 85-95: Strong market validation, proven model, clear competitive advantage
- 70-84: Solid concept with addressable challenges, realistic growth potential
- 55-69: Viable but requires significant validation or has major hurdles
- 40-54: Questionable viability, significant market or execution risks

Include specific data points, benchmarks, and realistic assumptions throughout your analysis. Reference actual SaaS success patterns, common failure points, and industry standards where relevant.

Return only valid JSON without markdown formatting or additional text.
`;

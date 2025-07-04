export const SAAS_ENHANCEMENT_PROMPT = `
As an expert SaaS consultant and business strategist, your task is to enhance and refine the following SaaS idea description to make it more compelling, detailed, and professional.

Original SaaS Idea: "{INPUT}"

## ENHANCEMENT OBJECTIVES

Transform the input into a well-structured, comprehensive SaaS concept that includes:

### 1. PROBLEM STATEMENT REFINEMENT
- Clearly articulate the specific pain point or market gap
- Quantify the problem's impact where possible
- Identify the target audience experiencing this problem

### 2. SOLUTION ENHANCEMENT
- Expand on the core functionality and features
- Explain the unique value proposition
- Detail how the solution addresses the identified problem

### 3. MARKET POSITIONING
- Define the target market segments
- Identify ideal customer profiles
- Explain market timing and opportunity

### 4. COMPETITIVE ADVANTAGE
- Highlight unique differentiators
- Explain barriers to entry for competitors
- Identify sustainable competitive moats

### 5. BUSINESS MODEL CLARITY
- Suggest appropriate pricing strategy
- Outline revenue streams
- Explain scalability potential

## OUTPUT REQUIREMENTS

Provide an enhanced version that:
- Is 2-3x more detailed than the original
- Uses professional business language
- Includes specific examples and use cases
- Maintains the core concept while adding strategic depth
- Is structured and easy to read
- Focuses on business viability and market opportunity

## RESPONSE FORMAT

Return ONLY the enhanced SaaS idea description as plain text, without any prefixes, explanations, or meta-commentary. The response should be ready to use directly as an improved input for further analysis.

Make the enhancement compelling and professional while staying true to the original concept.
`;

export interface EnhancementResult {
  enhanced: string;
  success: boolean;
  error?: string;
}

export const enhanceSaasIdea = async (
  input: string
): Promise<EnhancementResult> => {
  try {
    // Get API key from environment
    const GEMINI_API_KEY =
      import.meta.env.VITE_GEMINI_API_KEY ||
      process.env.REACT_APP_GEMINI_API_KEY ||
      "AIzaSyACk_TwCNngF9-vYxtUjkIq51ugGr4BY9Y";

    if (!GEMINI_API_KEY) {
      // Fallback enhancement for when no API key is available
      const fallbackEnhanced = generateFallbackEnhancement(input);
      return {
        enhanced: fallbackEnhanced,
        success: true,
      };
    }

    const prompt = SAAS_ENHANCEMENT_PROMPT.replace("{INPUT}", input);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Gemini API Error: ${response.status}`
      );
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("No response content received from Gemini API");
    }

    // Clean the response to remove any markdown formatting or prefixes
    const cleanContent = content
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/^#+\s.*$/gm, "") // Remove markdown headers
      .replace(/^\*\*.*\*\*$/gm, "") // Remove bold headers
      .replace(/^-\s/gm, "") // Remove bullet points
      .trim();

    return {
      enhanced: cleanContent,
      success: true,
    };
  } catch (error) {
    console.error("Enhancement error:", error);

    // Fallback to local enhancement
    const fallbackEnhanced = generateFallbackEnhancement(input);

    return {
      enhanced: fallbackEnhanced,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

const generateFallbackEnhancement = (input: string): string => {
  // Simple fallback enhancement when API is not available
  const words = input.trim().split(/\s+/);

  if (words.length < 10) {
    return `${input}

This SaaS solution addresses a specific market need by providing a comprehensive platform that streamlines operations and improves efficiency for businesses. The target market includes small to medium-sized enterprises looking to optimize their workflows and reduce operational costs.

Key features would include user-friendly interface, real-time analytics, integration capabilities with existing tools, and scalable architecture to grow with the business. The solution offers significant value proposition through cost reduction, time savings, and improved productivity metrics.

The business model would focus on subscription-based pricing with tiered plans to accommodate different business sizes and needs, ensuring sustainable revenue growth and customer retention.`;
  }

  return `${input}

Building on this concept, the solution would target specific industry verticals where this problem is most acute, offering specialized features and integrations that address unique workflow requirements. The platform would differentiate itself through superior user experience, advanced automation capabilities, and comprehensive analytics that provide actionable insights.

The go-to-market strategy would focus on demonstrating clear ROI through pilot programs and case studies, establishing partnerships with industry leaders, and building a strong customer success program to ensure high retention rates and organic growth through referrals.`;
};

// Fallback SaaS ideas for offline mode
const FALLBACK_SAAS_IDEAS = [
  "A project management platform specifically designed for remote creative teams, featuring real-time collaboration tools, automated workflow tracking, and integrated client feedback systems to streamline the creative process from concept to delivery.",

  "An AI-powered customer support automation tool that learns from existing support tickets to provide instant, personalized responses while seamlessly escalating complex issues to human agents, reducing response times by 80%.",

  "A comprehensive employee wellness platform that combines mental health resources, fitness tracking, and productivity analytics to help companies improve employee satisfaction and reduce burnout in hybrid work environments.",

  "A smart inventory management system for small e-commerce businesses that uses predictive analytics to optimize stock levels, automate reordering, and prevent stockouts while minimizing carrying costs.",

  "A social media content planning and automation platform that uses AI to generate engaging posts, optimal posting schedules, and performance insights tailored to each brand's unique voice and audience.",

  "A financial planning SaaS for freelancers and gig workers that tracks irregular income, automates tax savings, provides cash flow forecasting, and offers personalized budgeting recommendations.",

  "An all-in-one event management platform that handles registration, ticketing, networking facilitation, and post-event analytics, specifically designed for professional conferences and corporate events.",

  "A code review and collaboration tool that uses machine learning to identify potential bugs, security vulnerabilities, and performance issues while facilitating seamless team code reviews and knowledge sharing.",
];

export interface IdeaGenerationResult {
  idea: string;
  success: boolean;
  error?: string;
}

export const generateRandomSaasIdea =
  async (): Promise<IdeaGenerationResult> => {
    try {
      // Get API key from environment
      const GEMINI_API_KEY =
        import.meta.env.VITE_GEMINI_API_KEY ||
        process.env.REACT_APP_GEMINI_API_KEY ||
        "AIzaSyACk_TwCNngF9-vYxtUjkIq51ugGr4BY9Y";

      if (!GEMINI_API_KEY) {
        // Use fallback ideas when no API key is available
        const randomIdea =
          FALLBACK_SAAS_IDEAS[
            Math.floor(Math.random() * FALLBACK_SAAS_IDEAS.length)
          ];
        return {
          idea: randomIdea,
          success: true,
        };
      }

      const prompt = `Generate a unique, realistic SaaS business idea that addresses a genuine market need. The idea should be:

1. Specific and actionable (not generic)
2. Focused on a clear target market
3. Technically feasible with current technology
4. Commercially viable with clear revenue potential
5. Different from common SaaS solutions

Format: Provide a 2-3 sentence description that includes:
- The core problem being solved
- The target audience
- The key value proposition

Examples of good ideas:
- A compliance management platform for small healthcare practices that automates HIPAA documentation and staff training
- An AI-powered pricing optimization tool for e-commerce stores that adjusts prices in real-time based on competitor analysis and demand patterns

Generate ONE unique SaaS idea following this format. Return only the idea description, no additional text or formatting.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.8,
              topK: 40,
              topP: 0.9,
              maxOutputTokens: 200,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error("No response content received from Gemini API");
      }

      // Clean the response
      const cleanContent = content
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
        .replace(/^#+\s.*$/gm, "") // Remove markdown headers
        .replace(/^\*\*.*\*\*$/gm, "") // Remove bold headers
        .trim();

      return {
        idea: cleanContent,
        success: true,
      };
    } catch (error) {
      console.error("Idea generation error:", error);

      // Fallback to random idea from array
      const randomIdea =
        FALLBACK_SAAS_IDEAS[
          Math.floor(Math.random() * FALLBACK_SAAS_IDEAS.length)
        ];

      return {
        idea: randomIdea,
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  };

// Comprehensive test script to verify all AI enhancement functionality
import { enhanceSaasIdea, generateRandomSaasIdea } from './lib/aiEnhancer';

const testEnhancement = async () => {
  console.log('🧪 Testing AI Enhancement Feature...');

  const testInput = "A platform for managing team tasks and projects";

  try {
    const result = await enhanceSaasIdea(testInput);

    console.log('📝 Original input:', testInput);
    console.log('✨ Enhancement result:', result);
    console.log('✅ Success:', result.success);
    console.log('📊 Enhanced text length:', result.enhanced.length);
    console.log('👀 Enhanced text preview:', result.enhanced.substring(0, 200) + '...');

    if (result.error) {
      console.log('⚠️ Error (using fallback):', result.error);
    }

  } catch (error) {
    console.error('❌ Enhancement test failed:', error);
  }
};

const testIdeaGeneration = async () => {
  console.log('🎲 Testing AI Idea Generation Feature...');

  try {
    const result = await generateRandomSaasIdea();

    console.log('🎯 Generation result:', result);
    console.log('✅ Success:', result.success);
    console.log('💡 Generated idea:', result.idea);
    console.log('📊 Idea length:', result.idea.length);

    if (result.error) {
      console.log('⚠️ Error (using fallback):', result.error);
    }

  } catch (error) {
    console.error('❌ Idea generation test failed:', error);
  }
};

const testSmartSuggestions = () => {
  console.log('🧠 Testing Smart Suggestion Logic...');

  const testCases = [
    { input: "app", expected: true, reason: "Generic term + short" },
    { input: "platform", expected: true, reason: "Generic term + short" },
    { input: "A comprehensive project management solution", expected: false, reason: "Detailed enough" },
    { input: "tool for teams", expected: true, reason: "Generic + very short" },
    { input: "An innovative AI-powered customer relationship management platform designed specifically for small to medium-sized businesses", expected: false, reason: "Long and detailed" }
  ];

  testCases.forEach(({ input, expected, reason }) => {
    const words = input.trim().split(/\s+/);
    const genericTerms = ['app', 'platform', 'tool', 'system', 'software', 'solution', 'service'];
    const hasGenericTerms = genericTerms.some(term =>
      input.toLowerCase().includes(term) && words.length < 15
    );
    const needsSuggestion = words.length < 10 || hasGenericTerms;

    const result = needsSuggestion === expected ? '✅' : '❌';
    console.log(`${result} "${input}" -> ${needsSuggestion} (${reason})`);
  });
};

const runAllTests = async () => {
  console.log('🚀 Running All Enhanced Textarea Tests...\n');

  await testEnhancement();
  console.log('\n');

  await testIdeaGeneration();
  console.log('\n');

  testSmartSuggestions();
  console.log('\n✨ All tests completed!');
};

// Export for potential use in browser console
(window as any).testEnhancement = testEnhancement;
(window as any).testIdeaGeneration = testIdeaGeneration;
(window as any).testSmartSuggestions = testSmartSuggestions;
(window as any).runAllTests = runAllTests;

export { testEnhancement, testIdeaGeneration, testSmartSuggestions, runAllTests };

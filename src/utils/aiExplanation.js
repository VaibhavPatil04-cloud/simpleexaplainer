import { generateGeminiResponse } from './geminiService';

export const generateExplanation = async (query) => {
  try {
    console.log('Generating explanation for:', query);
    
    if (!query.trim()) {
      throw new Error('Please enter a question');
    }

    const response = await generateGeminiResponse(query);
    console.log('Generated response:', response);
    
    if (!response || !response.simpleAnswer) {
      throw new Error('Invalid response format');
    }
    
    return {
      simpleAnswer: response.simpleAnswer,
      storyExplanation: response.storyExplanation,
      funFact: response.funFact
    };
  } catch (error) {
    console.error('Error in generateExplanation:', error);
    return {
      simpleAnswer: "I'm having trouble explaining this right now. Could you try asking in a different way?",
      storyExplanation: "Sometimes even AI teachers need to think harder about how to explain things!",
      funFact: "Did you know? Learning from mistakes helps us explain things better next time!"
    };
  }
};

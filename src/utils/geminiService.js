import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/api';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateGeminiResponse = async (prompt) => {
  try {
    // Initialize the model with the correct model name for Gemini 2.5
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a more structured prompt
    const prompt_template = `
      You are explaining to a 6-year-old child. Keep it very simple and fun.
      Question: ${prompt}

      Please provide your response in these three parts:
      1. A simple answer (2-3 sentences)
      2. A fun story or analogy
      3. One interesting fun fact

      Keep the language child-friendly and engaging.
    `;

    // Generate content
    const result = await model.generateContent(prompt_template);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw API response:', text);

    // Parse the response into sections
    const sections = text.split('\n\n').filter(Boolean);
    
    return {
      simpleAnswer: sections[0] || "Let me think about that...",
      storyExplanation: sections[1] || "Here's a fun way to understand it...",
      funFact: sections[2] || "Here's something interesting!"
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      details: error.details
    });
    throw new Error('Failed to generate explanation');
  }
};

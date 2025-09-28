import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/api';

let genAI;

// Initialize the API with error handling
const initializeGemini = () => {
  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not defined');
    console.error('Current API Key:', GEMINI_API_KEY);
    console.error('Environment variables:', {
      VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
      NODE_ENV: import.meta.env.NODE_ENV
    });
    throw new Error('API key not configured');
  }
  
  if (!genAI) {
    try {
      genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      console.log('✅ Gemini initialized successfully with key:', GEMINI_API_KEY.substring(0, 20) + '...');
    } catch (error) {
      console.error('❌ Failed to initialize Gemini:', error);
      throw error;
    }
  }
  return genAI;
};

export const generateGeminiResponse = async (prompt) => {
  try {
    console.log('🚀 Generating response for prompt:', prompt.substring(0, 50) + '...');
    
    // Initialize Gemini if not already done
    const ai = initializeGemini();
    
    // Try different model names in order of preference
    const modelNames = [
      'gemini-2.0-flash-exp', // Latest experimental model
      'gemini-2.5-flash',          // Stable fallback
      'models/gemini-pro'    // Alternative format
    ];
    
    let model = null;
    let modelUsed = '';
    
    // Try each model until one works
    for (const modelName of modelNames) {
      try {
        model = ai.getGenerativeModel({ model: modelName });
        modelUsed = modelName;
        console.log(`✅ Using model: ${modelName}`);
        break;
      } catch (error) {
        console.log(`⚠️  Model ${modelName} not available, trying next...`);
        continue;
      }
    }
    
    if (!model) {
      throw new Error('No available Gemini model found');
    }

    // Create a more structured prompt for better parsing
    const structuredPrompt = `
You are a friendly teacher explaining to a 6-year-old child. Please explain: "${prompt}"

Please format your response EXACTLY like this (include the labels):

SIMPLE ANSWER:
[Write 2-3 simple sentences here using easy words]

STORY:
[Write a fun story or analogy here that a child would understand]

FUN FACT:
[Write one cool fun fact here]

Remember: Use very simple words that a 6-year-old would know. Make it fun and exciting!
    `;

    console.log(`🔄 Sending request to ${modelUsed}...`);
    
    // Generate content with timeout and retry logic
    let result;
    const maxRetries = 2;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        result = await Promise.race([
          model.generateContent(structuredPrompt),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 15000)
          )
        ]);
        break; // Success, exit retry loop
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error.message);
        if (attempt === maxRetries) throw error;
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Raw API response received:', text.substring(0, 200) + '...');

    // Parse the structured response
    let simpleAnswer = '';
    let storyExplanation = '';
    let funFact = '';
    
    // Split by sections and clean up
    const sections = text.split(/\n\s*\n/).filter(section => section.trim());
    
    sections.forEach(section => {
      const cleanSection = section.trim();
      if (cleanSection.includes('SIMPLE ANSWER:')) {
        simpleAnswer = cleanSection.replace(/SIMPLE ANSWER:\s*/i, '').trim();
      } else if (cleanSection.includes('STORY:')) {
        storyExplanation = cleanSection.replace(/STORY:\s*/i, '').trim();
      } else if (cleanSection.includes('FUN FACT:')) {
        funFact = cleanSection.replace(/FUN FACT:\s*/i, '').trim();
      }
    });
    
    // Fallback parsing if structured format wasn't followed
    if (!simpleAnswer && !storyExplanation && !funFact) {
      console.log('📝 Using fallback parsing...');
      const lines = text.split('\n').filter(line => line.trim()).slice(0, 10);
      
      // Try to extract meaningful content
      const meaningfulLines = lines.filter(line => 
        line.length > 20 && 
        !line.match(/^(SIMPLE|STORY|FUN)/i) && 
        !line.match(/^\d+\./)
      );
      
      simpleAnswer = meaningfulLines[0] || "That's a great question! Let me explain it in a simple way...";
      storyExplanation = meaningfulLines[1] || "Think of it like a fun adventure where...";
      funFact = meaningfulLines[2] || "Here's something cool you might not know!";
    }

    // Ensure we have content for all fields
    const result_obj = {
      simpleAnswer: simpleAnswer || "That's an interesting question! Let me break it down simply...",
      storyExplanation: storyExplanation || "Imagine this like a story where everything has a special purpose...",
      funFact: funFact || "Did you know? There are so many amazing things about this topic!"
    };
    
    console.log('✅ Parsed response:', {
      simpleAnswer: result_obj.simpleAnswer.substring(0, 50) + '...',
      storyExplanation: result_obj.storyExplanation.substring(0, 50) + '...',
      funFact: result_obj.funFact.substring(0, 50) + '...',
      modelUsed
    });
    
    return result_obj;

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('API key not valid')) {
      throw new Error('API key is invalid. Please check your Gemini API key in the .env file.');
    } else if (error.message?.includes('not found') || error.message?.includes('404')) {
      throw new Error('The requested model is not available. Please try again.');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.message?.includes('timeout')) {
      throw new Error('Request timed out. Please try again with a shorter question.');
    } else if (error.message?.includes('blocked')) {
      throw new Error('This content was blocked by safety filters. Please try rephrasing your question.');
    } else {
      throw new Error('Failed to generate explanation. Please try again.');
    }
  }
};

// Test function to verify API key works
export const testGeminiConnection = async () => {
  try {
    console.log('🧪 Testing Gemini connection...');
    const response = await generateGeminiResponse("What is 1+1?");
    console.log('✅ Connection test successful:', response);
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
};

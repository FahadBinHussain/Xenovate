import { GoogleGenerativeAI } from '@google/generative-ai';

// This file is for testing the Gemini API connection
async function testGeminiAPI() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return;
    }

    console.log('Testing Gemini API connection...');
    
    // Initialize with the same configuration as the main app
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    });

    // Simple prompt to test connection
    const prompt = "Hello, can you verify this connection is working?";
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log('API Response:', response);
    console.log('Connection test successful!');
    
    return response;
  } catch (error) {
    console.error('Error testing Gemini API:', error);
    throw error;
  }
}

// You can run this directly with: 
// node -r dotenv/config --loader ts-node/esm lib/api-test.ts
export { testGeminiAPI }; 
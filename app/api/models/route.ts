import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// List of models we're supporting
const SUPPORTED_MODELS = [
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-pro',
  'gemini-pro-latest'
];

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'API key not configured' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // Try to fetch available models from the API
    try {
      // First try to actually list models - this API might not be available in all regions
      const modelInfo = await Promise.all(
        SUPPORTED_MODELS.map(async (modelName) => {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // Try a simple generation to test if the model works
            await model.generateContent('Hello');
            return {
              name: modelName,
              status: 'available',
              isDefault: modelName === 'gemini-1.5-pro'
            };
          } catch (error: any) {
            // If this is a quota error, mark as quota exceeded
            if (error.message && (
              error.message.includes('quota') || 
              error.message.includes('Resource has been exhausted') ||
              error.message.includes('429 Too Many Requests')
            )) {
              return {
                name: modelName,
                status: 'quota_exceeded',
                error: error.message,
                isDefault: modelName === 'gemini-1.5-pro'
              };
            }
            
            // If it's an access error, mark as not available
            if (error.message && error.message.includes('not found')) {
              return {
                name: modelName,
                status: 'not_available',
                error: 'Model not available in your region or with your API key',
                isDefault: modelName === 'gemini-1.5-pro'
              };
            }
            
            // Any other error
            return {
              name: modelName,
              status: 'error',
              error: error.message,
              isDefault: modelName === 'gemini-1.5-pro'
            };
          }
        })
      );
      
      return NextResponse.json({ 
        models: modelInfo,
        defaultModel: 'gemini-1.5-pro',
        apiConfigured: true
      });
    } catch (error: any) {
      // Fallback if listing models fails
      return NextResponse.json({ 
        models: SUPPORTED_MODELS.map(name => ({
          name,
          status: 'unknown',
          isDefault: name === 'gemini-1.5-pro'
        })),
        error: error.message,
        defaultModel: 'gemini-1.5-pro',
        apiConfigured: true
      });
    }
    
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message || 'Unknown error',
      apiConfigured: !!process.env.GEMINI_API_KEY
    }, { status: 500 });
  }
} 
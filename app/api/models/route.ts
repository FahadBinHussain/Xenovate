import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// List of models we're supporting
const SUPPORTED_MODELS = [
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-pro',
  'gemini-pro-latest'
];

// Helper function to create a promise that rejects after a timeout
function timeout(ms: number) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
}

// Helper function to test a model with timeout
async function testModel(genAI: GoogleGenerativeAI, modelName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Test model with timeout (3 seconds)
    const result = await Promise.race([
      model.generateContent('Hello'),
      timeout(3000) // 3 second timeout
    ]);
    
    return {
      name: modelName,
      status: 'available',
      isDefault: modelName === 'gemini-1.5-pro'
    };
  } catch (error: any) {
    console.error(`Error testing model ${modelName}:`, error.message);
    
    // If this is a timeout error
    if (error.message && error.message.includes('Timeout after')) {
      return {
        name: modelName,
        status: 'timeout',
        error: 'Request timed out. The model may be experiencing high demand.',
        isDefault: modelName === 'gemini-1.5-pro'
      };
    }
    
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
}

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        models: SUPPORTED_MODELS.map(name => ({
          name,
          status: 'error',
          error: 'API key not configured',
          isDefault: name === 'gemini-1.5-pro'
        })),
        error: 'API key not configured',
        defaultModel: 'gemini-1.5-pro',
        apiConfigured: false
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // Create an overall timeout for the entire operation (8 seconds)
    const overallTimeout = new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(SUPPORTED_MODELS.map(name => ({
          name,
          status: 'timeout',
          error: 'Request timed out. Try again later.',
          isDefault: name === 'gemini-1.5-pro'
        })));
      }, 8000);
    });
    
    try {
      // Race between the overall timeout and testing all models
      const modelInfoPromise = Promise.all(
        SUPPORTED_MODELS.map(modelName => testModel(genAI, modelName))
      );
      
      const modelInfo = await Promise.race([modelInfoPromise, overallTimeout]);
      
      return NextResponse.json({ 
        models: modelInfo,
        defaultModel: 'gemini-1.5-pro',
        apiConfigured: true
      });
    } catch (error: any) {
      console.error('Error testing models:', error);
      // Fallback if testing models fails
      return NextResponse.json({ 
        models: SUPPORTED_MODELS.map(name => ({
          name,
          status: 'unknown',
          error: 'Failed to test models',
          isDefault: name === 'gemini-1.5-pro'
        })),
        error: error.message || 'Error testing models',
        defaultModel: 'gemini-1.5-pro',
        apiConfigured: true
      });
    }
    
  } catch (error: any) {
    console.error('Unexpected error in GET handler:', error);
    return NextResponse.json({ 
      models: SUPPORTED_MODELS.map(name => ({
        name,
        status: 'error',
        error: 'Unexpected server error',
        isDefault: name === 'gemini-1.5-pro'
      })),
      error: error.message || 'Unexpected server error',
      apiConfigured: !!process.env.GEMINI_API_KEY
    }, { status: 500 });
  }
} 
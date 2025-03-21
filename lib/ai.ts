import { GoogleGenerativeAI } from '@google/generative-ai';

// Debug API key (redacting most of it for security)
const apiKey = process.env.GEMINI_API_KEY || '';
if (apiKey) {
  const firstFive = apiKey.substring(0, 5);
  const lastThree = apiKey.substring(apiKey.length - 3);
  console.log(`[DEBUG] Gemini API Key loaded: ${firstFive}...${lastThree} (${apiKey.length} chars)`);
} else {
  console.log('[DEBUG] No Gemini API Key found in environment variables');
}

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Define available models in order of preference
const AVAILABLE_MODELS = [
  'gemini-1.5-pro',
  'gemini-1.5-flash', 
  'gemini-pro',
  'gemini-pro-latest'
];

// Keep track of models that have encountered quota errors
const quotaExhaustedModels = new Set();

// Helper function to check if the error is related to API key
function isApiKeyError(error: any): boolean {
  return error?.message?.includes('API key') || 
         error?.message?.includes('API_KEY_INVALID') ||
         error?.message?.includes('API key expired');
}

// Helper function to check if the error is related to quota limits
function isQuotaError(error: any): boolean {
  return error?.message?.includes('quota') || 
         error?.message?.includes('Resource has been exhausted') || 
         error?.message?.includes('429 Too Many Requests');
}

// Helper function to get error response
function getErrorResponse(type: 'analyze' | 'optimize' | 'convert' | 'explain', error: any, code: string, language: string, targetLanguage?: string) {
  const errorMessage = error?.message || 'Unknown error';
  
  switch (type) {
    case 'analyze':
      return {
        time_complexity: 'Unknown',
        space_complexity: 'Unknown',
        explanation: `Error: ${errorMessage}`
      };
    case 'optimize':
      return {
        optimized_code: code,
        improvements: [`Error: ${errorMessage}`]
      };
    case 'convert':
      return {
        converted_code: code,
        target_language: targetLanguage || language,
        error: errorMessage
      };
    case 'explain':
      return {
        explanation: `Error: ${errorMessage}`
      };
  }
}

// Configure the Gemini model with fallback capability
async function getGeminiResponse(prompt: string) {
  // Try each model in order of preference until one works
  let lastError = null;
  
  // Filter out models that have already encountered quota errors in this session
  const availableModels = AVAILABLE_MODELS.filter(model => !quotaExhaustedModels.has(model));
  
  if (availableModels.length === 0) {
    // If all models have quota issues, clear the set and try again with all models
    // This handles the case where quotas reset after some time
    console.log('[DEBUG] All models exhausted, resetting model list');
    quotaExhaustedModels.clear();
  }
  
  for (const model of AVAILABLE_MODELS) {
    try {
      console.log(`[DEBUG] Trying model: ${model}`);
      const client = genAI.getGenerativeModel({ 
        model: model,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });
      
      const result = await client.generateContent(prompt);
      console.log(`[DEBUG] Success with model: ${model}`);
      return result.response.text();
    } catch (error: any) {
      lastError = error;
      console.error(`[DEBUG] Error with model ${model}:`, error.message);
      
      if (isQuotaError(error)) {
        // Mark this model as having quota issues
        console.log(`[DEBUG] Quota exhausted for model: ${model}`);
        quotaExhaustedModels.add(model);
        // Continue to try the next model
        continue;
      } else {
        // For other types of errors (not quota related), throw immediately
        throw error;
      }
    }
  }
  
  // If we've tried all models and none worked
  throw lastError || new Error('All AI models failed to respond');
}

export async function analyzeCode(code: string, language: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const prompt = `Analyze this ${language} code and provide:
    1. Time complexity
    2. Space complexity
    3. A brief explanation

    Code:
    ${code}

    Please format your response as JSON with keys: time_complexity, space_complexity, explanation`;

    const text = await getGeminiResponse(prompt);
    
    // Clean up the response text
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.slice(7);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    try {
      const parsed = JSON.parse(cleanText);
      return {
        time_complexity: parsed.time_complexity || 'Unknown',
        space_complexity: parsed.space_complexity || 'Unknown',
        explanation: parsed.explanation || 'No explanation available'
      };
    } catch (e) {
      // If JSON parsing fails, try to extract information from text
      const timeMatch = cleanText.match(/time complexity[^O]*(O\([^)]+\))/i);
      const spaceMatch = cleanText.match(/space complexity[^O]*(O\([^)]+\))/i);
      
      return {
        time_complexity: timeMatch ? timeMatch[1] : 'Unknown',
        space_complexity: spaceMatch ? spaceMatch[1] : 'Unknown',
        explanation: cleanText
      };
    }
  } catch (error) {
    console.error('Error analyzing code:', error);
    return getErrorResponse('analyze', error, code, language);
  }
}

export async function optimizeCode(code: string, language: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const prompt = `Optimize this ${language} code and provide:
    1. The optimized code
    2. A list of improvements made

    Code:
    ${code}

    Please format your response as JSON with keys: optimized_code, improvements`;

    const text = await getGeminiResponse(prompt);
    
    // Clean up the response text
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.slice(7);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    try {
      const parsed = JSON.parse(cleanText);
      return {
        optimized_code: parsed.optimized_code || code,
        improvements: parsed.improvements || ['No improvements available.']
      };
    } catch (e) {
      return {
        optimized_code: code,
        improvements: ['Unable to parse optimization suggestions. Please try again.']
      };
    }
  } catch (error) {
    console.error('Error optimizing code:', error);
    return getErrorResponse('optimize', error, code, language);
  }
}

export async function convertCode(code: string, sourceLanguage: string, targetLanguage: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const prompt = `Convert this ${sourceLanguage} code to ${targetLanguage}:

    Code:
    ${code}

    Please provide only the converted code without any explanations or markdown formatting.`;

    const text = await getGeminiResponse(prompt);
    
    // Clean up the response text
    let cleanText = text.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.split('\n').slice(1, -1).join('\n');
    }
    cleanText = cleanText.trim();

    return {
      converted_code: cleanText,
      target_language: targetLanguage
    };
  } catch (error) {
    console.error('Error converting code:', error);
    return getErrorResponse('convert', error, code, sourceLanguage, targetLanguage);
  }
}

export async function explainCode(code: string, language: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const prompt = `Explain this ${language} code in simple terms:

    Code:
    ${code}

    Please provide a clear and concise explanation.`;

    const text = await getGeminiResponse(prompt);
    
    return {
      explanation: text.trim()
    };
  } catch (error) {
    console.error('Error explaining code:', error);
    return getErrorResponse('explain', error, code, language);
  }
} 
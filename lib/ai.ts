import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper function to check if the error is related to API key
function isApiKeyError(error: any): boolean {
  return error?.message?.includes('API key') || 
         error?.message?.includes('API_KEY_INVALID') ||
         error?.message?.includes('API key expired');
}

// Helper function to get fallback response
function getFallbackResponse(type: 'analyze' | 'optimize' | 'convert' | 'explain', code: string, language: string, targetLanguage?: string) {
  switch (type) {
    case 'analyze':
      return {
        time_complexity: 'O(n)',
        space_complexity: 'O(1)',
        explanation: 'Unable to analyze code. Please check your API key configuration.'
      };
    case 'optimize':
      return {
        optimized_code: code,
        improvements: ['Unable to optimize code. Please check your API key configuration.']
      };
    case 'convert':
      return {
        converted_code: code,
        target_language: targetLanguage || language
      };
    case 'explain':
      return {
        explanation: 'Unable to explain code. Please check your API key configuration.'
      };
  }
}

export async function analyzeCode(code: string, language: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    // Using newer client pattern
    const client = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `Analyze this ${language} code and provide:
    1. Time complexity
    2. Space complexity
    3. A brief explanation

    Code:
    ${code}

    Please format your response as JSON with keys: time_complexity, space_complexity, explanation`;

    const result = await client.generateContent(prompt);
    const text = result.response.text();
    
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
    if (isApiKeyError(error)) {
      return getFallbackResponse('analyze', code, language);
    }
    throw error;
  }
}

export async function optimizeCode(code: string, language: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    // Using newer client pattern
    const client = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Optimize this ${language} code and provide:
    1. The optimized code
    2. A list of improvements made

    Code:
    ${code}

    Please format your response as JSON with keys: optimized_code, improvements`;

    const result = await client.generateContent(prompt);
    const text = result.response.text();
    
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
    if (isApiKeyError(error)) {
      return getFallbackResponse('optimize', code, language);
    }
    throw error;
  }
}

export async function convertCode(code: string, sourceLanguage: string, targetLanguage: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    // Using newer client pattern
    const client = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Convert this ${sourceLanguage} code to ${targetLanguage}:

    Code:
    ${code}

    Please provide only the converted code without any explanations or markdown formatting.`;

    const result = await client.generateContent(prompt);
    const text = result.response.text();
    
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
    if (isApiKeyError(error)) {
      return getFallbackResponse('convert', code, sourceLanguage, targetLanguage);
    }
    throw error;
  }
}

export async function explainCode(code: string, language: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    // Using newer client pattern
    const client = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Explain this ${language} code in simple terms:

    Code:
    ${code}

    Please provide a clear and concise explanation.`;

    const result = await client.generateContent(prompt);
    const text = result.response.text();
    
    return {
      explanation: text.trim()
    };
  } catch (error) {
    console.error('Error explaining code:', error);
    if (isApiKeyError(error)) {
      return getFallbackResponse('explain', code, language);
    }
    throw error;
  }
} 
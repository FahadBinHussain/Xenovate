import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Google Generative AI client
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Configure gemini model - using only the working model
function getGeminiClient() {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    }
  });
}

export async function POST(req: Request) {
  try {
    // Check if API key is configured
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }
    
    // Debug API key (redacting most of it for security)
    const firstFive = apiKey.substring(0, 5);
    const lastThree = apiKey.substring(apiKey.length - 3);
    console.log(`[DEBUG] Using Gemini API Key: ${firstFive}...${lastThree} (${apiKey.length} chars)`);
    
    // Parse request
    const body = await req.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate content using Gemini
    try {
      const model = getGeminiClient();
      console.log(`[DEBUG] Generating content with model: gemini-1.5-pro`);
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      return NextResponse.json({ response });
    } catch (error: any) {
      console.error('Gemini generation error:', error);
      
      // Handle specific error cases
      if (error.message && error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your GEMINI_API_KEY environment variable.' },
          { status: 401 }
        );
      }
      
      if (error.message && error.message.includes('429')) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: `Error generating content: ${error.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Unexpected error in Gemini route:', error);
    return NextResponse.json(
      { error: `Unexpected error: ${error.message}` },
      { status: 500 }
    );
  }
} 
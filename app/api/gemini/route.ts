import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language } = body;

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    try {
      // Initialize the Gemini 2.0 Flash client
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
      const client = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `Analyze this ${language} code and provide insights:
      
      ${code}
      
      Please provide detailed analysis.`;

      const result = await client.generateContent(prompt);
      const response = result.response.text();
      
      return NextResponse.json({ response });
    } catch (error: any) {
      console.error(`Error with Gemini 2.0 API: ${error.message}`);
      return NextResponse.json(
        { error: error.message, response: "Failed to generate response from Gemini 2.0 model." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in gemini endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
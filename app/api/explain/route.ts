import { NextResponse } from 'next/server';
import { explainCode } from '@/lib/ai';
import { CodeRequest, ExplanationResponse } from '@/types/api';

export async function POST(request: Request) {
  try {
    const body: CodeRequest = await request.json();
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

    const result = await explainCode(code, language);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in explain endpoint:', error);
    
    // Check if it's an API key error
    if (error?.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'API key error. Please check your configuration.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
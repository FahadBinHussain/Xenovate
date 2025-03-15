// API utility functions for Xenovate

// Type definitions
interface CodeRequest {
  code: string;
  language: string;
}

interface AnalysisResponse {
  time_complexity: string;
  space_complexity: string;
  explanation: string;
}

interface OptimizationResponse {
  optimized_code: string;
  improvements: string[];
}

interface ConversionResponse {
  converted_code: string;
  target_language: string;
}

interface ExplanationResponse {
  explanation: string;
}

// Base API URL (fetched from environment variable or default to localhost)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Analyze algorithm for time and space complexity
 */
export async function analyzeAlgorithm(
  request: CodeRequest
): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        language: request.language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      time_complexity: data.time_complexity || 'Unknown',
      space_complexity: data.space_complexity || 'Unknown',
      explanation: data.explanation || 'No explanation available',
    };
  } catch (error) {
    console.error('Error analyzing algorithm:', error);
    throw error;
  }
}

/**
 * Optimize algorithm for better performance
 */
export async function optimizeAlgorithm(
  request: CodeRequest
): Promise<OptimizationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        language: request.language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Optimization failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      optimized_code: data.optimized_code || request.code,
      improvements: data.improvements || [],
    };
  } catch (error) {
    console.error('Error optimizing algorithm:', error);
    throw error;
  }
}

/**
 * Convert code from one language to another
 */
export async function convertCode(
  request: CodeRequest,
  targetLanguage: string
): Promise<ConversionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/convert?target_language=${encodeURIComponent(targetLanguage)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        language: request.language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Conversion failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      converted_code: data.converted_code || 'Conversion failed',
      target_language: targetLanguage,
    };
  } catch (error) {
    console.error('Error converting code:', error);
    throw error;
  }
}

/**
 * Explain algorithm in plain language
 */
export async function explainAlgorithm(
  request: CodeRequest
): Promise<ExplanationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        language: request.language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Explanation failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      explanation: data.explanation || 'No explanation available',
    };
  } catch (error) {
    console.error('Error explaining algorithm:', error);
    throw error;
  }
} 
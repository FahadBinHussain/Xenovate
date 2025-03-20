// API utility functions for Xenovate

import { CodeRequest, AnalysisResponse, OptimizationResponse, ConversionResponse, ExplanationResponse } from '@/types/api';

// Base API URL (using relative paths since we're using Next.js API routes)
const API_BASE_URL = '';

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

    return response.json();
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

    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/api/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: request.code,
        language: request.language,
        target_language: targetLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Conversion failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error converting code:', error);
    throw error;
  }
}

/**
 * Explain code in simple terms
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

    return response.json();
  } catch (error) {
    console.error('Error explaining algorithm:', error);
    throw error;
  }
} 
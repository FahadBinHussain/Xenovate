import { useState } from 'react';
import { CodeAnalysis } from '../types';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

interface UseCodeAnalysisResult {
  analysis: CodeAnalysis | null;
  isLoading: boolean;
  error: string | null;
  analyzeCode: (code: string, language: string, targetLanguage: string) => Promise<void>;
}

export const useCodeAnalysis = (): UseCodeAnalysisResult => {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCode = async (code: string, language: string, targetLanguage: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.ANALYZE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.API_ERROR);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analysis,
    isLoading,
    error,
    analyzeCode,
  };
}; 
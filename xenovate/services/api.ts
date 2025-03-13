import { CodeAnalysis } from '../types';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ApiService {
  private static instance: ApiService;
  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail?.error || ERROR_MESSAGES.API_ERROR);
    }
    return response.json();
  }

  async analyzeCode(
    code: string,
    language: string,
    targetLanguage?: string
  ): Promise<CodeAnalysis> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ANALYZE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          target_language: targetLanguage,
        }),
      });

      return this.handleResponse<CodeAnalysis>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }
  }

  async optimizeCode(code: string, language: string): Promise<CodeAnalysis> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.OPTIMIZE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      return this.handleResponse<CodeAnalysis>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }
  }

  async convertCode(
    code: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<{ converted_code: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONVERT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        }),
      });

      return this.handleResponse<{ converted_code: string }>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }
  }
} 
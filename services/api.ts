import axios from 'axios';
import { API_ENDPOINTS, API_URL } from '@/constants';
import { toast } from 'sonner';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// API service functions
export const analyzeCode = async (code: string, language: string) => {
  try {
    console.log('Analyzing code with API:', `${API_URL}${API_ENDPOINTS.ANALYZE}`);
    const response = await api.post(API_ENDPOINTS.ANALYZE, { code, language });
    return response.data;
  } catch (error) {
    console.error('Error analyzing code:', error);
    // Return sample data for demo purposes
    return {
      time_complexity: 'O(n)',
      space_complexity: 'O(1)',
      explanation: 'This is sample data. The backend API is currently in fallback mode.',
    };
  }
};

export const optimizeCode = async (code: string, language: string) => {
  try {
    console.log('Optimizing code with API:', `${API_URL}${API_ENDPOINTS.OPTIMIZE}`);
    const response = await api.post(API_ENDPOINTS.OPTIMIZE, { code, language });
    return response.data;
  } catch (error) {
    console.error('Error optimizing code:', error);
    // Return sample data for demo purposes
    return {
      optimized_code: code,
      improvements: ['This is sample data. The backend API is currently in fallback mode.'],
    };
  }
};

export const convertCode = async (code: string, targetLanguage: string) => {
  try {
    console.log('Converting code with API:', `${API_URL}${API_ENDPOINTS.CONVERT}`);
    const response = await api.post(API_ENDPOINTS.CONVERT, { 
      code, 
      target_language: targetLanguage 
    });
    return response.data;
  } catch (error) {
    console.error('Error converting code:', error);
    // Return sample data for demo purposes
    return {
      original_code: code,
      target_language: targetLanguage,
      converted_code: '// This is sample data. The backend API is currently in fallback mode.',
    };
  }
};

export const explainCode = async (code: string, language: string) => {
  try {
    console.log('Explaining code with API:', `${API_URL}${API_ENDPOINTS.EXPLAIN}`);
    const response = await api.post(API_ENDPOINTS.EXPLAIN, { code, language });
    return response.data;
  } catch (error) {
    console.error('Error explaining code:', error);
    // Return sample data for demo purposes
    return {
      explanation: 'This is sample data. The backend API is currently in fallback mode.',
    };
  }
}; 
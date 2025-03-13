export const SUPPORTED_LANGUAGES = [
  { name: 'Python', value: 'python', extension: '.py' },
  { name: 'JavaScript', value: 'javascript', extension: '.js' },
  { name: 'Java', value: 'java', extension: '.java' },
  { name: 'C++', value: 'cpp', extension: '.cpp' },
  { name: 'Go', value: 'go', extension: '.go' },
  { name: 'Rust', value: 'rust', extension: '.rs' },
  { name: 'Swift', value: 'swift', extension: '.swift' },
  { name: 'Kotlin', value: 'kotlin', extension: '.kt' },
  { name: 'TypeScript', value: 'typescript', extension: '.ts' },
  { name: 'Ruby', value: 'ruby', extension: '.rb' },
];

export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
  OPTIMIZE: '/api/optimize',
  CONVERT: '/api/convert',
};

export const DEFAULT_LANGUAGE = 'python';
export const DEFAULT_TARGET_LANGUAGE = 'java';

export const ERROR_MESSAGES = {
  API_ERROR: 'An error occurred while processing your request.',
  INVALID_CODE: 'Please enter valid code to analyze.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

export const SUCCESS_MESSAGES = {
  ANALYSIS_COMPLETE: 'Code analysis completed successfully.',
  OPTIMIZATION_COMPLETE: 'Code optimization completed successfully.',
  CONVERSION_COMPLETE: 'Code conversion completed successfully.',
}; 
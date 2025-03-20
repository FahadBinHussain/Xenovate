export interface CodeRequest {
  code: string;
  language: string;
  target_language?: string;
}

export interface AnalysisResponse {
  time_complexity: string;
  space_complexity: string;
  explanation: string;
}

export interface OptimizationResponse {
  optimized_code: string;
  improvements: string[];
}

export interface ConversionResponse {
  converted_code: string;
  target_language: string;
}

export interface ExplanationResponse {
  explanation: string;
} 
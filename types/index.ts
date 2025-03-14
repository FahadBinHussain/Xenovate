export interface CodeAnalysis {
  complexity: string;
  explanation: string;
  optimization: string;
  convertedCode?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface CodeEditorProps {
  initialCode?: string;
  initialLanguage?: string;
  onSubmit: (code: string, language: string, targetLanguage: string) => void;
  onLanguageChange?: (language: string) => void;
  onTargetLanguageChange?: (language: string) => void;
}

export interface ResultsDisplayProps {
  analysis: CodeAnalysis;
  isLoading: boolean;
  error: string | null;
}

export interface Language {
  name: string;
  value: string;
  extension: string;
} 
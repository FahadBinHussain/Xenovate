"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnalysisResult {
  timeComplexity?: string;
  spaceComplexity?: string;
  explanation?: string;
}

interface OptimizationResult {
  optimizedCode?: string;
  improvements?: string[];
}

interface ConversionResult {
  convertedCode?: string;
  targetLanguage?: string;
}

interface ResultsDisplayProps {
  type: "analysis" | "explanation" | "optimization" | "conversion";
  loading: boolean;
  data: AnalysisResult | OptimizationResult | ConversionResult | null;
  onCopyCode?: () => void;
}

export function ResultsDisplay({
  type,
  loading,
  data,
  onCopyCode
}: ResultsDisplayProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-500">
          {type === "analysis" && "Analyzing your algorithm..."}
          {type === "explanation" && "Generating explanation..."}
          {type === "optimization" && "Optimizing your code..."}
          {type === "conversion" && "Converting your code..."}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
        <p>
          {type === "analysis" && "Enter your code and click analyze to see results"}
          {type === "explanation" && "Enter your code and click explain to see results"}
          {type === "optimization" && "Enter your code and click optimize to see results"}
          {type === "conversion" && "Enter your code and click convert to see results"}
        </p>
      </div>
    );
  }

  // Render analysis results
  if (type === "analysis" && "timeComplexity" in data && "spaceComplexity" in data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">Time Complexity</h3>
            <p className="text-2xl font-mono font-bold">{data.timeComplexity}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-md">
            <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">Space Complexity</h3>
            <p className="text-2xl font-mono font-bold">{data.spaceComplexity}</p>
          </div>
        </div>
        
        {data.explanation && (
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Explanation</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <p className="whitespace-pre-wrap">{data.explanation}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render explanation results
  if (type === "explanation" && "explanation" in data) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-md font-semibold mb-2">Explanation</h3>
          <p className="whitespace-pre-wrap">{data.explanation}</p>
        </div>
      </div>
    );
  }

  // Render optimization results
  if (type === "optimization" && "optimizedCode" in data && "improvements" in data) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-semibold mb-2">Improvements</h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.improvements?.map((improvement, index) => (
              <li key={index} className="text-sm">{improvement}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-2">Optimized Code</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md h-[300px] overflow-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">{data.optimizedCode}</pre>
          </div>
          {onCopyCode && (
            <Button
              onClick={onCopyCode}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Copy to Clipboard
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Render conversion results
  if (type === "conversion" && "convertedCode" in data) {
    return (
      <div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md h-[400px] overflow-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">{data.convertedCode}</pre>
        </div>
        {onCopyCode && (
          <Button
            onClick={onCopyCode}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Copy to Clipboard
          </Button>
        )}
      </div>
    );
  }

  return <div>No results to display</div>;
} 
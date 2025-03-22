"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/CodeEditor";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ModelStatus } from "@/components/ModelStatus";
import { analyzeAlgorithm, optimizeAlgorithm, convertCode, explainAlgorithm } from "@/lib/api";
import { toast } from "sonner";

interface AnalysisResults {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

interface OptimizationResults {
  optimizedCode: string;
  improvements: string[];
}

interface ConversionResults {
  convertedCode: string;
  targetLanguage: string;
}

interface ExplanationResults {
  explanation: string;
}

// Sample code for placeholder
const SAMPLE_CODE = `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Example usage
my_list = [64, 34, 25, 12, 22, 11, 90]
sorted_list = bubble_sort(my_list)
print("Sorted array:", sorted_list)`;

export default function HomePage() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState("python");
  const [targetLanguage, setTargetLanguage] = useState("javascript");
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Results states
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResults | null>(null);
  const [conversionResults, setConversionResults] = useState<ConversionResults | null>(null);
  const [explanationResults, setExplanationResults] = useState<ExplanationResults | null>(null);

  // Process all in one go
  const processCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to process");
      return;
    }

    setIsLoading(true);
    setAnalysisResults(null);
    setOptimizationResults(null);
    setConversionResults(null);
    setExplanationResults(null);

    // Show a toast notification that we're starting
    toast.info("Processing your code. This may take a moment...");

    try {
      // Run all operations in parallel
      const [analysisResult, optimizationResult, conversionResult, explanationResult] = await Promise.all([
        analyzeAlgorithm({ code, language }),
        optimizeAlgorithm({ code, language }),
        convertCode({ code, language }, targetLanguage),
        explainAlgorithm({ code, language })
      ]);
      
      // Set all results
      setAnalysisResults({
        timeComplexity: analysisResult.time_complexity,
        spaceComplexity: analysisResult.space_complexity,
        explanation: analysisResult.explanation,
      });
      
      setOptimizationResults({
        optimizedCode: optimizationResult.optimized_code,
        improvements: optimizationResult.improvements,
      });
      
      setConversionResults({
        convertedCode: conversionResult.converted_code,
        targetLanguage: conversionResult.target_language,
      });
      
      setExplanationResults({
        explanation: explanationResult.explanation,
      });
      
      toast.success("All operations completed successfully!");
    } catch (error) {
      console.error("Processing error:", error);
      toast.error("Error processing code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard");
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Xenovate Code Analysis</h1>
      
      <div className="my-6">
        <ModelStatus />
      </div>
      
      <Tabs defaultValue="analyze" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="analyze">Analyze</TabsTrigger>
          <TabsTrigger value="optimize">Optimize</TabsTrigger>
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="explain">Explain</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analyze">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsDisplay
                type="analysis"
                loading={isLoading}
                data={analysisResults}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="optimize">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsDisplay
                type="optimization"
                loading={isLoading}
                data={optimizationResults}
                onCopyCode={() => {
                  if (optimizationResults?.optimizedCode) {
                    copyToClipboard(optimizationResults.optimizedCode);
                  }
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="convert">
          <Card>
            <CardHeader>
              <CardTitle>
                Conversion Results
                {conversionResults && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({conversionResults.targetLanguage})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsDisplay
                type="conversion"
                loading={isLoading}
                data={conversionResults}
                onCopyCode={() => {
                  if (conversionResults?.convertedCode) {
                    copyToClipboard(conversionResults.convertedCode);
                  }
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="explain">
          <Card>
            <CardHeader>
              <CardTitle>Explanation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsDisplay
                type="explanation"
                loading={isLoading}
                data={explanationResults}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

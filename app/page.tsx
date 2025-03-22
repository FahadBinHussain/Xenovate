"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import ResultsDisplay from "@/components/ResultsDisplay";
import ModelStatus from "@/components/ModelStatus";
import { analyzeAlgorithm, optimizeAlgorithm, convertCode, explainAlgorithm } from "@/lib/api";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  
  // Active tab
  const [activeTab, setActiveTab] = useState("analyze");

  // Process code based on active tab
  const processCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to process");
      return;
    }

    setIsLoading(true);

    // Clear previous results for the active tab
    if (activeTab === "analyze") setAnalysisResults(null);
    else if (activeTab === "optimize") setOptimizationResults(null);
    else if (activeTab === "convert") setConversionResults(null);
    else if (activeTab === "explain") setExplanationResults(null);

    // Show a toast notification that we're starting
    toast.info(`Processing your code for ${activeTab}...`);

    try {
      // Only run the selected operation
      if (activeTab === "analyze") {
        const result = await analyzeAlgorithm({ code, language });
        setAnalysisResults({
          timeComplexity: result.time_complexity,
          spaceComplexity: result.space_complexity,
          explanation: result.explanation,
        });
      } 
      else if (activeTab === "optimize") {
        const result = await optimizeAlgorithm({ code, language });
        setOptimizationResults({
          optimizedCode: result.optimized_code,
          improvements: result.improvements,
        });
      }
      else if (activeTab === "convert") {
        const result = await convertCode({ code, language }, targetLanguage);
        setConversionResults({
          convertedCode: result.converted_code,
          targetLanguage: result.target_language,
        });
      }
      else if (activeTab === "explain") {
        const result = await explainAlgorithm({ code, language });
        setExplanationResults({
          explanation: result.explanation,
        });
      }
      
      toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} operation completed!`);
    } catch (error) {
      console.error("Processing error:", error);
      toast.error(`Error during ${activeTab}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Xenovate</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">AI-Powered Algorithm Assistant</div>
            <ModelStatus />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel: Code Input */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {activeTab === "convert" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Language</label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Target Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="h-[400px] border rounded-md overflow-hidden">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language={language}
                    placeholder="Enter your code here..."
                    hideLanguageDisplay={true}
                  />
                </div>
                
                <Button 
                  onClick={processCode} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Processing..." : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Code`}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Panel: Output & Controls */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="analyze">Analyze</TabsTrigger>
                <TabsTrigger value="optimize">Optimize</TabsTrigger>
                <TabsTrigger value="convert">Convert</TabsTrigger>
                <TabsTrigger value="explain">Explain</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analyze">
                <Card>
                  <CardHeader>
                    <CardTitle>Complexity Analysis</CardTitle>
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
                    <CardTitle>Optimized Code</CardTitle>
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
                      Converted Code
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
                    <CardTitle>Code Explanation</CardTitle>
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
          </div>
        </div>
      </main>
      
      <footer className="mt-8 py-6 border-t bg-white dark:bg-gray-800">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>Xenovate - AI-Powered Code Analysis Platform</p>
        </div>
      </footer>
    </div>
  );
}

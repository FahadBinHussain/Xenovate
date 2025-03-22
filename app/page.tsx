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
import { Sparkles, Code, ArrowRight, Zap, FileCode, BrainCircuit } from "lucide-react";

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
      {/* Hero Header with gradient */}
      <header className="border-b bg-white dark:bg-gray-800 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Xenovate
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">AI-Powered Algorithm Assistant</div>
            <ModelStatus />
          </div>
        </div>
      </header>
      
      {/* Welcome Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-8 px-4 mb-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Code with 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
              AI-Powered Analysis
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Analyze, optimize, convert, and understand your algorithms with our powerful AI tools.
            Get instant insights to write better code.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <div className="flex items-center">
              <BrainCircuit className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm">Performance Optimization</span>
            </div>
            <div className="flex items-center">
              <FileCode className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Multi-Language Support</span>
            </div>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto pb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel: Code Input */}
          <div className="md:col-span-1 space-y-6">
            <Card className="overflow-hidden border-[1px] border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-500" />
                  Input Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="border-gray-200 dark:border-gray-700">
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
                      <SelectTrigger className="border-gray-200 dark:border-gray-700">
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      <span>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Code</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Panel: Output & Controls */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger value="analyze" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md py-2">
                  Analyze
                </TabsTrigger>
                <TabsTrigger value="optimize" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md py-2">
                  Optimize
                </TabsTrigger>
                <TabsTrigger value="convert" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md py-2">
                  Convert
                </TabsTrigger>
                <TabsTrigger value="explain" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md py-2">
                  Explain
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="analyze">
                <Card className="border-[1px] border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-750">
                    <CardTitle className="flex items-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 bg-opacity-20 mr-2">
                        <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                      </span>
                      Complexity Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ResultsDisplay
                      type="analysis"
                      loading={isLoading}
                      data={analysisResults}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="optimize">
                <Card className="border-[1px] border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750">
                    <CardTitle className="flex items-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-purple-500 bg-opacity-20 mr-2">
                        <Zap className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                      </span>
                      Optimized Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                <Card className="border-[1px] border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-750">
                    <CardTitle className="flex items-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-green-500 bg-opacity-20 mr-2">
                        <FileCode className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </span>
                      Converted Code
                      {conversionResults && (
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          ({conversionResults.targetLanguage})
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                <Card className="border-[1px] border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-750">
                    <CardTitle className="flex items-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 bg-opacity-20 mr-2">
                        <BrainCircuit className="h-4 w-4 text-orange-700 dark:text-orange-300" />
                      </span>
                      Code Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Xenovate - <span className="text-blue-600 dark:text-blue-400">AI-Powered Code Analysis Platform</span>
          </p>
          <div className="flex justify-center mt-2 space-x-4 text-xs text-gray-400">
            <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="/features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

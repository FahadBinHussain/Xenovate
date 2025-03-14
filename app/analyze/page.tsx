"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CodeEditor } from "@/components/CodeEditor";
import { analyzeAlgorithm } from "@/lib/api";
import { toast } from "sonner";
import { ResultsDisplay } from "@/components/ResultsDisplay";

export default function AnalyzePage() {
  const router = useRouter();
  const { isLoggedIn, user, loading } = useAuth();
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);

  useEffect(() => {
    // Check if the backend is in fallback mode
    const checkBackendMode = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/');
        const data = await response.json();
        if (data.message.includes('FALLBACK MODE')) {
          setIsFallbackMode(true);
        }
      } catch (error) {
        console.error('Error checking backend mode:', error);
      }
    };

    checkBackendMode();
  }, []);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to analyze");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const analysisResult = await analyzeAlgorithm({ code, language });
      
      setResults({
        timeComplexity: analysisResult.time_complexity,
        spaceComplexity: analysisResult.space_complexity,
        explanation: analysisResult.explanation,
      });
      
      toast.success("Analysis completed");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Error analyzing algorithm. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analyze Algorithm</h1>
      <p className="text-gray-600 mb-8">
        Paste your code below to analyze its time and space complexity.
      </p>

      {isFallbackMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Backend in Fallback Mode</p>
          <p>
            The backend is currently running in fallback mode. You will see sample data instead of actual AI analysis.
            Please check the backend configuration.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Code</h2>
            <div className="mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Programming Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-background border rounded p-2 w-full"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              
              <div className="h-[400px]">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={language}
                  placeholder="Paste your algorithm here..."
                />
              </div>
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Analyzing..." : "Analyze Algorithm"}
            </Button>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            
            <ResultsDisplay
              type="analysis"
              loading={isLoading}
              data={results}
            />
            
          </Card>
        </div>
      </div>
    </div>
  );
} 
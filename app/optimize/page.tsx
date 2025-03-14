"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CodeEditor } from "@/components/CodeEditor";
import { optimizeAlgorithm } from "@/lib/api";
import { toast } from "sonner";
import { ResultsDisplay } from "@/components/ResultsDisplay";

export default function OptimizePage() {
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

  const handleOptimize = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to optimize");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const optimizationResult = await optimizeAlgorithm({ code, language });
      
      setResults({
        optimizedCode: optimizationResult.optimized_code,
        improvements: optimizationResult.improvements,
      });
      
      toast.success("Optimization completed");
    } catch (error) {
      console.error("Optimization error:", error);
      toast.error("Error optimizing code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Optimize Code</h1>
      <p className="text-gray-600 mb-8">
        Paste your code below to get optimization suggestions.
      </p>

      {isFallbackMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Backend in Fallback Mode</p>
          <p>
            The backend is currently running in fallback mode. You will see sample data instead of actual AI optimization.
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
                  placeholder="Paste your code here..."
                />
              </div>
            </div>
            
            <Button 
              onClick={handleOptimize} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Optimizing..." : "Optimize Code"}
            </Button>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Optimization Results</h2>
            
            <ResultsDisplay
              type="optimization"
              loading={isLoading}
              data={results}
              onCopyCode={() => {
                if (results?.optimizedCode) {
                  navigator.clipboard.writeText(results.optimizedCode);
                  toast.success("Code copied to clipboard");
                }
              }}
            />
            
          </Card>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { convertCode } from "@/lib/api";
import { toast } from "sonner";
import { CodeEditor } from "@/components/CodeEditor";
import { ResultsDisplay } from "@/components/ResultsDisplay";

export default function ConvertPage() {
  const router = useRouter();
  const { isLoggedIn, user, loading } = useAuth();
  const [code, setCode] = useState<string>("");
  const [sourceLanguage, setSourceLanguage] = useState<string>("javascript");
  const [targetLanguage, setTargetLanguage] = useState<string>("python");
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

  const handleConvert = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to convert");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const conversionResult = await convertCode({ code, language: sourceLanguage }, targetLanguage);

      setResults({
        convertedCode: conversionResult.converted_code,
        targetLanguage: conversionResult.target_language,
      });

      toast.success("Conversion completed");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Error converting code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Convert Code</h1>
      <p className="text-gray-600 mb-8">
        Paste your code below to convert it to another programming language.
      </p>

      {isFallbackMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Backend in Fallback Mode</p>
          <p>
            The backend is currently running in fallback mode. You will see sample data instead of actual AI conversion.
            Please check the backend configuration.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Source Code</h2>
            <div className="mb-4">
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Source Language</label>
                  <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className="bg-background border rounded p-2 w-full"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Target Language</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="bg-background border rounded p-2 w-full"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
              </div>
              
              <div className="h-[400px]">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={sourceLanguage}
                  placeholder="Paste your code here..."
                />
              </div>
            </div>
            
            <Button 
              onClick={handleConvert} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Converting..." : "Convert Code"}
            </Button>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Converted Code 
              {results && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({results.targetLanguage})
                </span>
              )}
            </h2>
            
            <ResultsDisplay
              type="conversion"
              loading={isLoading}
              data={results}
              onCopyCode={() => {
                if (results?.convertedCode) {
                  navigator.clipboard.writeText(results.convertedCode);
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
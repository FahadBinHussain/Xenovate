"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CodeEditor } from "@/components/CodeEditor";
import { explainAlgorithm } from "@/lib/api";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { toast } from "sonner";

export default function ExplainPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    explanation: string;
  } | null>(null);

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to explain");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const explanationResult = await explainAlgorithm({ code, language });
      
      setResults({
        explanation: explanationResult.explanation,
      });
      
      toast.success("Explanation generated");
    } catch (error) {
      console.error("Explanation error:", error);
      toast.error("Error explaining code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Code Explanation</h1>
        <p className="text-gray-500">Get a plain English explanation of what your code does</p>
      </div>

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
              onClick={handleExplain} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Generating Explanation..." : "Explain Code"}
            </Button>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Explanation</h2>
            <ResultsDisplay
              type="explanation"
              loading={isLoading}
              data={results}
            />
          </Card>
        </div>
      </div>
    </div>
  );
} 
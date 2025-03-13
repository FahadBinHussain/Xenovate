"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeEditor } from "@/components/CodeEditor";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { analyzeAlgorithm, optimizeAlgorithm, convertCode, explainAlgorithm } from "@/lib/api";
import { useWebSocket, WebSocketMessage } from "@/lib/websocket";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [targetLanguage, setTargetLanguage] = useState("java");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
    optimizedCode?: string;
    improvements?: string[];
    convertedCode?: string;
    targetLanguage?: string;
  } | null>(null);

  const { isConnected, lastMessage, sendMessage } = {
    isConnected: false,
    lastMessage: null,
    sendMessage: () => false
  } as any; // Mock the WebSocket hook

  // Handle code change
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  // Handle target language change
  const handleTargetLanguageChange = (newLanguage: string) => {
    setTargetLanguage(newLanguage);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to analyze");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      // Try WebSocket first, fallback to REST API
      let usingWebSocket = false;
      
      if (isConnected) {
        const message: WebSocketMessage = {
          action: "analyze",
          code,
          language,
        };
        
        // Only proceed with WebSocket if sendMessage is successful
        usingWebSocket = sendMessage(message);
        
        if (usingWebSocket) {
          toast.info("Analysis started via WebSocket");
        } else {
          console.log("WebSocket send failed, falling back to REST API");
        }
      }
      
      // If not using WebSocket, use REST API
      if (!usingWebSocket) {
        console.log("Using REST API for algorithm analysis");
        try {
          const [analysisResult, optimizationResult, explanationResult, conversionResult] = await Promise.all([
            analyzeAlgorithm({ code, language }),
            optimizeAlgorithm({ code, language }),
            explainAlgorithm({ code, language }),
            convertCode({ code, language }, targetLanguage),
          ]);

          setResults({
            timeComplexity: analysisResult.time_complexity,
            spaceComplexity: analysisResult.space_complexity,
            explanation: analysisResult.explanation,
            optimizedCode: optimizationResult.optimized_code,
            improvements: optimizationResult.improvements,
            convertedCode: conversionResult.converted_code,
            targetLanguage: conversionResult.target_language,
          });

          toast.success("Analysis completed");
          setIsLoading(false);
        } catch (apiError) {
          console.error("REST API error:", apiError);
          toast.error("Error analyzing algorithm via API. Please check if the backend server is running.");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error in submit handler:", error);
      toast.error("Error analyzing algorithm. Please try again.");
      setIsLoading(false);
    }
  };

  // Handle WebSocket messages with useEffect to avoid render loop issues
  useEffect(() => {
    if (lastMessage && lastMessage.status === "completed" && lastMessage.result) {
      setResults({
        timeComplexity: lastMessage.result.time_complexity || "Unknown",
        spaceComplexity: lastMessage.result.space_complexity || "Unknown",
        explanation: lastMessage.result.explanation || "",
      });
      
      setIsLoading(false);
      toast.success("WebSocket analysis completed");
    } else if (lastMessage && lastMessage.status === "error") {
      toast.error(lastMessage.message || "Error in WebSocket response");
      setIsLoading(false);
    }
  }, [lastMessage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Xenovate
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
              >
                Analyze, optimize, and convert code with the power of AI
              </motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <CodeEditor
                  onCodeChange={handleCodeChange}
                  onLanguageChange={handleLanguageChange}
                  onTargetLanguageChange={handleTargetLanguageChange}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
              <div>
                {isLoading || results ? (
                  <ResultsDisplay
                    timeComplexity={results?.timeComplexity || ""}
                    spaceComplexity={results?.spaceComplexity || ""}
                    explanation={results?.explanation || ""}
                    optimizedCode={results?.optimizedCode}
                    improvements={results?.improvements}
                    convertedCode={results?.convertedCode}
                    targetLanguage={results?.targetLanguage}
                    isLoading={isLoading}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center h-full p-8 border rounded-lg bg-card text-card-foreground"
                  >
                    <h2 className="text-xl font-semibold mb-2">How It Works</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Enter your algorithm code in the editor</li>
                      <li>Select the programming language</li>
                      <li>Click "Analyze" to process your algorithm</li>
                      <li>View the time and space complexity analysis</li>
                      <li>Explore optimization suggestions</li>
                      <li>Get a simple explanation of how your algorithm works</li>
                    </ol>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm"
              >
                <div className="p-2 bg-primary/10 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 20v-6M6 20V10M18 20V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Complexity Analysis</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Get detailed time and space complexity analysis of your algorithms
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm"
              >
                <div className="p-2 bg-primary/10 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Optimization Suggestions</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Receive AI-powered suggestions to optimize your code for better performance
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm"
              >
                <div className="p-2 bg-primary/10 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 4.24 4.24" />
                    <path d="m14.83 9.17 4.24-4.24" />
                    <path d="m14.83 14.83 4.24 4.24" />
                    <path d="m9.17 14.83-4.24 4.24" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Code Conversion</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Convert your algorithm between different programming languages
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm"
              >
                <div className="p-2 bg-primary/10 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                    <path d="M21 8h-3a2 2 0 0 0-2 2v3" />
                    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Simple Explanations</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Get easy-to-understand explanations of how your algorithm works
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

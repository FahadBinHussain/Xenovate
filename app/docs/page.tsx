import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Documentation
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Learn how to use Xenovate effectively for your projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="font-semibold text-lg mb-2">Getting Started</div>
                <ul className="space-y-2">
                  <li>
                    <a href="#introduction" className="text-blue-600 hover:underline dark:text-blue-400">Introduction</a>
                  </li>
                  <li>
                    <a href="#quickstart" className="text-blue-600 hover:underline dark:text-blue-400">Quick Start Guide</a>
                  </li>
                </ul>
                
                <div className="font-semibold text-lg mb-2 mt-6">API Reference</div>
                <ul className="space-y-2">
                  <li>
                    <a href="#analyze" className="text-blue-600 hover:underline dark:text-blue-400">Analyze Endpoint</a>
                  </li>
                  <li>
                    <a href="#optimize" className="text-blue-600 hover:underline dark:text-blue-400">Optimize Endpoint</a>
                  </li>
                  <li>
                    <a href="#convert" className="text-blue-600 hover:underline dark:text-blue-400">Convert Endpoint</a>
                  </li>
                </ul>
                
                <div className="font-semibold text-lg mb-2 mt-6">Guides</div>
                <ul className="space-y-2">
                  <li>
                    <a href="#complexity" className="text-blue-600 hover:underline dark:text-blue-400">Understanding Complexity</a>
                  </li>
                  <li>
                    <a href="#languages" className="text-blue-600 hover:underline dark:text-blue-400">Supported Languages</a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3 space-y-12">
              {/* Introduction */}
              <div id="introduction">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Xenovate is a powerful platform for analyzing, optimizing, and converting code across various programming languages. 
                  Our AI-driven tools help developers understand algorithm complexity, identify optimization opportunities, and translate 
                  code between languages.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Whether you're a student learning about algorithms, a professional developer optimizing critical code paths, or a team 
                  working on cross-language projects, Xenovate provides the tools you need to improve your code's performance and maintainability.
                </p>
              </div>
              
              {/* Quick Start */}
              <div id="quickstart">
                <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">1. Create an Account</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Sign up for a free account to get started with basic features, or choose a premium plan for advanced capabilities.
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">2. Submit Your Code</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Paste your code into the editor, select the source language, and choose what you want to do: analyze, optimize, or convert.
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">3. View Results</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Get instant feedback on your code's complexity, optimized versions, or translations to other languages.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* API Reference */}
              <div id="analyze">
                <h2 className="text-2xl font-bold mb-4">Analyze Endpoint</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">POST /api/analyze</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Analyzes the provided code and returns information about its time and space complexity.
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
                      <code>{`{
  "code": "function example(n) { /* your code here */ }",
  "language": "javascript"
}`}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Response:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
                      <code>{`{
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "explanation": "This algorithm iterates through each element once..."
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
              
              <div id="optimize">
                <h2 className="text-2xl font-bold mb-4">Optimize Endpoint</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">POST /api/optimize</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Optimizes the provided code to improve its performance.
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
                      <code>{`{
  "code": "function example(n) { /* your code here */ }",
  "language": "javascript"
}`}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Response:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
                      <code>{`{
  "optimizedCode": "function example(n) { /* optimized version */ }",
  "improvements": [
    "Reduced time complexity from O(n²) to O(n log n)",
    "Eliminated redundant calculations"
  ]
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
              
              <div id="convert">
                <h2 className="text-2xl font-bold mb-4">Convert Endpoint</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">POST /api/convert</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Converts code from one programming language to another.
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
                      <code>{`{
  "code": "function example(n) { /* your code here */ }",
  "sourceLanguage": "javascript",
  "targetLanguage": "python"
}`}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Response:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-sm mt-2 overflow-x-auto">
                      <code>{`{
  "convertedCode": "def example(n): # converted code",
  "notes": "Converted to use Pythonic conventions"
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Guides */}
              <div id="complexity">
                <h2 className="text-2xl font-bold mb-4">Understanding Complexity</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Time and space complexity are measures of how an algorithm's resource usage scales with input size.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Common Time Complexities</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>O(1)</strong> - Constant time: Operation takes the same time regardless of input size</li>
                    <li><strong>O(log n)</strong> - Logarithmic time: Common in divide-and-conquer algorithms</li>
                    <li><strong>O(n)</strong> - Linear time: Processing each element once</li>
                    <li><strong>O(n log n)</strong> - Common in efficient sorting algorithms like merge sort</li>
                    <li><strong>O(n²)</strong> - Quadratic time: Common in nested loops</li>
                    <li><strong>O(2^n)</strong> - Exponential time: Common in naive recursive algorithms</li>
                  </ul>
                </div>
              </div>
              
              <div id="languages">
                <h2 className="text-2xl font-bold mb-4">Supported Languages</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Xenovate currently supports the following programming languages:
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">Python</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">JavaScript</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">TypeScript</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">Java</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">C++</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">C#</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">Ruby</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">Go</div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">PHP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
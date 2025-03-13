import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';

interface ResultsDisplayProps {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  optimizedCode?: string;
  improvements?: string[];
  convertedCode?: string;
  targetLanguage?: string;
  isLoading?: boolean;
}

export function ResultsDisplay({
  timeComplexity,
  spaceComplexity,
  explanation,
  optimizedCode,
  improvements,
  convertedCode,
  targetLanguage,
  isLoading = false,
}: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analyzing...</CardTitle>
          <CardDescription>Please wait while we process your algorithm</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="optimization" disabled={!optimizedCode}>
            Optimization
          </TabsTrigger>
          <TabsTrigger value="conversion" disabled={!convertedCode}>
            Conversion
          </TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Analysis</CardTitle>
              <CardDescription>Time and space complexity analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Time Complexity</h3>
                  <div className="rounded-md bg-muted p-3 font-mono text-lg">
                    {timeComplexity || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Space Complexity</h3>
                  <div className="rounded-md bg-muted p-3 font-mono text-lg">
                    {spaceComplexity || "N/A"}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Detailed Analysis</h3>
                <div className="rounded-md bg-muted p-4 text-sm">
                  <ReactMarkdown>{explanation || "No analysis available."}</ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Suggestions</CardTitle>
              <CardDescription>Improved algorithm implementation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {improvements && improvements.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Improvements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {improvements.map((improvement, index) => (
                      <li key={index} className="text-sm">
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Optimized Code</h3>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm font-mono">
                  {optimizedCode || "No optimized code available."}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle>Code Conversion</CardTitle>
              <CardDescription>
                {targetLanguage
                  ? `Converted to ${targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)}`
                  : "Language conversion"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Converted Code</h3>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm font-mono">
                  {convertedCode || "No converted code available."}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="explanation">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Explanation</CardTitle>
              <CardDescription>Simple explanation of how the algorithm works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 text-sm">
                <ReactMarkdown>{explanation || "No explanation available."}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
} 
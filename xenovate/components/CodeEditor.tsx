import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onTargetLanguageChange: (language: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  defaultCode?: string;
  defaultLanguage?: string;
  defaultTargetLanguage?: string;
}

const SAMPLE_CODE = {
  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
  java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap arr[j+1] and arr[j]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
  javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
  pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
};

export function CodeEditor({
  onCodeChange,
  onLanguageChange,
  onTargetLanguageChange,
  onSubmit,
  isLoading = false,
  defaultCode = "",
  defaultLanguage = "python",
  defaultTargetLanguage = "java",
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode || SAMPLE_CODE[defaultLanguage as keyof typeof SAMPLE_CODE]);
  const [language, setLanguage] = useState(defaultLanguage);
  const [targetLanguage, setTargetLanguage] = useState(defaultTargetLanguage);

  useEffect(() => {
    onCodeChange(code);
  }, [code, onCodeChange]);

  useEffect(() => {
    onLanguageChange(language);
  }, [language, onLanguageChange]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // If the code is empty or matches a sample, update it with the new language sample
    if (!code || Object.values(SAMPLE_CODE).includes(code)) {
      setCode(SAMPLE_CODE[value as keyof typeof SAMPLE_CODE] || "");
    }
  };

  const handleTargetLanguageChange = (value: string) => {
    setTargetLanguage(value);
    onTargetLanguageChange(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Algorithm</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Source Language</label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="pseudocode">Pseudocode</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Target Language</label>
            <Select value={targetLanguage} onValueChange={handleTargetLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="pseudocode">Pseudocode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
          className="font-mono min-h-[300px]"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} disabled={isLoading} className="w-full">
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </CardFooter>
    </Card>
  );
} 
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              See Xenovate in Action
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore real examples of code optimization and algorithm analysis
            </p>
          </div>
          
          <div className="mx-auto max-w-5xl mt-12">
            {/* Example 1 */}
            <div className="mb-12 border rounded-xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b">
                <h2 className="text-2xl font-bold">Fibonacci Sequence Optimization</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Transforming a recursive Fibonacci implementation (O(2^n)) to an optimized dynamic programming solution (O(n)).
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <h3 className="font-semibold mb-2">Original Code (Recursive)</h3>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Time Complexity: O(2^n)
// Space Complexity: O(n)`}</code>
                  </pre>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Optimized Code (Dynamic Programming)</h3>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`function fibonacci(n) {
  const memo = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}

// Time Complexity: O(n)
// Space Complexity: O(n)`}</code>
                  </pre>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-950 border-b">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Improvements</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Reduced time complexity from O(2^n) to O(n)</li>
                  <li>Eliminated redundant calculations of the same Fibonacci numbers</li>
                  <li>Prevented stack overflow for large values of n</li>
                </ul>
              </div>
            </div>
            
            {/* Example 2 */}
            <div className="mb-12 border rounded-xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b">
                <h2 className="text-2xl font-bold">Array Search Optimization</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Converting a linear search (O(n)) to a binary search (O(log n)) for better performance on sorted arrays.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <h3 className="font-semibold mb-2">Original Code (Linear Search)</h3>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

// Time Complexity: O(n)
// Space Complexity: O(1)`}</code>
                  </pre>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Optimized Code (Binary Search)</h3>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Time Complexity: O(log n)
// Space Complexity: O(1)`}</code>
                  </pre>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-950 border-b">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Improvements</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Reduced time complexity from O(n) to O(log n)</li>
                  <li>Significantly faster for large sorted datasets</li>
                  <li>Maintains the same space complexity O(1)</li>
                  <li>Note: Only works on sorted arrays</li>
                </ul>
              </div>
            </div>
            
            {/* Example 3 */}
            <div className="mb-12 border rounded-xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b">
                <h2 className="text-2xl font-bold">Python List Comprehension</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Converting a traditional loop to a more Pythonic and efficient list comprehension.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 border-b">
                <div className="p-4 border-r">
                  <h3 className="font-semibold mb-2">Original Code (For Loop)</h3>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`def get_squares(numbers):
    result = []
    for num in numbers:
        if num % 2 == 0:  # Only process even numbers
            result.append(num ** 2)
    return result

# Less readable and more verbose`}</code>
                  </pre>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Optimized Code (List Comprehension)</h3>
                  <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`def get_squares(numbers):
    return [num ** 2 for num in numbers if num % 2 == 0]

# More concise, more readable, and slightly faster
# due to optimized internal loop`}</code>
                  </pre>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-950 border-b">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Improvements</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>More concise and Pythonic code (reduced from 5 lines to 1)</li>
                  <li>Slightly better performance due to C-optimized internals</li>
                  <li>Improved readability for Python developers</li>
                  <li>Reduced memory usage by avoiding intermediate steps</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/signup">Try with Your Code</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 
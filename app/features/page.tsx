import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Xenovate
              </span>
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover all the powerful features that make our platform unique
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 mt-12">
            {/* Feature 1 */}
            <div className="flex flex-col space-y-4 border rounded-xl p-6 bg-white dark:bg-gray-950">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" x2="20" y1="19" y2="19"></line>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Algorithm Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our advanced algorithm analysis tool provides detailed insights into your code's performance. It identifies time and space complexity, pinpoints bottlenecks, and offers detailed metrics to help you understand how your code operates under different conditions.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col space-y-4 border rounded-xl p-6 bg-white dark:bg-gray-950">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500 bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Code Optimization</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Transform your code with our AI-powered optimization engine. Our system analyzes your algorithms and suggests improvements for efficiency, readability, and performance. Get specific recommendations tailored to your coding style and project requirements.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col space-y-4 border rounded-xl p-6 bg-white dark:bg-gray-950">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M9 21V9"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Multi-Language Support</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our platform supports a wide range of programming languages including Python, JavaScript, Java, C++, Ruby, and more. Analyze and optimize code regardless of your preferred language, making it perfect for diverse development teams.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="flex flex-col space-y-4 border rounded-xl p-6 bg-white dark:bg-gray-950">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Cross-Language Translation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Convert algorithms between different programming languages while maintaining functionality and efficiency. Perfect for migrating projects or learning how algorithms work in different languages.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="flex flex-col space-y-4 border rounded-xl p-6 bg-white dark:bg-gray-950">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-500 bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Algorithm Explanation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get clear, human-readable explanations of how your algorithms work. Our AI breaks down complex code into simple concepts, making it easier to understand, document, and share with team members or students.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="flex flex-col space-y-4 border rounded-xl p-6 bg-white dark:bg-gray-950">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500 bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
                  <path d="M12 5v14"></path>
                  <path d="M18 13l-6 6"></path>
                  <path d="M6 13l6 6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Real-time Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get instant feedback as you code. Our platform provides real-time analysis and suggestions to help you write more efficient code from the start, reducing the need for extensive refactoring later.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/signup">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 
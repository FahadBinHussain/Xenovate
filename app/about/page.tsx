"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* About Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Xenovate</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our mission is to make algorithm analysis and optimization accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Story</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Xenovate was founded in 2023 with a simple idea: to make algorithm optimization more accessible 
                  to developers of all skill levels. Our team of passionate engineers and AI experts came together 
                  to build a platform that analyzes, optimizes, and explains algorithms in an intuitive way.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Today, we're proud to serve developers worldwide, helping them create more efficient code 
                  and understand the underlying principles of algorithmic complexity and optimization.
                </p>
              </div>
              <div className="rounded-lg bg-gray-200 dark:bg-gray-800 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    2023
                  </span>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Year Founded</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
                Meet the passionate individuals behind Xenovate who are dedicated to making algorithm 
                optimization accessible to everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-40 w-40 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Alex Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Founder & CEO</p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-40 w-40 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl">👩‍💻</span>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Sarah Lee</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CTO & Lead Developer</p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-40 w-40 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl">🧙‍♂️</span>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Michael Chen</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI Research Lead</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="mailto:contact@xenovate.com">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 
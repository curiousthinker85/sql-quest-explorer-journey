
import React from 'react';
import { Button } from "@/components/ui/button";
import { Database, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Master SQL <span className="text-primary">Interactive Learning</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Learn SQL with hands-on practice, interactive tutorials, and real-time feedback.
                From basics to advanced queries - all in your browser.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1.5">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Lessons
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Database className="h-3 w-3" /> 50+ Interactive Lessons
              </div>
              <div className="flex items-center gap-1">
                <Database className="h-3 w-3" /> Real SQL Environment
              </div>
              <div className="flex items-center gap-1">
                <Database className="h-3 w-3" /> Progress Tracking
              </div>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-4 shadow-lg">
              <div className="flex items-center gap-2 border-b pb-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-xs font-medium">SQL Editor</div>
              </div>
              <pre className="mt-4 overflow-auto rounded-md bg-gray-800 p-4 text-xs text-gray-100 code-editor">
                <code>
                  <span className="keyword">SELECT</span> products.name, categories.name <span className="keyword">AS</span> category<br />
                  <span className="keyword">FROM</span> products<br />
                  <span className="keyword">JOIN</span> categories <span className="keyword">ON</span> products.category_id = categories.id<br />
                  <span className="keyword">WHERE</span> products.price &gt; <span className="number">50</span><br />
                  <span className="keyword">ORDER BY</span> products.price <span className="keyword">DESC</span>;<br />
                </code>
              </pre>
              <div className="mt-2 rounded-md bg-gray-100 p-2 text-xs">
                <div className="font-medium">Result:</div>
                <div className="mt-1 overflow-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="p-1">name</th>
                        <th className="p-1">category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1">Premium Headphones</td>
                        <td className="p-1">Electronics</td>
                      </tr>
                      <tr>
                        <td className="p-1">Leather Jacket</td>
                        <td className="p-1">Clothing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

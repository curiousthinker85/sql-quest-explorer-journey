
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import CodeEditor from '@/components/CodeEditor';
import DatabaseViewer from '@/components/DatabaseViewer';
import LessonCard from '@/components/LessonCard';
import { executeQuery } from '@/utils/sqlUtils';
import { featuredLessons, databaseTables } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Index = () => {
  const { toast } = useToast();
  const [queryResult, setQueryResult] = useState<{
    columns: string[];
    rows: any[][];
    error?: string;
  } | null>(null);

  const handleRunQuery = (query: string) => {
    const result = executeQuery(query);
    setQueryResult(result);

    if (result.error) {
      toast({
        title: "Query Error",
        description: result.error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Query Executed",
        description: `Retrieved ${result.rows.length} rows successfully.`,
        variant: "default"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <FeatureSection />
        
        {/* Popular Lessons Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">Popular SQL Lessons</h2>
              <p className="text-gray-500 max-w-[800px]">
                Start your SQL journey with these popular lessons for beginners and advanced users.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  duration={lesson.duration}
                  level={lesson.level}
                  tags={lesson.tags}
                  progress={lesson.progress}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg">View All Lessons</Button>
            </div>
          </div>
        </section>
        
        {/* Try It Now Section */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">Try SQL Right Now</h2>
              <p className="text-gray-500 max-w-[800px]">
                Write and run SQL queries in our interactive playground. No account required!
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Database Schema</h3>
                <DatabaseViewer tables={databaseTables} />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">SQL Editor</h3>
                  <CodeEditor 
                    initialCode="SELECT * FROM users;" 
                    onRunQuery={handleRunQuery}
                  />
                </div>
                
                {queryResult && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Query Results</h3>
                    </div>
                    {queryResult.error ? (
                      <div className="p-4 text-red-600">{queryResult.error}</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {queryResult.columns.map((column, i) => (
                                <TableHead key={i}>{column}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {queryResult.rows.map((row, i) => (
                              <TableRow key={i}>
                                {row.map((cell, j) => (
                                  <TableCell key={j}>{cell}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {queryResult.rows.length === 0 && (
                          <div className="p-4 text-center text-gray-500">No results found</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Master SQL?</h2>
              <p className="max-w-[800px] text-primary-foreground/90">
                Create a free account to track your progress, save your work, and unlock all lessons.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="secondary">Sign Up Free</Button>
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/20">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                © 2025 SQLQuest. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-500 hover:underline">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:underline">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

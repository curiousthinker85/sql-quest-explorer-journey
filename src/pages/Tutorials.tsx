
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CodeEditor from '@/components/CodeEditor';
import { executeQuery } from '@/utils/sqlUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, ChevronRight, ChevronLeft, Award } from 'lucide-react';

const Tutorials = () => {
  const { toast } = useToast();
  const [activeLesson, setActiveLesson] = useState(0);
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

  const basicLessons = [
    {
      title: "Introduction to SQL",
      description: "Learn what SQL is and why it's important",
      content: `SQL (Structured Query Language) is a programming language designed for managing data in relational database management systems. It's used for storing, manipulating, and retrieving data stored in databases.`,
      example: "SELECT 'Hello, World!' AS greeting;",
      exercise: "Run the query to see the result."
    },
    {
      title: "SELECT Statement Basics",
      description: "How to retrieve data from a database",
      content: `The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.`,
      example: "SELECT * FROM users;",
      exercise: "Retrieve all users from the database."
    },
    {
      title: "WHERE Clause",
      description: "Filtering data with conditions",
      content: `The WHERE clause is used to filter records. It extracts only those records that fulfill a specified condition.`,
      example: "SELECT * FROM users WHERE id > 1;",
      exercise: "Retrieve users with an ID greater than 1."
    }
  ];

  const intermediateLessons = [
    {
      title: "JOINs in SQL",
      description: "Combining rows from different tables",
      content: `JOIN clauses are used to combine rows from two or more tables based on a related column.`,
      example: "SELECT products.name, categories.name AS category FROM products JOIN categories ON products.category_id = categories.id;",
      exercise: "Retrieve all products with their category names."
    },
    {
      title: "Aggregate Functions",
      description: "Using functions like COUNT, SUM, AVG",
      content: `Aggregate functions perform a calculation on a set of values and return a single value.`,
      example: "SELECT COUNT(*) AS total_users FROM users;",
      exercise: "Count the total number of users in the database."
    },
    {
      title: "GROUP BY Statement",
      description: "Group rows that have the same values",
      content: `The GROUP BY statement groups rows that have the same values into summary rows.`,
      example: "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;",
      exercise: "Count the number of products in each category."
    }
  ];

  const advancedLessons = [
    {
      title: "Subqueries",
      description: "Nested queries for complex operations",
      content: `A subquery is a query within a query. Subqueries can be used with SELECT, INSERT, UPDATE, and DELETE statements.`,
      example: "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);",
      exercise: "Find products that are priced higher than the average price."
    },
    {
      title: "Window Functions",
      description: "Advanced analytical functions",
      content: `Window functions perform a calculation across a set of table rows that are related to the current row.`,
      example: "SELECT name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products;",
      exercise: "Rank products by their price in descending order."
    },
    {
      title: "Common Table Expressions (CTEs)",
      description: "Temporary result sets for complex queries",
      content: `A CTE is a temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.`,
      example: "WITH expensive_products AS (SELECT * FROM products WHERE price > 500) SELECT * FROM expensive_products;",
      exercise: "Use a CTE to find expensive products."
    }
  ];

  const lessonsByLevel = [
    basicLessons,
    intermediateLessons,
    advancedLessons
  ];

  const levelNames = ["Basic", "Intermediate", "Advanced"];
  const [activeLevel, setActiveLevel] = useState(0);
  const currentLessons = lessonsByLevel[activeLevel];
  const currentLesson = currentLessons[activeLesson];

  const handleNextLesson = () => {
    if (activeLesson < currentLessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      setQueryResult(null);
    } else if (activeLevel < lessonsByLevel.length - 1) {
      setActiveLevel(activeLevel + 1);
      setActiveLesson(0);
      setQueryResult(null);
    }
  };

  const handlePrevLesson = () => {
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1);
      setQueryResult(null);
    } else if (activeLevel > 0) {
      setActiveLevel(activeLevel - 1);
      setActiveLesson(lessonsByLevel[activeLevel - 1].length - 1);
      setQueryResult(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">SQL Tutorials</h1>
              <p className="text-gray-500">Master SQL from basics to advanced concepts</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1 text-base">
                {levelNames[activeLevel]} Level
              </Badge>
            </div>
          </div>
          
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <h3 className="font-medium text-lg mb-2">Lessons ({activeLevel + 1}/{lessonsByLevel.length})</h3>
                    <ul className="space-y-2">
                      {currentLessons.map((lesson, index) => (
                        <li key={index}>
                          <Button 
                            variant={activeLesson === index ? "default" : "ghost"} 
                            className="w-full justify-start text-left" 
                            onClick={() => {
                              setActiveLesson(index);
                              setQueryResult(null);
                            }}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            <div className="truncate">{lesson.title}</div>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevLesson}
                      disabled={activeLesson === 0 && activeLevel === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleNextLesson}
                      disabled={activeLesson === currentLessons.length - 1 && activeLevel === lessonsByLevel.length - 1}
                    >
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-3 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{currentLesson.title}</CardTitle>
                          <CardDescription>{currentLesson.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">{currentLesson.title === advancedLessons[advancedLessons.length - 1].title ? 
                          <Award className="h-4 w-4 mr-1" /> : null} Lesson {activeLesson + 1}/{currentLessons.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-gray-700">{currentLesson.content}</p>
                        <h3 className="text-lg font-medium mt-4">Example:</h3>
                        <div className="bg-gray-50 p-3 rounded border mt-2 font-mono text-sm">
                          {currentLesson.example}
                        </div>
                        <h3 className="text-lg font-medium mt-4">Your Task:</h3>
                        <p className="text-gray-700">{currentLesson.exercise}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <CodeEditor 
                    initialCode={currentLesson.example} 
                    onRunQuery={handleRunQuery}
                  />
                  
                  {queryResult && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Query Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {queryResult.error ? (
                          <div className="p-4 text-red-600 bg-red-50 rounded-md">{queryResult.error}</div>
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
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Exercises</CardTitle>
                  <CardDescription>
                    Apply what you've learned with hands-on exercises
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Practice exercises will be available once you complete the related lessons.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>
                    Helpful links and documentation to support your learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">SQL Cheat Sheet</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">Common SQL Interview Questions</a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline">Database Design Best Practices</a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Tutorials;

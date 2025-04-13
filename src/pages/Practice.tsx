
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CodeEditor from '@/components/CodeEditor';
import DatabaseViewer from '@/components/DatabaseViewer';
import { executeQuery } from '@/utils/sqlUtils';
import { databaseTables } from '@/data/lessons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Check, Code, HelpCircle, RotateCw } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  hint: string;
  initialCode: string;
  expectedResultDescription: string;
  solution: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
}

const Practice = () => {
  const { toast } = useToast();
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [queryResult, setQueryResult] = useState<{
    columns: string[];
    rows: any[][];
    error?: string;
  } | null>(null);
  const [userExercises, setUserExercises] = useState<Exercise[]>(exercises.map(ex => ({...ex, completed: false})));

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
      const currentExercise = userExercises[activeExerciseIndex];
      // This is a simple check - in a real app, you'd compare the actual results
      if (!result.error && result.rows.length > 0) {
        // Mark as completed if not already
        if (!currentExercise.completed) {
          const updatedExercises = [...userExercises];
          updatedExercises[activeExerciseIndex].completed = true;
          setUserExercises(updatedExercises);
          
          toast({
            title: "Exercise Completed!",
            description: "Great job! You've successfully completed this exercise.",
            variant: "default"
          });
        } else {
          toast({
            title: "Query Executed",
            description: `Retrieved ${result.rows.length} rows successfully.`,
            variant: "default"
          });
        }
      } else {
        toast({
          title: "Query Executed",
          description: "Your query ran but didn't return the expected results. Try again!",
          variant: "default"
        });
      }
    }
  };

  const activeExercise = userExercises[activeExerciseIndex];
  const completedCount = userExercises.filter(ex => ex.completed).length;
  const progressPercentage = (completedCount / userExercises.length) * 100;

  const handleNext = () => {
    if (activeExerciseIndex < userExercises.length - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
      setQueryResult(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handlePrevious = () => {
    if (activeExerciseIndex > 0) {
      setActiveExerciseIndex(activeExerciseIndex - 1);
      setQueryResult(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const resetExercise = () => {
    setQueryResult(null);
    setShowHint(false);
    setShowSolution(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">SQL Practice</h1>
              <p className="text-gray-500">Strengthen your SQL skills with hands-on exercises</p>
            </div>
            <div>
              <Badge variant="outline" className={`px-3 py-1 ${
                activeExercise.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                activeExercise.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {activeExercise.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 font-medium">Progress: {completedCount}/{userExercises.length} completed</div>
            <Progress value={progressPercentage} className="flex-1" />
            <div className="text-sm text-gray-500 font-medium">{Math.round(progressPercentage)}%</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exercise {activeExerciseIndex + 1} of {userExercises.length}</CardTitle>
                  <CardDescription>{activeExercise.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{activeExercise.description}</p>
                  <p className="text-gray-700 mb-4">
                    <strong>Expected Result:</strong> {activeExercise.expectedResultDescription}
                  </p>
                  
                  {showHint && (
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
                      <div className="font-medium text-blue-800 mb-1">Hint:</div>
                      <p className="text-blue-700 text-sm">{activeExercise.hint}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => setShowHint(!showHint)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" /> 
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      <Code className="h-4 w-4 mr-2" /> 
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={resetExercise}
                    >
                      <RotateCw className="h-4 w-4 mr-2" /> 
                      Reset Exercise
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={activeExerciseIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleNext}
                    disabled={activeExerciseIndex === userExercises.length - 1}
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Database Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <DatabaseViewer tables={databaseTables} />
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>SQL Editor</CardTitle>
                    <CardDescription>Write and execute your SQL query</CardDescription>
                  </div>
                  {activeExercise.completed && (
                    <Badge className="bg-green-100 text-green-800 flex items-center">
                      <Check className="h-3 w-3 mr-1" /> Completed
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {showSolution ? (
                    <div className="mb-4">
                      <div className="font-medium text-gray-800 mb-1">Solution:</div>
                      <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
                        {activeExercise.solution}
                      </div>
                    </div>
                  ) : null}
                  
                  <CodeEditor 
                    initialCode={activeExercise.initialCode} 
                    onRunQuery={handleRunQuery}
                  />
                </CardContent>
              </Card>
              
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
        </div>
      </main>
    </div>
  );
};

// Sample exercises
const exercises: Exercise[] = [
  {
    id: "select-all",
    title: "Select All Records",
    description: "Write a query to select all records from the users table.",
    hint: "Use the SELECT * statement to retrieve all columns from a table.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "All users in the database with all their details.",
    solution: "SELECT * FROM users;",
    difficulty: "Easy"
  },
  {
    id: "filter-by-id",
    title: "Filter by ID",
    description: "Write a query to select users with an ID greater than 1.",
    hint: "Use the WHERE clause to filter records based on conditions.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Only users with ID greater than 1.",
    solution: "SELECT * FROM users WHERE id > 1;",
    difficulty: "Easy"
  },
  {
    id: "order-by-price",
    title: "Order Products by Price",
    description: "Write a query to select all products ordered by price in descending order.",
    hint: "Use ORDER BY to sort the results and DESC for descending order.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "All products ordered from highest price to lowest.",
    solution: "SELECT * FROM products ORDER BY price DESC;",
    difficulty: "Easy"
  },
  {
    id: "count-products",
    title: "Count Products by Category",
    description: "Write a query to count the number of products in each category.",
    hint: "Use COUNT() with GROUP BY to aggregate data by category.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Category IDs with a count of products in each.",
    solution: "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;",
    difficulty: "Medium"
  },
  {
    id: "join-tables",
    title: "Join Products and Categories",
    description: "Write a query to join the products and categories tables to show product names with their category names.",
    hint: "Use JOIN to connect tables based on a related column like category_id.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products with their corresponding category names.",
    solution: "SELECT products.name, categories.name AS category FROM products JOIN categories ON products.category_id = categories.id;",
    difficulty: "Medium"
  },
  {
    id: "above-average",
    title: "Products Above Average Price",
    description: "Write a query to find products with a price higher than the average product price.",
    hint: "Use a subquery with AVG() to calculate the average price.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products that are priced higher than the average.",
    solution: "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);",
    difficulty: "Hard"
  },
];

export default Practice;

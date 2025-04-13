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
import { Check, Code, HelpCircle, RotateCw, Filter, SortDesc, PlusCircle, Users, ScrollText } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  hint: string;
  initialCode: string;
  expectedResultDescription: string;
  solution: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Basic' | 'Filtering' | 'Joins' | 'Aggregation' | 'Subqueries' | 'Advanced';
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
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  const filteredExercises = exercises;
  const filteredUserExercises = userExercises.filter(ex => 
    (!categoryFilter || ex.category === categoryFilter) &&
    (!difficultyFilter || ex.difficulty === difficultyFilter)
  );

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
      if (!result.error && result.rows.length > 0) {
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
                  <div className="flex items-center justify-between">
                    <CardTitle>Exercises</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setCategoryFilter(null)}>
                        <Filter className="h-4 w-4 mr-1" /> All
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Choose your challenge</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[240px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {['Basic', 'Filtering', 'Joins', 'Aggregation', 'Subqueries', 'Advanced'].map((category) => (
                      <Button 
                        key={category}
                        variant={categoryFilter === category ? "default" : "outline"} 
                        size="sm"
                        className="text-xs"
                        onClick={() => setCategoryFilter(categoryFilter === category ? null : category as any)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                      <Button 
                        key={difficulty}
                        variant={difficultyFilter === difficulty ? "default" : "outline"} 
                        size="sm"
                        className={`text-xs ${
                          difficulty === 'Easy' ? 'border-green-200 text-green-800' : 
                          difficulty === 'Medium' ? 'border-yellow-200 text-yellow-800' : 
                          'border-red-200 text-red-800'
                        }`}
                        onClick={() => setDifficultyFilter(difficultyFilter === difficulty ? null : difficulty as any)}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {filteredUserExercises.map((exercise, index) => (
                      <li key={exercise.id}>
                        <Button 
                          variant={activeExerciseIndex === userExercises.indexOf(exercise) ? "default" : "ghost"} 
                          className="w-full justify-start text-left" 
                          onClick={() => {
                            setActiveExerciseIndex(userExercises.indexOf(exercise));
                            setQueryResult(null);
                            setShowHint(false);
                            setShowSolution(false);
                          }}
                        >
                          <div className="flex items-center w-full">
                            <div className="flex-1 truncate">{exercise.title}</div>
                            {exercise.completed && <Check className="h-4 w-4 text-green-500 ml-2" />}
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
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
                  <CardTitle>Current Exercise</CardTitle>
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

const exercises: Exercise[] = [
  {
    id: "select-all",
    title: "Select All Records",
    description: "Write a query to select all records from the users table.",
    hint: "Use the SELECT * statement to retrieve all columns from a table.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "All users in the database with all their details.",
    solution: "SELECT * FROM users;",
    difficulty: "Easy",
    category: "Basic"
  },
  {
    id: "filter-by-id",
    title: "Filter by ID",
    description: "Write a query to select users with an ID greater than 1.",
    hint: "Use the WHERE clause to filter records based on conditions.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Only users with ID greater than 1.",
    solution: "SELECT * FROM users WHERE id > 1;",
    difficulty: "Easy",
    category: "Filtering"
  },
  {
    id: "order-by-price",
    title: "Order Products by Price",
    description: "Write a query to select all products ordered by price in descending order.",
    hint: "Use ORDER BY to sort the results and DESC for descending order.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "All products ordered from highest price to lowest.",
    solution: "SELECT * FROM products ORDER BY price DESC;",
    difficulty: "Easy",
    category: "Basic"
  },
  {
    id: "count-products",
    title: "Count Products by Category",
    description: "Write a query to count the number of products in each category.",
    hint: "Use COUNT() with GROUP BY to aggregate data by category.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Category IDs with a count of products in each.",
    solution: "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;",
    difficulty: "Medium",
    category: "Aggregation"
  },
  {
    id: "join-tables",
    title: "Join Products and Categories",
    description: "Write a query to join the products and categories tables to show product names with their category names.",
    hint: "Use JOIN to connect tables based on a related column like category_id.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products with their corresponding category names.",
    solution: "SELECT products.name, categories.name AS category FROM products JOIN categories ON products.category_id = categories.id;",
    difficulty: "Medium",
    category: "Joins"
  },
  {
    id: "above-average",
    title: "Products Above Average Price",
    description: "Write a query to find products with a price higher than the average product price.",
    hint: "Use a subquery with AVG() to calculate the average price.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products that are priced higher than the average.",
    solution: "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);",
    difficulty: "Hard",
    category: "Subqueries"
  },
  {
    id: "find-most-expensive",
    title: "Find Most Expensive Product",
    description: "Write a query to find the most expensive product in each category.",
    hint: "Use subqueries or window functions to determine the maximum price in each category.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "The most expensive product in each category.",
    solution: "WITH RankedProducts AS (\n  SELECT *, RANK() OVER (PARTITION BY category_id ORDER BY price DESC) as price_rank\n  FROM products\n)\nSELECT * FROM RankedProducts WHERE price_rank = 1;",
    difficulty: "Hard",
    category: "Advanced"
  },
  {
    id: "recent-orders",
    title: "Recent Orders",
    description: "Write a query to find all orders placed in the last 30 days, sorted by most recent first.",
    hint: "Use date functions to filter based on the current date minus 30 days.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Orders from the last 30 days, newest first.",
    solution: "SELECT * FROM orders WHERE created_at >= DATE('now', '-30 days') ORDER BY created_at DESC;",
    difficulty: "Medium",
    category: "Filtering"
  },
  {
    id: "user-order-count",
    title: "User Order Counts",
    description: "Write a query to count how many orders each user has placed, including users with zero orders.",
    hint: "Use LEFT JOIN with GROUP BY to include all users, even those without orders.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Each user with their order count, including those with zero.",
    solution: "SELECT users.id, users.username, COUNT(orders.id) AS order_count\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id\nGROUP BY users.id, users.username;",
    difficulty: "Medium",
    category: "Joins"
  },
  {
    id: "category-avg-price",
    title: "Category Average Prices",
    description: "Calculate the average price of products in each category and compare each product's price to its category average.",
    hint: "Use window functions with AVG() to calculate category averages without grouping the results.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products with their prices and category average prices.",
    solution: "SELECT p.id, p.name, p.price, p.category_id,\n  AVG(p.price) OVER (PARTITION BY p.category_id) AS category_avg_price,\n  p.price - AVG(p.price) OVER (PARTITION BY p.category_id) AS price_diff_from_avg\nFROM products p;",
    difficulty: "Hard",
    category: "Advanced"
  },
  {
    id: "find-duplicates",
    title: "Find Duplicate Emails",
    description: "Write a query to find any duplicate email addresses in the users table.",
    hint: "Use GROUP BY with HAVING to filter results based on counts.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Email addresses that appear more than once in the users table.",
    solution: "SELECT email, COUNT(*) as count\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;",
    difficulty: "Medium",
    category: "Aggregation"
  },
  {
    id: "self-join",
    title: "Self Join Challenge",
    description: "Assuming the users table has a 'referred_by' column with the ID of the user who referred them, find all users who were referred by someone else.",
    hint: "Use a self-join to connect users with their referrers.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Users with their referrer's username.",
    solution: "SELECT u1.id, u1.username, u2.username AS referred_by\nFROM users u1\nJOIN users u2 ON u1.referred_by = u2.id;",
    difficulty: "Hard",
    category: "Joins"
  },
  {
    id: "complex-filtering",
    title: "Complex Filtering",
    description: "Find all products that are either in category 1 with a price over $50, or in category 2 with a price under $50.",
    hint: "Use multiple conditions with AND/OR operators in the WHERE clause.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products matching the complex filter criteria.",
    solution: "SELECT * FROM products\nWHERE (category_id = 1 AND price > 50) OR (category_id = 2 AND price < 50);",
    difficulty: "Medium",
    category: "Filtering"
  },
  {
    id: "recursive-cte",
    title: "Recursive CTE",
    description: "Given a 'categories' table with 'id' and 'parent_id' columns, write a query to retrieve all parent categories for category with id=5.",
    hint: "Use a recursive Common Table Expression (CTE) to traverse the hierarchy.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "All parent categories in the hierarchy above category 5.",
    solution: "WITH RECURSIVE CategoryHierarchy AS (\n  SELECT id, name, parent_id FROM categories WHERE id = 5\n  UNION ALL\n  SELECT c.id, c.name, c.parent_id FROM categories c\n  JOIN CategoryHierarchy ch ON c.id = ch.parent_id\n)\nSELECT * FROM CategoryHierarchy;",
    difficulty: "Hard",
    category: "Advanced"
  },
  {
    id: "case-when",
    title: "CASE WHEN Expression",
    description: "Write a query to categorize products by price range: 'Budget' if under $25, 'Mid-range' if $25-$75, and 'Premium' if over $75.",
    hint: "Use CASE WHEN statements to create conditional logic in your query.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Products with their price category label.",
    solution: "SELECT id, name, price,\n  CASE\n    WHEN price < 25 THEN 'Budget'\n    WHEN price BETWEEN 25 AND 75 THEN 'Mid-range'\n    ELSE 'Premium'\n  END AS price_category\nFROM products;",
    difficulty: "Medium",
    category: "Basic"
  },
  {
    id: "multiple-joins",
    title: "Multiple Table Joins",
    description: "Write a query to find all orders, with the user who placed them and the products they ordered.",
    hint: "You'll need to join multiple tables including a junction table for the many-to-many relationship.",
    initialCode: "-- Write your query here\n",
    expectedResultDescription: "Orders with user and product details.",
    solution: "SELECT o.id AS order_id, u.username, p.name AS product_name, op.quantity\nFROM orders o\nJOIN users u ON o.user_id = u.id\nJOIN order_products op ON o.id = op.order_id\nJOIN products p ON op.product_id = p.id;",
    difficulty: "Hard",
    category: "Joins"
  }
];

export default Practice;

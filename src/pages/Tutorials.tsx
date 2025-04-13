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
import { BookOpen, ChevronRight, ChevronLeft, Award, Download, ExternalLink, Bookmark, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const sqlCheatSheet = [
    {
      category: "Basic Queries",
      commands: [
        { name: "SELECT", syntax: "SELECT column1, column2 FROM table_name;", description: "Retrieve data from a table" },
        { name: "SELECT DISTINCT", syntax: "SELECT DISTINCT column FROM table_name;", description: "Return only unique values" },
        { name: "WHERE", syntax: "SELECT * FROM table_name WHERE condition;", description: "Filter records" },
        { name: "ORDER BY", syntax: "SELECT * FROM table_name ORDER BY column ASC|DESC;", description: "Sort the result" },
        { name: "LIMIT", syntax: "SELECT * FROM table_name LIMIT number;", description: "Limit the number of records returned" }
      ]
    },
    {
      category: "Filtering & Conditions",
      commands: [
        { name: "AND / OR", syntax: "SELECT * FROM table_name WHERE condition1 AND|OR condition2;", description: "Combine conditions" },
        { name: "IN", syntax: "SELECT * FROM table_name WHERE column IN (value1, value2);", description: "Match any value in a list" },
        { name: "BETWEEN", syntax: "SELECT * FROM table_name WHERE column BETWEEN value1 AND value2;", description: "Match values in a range" },
        { name: "LIKE", syntax: "SELECT * FROM table_name WHERE column LIKE pattern;", description: "Match a pattern ('%' for any characters, '_' for one character)" },
        { name: "NULL", syntax: "SELECT * FROM table_name WHERE column IS NULL;", description: "Match NULL values" }
      ]
    },
    {
      category: "Joins",
      commands: [
        { name: "INNER JOIN", syntax: "SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id;", description: "Return records with matching values in both tables" },
        { name: "LEFT JOIN", syntax: "SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id;", description: "Return all records from the left table, and matches from the right" },
        { name: "RIGHT JOIN", syntax: "SELECT * FROM table1 RIGHT JOIN table2 ON table1.id = table2.id;", description: "Return all records from the right table, and matches from the left" },
        { name: "FULL JOIN", syntax: "SELECT * FROM table1 FULL JOIN table2 ON table1.id = table2.id;", description: "Return records when there is a match in either table" }
      ]
    },
    {
      category: "Aggregate Functions",
      commands: [
        { name: "COUNT", syntax: "SELECT COUNT(column) FROM table_name;", description: "Count the number of rows" },
        { name: "SUM", syntax: "SELECT SUM(column) FROM table_name;", description: "Sum values in a column" },
        { name: "AVG", syntax: "SELECT AVG(column) FROM table_name;", description: "Calculate the average of a column" },
        { name: "MIN / MAX", syntax: "SELECT MIN(column), MAX(column) FROM table_name;", description: "Find the smallest/largest value" },
        { name: "GROUP BY", syntax: "SELECT column, COUNT(*) FROM table_name GROUP BY column;", description: "Group rows with the same values" },
        { name: "HAVING", syntax: "SELECT column, COUNT(*) FROM table_name GROUP BY column HAVING COUNT(*) > 5;", description: "Filter groups" }
      ]
    },
    {
      category: "Advanced Features",
      commands: [
        { name: "Subqueries", syntax: "SELECT * FROM table1 WHERE column > (SELECT AVG(column) FROM table1);", description: "Query nested inside another query" },
        { name: "CTEs", syntax: "WITH cte_name AS (SELECT * FROM table) SELECT * FROM cte_name;", description: "Common Table Expressions (temporary named result set)" },
        { name: "CASE", syntax: "SELECT CASE WHEN condition THEN result ELSE result END FROM table;", description: "Add conditional logic" },
        { name: "Window Functions", syntax: "SELECT column, AVG(column) OVER (PARTITION BY other_column) FROM table;", description: "Perform calculations across a set of rows" },
        { name: "UNION / INTERSECT", syntax: "SELECT column FROM table1 UNION SELECT column FROM table2;", description: "Combine results from multiple queries" }
      ]
    }
  ];

  const additionalResources = [
    { name: "Official SQL Documentation", url: "https://www.sqlite.org/docs.html" },
    { name: "W3Schools SQL Tutorial", url: "https://www.w3schools.com/sql/" },
    { name: "SQL Fiddle (Practice Online)", url: "http://sqlfiddle.com/" },
    { name: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" },
    { name: "MySQL Documentation", url: "https://dev.mysql.com/doc/" },
    { name: "SQL Interview Questions", url: "https://www.interviewbit.com/sql-interview-questions/" }
  ];

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
                  <div className="mb-4">
                    <p className="mb-6">Ready to test your SQL skills? Our practice section includes exercises ranging from basic to advanced difficulty.</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center"><Check className="text-green-500 h-4 w-4 mr-2" /> 15+ practice exercises</li>
                      <li className="flex items-center"><Check className="text-green-500 h-4 w-4 mr-2" /> Solutions and hints provided</li>
                      <li className="flex items-center"><Check className="text-green-500 h-4 w-4 mr-2" /> Track your progress</li>
                      <li className="flex items-center"><Check className="text-green-500 h-4 w-4 mr-2" /> Earn badges as you improve</li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Button as={Link} to="/practice" className="flex items-center">
                      Go to Practice Exercises <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bookmark className="mr-2 h-5 w-5" /> SQL Cheat Sheet
                  </CardTitle>
                  <CardDescription>
                    Quick reference for common SQL commands and syntax
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-6">
                    {sqlCheatSheet.map((section, idx) => (
                      <div key={idx} className="px-6">
                        <h3 className="text-lg font-medium mb-2">{section.category}</h3>
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Command</TableHead>
                                <TableHead>Syntax</TableHead>
                                <TableHead>Description</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {section.commands.map((command, i) => (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">{command.name}</TableCell>
                                  <TableCell className="font-mono text-xs">{command.syntax}</TableCell>
                                  <TableCell>{command.description}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Download Full Cheat Sheet
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>
                    Helpful links and documentation to support your learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {additionalResources.map((resource, i) => (
                      <li key={i}>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" /> {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">SQL Cookbook</h3>
                      <p className="text-sm text-gray-600 mb-2">By Anthony Molinaro</p>
                      <p className="text-sm">Solutions to common SQL problems for data analysis.</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Learning SQL</h3>
                      <p className="text-sm text-gray-600 mb-2">By Alan Beaulieu</p>
                      <p className="text-sm">Comprehensive guide to SQL fundamentals.</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">SQL Performance Explained</h3>
                      <p className="text-sm text-gray-600 mb-2">By Markus Winand</p>
                      <p className="text-sm">Understanding indexing for performance optimization.</p>
                    </div>
                  </div>
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


export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  progress?: number;
}

export const featuredLessons: Lesson[] = [
  {
    id: "intro-sql",
    title: "Introduction to SQL",
    description: "Learn the basics of SQL and how to interact with relational databases.",
    duration: "30 min",
    level: "Beginner",
    tags: ["Basics", "SELECT", "Queries"],
    progress: 75
  },
  {
    id: "filtering-data",
    title: "Filtering Data with WHERE",
    description: "Master the WHERE clause to filter your query results based on conditions.",
    duration: "25 min",
    level: "Beginner",
    tags: ["WHERE", "Conditions", "Filtering"]
  },
  {
    id: "joins-basics",
    title: "SQL Joins Fundamentals",
    description: "Learn how to combine data from multiple tables using different types of JOINs.",
    duration: "45 min",
    level: "Intermediate",
    tags: ["JOIN", "INNER JOIN", "Tables"]
  },
  {
    id: "aggregations",
    title: "Aggregate Functions",
    description: "Use COUNT, SUM, AVG, and other functions to perform calculations on your data.",
    duration: "35 min",
    level: "Intermediate",
    tags: ["Functions", "GROUP BY", "Calculations"]
  },
  {
    id: "subqueries",
    title: "Subqueries and Nested Queries",
    description: "Write complex queries with subqueries to solve advanced data problems.",
    duration: "50 min",
    level: "Advanced",
    tags: ["Subqueries", "Complex", "Optimization"]
  },
  {
    id: "window-functions",
    title: "Window Functions",
    description: "Master advanced SQL with window functions for analytics and ranking.",
    duration: "60 min",
    level: "Advanced",
    tags: ["Analytics", "OVER", "PARTITION BY"]
  }
];

export const databaseTables = [
  {
    name: "users",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "username", type: "VARCHAR(50)" },
      { name: "email", type: "VARCHAR(100)" },
      { name: "created_at", type: "TIMESTAMP" },
    ]
  },
  {
    name: "products",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "price", type: "DECIMAL(10,2)" },
      { name: "category_id", type: "INTEGER", isForeign: true, references: "categories(id)" }
    ]
  },
  {
    name: "categories",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "name", type: "VARCHAR(50)" },
      { name: "description", type: "TEXT" }
    ]
  },
  {
    name: "orders",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "user_id", type: "INTEGER", isForeign: true, references: "users(id)" },
      { name: "status", type: "VARCHAR(20)" },
      { name: "total", type: "DECIMAL(10,2)" },
      { name: "created_at", type: "TIMESTAMP" }
    ]
  }
];

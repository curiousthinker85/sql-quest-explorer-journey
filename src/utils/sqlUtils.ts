
interface QueryResult {
  columns: string[];
  rows: any[][];
  error?: string;
}

// Mock database for simple SQL query simulation
const mockDatabase = {
  users: [
    { id: 1, username: "john_doe", email: "john@example.com", created_at: "2023-01-15" },
    { id: 2, username: "jane_smith", email: "jane@example.com", created_at: "2023-02-20" },
    { id: 3, username: "bob_johnson", email: "bob@example.com", created_at: "2023-03-10" }
  ],
  products: [
    { id: 1, name: "Laptop", price: 999.99, category_id: 1 },
    { id: 2, name: "Smartphone", price: 699.99, category_id: 1 },
    { id: 3, name: "T-shirt", price: 19.99, category_id: 2 },
    { id: 4, name: "Coffee Maker", price: 89.99, category_id: 3 }
  ],
  categories: [
    { id: 1, name: "Electronics", description: "Electronic devices and gadgets" },
    { id: 2, name: "Clothing", description: "Apparel and accessories" },
    { id: 3, name: "Home", description: "Home appliances and decor" }
  ],
  orders: [
    { id: 1, user_id: 1, status: "completed", total: 1019.98, created_at: "2023-04-05" },
    { id: 2, user_id: 2, status: "pending", total: 699.99, created_at: "2023-04-10" },
    { id: 3, user_id: 1, status: "completed", total: 89.99, created_at: "2023-04-15" }
  ]
};

// Very simple SQL parser for basic SELECT queries
// This is a simplified implementation for demo purposes
export function executeQuery(sqlQuery: string): QueryResult {
  // Trim and normalize SQL query
  const sql = sqlQuery.trim().toLowerCase().replace(/\s+/g, ' ');
  
  try {
    // Basic validation
    if (!sql.startsWith('select')) {
      return { 
        columns: [], 
        rows: [],
        error: "Only SELECT queries are supported in this demo."
      };
    }
    
    // Very basic SELECT parsing for mock demo
    // In a real implementation, you would need a proper SQL parser
    if (sql.includes('from users')) {
      return {
        columns: ["id", "username", "email", "created_at"],
        rows: mockDatabase.users.map(user => [user.id, user.username, user.email, user.created_at])
      };
    } else if (sql.includes('from products')) {
      return {
        columns: ["id", "name", "price", "category_id"],
        rows: mockDatabase.products.map(product => [product.id, product.name, product.price, product.category_id])
      };
    } else if (sql.includes('from categories')) {
      return {
        columns: ["id", "name", "description"],
        rows: mockDatabase.categories.map(category => [category.id, category.name, category.description])
      };
    } else if (sql.includes('join') && sql.includes('products') && sql.includes('categories')) {
      // Simulate a basic JOIN query
      return {
        columns: ["product_name", "category_name", "price"],
        rows: mockDatabase.products.map(product => {
          const category = mockDatabase.categories.find(c => c.id === product.category_id);
          return [product.name, category?.name || "Unknown", product.price];
        })
      };
    }
    
    return {
      columns: [],
      rows: [],
      error: "Query not supported in this demo. Try 'SELECT * FROM users' or 'SELECT * FROM products'"
    };
  } catch (err) {
    return {
      columns: [],
      rows: [],
      error: "Error executing query: " + (err instanceof Error ? err.message : String(err))
    };
  }
}

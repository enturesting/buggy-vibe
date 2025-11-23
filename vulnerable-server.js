import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load databases
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
const pwDb = JSON.parse(fs.readFileSync(path.join(__dirname, 'pw_db.json'), 'utf-8'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Regular json-server endpoints
app.get('/products', (req, res) => {
  res.json(db.products);
});

app.post('/contacts', (req, res) => {
  const newContact = { ...req.body, id: Date.now().toString() };
  db.contacts.push(newContact);
  res.status(201).json(newContact);
});

// VULNERABLE ENDPOINT: SQL Injection simulation
// This endpoint intentionally concatenates user input without sanitization
app.get('/api/users/search', (req, res) => {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Username parameter required' });
  }

  // VULNERABILITY: Direct string concatenation simulating SQL injection
  // In a real SQL scenario, this would be: SELECT * FROM users WHERE username = '${username}'
  // Attackers can inject: ' OR '1'='1' -- to get all users
  // Or use: ' UNION SELECT * FROM users -- to dump the entire table
  
  console.log(`[VULNERABLE] Searching for username: ${username}`);
  
  // Simulate SQL injection behavior
  if (username.includes("' OR") || username.includes("' or") || username.includes('" OR') || username.includes('" or')) {
    // SQL injection detected - return all users (simulating OR 1=1)
    console.log('[SECURITY BREACH] SQL injection detected - returning all users');
    return res.json({
      message: 'Query executed successfully',
      query: `SELECT * FROM users WHERE username = '${username}'`,
      results: pwDb.users
    });
  }
  
  if (username.includes('UNION') || username.includes('union')) {
    // UNION attack - return entire database structure
    console.log('[SECURITY BREACH] UNION injection detected - returning entire database');
    return res.json({
      message: 'Query executed successfully',
      query: `SELECT * FROM users WHERE username = '${username}'`,
      results: pwDb
    });
  }
  
  // Normal search (still vulnerable to other injections)
  const results = pwDb.users.filter(user => user.username === username.replace(/'/g, ''));
  
  res.json({
    message: 'Query executed successfully',
    query: `SELECT * FROM users WHERE username = '${username}'`,
    results: results
  });
});

// VULNERABLE ENDPOINT: Login with SQL injection vulnerability
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  console.log(`[VULNERABLE] Login attempt for username: ${username}`);
  
  // VULNERABILITY: Simulating SQL injection in login
  // Real SQL: SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
  
  if (username.includes("' OR") || username.includes("' or") || username.includes('" OR') || username.includes('" or')) {
    // SQL injection in username - bypass authentication
    console.log('[SECURITY BREACH] SQL injection in login - authentication bypassed');
    const adminUser = pwDb.users.find(u => u.role === 'administrator');
    return res.json({
      message: 'Login successful',
      query: `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
      user: adminUser,
      token: 'fake-jwt-token-' + Date.now()
    });
  }
  
  // Normal authentication (still vulnerable)
  const user = pwDb.users.find(u => 
    u.username === username && u.password === password
  );
  
  if (user) {
    res.json({
      message: 'Login successful',
      query: `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
      user: user,
      token: 'fake-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({
      error: 'Invalid credentials',
      query: `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    });
  }
});

// VULNERABLE ENDPOINT: Get user by ID with no input validation
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  // VULNERABILITY: No input validation on ID parameter
  // Could be exploited with path traversal or injection
  console.log(`[VULNERABLE] Getting user with ID: ${id}`);
  
  // If ID contains special characters, return all data
  if (id.includes('*') || id.includes('..')) {
    console.log('[SECURITY BREACH] Special characters in ID - returning all users');
    return res.json({
      message: 'User data retrieved',
      results: pwDb.users
    });
  }
  
  const user = pwDb.users.find(u => u.id == id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Endpoint to show the "database schema" (intentionally exposed)
app.get('/api/debug/schema', (req, res) => {
  console.log('[SECURITY BREACH] Database schema exposed via debug endpoint');
  res.json({
    warning: 'Debug endpoint should not be exposed in production!',
    tables: {
      users: {
        columns: ['id', 'username', 'password', 'email', 'role', 'created'],
        row_count: pwDb.users.length
      },
      api_keys: {
        columns: ['id', 'key', 'owner', 'permissions', 'created'],
        row_count: pwDb.api_keys.length
      },
      sessions: {
        columns: ['id', 'user_id', 'token', 'expires'],
        row_count: pwDb.sessions.length
      }
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Vulnerable JSON Server is running on http://localhost:${PORT}`);
  console.log('\nVulnerable endpoints:');
  console.log('  GET  /api/users/search?username=xxx  - SQL injection vulnerable search');
  console.log('  POST /api/login                      - SQL injection vulnerable login');
  console.log('  GET  /api/users/:id                  - No input validation');
  console.log('  GET  /api/debug/schema               - Exposed debug endpoint');
  console.log('\nExample SQL injection attacks:');
  console.log("  /api/users/search?username=' OR '1'='1' --");
  console.log("  /api/users/search?username=' UNION SELECT * FROM users --");
  console.log('\nRegular json-server endpoints still available for /products and /contacts');
});

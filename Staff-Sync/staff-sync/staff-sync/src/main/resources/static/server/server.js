const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 8080; // Changed to port 8080
const JWT_SECRET = 'your-secret-key'; // Replace with a secure key in production

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Replace with your MySQL user
  password: 'rakshita@123', // Replace with your MySQL password
  database: 'staffsync'
};

// Create MySQL connection pool
let db;
async function initializeDatabase() {
  try {
    db = await mysql.createPool(dbConfig);
    console.log('Connected to MySQL database.');

    // Seed sample user if not exists
    const [users] = await db.query('SELECT COUNT(*) AS count FROM users');
    if (users[0].count === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await db.query('INSERT IGNORE INTO users (email, password) VALUES (?, ?)', ['manager@example.com', hashedPassword]);
    }
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
}

// Middleware to verify JWT
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protect static files (e.g., Employees.html)
app.use('/Employees.html', async (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.query.token;
  const token = authHeader && authHeader.split(' ')[1] || authHeader;
  if (!token) {
    return res.redirect('/login.html');
  }
  try {
    await jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.redirect('/login.html');
  }
});

// API Routes
// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all departments
app.get('/api/departments', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT name FROM departments');
    res.json(rows.map(row => row.name));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// Get all employees
app.get('/api/employees', authenticateToken, async (req, res) => {
  const department = req.query.department;
  let query = `
    SELECT e.id, e.name, e.email, d.name AS department
    FROM employees e
    JOIN departments d ON e.department_id = d.id
  `;
  const params = [];
  if (department) {
    query += ' WHERE d.name = ?';
    params.push(department);
  }
  try {
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Add a new employee
app.post('/api/employees', authenticateToken, async (req, res) => {
  const { name, email, department } = req.body;
  if (!name || !email || !department) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const [deptRows] = await db.query('SELECT id FROM departments WHERE name = ?', [department]);
    const department_id = deptRows[0]?.id;
    if (!department_id) {
      return res.status(400).json({ error: 'Invalid department' });
    }
    const [result] = await db.query(
      'INSERT INTO employees (name, email, department_id) VALUES (?, ?, ?)',
      [name, email, department_id]
    );
    res.json({ id: result.insertId, name, email, department });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
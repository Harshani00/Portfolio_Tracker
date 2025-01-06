const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API Routes
// User Signup Endpoint
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);

  // Insert into the database
  const sql = 'INSERT INTO users (Name, Email, Password, created_at) VALUES (?, ?, ?, NOW())';
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Received email:', email); // Log email from the frontend
    console.log('Received password:', password); // Log password from the frontend
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required' });
    }
  
    // Check if the email exists in the database
    const sql = 'SELECT * FROM users WHERE Email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);  // Log any database errors
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (results.length === 0) {
        console.log('No user found with this email');  // Log if no user is found
        return res.status(404).json({ message: '' });
      }
  
      const user = results[0];
  
      // Compare the password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, user.Password);
  
      if (!isPasswordMatch) {
        console.log('Password mismatch');  // Log if password doesn't match
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Send success response with user data
      res.status(200).json({
        status: true,
        user_name: user.Name,
        user_role: 'User', // Add logic for roles if applicable
        user_id: user.User_Id,
        message: 'Login successful',
      });
    });
  });

  // Add New Stock Endpoint

app.post('/newStockdetails', async (req, res) => {
  const { U_Id, stock_name, ticker, quantity, buy_price, purchase_date } = req.body;

  // Validate required fields
  if (!U_Id || !stock_name || !ticker || !quantity || !buy_price || !purchase_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL query to insert stock details
  const sql = `
    INSERT INTO stock (U_Id, stock_name, ticker, quantity, buy_price, purchase_date, created_date)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  // Execute query
  db.query(
    sql,
    [U_Id, stock_name, ticker, quantity, buy_price, purchase_date],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }

      // Return success response
      res.status(201).json({
        message: 'Stock details added successfully',
        stock_id: result.insertId, // Return the ID of the newly created stock entry
      });
    }
  );
});

  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

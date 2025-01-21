const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config(); // Load environment variables


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

// Add New Stock Endpoint
app.post('/newStockdetails', (req, res) => {
  console.log('Request body:', req.body); // Debug log
  const { U_Id, stock_name, ticker, quantity, buy_price, purchase_date, Portfolio_Id } = req.body;

  if (!U_Id || !stock_name || !ticker || !quantity || !buy_price || !purchase_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO stock (U_Id, stock_name, ticker, quantity, buy_price, purchase_date, created_date)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [U_Id, stock_name, ticker, quantity, buy_price, purchase_date], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    const stockId = result.insertId; // Get the inserted stock ID

    // Insert into portfolio_stocks table
    const portfolioSql = `
      INSERT INTO portfolio_stocks (Portfolio_Id, Stock_Id, Quantity)
      VALUES (?, ?, ?)
    `;
    db.query(portfolioSql, [Portfolio_Id, stockId, quantity], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Failed to add to portfolio_stocks', error: err });
      }

      // Respond back after successfully adding both stock and portfolio association
      res.status(201).json({ message: 'Stock added successfully and associated with portfolio', stockId });
    });
  });
});



// Add New Portfolio
app.post('/createPortfolio', (req, res) => {
  console.log('Request body:', req.body); // Debug log
  const { U_Id, portfolio_name } = req.body;

  if (!U_Id || !portfolio_name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO portfolios (U_Id, portfolio_name, created_date )
    VALUES ( ? ,?,NOW())
  `;

  db.query(sql, [U_Id, portfolio_name], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'New Portfolio Created Successfully ', Portfolio_Id: result.insertId });
  });
});

app.get('/getPortfolios', (req, res) => {
  const userId = req.query.U_Id; // Retrieve U_Id from query parameters

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const sql = 'SELECT Portfolio_Id, portfolio_name FROM portfolios WHERE U_Id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(result);
  });
});

// app.get('/currentStock/:userId', (req, res) => {
//   const userId = req.params.userId;

//   // Log the received userId to ensure it's correct
//   console.log("UserId received from frontend:", userId);

//   // SQL query to fetch stocks based on userId
//   const query = 'SELECT * FROM stock WHERE U_Id = ?';

//   db.query(query, [userId], (error, results) => {
//     if (error) {
//       console.error('Error fetching stocks:', error);
//       return res.status(500).json({ message: 'Failed to fetch stock data' });
//     }

//     // Send the results back as JSON
//     res.json(results);
//   });
// });
app.get('/currentStock/:userId', (req, res) => {
  const userId = req.params.userId;

  console.log("UserId received from frontend:", userId);

  // SQL query to fetch portfolios and their stocks for the user
  const query = `
    SELECT 
      portfolios.Portfolio_Id,
      portfolios.portfolio_name,
      portfolios.created_date AS portfolio_created_date,
      stock.stock_name,
      stock.ticker,
      stock.buy_price,
      stock.purchase_date,
      stock.quantity,
      portfolio_stocks.Quantity AS portfolio_quantity
    FROM portfolios
    LEFT JOIN portfolio_stocks ON portfolios.Portfolio_Id = portfolio_stocks.Portfolio_Id
    LEFT JOIN stock ON portfolio_stocks.Stock_Id = stock.Stock_Id
    WHERE portfolios.U_Id = ?
    ORDER BY portfolios.Portfolio_Id, stock.stock_name;
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching portfolio stocks:', error);
      return res.status(500).json({ message: 'Failed to fetch portfolio stocks data' });
    }

    // Send the results back as JSON
    res.json(results);
  });
});

// Route for Delete stock data
app.delete('/currentStock/:userId/:stockName', (req, res) => {
  const { userId, stockName } = req.params;

  // Delete the related record from portfolio_stocks
  const deletePortfolioStockQuery = 'DELETE FROM portfolio_stocks WHERE Stock_Id IN (SELECT Stock_Id FROM stock WHERE U_Id = ? AND stock_name = ?)';
  db.query(deletePortfolioStockQuery, [userId, stockName], (error, result) => {
    if (error) {
      console.error('Error deleting from portfolio_stocks:', error);
      return res.status(500).json({ message: 'Failed to delete from portfolio_stocks' });
    }

    // After deleting related records, delete the stock
    const deleteStockQuery = 'DELETE FROM stock WHERE U_Id = ? AND stock_name = ?';
    db.query(deleteStockQuery, [userId, stockName], (error, result) => {
      if (error) {
        console.error('Error deleting stock:', error);
        return res.status(500).json({ message: 'Failed to delete stock' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      res.status(200).json({ message: 'Stock deleted successfully' });
    });
  });
});

// End Point for Update stock data
app.put('/currentStock/:userId/:stockName', (req, res) => {
  const { userId, stockName } = req.params;
  const { quantity, buy_price, purchase_date } = req.body;

  const query = `
    UPDATE stock 
    SET quantity = ?, buy_price = ?, purchase_date = ?
    WHERE U_Id = ? AND stock_name = ?
  `;

  db.query(query, [quantity, buy_price, purchase_date, userId, stockName], (error, result) => {
    if (error) {
      console.error('Error updating stock:', error);
      return res.status(500).json({ message: 'Failed to update stock' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    res.status(200).json({ message: 'Stock updated successfully' });
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

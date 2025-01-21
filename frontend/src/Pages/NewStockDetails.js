
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../Components/Navbar"; 
import "./NewStockDetails.css"; 

function NewStockDetails() {
  const [validated, setValidated] = useState(false);
  const [stockData, setStockData] = useState({
    stock_name: "",
    ticker: "",
    quantity: "",
    buy_price: "",
    purchase_date: "",
    Portfolio_Id: "",
  });

  const [portfolioName, setPortfolioName] = useState(""); 
  const [portfolioNames, setPortfolioNames] = useState([]); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStockData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePortfolioChange = (event) => {
    setPortfolioName(event.target.value); 
  };

  const userId = localStorage.getItem('U_Id'); 

  useEffect(() => {
    if (!userId) {
      alert('User is not logged in. Please log in again.');
      return;
    }

    
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getPortfolios?U_Id=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setPortfolioNames(data);
        } else {
          alert(data.message || 'Failed to fetch portfolios');
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        alert('An error occurred while fetching portfolios.');
      }
    };

    fetchPortfolios();
  }, [userId]);

  const handleSubmitStock = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/newStockdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          U_Id: userId, 
          ...stockData,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Stock added successfully!');
        
        setStockData({
          stock_name: "",
          ticker: "",
          quantity: "",
          buy_price: "",
          purchase_date: "",
          Portfolio_Id: "", 
        });
      } else {
        alert(data.message || 'Failed to add stock');
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      alert('An error occurred while adding the stock.');
    }
  };

  const handleCreatePortfolio = async (event) => {
    event.preventDefault();

    if (!portfolioName.trim()) {
      alert("Please enter a portfolio name.");
      return;
    }

    
    try {
      const response = await fetch('http://localhost:5000/createPortfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          U_Id: userId,
          portfolio_name: portfolioName.trim(), 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Portfolio created successfully!');
        setPortfolioName('');
      } else {
        alert(data.message || 'Failed to create portfolio');
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
      alert('An error occurred while creating the portfolio.');
    }
  };
  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2 className="form-title">Add a New Stock</h2>
        <div className="portfolio-container">
        <h2 className="portfolio-title">Create Portfolio</h2>
          <Form onSubmit={handleCreatePortfolio} className="portfolio-form">
            <Form.Group controlId="portfolioName">
              <Form.Label>Portfolio Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Portfolio Name"
                value={portfolioName}
                onChange={handlePortfolioChange}
                className="portfolio-input"
              />
            </Form.Group>
            <Button type="submit" className="submit-button">
              Create Portfolio
            </Button>
          </Form>
        </div>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitStock}
          className="stock-form"
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="stockName">
              <Form.Label>Stock Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Stock Name"
                name="stock_name"
                value={stockData.stock_name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="ticker">
              <Form.Label>Ticker</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Ticker"
                name="ticker"
                value={stockData.ticker}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Quantity"
                name="quantity"
                value={stockData.quantity}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="buyPrice">
              <Form.Label>Buy Price ($) </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Buy Price"
                step="0.01"
                name="buy_price"
                value={stockData.buy_price}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="purchaseDate">
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="purchase_date"
                value={stockData.purchase_date}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          
      
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="portfolio">
              <Form.Label>Select Portfolio</Form.Label>
              <Form.Select
              required
              name="Portfolio_Id"
              value={stockData.Portfolio_Id}
              onChange={handleInputChange}
              className="custom-select"
            >
            <option value="">Select a Portfolio</option>
            {portfolioNames.map((portfolio) => (
              <option key={portfolio.Portfolio_Id} value={portfolio.Portfolio_Id}>
                {portfolio.portfolio_name}
              </option>
            ))}
          </Form.Select>

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" className="submit-button">
            Add Stock
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default NewStockDetails;

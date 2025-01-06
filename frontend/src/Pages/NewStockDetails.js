import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../Components/Navbar"; // Import Navbar
import "./NewStockDetails.css"; // Import CSS for styling

function NewStockDetails({ userId }) {
  const [validated, setValidated] = useState(false);
  const [stockData, setStockData] = useState({
    stock_name: "",
    ticker: "",
    quantity: "",
    buy_price: "",
    purchase_date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStockData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/newStockdetails', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          U_Id: userId, // Pass the logged-in user ID
          ...stockData,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Stock added successfully!");
        setStockData({
          stock_name: "",
          ticker: "",
          quantity: "",
          buy_price: "",
          purchase_date: "",
        }); // Clear the form
        setValidated(false); // Reset validation
      } else {
        alert(data.message || "Failed to add stock");
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("An error occurred while adding the stock.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2 className="form-title">Add a New Stock</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
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
          <Button type="submit" className="submit-button">
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default NewStockDetails;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './NewStockDetails.css'; // Import CSS
import Navbar from '../Components/Navbar'; // Import the Navbar component

function NewStockDetails() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div>
        <Navbar/>
    <div className="form-container">
      <h2 className="form-title">Add a New Stock</h2> {/* Title Added */}
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="stock-form">
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="stockName">
            <Form.Label>Stock Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Stock Name"
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
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Quantity"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="buyPrice">
            <Form.Label>Buy Price</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Buy Price"
              step="0.01"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="purchasedate">
            <Form.Label >Purchase Date</Form.Label>
            <Form.Control
              required
              type="date"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" className="submit-button">Add</Button>
      </Form>
    </div>
    </div>
  );
}

export default NewStockDetails;

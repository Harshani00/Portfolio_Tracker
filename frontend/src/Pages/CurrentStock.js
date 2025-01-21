import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Navbar from "../Components/Navbar";
import "./CurrentStock.css";

function CurrentStock() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [editingStock, setEditingStock] = useState(null);

  const userId = localStorage.getItem("U_Id");
  const API_TOKEN = "ctof3l1r01qpsueffvmgctof3l1r01qpsueffvn0"; 

  useEffect(() => {
    if (!userId) {
      alert("User is not logged in. Please log in again.");
      return;
    }

    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/currentStock/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setStocks(data);
          await fetchStockPrices(data);
        } else {
          alert(data.message || "Failed to fetch stock data");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("An error occurred while fetching stock data.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStockPrices = async (stocks) => {
      try {
        let totalValue = 0;

   
        const stockPricePromises = stocks.map(async (stock) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${API_TOKEN}`
          );
          const data = await response.json();
          const latestPrice = data.c || 0; // Current price
          totalValue += stock.quantity * latestPrice;
          return { ...stock, latestPrice };
        });

        const updatedStocks = await Promise.all(stockPricePromises);
        setStocks(updatedStocks); // Update stocks with latest prices
        setPortfolioValue(totalValue); // Update portfolio value
      } catch (error) {
        console.error("Error fetching stock prices:", error);
        alert("An error occurred while fetching stock prices.");
      }
    };

    fetchStockData();
  }, [userId]);

  const handleDelete = async (stockName) => {
    if (!window.confirm(`Are you sure you want to delete ${stockName}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/currentStock/${userId}/${stockName}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setStocks(stocks.filter((stock) => stock.stock_name !== stockName));
      } else {
        alert(data.message || "Failed to delete stock");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      alert("An error occurred while deleting the stock.");
    }
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
  };

  return (
    <div>
      <Navbar />
      <div className="table-container">
        {isLoading ? (
          <p>Loading stock data...</p>
        ) : (
          <>
           
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Ticker</th>
                  <th>Quantity</th>
                  <th>Buy Price</th>
                  <th>Latest Price</th>
                  <th>Purchase Date</th>
                  <th>Action</th>
                  <th>Total Stock Price </th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.ticker}>
                    <td>{stock.stock_name}</td>
                    <td>{stock.ticker}</td>
                    <td>{stock.quantity}</td>
                    <td>${stock.buy_price}</td>
                    <td>${stock.latestPrice?.toFixed(2) || "N/A"}</td>
                    <td>{stock.purchase_date}</td>
                    
                    <td>
                      <button onClick={() => handleEdit(stock)}>Edit</button>
                      <button onClick={() => handleDelete(stock.stock_name)}>Delete</button>
                    </td>
                    <td>${(stock.quantity * stock.latestPrice).toFixed(2)}</td>

                  </tr>
                  
                ))}
                 {/* Add a total row */}
    <tr>
      <td colSpan="7" style={{ textAlign: "right", fontWeight: "bold" }}>
        Total Portfolio Value:
      </td>
      <td style={{ fontWeight: "bold" }}>${portfolioValue.toFixed(2)}</td>
    </tr>
              </tbody>
            </Table>
          </>
        )}
      </div>

      {editingStock && (
        <EditStockModal
          stock={editingStock}
          userId={userId}
          onClose={() => setEditingStock(null)}
          onSave={(updatedStock) => {
            setStocks(
              stocks.map((stock) =>
                stock.stock_name === updatedStock.stock_name ? updatedStock : stock
              )
            );
          }}
        />
      )}
    </div>
  );
}

function EditStockModal({ stock, userId, onClose, onSave }) {
  const [formData, setFormData] = useState(stock);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const stockName = stock.stock_name;

      const response = await fetch(`http://localhost:5000/currentStock/${userId}/${stockName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onSave(formData); // Update the stock list with the new data
        onClose(); // Close the modal
      } else {
        alert(data.message || "Failed to update stock");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("An error occurred while updating the stock.");
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Buy Price</label>
            <input
              type="number"
              name="buy_price"
              value={formData.buy_price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Purchase Date</label>
            <input
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CurrentStock;

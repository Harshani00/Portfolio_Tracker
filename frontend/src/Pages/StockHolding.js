// src/pages/StockHoldings.js
import React, { useState } from 'react';
//import axios from 'axios';

const StockHoldings = () => {
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({ ticker: '', shares: '', purchasePrice: '' });

//   const fetchStockPrice = async (ticker) => {
//     try {
//       const response = await axios.get(`https://api.example.com/stock/${ticker}`);
//       return response.data.price;
//     } catch {
//       alert('Error fetching stock price');
//       return 0;
//     }
//   };

//   const addStock = async () => {
//     const currentPrice = await fetchStockPrice(formData.ticker);
//     const newStock = { ...formData, currentPrice };
//     setStocks([...stocks, newStock]);
//     setFormData({ ticker: '', shares: '', purchasePrice: '' });
//   };

//   const deleteStock = (index) => {
//     const updatedStocks = stocks.filter((_, i) => i !== index);
//     setStocks(updatedStocks);
//   };

  return (
    <div>
      <h1>Stock Holdings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        //   addStock();
        }}
      >
        <input
          type="text"
          placeholder="Ticker Symbol"
          value={formData.ticker}
          onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Shares"
          value={formData.shares}
          onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={formData.purchasePrice}
          onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
          required
        />
        <button type="submit">Add Stock</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Total Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.ticker}</td>
              <td>{stock.shares}</td>
              <td>{stock.purchasePrice}</td>
              <td>{stock.currentPrice}</td>
              <td>{stock.shares * stock.currentPrice}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHoldings;

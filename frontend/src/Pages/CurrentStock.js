// import React, { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import Navbar from '../Components/Navbar'; // Import the Navbar component

// import './CurrentStock.css'; // Import the CSS file for styling

// function CurrentStock() {
//   // State to hold stock data
//   const [stocks, setStocks] = useState([
//     { name: 'Apple Inc.', ticker: 'AAPL', quantity: 10, buyPrice: 150, purchaseDate: '2023-01-01' },
//     { name: 'Tesla Inc.', ticker: 'TSLA', quantity: 5, buyPrice: 700, purchaseDate: '2023-02-15' },
//     { name: 'Microsoft Corp.', ticker: 'MSFT', quantity: 20, buyPrice: 280, purchaseDate: '2023-03-10' },
//   ]);
  
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     // Simulate loading stocks from an API or other async source
//     setTimeout(() => {
//       setIsLoading(false); // Set loading to false when stocks are available
//     }, 1000); // Simulating a 1-second delay
//   }, []);

//   const handleEdit = (stockName) => {
//     // Handle edit functionality here
//     console.log("Editing", stockName);
//   };

//   const handleDelete = (stockName) => {
//     // Handle delete functionality here
//     console.log("Deleting", stockName);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="table-container">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Stock Name</th>
//               <th>Ticker</th>
//               <th>Quantity</th>
//               <th>Buy Price</th>
//               <th>Purchase Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock) => (
//               <tr key={stock.ticker}>
//                 <td>{stock.name}</td>
//                 <td>{stock.ticker}</td>
//                 <td>{stock.quantity}</td>
//                 <td>${stock.buyPrice}</td>
//                 <td>{stock.purchaseDate}</td>
//                 <td>
//                   <button onClick={() => handleEdit(stock.name)}>Edit</button>
//                   <button onClick={() => handleDelete(stock.name)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import Navbar from '../Components/Navbar';
// import Dashboard from '../Pages/Dashboard'; // Import the Dashboard component

// import './CurrentStock.css'; // Import the CSS file for styling

// function CurrentStock() {
//   // State to hold stock data
//   const [stocks, setStocks] = useState([
//     { name: 'Apple Inc.', ticker: 'AAPL', quantity: 10, buyPrice: 150, purchaseDate: '2023-01-01' },
//     { name: 'Tesla Inc.', ticker: 'TSLA', quantity: 5, buyPrice: 700, purchaseDate: '2023-02-15' },
//     { name: 'Microsoft Corp.', ticker: 'MSFT', quantity: 20, buyPrice: 280, purchaseDate: '2023-03-10' },
//   ]);
  
//   const [isLoading, setIsLoading] = useState(); // Loading state

//   useEffect(() => {
//     // Simulate loading stocks from an API or other async source
//     setTimeout(() => {
//       setIsLoading(false); // Set loading to false when stocks are available
//     }, 1000); // Simulating a 1-second delay
//   }, []);

//   const handleEdit = (stockName) => {
//     console.log("Editing", stockName);
//   };

//   const handleDelete = (stockName) => {
//     console.log("Deleting", stockName);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="table-container">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Stock Name</th>
//               <th>Ticker</th>
//               <th>Quantity</th>
//               <th>Buy Price</th>
//               <th>Purchase Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock) => (
//               <tr key={stock.ticker}>
//                 <td>{stock.name}</td>
//                 <td>{stock.ticker}</td>
//                 <td>{stock.quantity}</td>
//                 <td>${stock.buyPrice}</td>
//                 <td>{stock.purchaseDate}</td>
//                 <td>
//                   <button onClick={() => handleEdit(stock.name)}>Edit</button>
//                   <button onClick={() => handleDelete(stock.name)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Only render Dashboard when stock data is available */}
//       {!isLoading && <Dashboard stockHoldings={stocks} />}
//     </div>
//   );
// }

// export default CurrentStock;
// import React, { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import Navbar from "../Components/Navbar";
// import Dashboard from "../Pages/Dashboard"; // Import the Dashboard component

// import "./CurrentStock.css"; // Import the CSS file for styling

// function CurrentStock() {
//   // State to hold stock data
//   const [stocks, setStocks] = useState([
//     { name: 'Apple Inc.', ticker: 'AAPL', quantity: 10, buyPrice: 150, purchaseDate: '2023-01-01' },
//     { name: 'Tesla Inc.', ticker: 'TSLA', quantity: 5, buyPrice: 700, purchaseDate: '2023-02-15' },
//     { name: 'Microsoft Corp.', ticker: 'MSFT', quantity: 20, buyPrice: 280, purchaseDate: '2023-03-10' },
//   ]);
  
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     // Simulate loading stocks from an API or other async source
//     setTimeout(() => {
//       setIsLoading(false); // Set loading to false when stocks are available
//     }, 1000); // Simulating a 1-second delay
//   }, []);

//   const handleEdit = (stockName) => {
//     console.log("Editing", stockName);
//   };

//   const handleDelete = (stockName) => {
//     console.log("Deleting", stockName);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="table-container">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Stock Name</th>
//               <th>Ticker</th>
//               <th>Quantity</th>
//               <th>Buy Price</th>
//               <th>Purchase Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock) => (
//               <tr key={stock.ticker}>
//                 <td>{stock.name}</td>
//                 <td>{stock.ticker}</td>
//                 <td>{stock.quantity}</td>
//                 <td>${stock.buyPrice}</td>
//                 <td>{stock.purchaseDate}</td>
//                 <td>
//                   <button onClick={() => handleEdit(stock.name)}>Edit</button>
//                   <button onClick={() => handleDelete(stock.name)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Only render Dashboard when stock data is available */}
//       {!isLoading && <Dashboard stockHoldings={stocks} />}
//     </div>
//   );
// }

// // export default CurrentStock;
// import React, { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import Navbar from "../Components/Navbar";
// import Dashboard from "../Pages/Dashboard"; // Import the Dashboard component
// import "./CurrentStock.css"; // Import the CSS file for styling

// function CurrentStock() {
//   // State to hold stock data
//   const [stocks, setStocks] = useState([
//     { name: "Apple Inc.", ticker: "AAPL", quantity: 10, buyPrice: 150, purchaseDate: "2023-01-01" },
//     { name: "Tesla Inc.", ticker: "TSLA", quantity: 5, buyPrice: 700, purchaseDate: "2023-02-15" },
//     { name: "Microsoft Corp.", ticker: "MSFT", quantity: 20, buyPrice: 280, purchaseDate: "2023-03-10" },
//   ]);
  
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     // Simulate loading stocks from an API or other async source
//     setTimeout(() => {
//       setIsLoading(false); // Set loading to false when stocks are available
//     }, 1000); // Simulating a 1-second delay
//   }, []);

//   const handleEdit = (stockName) => {
//     console.log("Editing", stockName);
//   };

//   const handleDelete = (stockName) => {
//     console.log("Deleting", stockName);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="table-container">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Stock Name</th>
//               <th>Ticker</th>
//               <th>Quantity</th>
//               <th>Buy Price</th>
//               <th>Purchase Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock) => (
//               <tr key={stock.ticker}>
//                 <td>{stock.name}</td>
//                 <td>{stock.ticker}</td>
//                 <td>{stock.quantity}</td>
//                 <td>${stock.buyPrice}</td>
//                 <td>{stock.purchaseDate}</td>
//                 <td>
//                   <button onClick={() => handleEdit(stock.name)}>Edit</button>
//                   <button onClick={() => handleDelete(stock.name)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Only render Dashboard when stock data is available */}
//       {!isLoading && <Dashboard stockHoldings={stocks} />}
//     </div>
//   );
// }

// export default CurrentStock;
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "../Components/Navbar";
import Dashboard from "../Pages/Dashboard"; // Import the Dashboard component
import "./CurrentStock.css"; // Import the CSS file for styling

function CurrentStock() {
  // State to hold stock data
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulating fetching data from an API or other async source
    const fetchedStocks = [
      { name: "Apple Inc.", ticker: "AAPL", quantity: 10, buyPrice: 150, purchaseDate: "2023-01-01" },
      { name: "Tesla Inc.", ticker: "TSLA", quantity: 5, buyPrice: 700, purchaseDate: "2023-02-15" },
      { name: "Microsoft Corp.", ticker: "MSFT", quantity: 20, buyPrice: 280, purchaseDate: "2023-03-10" },
    ];

    // Simulate a delay in fetching data
    setTimeout(() => {
      setStocks(fetchedStocks); // Populate stock data
      setIsLoading(false); // Set loading to false when stocks are available
    }, 1000); // Simulating a 1-second delay
  }, []);

  const handleEdit = (stockName) => {
    console.log("Editing", stockName);
  };

  const handleDelete = (stockName) => {
    console.log("Deleting", stockName);
  };

  return (
    <div>
      <Navbar />
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Buy Price</th>
              <th>Purchase Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker}>
                <td>{stock.name}</td>
                <td>{stock.ticker}</td>
                <td>{stock.quantity}</td>
                <td>${stock.buyPrice}</td>
                <td>{stock.purchaseDate}</td>
                <td>
                  <button onClick={() => handleEdit(stock.name)}>Edit</button>
                  <button onClick={() => handleDelete(stock.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Only render Dashboard when stock data is available */}
      {!isLoading && stocks.length > 0 && <Dashboard stockHoldings={stocks} />}
    </div>
  );
}

export default CurrentStock;

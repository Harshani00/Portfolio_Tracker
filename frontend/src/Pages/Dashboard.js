// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import "./Dashboard.css";

// // Register required Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = ({ stockHoldings }) => {
//   const [portfolioValue, setPortfolioValue] = useState(0);
//   const [topStock, setTopStock] = useState({ name: "N/A", value: 0 });
//   const [portfolioDistribution, setPortfolioDistribution] = useState({});

//   useEffect(() => {
//     if (!stockHoldings || stockHoldings.length === 0) {
//       console.error("Stock holdings are empty or undefined.");
//       return;
//     }

//     const fetchStockPrices = async () => {
//       let totalValue = 0;
//       const stockValues = {};
//       let topPerformingStock = { name: "N/A", value: 0 };

//       for (const stock of stockHoldings) {
//         try {
//           const { data } = await axios.get(
//             `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker}&apikey=9KVLYO3I1C5F39A9`
//           );

//           const currentPrice = parseFloat(data["Global Quote"]?.["05. price"]);
//           if (!currentPrice) continue; // Skip if price is invalid

//           const stockValue = currentPrice * stock.quantity;
//           totalValue += stockValue;
//           stockValues[stock.name] = stockValue;

//           if (stockValue > topPerformingStock.value) {
//             topPerformingStock = { name: stock.name, value: stockValue };
//           }
//         } catch (error) {
//           console.error(`Error fetching data for ${stock.ticker}:`, error);
//         }
//       }

//       setPortfolioValue(totalValue);
//       setTopStock(topPerformingStock);
//       setPortfolioDistribution(stockValues);
//     };

//     fetchStockPrices();
//   }, [stockHoldings]);

//   const chartData = {
//     labels: Object.keys(portfolioDistribution),
//     datasets: [
//       {
//         data: Object.values(portfolioDistribution),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       },
//     ],
//   };


//   return (
//     <div className="dashboard-container">
//       <h2>Portfolio Dashboard</h2>
//       <div className="metrics">
//         <div className="metric">
//           <h3>Total Portfolio Value</h3>
//           <p>${portfolioValue.toFixed(2)}</p>
//         </div>
//         <div className="metric">
//           <h3>Top Performing Stock</h3>
//           <p>
//             {topStock.name} (${topStock.value ? topStock.value.toFixed(2) : "0.00"})
//           </p>
//         </div>
//       </div>
//       <div className="chart">
//         <h3>Portfolio Distribution</h3>
//         <Pie data={chartData} />
//       </div>
//     </div>
//   );
// };

// // export default Dashboard;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import "./Dashboard.css";
// import CurrentStock from "../Pages/CurrentStock"
// // Register required Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = ({ stockHoldings }) => {
//   const [portfolioValue, setPortfolioValue] = useState(0);
//   const [topStock, setTopStock] = useState({ name: "N/A", value: 0 });
//   const [portfolioDistribution, setPortfolioDistribution] = useState({});
//   const API_KEY = 'ctof3l1r01qpsueffvmgctof3l1r01qpsueffvn0'; // Replace with your Finnhub API key

//   useEffect(() => {
//     if (!stockHoldings || stockHoldings.length === 0) {
//       console.error("Stock holdings are empty or undefined.");
//       return;
//     }

//     const fetchStockPrices = async () => {
//       let totalValue = 0;
//       const stockValues = {};
//       let topPerformingStock = { name: "N/A", value: 0 };

//       for (const stock of stockHoldings) {
//         try {
//           const { data } = await axios.get(
//             `https://finnhub.io/api/v1/quote`,
//             {
//               params: {
//                 symbol: stock.ticker,
//                 token: API_KEY,
//               },
//             }
//           );

//           const currentPrice = data.c; // 'c' is the current price
//           if (!currentPrice) continue; // Skip if price is invalid

//           const stockValue = currentPrice * stock.quantity;
//           totalValue += stockValue;
//           stockValues[stock.name] = stockValue;

//           if (stockValue > topPerformingStock.value) {
//             topPerformingStock = { name: stock.name, value: stockValue };
//           }
//         } catch (error) {
//           console.error(`Error fetching data for ${stock.ticker}:`, error);
//         }
//       }

//       setPortfolioValue(totalValue);
//       setTopStock(topPerformingStock);
//       setPortfolioDistribution(stockValues);
//     };

//     fetchStockPrices();
//   }, [stockHoldings]);

//   const chartData = {
//     labels: Object.keys(portfolioDistribution),
//     datasets: [
//       {
//         data: Object.values(portfolioDistribution),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Portfolio Dashboard</h2>
//       <div className="metrics">
//         <div className="metric">
//           <h3>Total Portfolio Value</h3>
//           <p>${portfolioValue.toFixed(2)}</p>
//         </div>
//         <div className="metric">
//           <h3>Top Performing Stock</h3>
//           <p>
//             {topStock.name} (${topStock.value ? topStock.value.toFixed(2) : "0.00"})
//           </p>
//         </div>
//       </div>
//       <div className="chart">
//         <h3>Portfolio Distribution</h3>
//         <Pie data={chartData} />
//       </div>
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import "./Dashboard.css";

// // Register required Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = ({ stockHoldings }) => {
//   const [portfolioValue, setPortfolioValue] = useState(0);
//   const [topStock, setTopStock] = useState({ name: "N/A", value: 0 });
//   const [portfolioDistribution, setPortfolioDistribution] = useState({});

//   useEffect(() => {
//     // Check if stockHoldings is valid
//     if (!stockHoldings || stockHoldings.length === 0) {
//       console.error("Stock holdings are empty or undefined.");
//       return;
//     }

//     const fetchStockPrices = async () => {
//       let totalValue = 0;
//       const stockValues = {};
//       let topPerformingStock = { name: "N/A", value: 0 };

//       for (const stock of stockHoldings) {
//         try {
//           const { data } = await axios.get(
//             `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=ctof3l1r01qpsueffvmgctof3l1r01qpsueffvn0`
//           );

//           const currentPrice = parseFloat(data?.c);
//           if (!currentPrice) continue; // Skip if price is invalid

//           const stockValue = currentPrice * stock.quantity;
//           totalValue += stockValue;
//           stockValues[stock.name] = stockValue;

//           if (stockValue > topPerformingStock.value) {
//             topPerformingStock = { name: stock.name, value: stockValue };
//           }
//         } catch (error) {
//           console.error(`Error fetching data for ${stock.ticker}:`, error);
//         }
//       }

//       setPortfolioValue(totalValue);
//       setTopStock(topPerformingStock);
//       setPortfolioDistribution(stockValues);
//     };

//     fetchStockPrices();
//   }, [stockHoldings]);

//   const chartData = {
//     labels: Object.keys(portfolioDistribution),
//     datasets: [
//       {
//         data: Object.values(portfolioDistribution),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Portfolio Dashboard</h2>
//       <div className="metrics">
//         <div className="metric">
//           <h3>Total Portfolio Value</h3>
//           <p>${portfolioValue.toFixed(2)}</p>
//         </div>
//         <div className="metric">
//           <h3>Top Performing Stock</h3>
//           <p>
//             {topStock.name} (${topStock.value ? topStock.value.toFixed(2) : "0.00"})
//           </p>
//         </div>
//       </div>
//       <div className="chart">
//         <h3>Portfolio Distribution</h3>
//         <Pie data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";
import "./Dashboard.css";
import Navbar from "../Components/Navbar";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ stockHoldings }) => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [topStock, setTopStock] = useState({ name: "N/A", value: 0 });
  const [portfolioDistribution, setPortfolioDistribution] = useState({});

  useEffect(() => {
    const fetchStockPrices = async () => {
      let totalValue = 0;
      const stockValues = {};
      let topPerformingStock = { name: "N/A", value: 0 };

      for (const stock of stockHoldings) {
        try {
          const { data } = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=ctof3l1r01qpsueffvmgctof3l1r01qpsueffvn0`
          );

          const currentPrice = parseFloat(data?.c);
          if (!currentPrice) continue; // Skip if price is invalid

          const stockValue = currentPrice * stock.quantity;
          totalValue += stockValue;
          stockValues[stock.name] = stockValue;

          if (stockValue > topPerformingStock.value) {
            topPerformingStock = { name: stock.name, value: stockValue };
          }
        } catch (error) {
          console.error(`Error fetching data for ${stock.ticker}:`, error);
        }
      }

      setPortfolioValue(totalValue);
      setTopStock(topPerformingStock);
      setPortfolioDistribution(stockValues);
    };

    fetchStockPrices();
  }, [stockHoldings]);

  const chartData = {
    labels: Object.keys(portfolioDistribution),
    datasets: [
      {
        data: Object.values(portfolioDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div>
      <Navbar/>
    <div className="dashboard-container">
      <h2>Portfolio Dashboard</h2>
      <div className="metrics">
        <div className="metric">
          <h3>Total Portfolio Value</h3>
          <p>${portfolioValue.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h3>Top Performing Stock</h3>
          <p>
            {topStock.name} (${topStock.value ? topStock.value.toFixed(2) : "0.00"})
          </p>
        </div>
      </div>
      <div className="chart">
        <h3>Portfolio Distribution</h3>
        {Object.keys(portfolioDistribution).length > 0 ? (
          <Pie data={chartData} />
        ) : (
          <p>No data available for chart.</p>
        )}
      </div>
    </div>
    </div>
  );
};

Dashboard.defaultProps = {
  stockHoldings: [
    { name: "Apple Inc.", ticker: "AAPL", quantity: 10 },
    { name: "Tesla Inc.", ticker: "TSLA", quantity: 5 },
    { name: "Microsoft Corp.", ticker: "MSFT", quantity: 20 },
  ],
};

Dashboard.propTypes = {
  stockHoldings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      ticker: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default Dashboard;

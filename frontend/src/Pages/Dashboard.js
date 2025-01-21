import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2"; 
import { Chart as ChartJS } from "chart.js/auto"; 
import Navbar from "../Components/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [topPerformingStock, setTopPerformingStock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioDistribution, setPortfolioDistribution] = useState([]);

  const userId = localStorage.getItem("U_Id");

  useEffect(() => {
    if (!userId) {
      alert("User is not logged in. Please log in again.");
      return;
    }

    const fetchDashboardData = async () => {
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
      const API_TOKEN = "ctof3l1r01qpsueffvmgctof3l1r01qpsueffvn0"; 
      try {
        let totalValue = 0;
        let topStock = null;
        const stockValues = [];

        const stockPricePromises = stocks.map(async (stock) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${API_TOKEN}`
          );
          const data = await response.json();
          const latestPrice = data.c || 0;
          const stockValue = stock.quantity * latestPrice;
          totalValue += stockValue;

          if (!topStock || stockValue > topStock.value) {
            topStock = { ...stock, value: stockValue };
          }

          stockValues.push({ name: stock.stock_name, value: stockValue });

          return { ...stock, latestPrice, stockValue };
        });

        const updatedStocks = await Promise.all(stockPricePromises);
        setStocks(updatedStocks);
        setPortfolioValue(totalValue);
        setTopPerformingStock(topStock);

        
        setPortfolioDistribution(stockValues);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
        alert("An error occurred while fetching stock prices.");
      }
    };

    fetchDashboardData();
  }, [userId]);


  const chartData = {
    labels: portfolioDistribution.map((stock) => stock.name),
    datasets: [
      {
        data: portfolioDistribution.map((stock) => stock.value),
        backgroundColor: ["#21094E", "#118B50", "#000957", "#872341", "#F29F58"],
        hoverBackgroundColor: ["#21094E", "#118B50", "#000957", "#872341", "#F29F58"],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        {isLoading ? (
          <p>Loading your portfolio...</p>
        ) : (
          <>
            <h2>Your Portfolio Overview</h2>
            <div className="portfolio-summary">
              <p>Total Portfolio Value: ${portfolioValue.toFixed(2)}</p>
              <p>Total Number of Stocks: {stocks.length}</p>
            </div>

            {/* Top Performing Stock */}
            {topPerformingStock && (
              <div className="top-performing-stock">
                <h3>Top Performing Stock</h3>
                <p>
                  <strong>{topPerformingStock.stock_name}</strong> -{" "}
                  {topPerformingStock.ticker}
                </p>
                <p>Value: ${topPerformingStock.value.toFixed(2)}</p>
              </div>
            )}

            

            {/* Portfolio Distribution Chart */}
            {portfolioDistribution.length > 0 && (
              <div className="portfolio-distribution-chart">
                <h3>Portfolio Distribution</h3>
                <Pie data={chartData} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './Pages/Dashboard';
import StockHoldings from './Pages/StockHolding';
import Navbar from './Components/Navbar';
import NewStockDetails from './Pages/NewStockDetails';
import CurrentStock from './Pages/CurrentStock';
import Login from './Pages/Login'; // Import the Login component
import Signup from './Pages/Signup';
import HomePage from './Pages/Home';
import Home from './Pages/Home';




class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Navigate to="/home" />} />
         <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stockholding" element={<StockHoldings />} />
          <Route path="/navbar" element={<Navbar />} />  {/* Default route */}  {/* Replace with your own */}
          <Route path="/newStockdetails" element={<NewStockDetails />} />
          <Route path="/currentStock" element={<CurrentStock />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         
       
         
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css'; // Assuming the CSS for this file
import backgroundImage from '../Assets/Img4.png'; // Background image for the homepage

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="homepage-container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to PORTFOLIO360</h1>
        <p className="homepage-subtitle">
          Discover, connect, and achieve your goals with us. Join our community today!
        </p>
        <div className="button-group">
          <Button
            variant="primary"
            className="homepage-button"
            onClick={() => handleNavigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            className="homepage-button"
            onClick={() => handleNavigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

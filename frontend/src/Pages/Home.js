import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css';
import backgroundImage from '../Assets/Img4.png';

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
        Stay on top of your portfolio with real-time updates, insights, and analytics all in one place
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginSignIn.css';
import backgroundImage from '../Assets/Img2.png'; 

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }
  
      const { user_name, user_role, user_id } = data;
      setUserName(user_name);
      localStorage.setItem('userName', user_name);
      localStorage.setItem('userRole', user_role);
      localStorage.setItem('userID', user_id);
      localStorage.setItem('U_Id', user_id); 
      alert(`Welcome ${user_name}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  
  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="container-split">
      <div className="image-half" style={{ backgroundImage: `url(${backgroundImage})` }}>
        
      </div>
      <div className="form-half">
        <div className="access-container1">
          <h2 className="access-title">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="button1">
              Sign In
            </Button>
          </Form>

          
            <p className="account">
              Don't have an Account?{' '}
              <Button
                className="signuphyperlink"
                variant="link"
                onClick={handleSignupRedirect}
              >
                Sign Up Here
              </Button>
            </p>
          </div>
        </div>
      </div>
    
  );
}
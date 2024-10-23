import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import UserServices from '../../services/UserServices';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    variant: "",
    message: "",
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("user") !== null) {
      navigate('/home');
    }
  }, [navigate]);

  const updateAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    // Auto hide alert after 5 seconds
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const validateForm = () => {
    if (!user.email || !user.password) {
      updateAlert("Please fill in all fields", "danger");
      return false;
    }
    if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      updateAlert("Please enter a valid email address", "danger");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await UserServices.loginUser(user);
      console.log('Login response:', response);
      
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        updateAlert("Login successful!", "success");
        navigate('/home');
        window.location.reload();
      } else {
        updateAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error('Login error:', error);
      updateAlert(
        error?.response?.data?.message || "Login failed. Please try again.",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="app-title">CineCloud</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-floating">
              <Form.Control
                id="floatingEmail"
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Email address"
                required
              />
              <label htmlFor="floatingEmail">Email</label>
            </Form.Group>
            <Form.Group className="form-floating">
              <Form.Control
                id="floatingPassword"
                type={visible ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
              <Button 
                variant="link"
                onClick={() => setVisible(!visible)}
                className="password-toggle"
              >
                {visible ? <EyeSlash size={20} /> : <Eye size={20} />}
              </Button>
            </Form.Group>
            <Button 
              variant="danger" 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>
          <div className="text-center">
            <a href="/signup" className="signup-link">
              Don't have an account? Sign Up
            </a>
          </div>
        </Card.Body>
      </Card>
      {alert.show && (
        <Alert 
          variant={alert.variant} 
          className="mt-3 text-center" 
          onClose={() => setAlert({...alert, show: false})} 
          dismissible
        >
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default Login;
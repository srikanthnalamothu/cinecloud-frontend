import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
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

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate('/home');
    }
  }, [navigate]);

  const updateAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const validateForm = () => {
    return user.email && user.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        // API call here
      } else {
        updateAlert("Please fill in all fields", "danger");
      }
    } catch (error) {
      console.log(error);
      updateAlert(
        error?.response?.data?.message || "Login failed!",
        "danger"
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: '#196ca2' }}>CineCloud</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-floating mb-3">
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
                <Form.Group className="form-floating mb-3">
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
                    variant="outline-secondary"
                    onClick={() => setVisible(!visible)}
                    className="password-toggle"
                  >
                    {visible ? <EyeSlash /> : <Eye />}
                  </Button>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Sign In
                </Button>
              </Form>
              <div className="text-center mt-3">
                <a href="/signup" className="text-decoration-none">
                  Don't have an account? Sign Up
                </a>
              </div>
            </Card.Body>
          </Card>
          {alert.show && (
            <Alert variant={alert.variant} className="mt-3" onClose={() => setAlert({...alert, show: false})} dismissible>
              {alert.message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
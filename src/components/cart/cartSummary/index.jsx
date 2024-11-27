// src/components/cart/CartSummary.jsx
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Button, Card, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { usePaypalPayment } from '../../../hooks/usePaypalPayment';
import LoadingSpinner from '../../shared/loadingSpinner';
import './CartSummary.css';

const CartSummary = ({ cartItems, movies }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const totalAmount = movies.reduce((sum, movie) => sum + movie.cost, 0);
  const user = JSON.parse(localStorage.getItem('user'));
  
  const {
    createPaypalOrder,
    handlePaypalApprove,
    handlePaypalError,
    placeOrder
  } = usePaypalPayment(cartItems, totalAmount);

  if (isPending) return <LoadingSpinner />;

  // Login prompt UI if user is not logged in
  if (!user) {
    return (
      <Card className="cart-summary">
        <Card.Body>
          <div className="login-prompt">
            <FaLock className="login-icon" />
            <h3 className="summary-title">Login Required</h3>
            <p className="login-message">
              Please login to complete your purchase
            </p>
            <div className="login-actions">
              <Link to="/login" className="login-button">
                <FaUserCircle className="me-2" />
                Login to Continue
              </Link>
              <p className="signup-prompt">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Normal summary UI for logged in users
  return (
    <Card className="cart-summary">
      <Card.Body>
        <h3 className="summary-title">Order Summary</h3>
        
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>No. of Movies</span>
            <span>{movies.length}</span>
          </div>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        {/* <Button onClick={placeOrder}>place order</Button> */}
        <div className="paypal-buttons">
          <PayPalButtons
            style={{ 
              layout: "horizontal",
              color: "gold",
              shape: "rect",
              label: "pay",
              height: 40
            }}
            createOrder={createPaypalOrder}
            onApprove={handlePaypalApprove}
            onError={handlePaypalError}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
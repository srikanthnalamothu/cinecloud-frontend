// src/views/cart/Cart.jsx
import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useBulkMovies } from '../../hooks/useBulkMovies';
import MovieList from '../../components/movies/movieList';
import CartSummary from '../../components/cart/cartSummary';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import './Cart.css';

const Cart = () => {
  const { movies, loading, error, removeMovie } = useBulkMovies('cart');
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="page-title">My Cart</h2>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          <MovieList
            movies={movies}
            onRemove={removeMovie}
            emptyMessage="Your cart is empty"
            removeButtonText="Remove from Cart"
          />
        </div>
        
        {movies.length > 0 && (
          <PayPalScriptProvider options={initialOptions}>
            <CartSummary 
              cartItems={cartItems}
              movies={movies}
            />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
};

export default Cart;
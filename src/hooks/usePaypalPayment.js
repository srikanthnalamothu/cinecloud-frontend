// src/hooks/usePaypalPayment.js
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from './useOrders';

export const usePaypalPayment = (cartItems, totalAmount) => {
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const createPaypalOrder = useCallback((data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
          },
        },
      ],
    });
  }, [totalAmount]);

  const placeOrder = useCallback(async () => {
    try {
      
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('User not logged in');

      // Create order in your backend
      await createOrder({
        userId: user.id,
        totalCost: totalAmount,
        movieIds: cartItems,
        paymentId: "12345"
      });

      // Show success message and redirect
      alert('Payment successful!');
      navigate('/orders');
    } catch (error) {
      console.error('Payment failed:', error);
      alert(error.message);
    }
  }, [cartItems, totalAmount, createOrder, navigate]);

  const handlePaypalApprove = useCallback(async (data, actions) => {
    try {
      const details = await actions.order.capture();
      
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('User not logged in');

      // Create order in your backend
      await createOrder({
        userId: user.id,
        totalCost: totalAmount,
        movieIds: cartItems,
        paymentId: details.id
      });

      // Show success message and redirect
      alert('Payment successful!');
      navigate('/orders');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  }, [cartItems, totalAmount, createOrder, navigate]);

  const handlePaypalError = useCallback((error) => {
    console.error('PayPal error:', error);
    alert('Payment failed. Please try again.');
  }, []);

  return {
    createPaypalOrder,
    handlePaypalApprove,
    handlePaypalError,
    placeOrder
  };
};
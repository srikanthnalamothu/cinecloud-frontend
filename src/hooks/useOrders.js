// src/hooks/useOrders.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/OrderServices';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch orders for user
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }

      const response = await OrderService.getOrdersByUserId(user.id);
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Load orders on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Create new order
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await OrderService.createOrder(orderData);
      
      // Clear cart after successful order
      localStorage.setItem('cart', '[]');
      
      // Refresh orders list
      await fetchOrders();

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get a single order by ID
  const getOrderById = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await OrderService.getOrderById(orderId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      await OrderService.deleteOrder(orderId);
      
      // Refresh orders list after deletion
      await fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh orders manually (useful after operations)
  const refreshOrders = () => {
    fetchOrders();
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    getOrderById,
    deleteOrder,
    refreshOrders
  };
};
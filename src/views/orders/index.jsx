// src/views/orders/Orders.jsx
import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import OrderList from '../../components/orders/orderList';
import LoadingSpinner from '../../components/shared/loadingSpinner';
import ErrorMessage from '../../components/shared/errorMessage';
import './Orders.css';

const Orders = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2 className="page-title">My Orders</h2>
      </div>
      <OrderList orders={orders} />
    </div>
  );
};

export default Orders;
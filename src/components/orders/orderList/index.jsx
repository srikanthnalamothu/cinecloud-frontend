// src/components/orders/OrderList.jsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import './OrderList.css';
import { useNavigate } from 'react-router-dom';

const OrderList = ({ orders }) => {
  const navigate = useNavigate();
  if (!orders.length) {
    return (
      <div className="empty-orders">
        <h3>No orders found</h3>
        <p>Looks like you haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <Card key={order.id} className="order-card">
          <Card.Header className="order-header">
            <div className="order-info">
              <h5>Order #{order.id}</h5>
              <span className="order-date">
                {format(new Date(order.ordered_date), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="order-amount">
              ${order.totalCost.toFixed(2)}
            </div>
          </Card.Header>
          <Card.Body>
            <Row className="movie-grid">
              {order.Movies.map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3} onClick={() => navigate(`/movie/${movie.id}`)} style={{ cursor:'pointer'}}>
                  <div className="movie-item">
                    <img 
                      src={movie.imageUrl} 
                      alt={movie.title}
                      className="order-movie-image"
                      onError={(e) => {
                        e.target.src = '/movie-placeholder.jpg';
                      }}
                    />
                    <div className="movie-details">
                      <h6 className="movie-title">{movie.title}</h6>
                      <span className="movie-cost">${movie.cost.toFixed(2)}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
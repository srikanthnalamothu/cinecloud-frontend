// src/components/movies/MovieList.jsx
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaTrash, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';

const MovieList = ({ 
  movies, 
  onRemove,
  onMove,
  emptyMessage = "No movies found",
  removeButtonText = "Remove",
  isCart = false  // to determine if we're in cart or favorites view
}) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!movies.length) {
    return (
      <div className="container text-center mt-5">
        <h3 className="empty-message">{emptyMessage}</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <Row className="g-4">
        {movies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="movie-card">
              <div className="movie-image-wrapper">
                <Card.Img 
                  style={{ cursor: 'pointer' }}
                  variant="top" 
                  src={movie.imageUrl} 
                  alt={movie.title}
                  className="movie-image"
                  onError={(e) => {
                    e.target.src = '/movie-placeholder.jpg';
                  }}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="movie-title-wrapper" data-full-title={movie.title}>
                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                  </div>
                  <Card.Text className="movie-cost">${movie.cost.toFixed(2)}</Card.Text>
                </div>
                <div className="d-flex flex-column gap-2">
                  {/* Only show Remove button if it's cart/favorites view */}
                  {onRemove && (
                    <Button 
                      variant="danger"
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={() => onRemove(movie.id)}
                    >
                      <FaTrash /> {removeButtonText}
                    </Button>
                  )}
                  
                  {/* Show Move button based on authentication and view type */}
                  {onMove && (user || !isCart) && (
                    <Button 
                      variant={isCart ? "outline-danger" : "outline-primary"}
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={() => {
                        if (!user && !isCart) {
                          navigate('/login');
                          return;
                        }
                        onMove(movie.id);
                      }}
                    >
                      {isCart ? (
                        <>
                          <FaHeart /> Move to Favorites
                        </>
                      ) : (
                        <>
                          <FaShoppingCart /> {user ? 'Move to Cart' : 'Login to Add to Cart'}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieList;